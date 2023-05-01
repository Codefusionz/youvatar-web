import { isAuthenticated } from '@/helpers/auth'
import handleErrors from '@/helpers/errors'
import prisma from '@/lib/prisma'
import moment from 'moment'

export default async function handler(req, res) {
  const { date } = req.query
  const user = await isAuthenticated(req)

  if (!user) return res.redirect('/auth/login')

  switch (req.method) {
    case 'GET':
      try {
        const targetDate = new Date(date)
        targetDate.setHours(0, 0, 0, 0)

        const nextDate = new Date(targetDate)
        nextDate.setDate(nextDate.getDate() + 1)

        const data = await prisma.order.findMany({
          where: { userId: user.id },
          include: { course: true },
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
                  date: moment(lecture.lectureDate).format('LL'),
                  description: 'There is a test in the next 30 minutes',
                })
              })
            })
          })
        })

        res.status(200).json({ success: true, data: reminders })
      } catch (error) {
        handleErrors(error, res)
      }
      break
    default:
      res.status(405).json({ message: 'This request cannot be processed' })
  }
}
