import handleErrors from '@/helpers/errors'
import prisma from '@/lib/prisma'
import { createCommentSchema } from '@/schema/post'
import { getToken } from 'next-auth/jwt'

export default async function handler(req, res) {
  const token = await getToken({ req })

  if (!token) {
    res.status(401).send({ message: 'Unauthorized' })
    return
  }

  try {
    switch (req.method) {
      case 'GET':
        try {
          const comments = await prisma.postComment.findMany({
            where: {
              postId: req.query.id,
            },
            orderBy: { createdAt: 'desc' },
            include: {
              user: {
                select: {
                  image: true,
                  username: true,
                  displayName: true,
                },
              },
            },
          })

          res.status(200).send({ success: true, data: comments })
        } catch (error) {
          handleErrors(error, res)
        }
        break

      case 'POST':
        try {
          const value = await createCommentSchema.validateAsync(req.body)
          const newComment = await prisma.postComment.create({
            data: {
              content: value.content,
              postId: value.postId,
              userId: token.sub,
            },
            include: {
              user: {
                select: {
                  image: true,
                  username: true,
                  displayName: true,
                },
              },
            },
          })

          res.status(200).send({ success: true, data: newComment })
        } catch (error) {
          handleErrors(error, res)
        }
        break

      case 'DELETE':
        try {
          const commentId = req.query.id
          await prisma.postComment.deleteMany({
            where: {
              id: commentId,
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
