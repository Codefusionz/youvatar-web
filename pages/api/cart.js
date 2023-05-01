import handleErrors from '@/helpers/errors'
import prisma from '@/lib/prisma'
import { courseCartSchema } from '@/schema/course'
import { getToken } from 'next-auth/jwt'

export default async function handler(req, res) {
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
        const value = await courseCartSchema.validateAsync(req.body)

        const orderId = await prisma.order.findUnique({
          where: {
            userId_courseId: {
              userId: user.id,
              courseId: value.courseId,
            },
          },
        })

        if (orderId) {
          throw new Error('Course already purchased')
        }

        const response = await prisma.cart.create({
          data: {
            userId: user.id,
            courseId: value.courseId,
            batchId: value.batchId,
          },
        })

        res.status(200).json({ success: true, cartId: response.id })
      } catch (error) {
        handleErrors(error, res)
      }
      break

    case 'GET':
      try {
        const cartItems = await prisma.cart.findMany({
          where: { userId: user.id },
          include: { course: true },
        })

        res.status(200).json({ success: true, data: cartItems })
      } catch (error) {
        handleErrors(error, res)
      }
      break

    case 'DELETE':
      try {
        const cartId = req.query?.id

        if (!cartId) {
          return res.status(400).json({ message: 'Missing required field' })
        }

        await prisma.cart.delete({
          where: { id: cartId },
        })

        res.status(200).json({ success: true })
      } catch (error) {
        handleErrors(error, res)
      }
      break

    default:
      res.status(405).json({ message: 'This request cannot be processed' })
  }
}
