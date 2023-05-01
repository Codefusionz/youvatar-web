import { isAuthenticated } from '@/helpers/auth'
import handleErrors from '@/helpers/errors'
import prisma from '@/lib/prisma'
import { mentorSchema } from '@/schema/mentor'

export default async function (req, res) {
  const user = await isAuthenticated(req)

  if (!user) return res.redirect('/auth/login')

  try {
    switch (req.method) {
      case 'POST':
        const value = await mentorSchema.validateAsync(req.body)
        await prisma.mentor.create({
          data: { ...value, user: { connect: { id: user.id } } },
        })
        res.status(200).send({ success: true })
        break

      case 'GET':
        const mentor = await prisma.mentor.findUnique({
          where: { userId: user.id },
        })

        if (!mentor) {
          res.status(404).send({ message: 'Mentor not found' })
          return
        }
        res.status(200).send({ success: true, data: mentor })
        break

      default:
        res.status(405).json({ message: 'This request cannot be processed' })
    }
  } catch (err) {
    handleErrors(err, res)
  }
}
