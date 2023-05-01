import prisma from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'

export default async function handler(req, res) {
  const { date, end } = req.query
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

        const targetDate = new Date(date)
        targetDate.setHours(0, 0, 0, 0)

        const nextDate = new Date(end || date)
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

        let reminders = []
        courses.map((course) => {
          course.batches.map((batch, batchIndex) => {
            batch.modules.map((module) => {
              module.lectures.map((lecture) => {
                reminders.push({
                  type: 'class',
                  title: `${course.title} - Batch ${batchIndex + 1}`,
                  time: batch.timeSlot,
                  students: batch.numberOfStudents,
                  duration: course.classDuration,
                  date: lecture.lectureDate,
                  description: 'There is a test in the next 30 minutes',
                })
              })
            })
          })
        })

        res.status(200).json({ success: true, data: reminders })
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(405).json({ message: 'This request cannot be processed' })
  }
}
