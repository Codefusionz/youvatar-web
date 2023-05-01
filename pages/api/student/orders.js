import handleErrors from '@/helpers/errors'
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
    case 'GET':
      try {
        const orders = await prisma.order.findMany({
          where: { userId: user.id },
          include: {
            course: {
              include: {
                batches: {
                  include: {
                    modules: {
                      include: {
                        lectures: true,
                      },
                    },
                  },
                },
              },
            },
          },
        })

        res.status(200).json({ success: true, data: orders })
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

export default handler
