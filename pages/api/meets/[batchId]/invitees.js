import { isAuthenticated } from '@/helpers/auth'
import handleErrors from '@/helpers/errors'
import prisma from '@/lib/prisma'
import jsonwebtoken from 'jsonwebtoken'
import moment from 'moment'

export default async function (req, res) {
  const user = await isAuthenticated(req)
  const { batchId, lecture } = req.query

  if (!user) return res.redirect('/auth/login')

  switch (req.method) {
    case 'GET':
      try {
        const lectureDetails = await prisma.lectures.findFirst({
          where: { id: lecture },
          select: { lectureDate: true, isFinished: true, title: true },
        })

        const batchDetails = await prisma.batches.findUnique({
          where: { id: batchId },
          select: { courseId: true, timeSlot: true },
        })

        const courseDetails = await prisma.courses.findUnique({
          where: { id: batchDetails.courseId },
          select: { title: true, mentorId: true, classDuration: true },
        })

        const mentor = await prisma.mentor.findUnique({
          where: { id: courseDetails.mentorId },
          select: { userId: true },
        })

        const data = await prisma.order.findFirst({
          where: {
            AND: {
              userId: user.id,
              batchId: batchId,
            },
          },
        })

        if (user.id !== mentor.userId && !data) {
          throw new Error('You are not enrolled in this course')
        }

        const now = moment()
        const lectureDateTime = moment(
          `${lectureDetails.lectureDate} ${batchDetails.timeSlot}`,
          'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z) h:mm A'
        )
        const durationInMinutes = courseDetails.classDuration
        const lectureEndTime = moment(lectureDateTime).add(
          durationInMinutes,
          'minutes'
        )

        if (!now.isBetween(lectureDateTime, lectureEndTime)) {
          throw new Error('Cannot start class')
        }

        const config = {
          context: {
            user: {
              avatar: user.image,
              name: user.username,
              email: user.email,
              id: user.id,
            },
          },
          aud: 'Youvatar Meet',
          iss: 'youvatar-meet',
          sub: 'Youvatar Meet',
          room: lecture,
          role: 'moderator',
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        }

        const token = jsonwebtoken.sign(config, process.env.NEXTAUTH_SECRET)

        res.status(200).send({
          success: true,
          title: lectureDetails.title,
          token: mentor.userId === user.id ? token : null,
          lectureEndTime: lectureEndTime.format('YYYY-MM-DD HH:mm:ss'),
        })
        break
      } catch (err) {
        console.log(err)
        handleErrors(err, res)
      }
      break

    default:
      res.status(405).json({ message: 'This request cannot be processed' })
  }
}
