import { isAuthenticated } from '@/helpers/auth'
import handleErrors from '@/helpers/errors'
import prisma from '@/lib/prisma'

export default async function handler(req, res) {
  const user = await isAuthenticated(req)

  if (!user) return res.redirect('/auth/login')
  const courseId = req.query.id

  switch (req.method) {
    case 'GET':
      try {
        let isPurchased = false
        const course = await prisma.courses.findUnique({
          where: { id: courseId },
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
            mentor: {
              include: {
                user: {
                  select: {
                    id: true,
                    displayName: true,
                    username: true,
                    email: true,
                    image: true,
                  },
                },
              },
            },
          },
        })
        const order = await prisma.order.findUnique({
          where: {
            userId_courseId: { userId: user.id, courseId: courseId },
          },
        })

        if (order) isPurchased = true

        res
          .status(200)
          .json({ success: true, data: course, isPurchased: isPurchased })
      } catch (error) {
        handleErrors(error, res)
      }

      break

    default:
      break
  }
}
