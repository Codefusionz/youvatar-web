import handleErrors from '@/helpers/errors'
import { sendOrderDetailsToMentor, sendOrderReceipt } from '@/helpers/mailer'
import prisma from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'

async function handler(req, res) {
  const token = await getToken({ req })

  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' })
  }

  const user = await prisma.user.findUnique({
    where: { id: token.sub },
  })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  switch (req.method) {
    case 'POST':
      try {
        const cartItems = await prisma.cart.findMany({
          where: { userId: user.id },
          include: {
            course: {
              include: {
                mentor: {
                  select: { user: { select: { email: true } } },
                },
              },
            },
          },
        })

        await Promise.all(
          cartItems.map(async (item) => {
            const payment = await prisma.payment.create({
              data: {
                amount: item.course.price,
                status: 'SUCCESS',
                userId: user.id,
                courseId: item.course.id,
                batchId: item.batchId,
              },
            })
            const order = await prisma.order.create({
              data: {
                userId: user.id,
                courseId: item.course.id,
                batchId: item.batchId,
                paymentId: payment.id,
              },
            })
            await prisma.cart.delete({ where: { id: item.id } })
            if (payment.status === 'SUCCESS') {
              if (user.email) {
                await sendOrderReceipt(user.email, order.id, payment.amount)
              }
              if (item.course.mentor.user.email) {
                await sendOrderDetailsToMentor(
                  item.course.mentor.user.email,
                  order.id,
                  payment.amount
                )
              }
            }
          })
        )

        res.status(200).json({ success: true })
      } catch (error) {
        handleErrors(error, res)
      }
      break
    default:
      res.status(405).json({ message: 'This request cannot be processed' })
  }
}

export default handler
