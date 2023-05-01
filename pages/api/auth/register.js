import prisma from '@/lib/prisma'
import { registerUserSchema } from '@/schema/user'
import bcrypt from 'bcrypt'

export default async (req, res) => {
  try {
    switch (req.method) {
      case 'GET':
        const user = await prisma.user.findUnique({
          where: {
            username: req.query?.username,
          },
        })
        if (!user) {
          res.status(200).send({ message: 'username is available' })
        } else {
          res.status(401).send({ message: 'username already taken' })
        }

        break
      case 'POST':
        const value = await registerUserSchema.validateAsync(req.body)

        const hash = await bcrypt.hash(value.password, 10)
        await prisma.user.create({
          data: {
            username: value.username,
            password: hash,
            [value.source]: value[value.source],
            displayName: value.displayName,
            dateOfBirth: value.dateOfBirth,
          },
        })
        res.status(200).send({ success: true })
        break

      default:
        res.status(405).json({ message: 'This request cannot be processed' })
    }
  } catch (err) {
    console.log(err)
    res.status(401).send({ message: 'Something went wrong' })
  }
}
