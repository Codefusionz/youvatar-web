import { isAuthenticated } from '@/helpers/auth'
import handleErrors from '@/helpers/errors'
import prisma from '@/lib/prisma'

export default async function handler(req, res) {
  const user = await isAuthenticated(req)

  switch (req.method) {
    case 'GET':
      try {
        const targetDate = new Date()
        targetDate.setHours(0, 0, 0, 0)

        const nextDate = new Date(targetDate)
        nextDate.setDate(nextDate.getDate() + 1)

        const data = await prisma.order.findMany({
          where: {
            userId: user.id,
          },
        })

        const courses = []

        await Promise.all(
          data.map(async (order) => {
            const course = await prisma.courses.findUnique({
              where: { id: order.courseId },
              include: {
                batches: {
                  where: { id: order.batchId },
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
            courses.push(course)
          })
        )

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
        handleErrors(error, res)
      }
      break
    default:
      res.status(405).json({ message: 'This request cannot be processed' })
  }
}
