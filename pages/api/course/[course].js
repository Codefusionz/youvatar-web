import prisma from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'

export default async function handler(req, res) {
  const { course } = req.query
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

        const data = await prisma.courses.findMany({
          where: {
            id: course,
            mentorId: mentor.id,
          },
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
        })
        res.status(200).json({
          success: true,
          data: data[0],
        })
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(405).json({ message: 'This request cannot be processed' })
  }
}
