import handleErrors from '@/helpers/errors'
import prisma from '@/lib/prisma'
import { createLikeSchema } from '@/schema/post'
import { getToken } from 'next-auth/jwt'

export default async function handler(req, res) {
  const token = await getToken({ req })

  if (!token) {
    res.status(401).send({ message: 'Unauthorized' })
    return
  }

  try {
    switch (req.method) {
      case 'POST':
        try {
          const value = await createLikeSchema.validateAsync(req.body)
          const newLike = await prisma.postLike.create({
            data: {
              postId: value.postId,
              userId: token.sub,
            },
            include: {
              user: {
                select: {
                  username: true,
                  displayName: true,
                },
              },
            },
          })

          res.status(200).send({ success: true, data: newLike })
        } catch (error) {
          handleErrors(error, res)
        }
        break

      case 'DELETE':
        try {
          const postId = req.query.id
          await prisma.postLike.deleteMany({
            where: {
              postId: postId,
              userId: token.sub,
            },
          })
          res.status(200).send({ success: true })
        } catch (error) {
          handleErrors(error, res)
        }
        break

      default:
        res.status(405).json({ message: 'This request cannot be processed' })
        break
    }
  } catch (error) {
    console.log(error)
  }
}
