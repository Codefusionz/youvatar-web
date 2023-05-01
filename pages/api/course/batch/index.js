import prisma from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'

export default async function handler(req, res) {
  const { batch } = req.query
  const token = await getToken({ req })

  if (!token) {
    res.status(401).send({ message: 'Unauthorized' })
    return
  }

  switch (req.method) {
    case 'GET':
      try {
        const mentor = await prisma.mentor.findUnique({
          where: {
            userId: token.sub,
          },
        })

        const course = await prisma.courses.findUnique({
          where: {
            id: batch,
            mentorId: mentor.id,
          },
          include: {
            batches: true,
          },
        })
        res.status(200).json(course)
      } catch (error) {
        console.log('error', error)
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(405).json({ message: 'This request cannot be processed' })
  }
}
