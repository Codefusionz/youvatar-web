import handleErrors from '@/helpers/errors'
import prisma from '@/lib/prisma'
import { createPostSchema } from '@/schema/post'
import { getToken } from 'next-auth/jwt'

export default async function handler(req, res) {
  const token = await getToken({ req })

  if (!token) {
    res.status(401).send({ message: 'Unauthorized' })
    return
  }

  switch (req.method) {
    case 'GET':
      try {
        const posts = await prisma.post.findMany({
          orderBy: { createdAt: 'desc' },
          include: {
            likes: true,
            comments: true,
            author: {
              select: {
                image: true,
                username: true,
                displayName: true,
              },
            },
          },
        })

        res.status(200).send({ success: true, data: posts })
      } catch (error) {
        handleErrors(error, res)
      }
      break

    case 'POST':
      try {
        const value = await createPostSchema.validateAsync(req.body)
        const newPost = await prisma.post.create({
          data: {
            content: value.content,
            image: value.image,
            authorId: token.sub,
            courseId: value.courseId,
          },
          include: {
            likes: true,
            comments: true,
          },
        })

        res.status(200).send({ success: true, data: newPost })
      } catch (error) {
        handleErrors(error, res)
      }
      break

    case 'DELETE':
      try {
        const postId = req.query.id
        await prisma.post.delete({
          where: {
            id: postId,
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
}
