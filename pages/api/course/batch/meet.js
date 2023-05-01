import { isAuthenticated } from '@/helpers/auth'
import handleErrors from '@/helpers/errors'
import prisma from '@/lib/prisma'

const getUsersFromOrder = (order) => {
  return order.map((e) => {
    return e.user
  })
}

export default async function (req, res) {
  const user = await isAuthenticated(req)
  const { batch } = req.query

  if (!user) return res.redirect('/auth/login')

  try {
    switch (req.method) {
      case 'GET':
        const data = await prisma.order.findMany({
          where: { batchId: batch },
          include: {
            user: {
              select: { username: true, email: true },
            },
          },
        })

        res.status(200).send({ success: true, data: getUsersFromOrder(data) })
        break

      default:
        res.status(405).json({ message: 'This request cannot be processed' })
    }
  } catch (err) {
    handleErrors(err, res)
  }
}
