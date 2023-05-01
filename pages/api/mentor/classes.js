import prisma from '@/lib/prisma'
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
        const mentor = await prisma.mentor.findUnique({
          where: {
            userId: token.sub,
          },
        })

        const targetDate = new Date()
        targetDate.setHours(0, 0, 0, 0)

        const nextDate = new Date(targetDate)
        nextDate.setDate(nextDate.getDate() + 1)

        const courses = await prisma.courses.findMany({
          where: {
            mentorId: mentor.id,
          },
          include: {
            batches: {
              include: {
                modules: {
                  include: {
                    lectures: {
                      where: {
                        lectureDate: {
                          gte: targetDate,
                          lt: nextDate,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        })

        let lectures = []
        courses.map((course) => {
          course.batches.map((batch, batchIndex) => {
            batch.modules.map((module) => {
              module.lectures.map((lecture) => {
                lectures.push({
                  ...lecture,
                  courseTitle: course.title,
                  time: batch.timeSlot,
                  batchId: batchIndex + 1,
                  students: batch.numberOfStudents,
                  duration: course.classDuration,
                  meetId: batch.id,
                })
              })
            })
          })
        })

        res.status(200).json({ success: true, data: lectures })
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(405).json({ message: 'This request cannot be processed' })
  }
}
