import { hashPassword } from '@/helpers/password'
import prisma from '@/lib/prisma'
import { passwordSchema } from '@/schema/user'
import joi from 'joi'

export default async function (req, res) {
  try {
    const value = await passwordSchema.validateAsync(req.body)
    let field = 'email'
    if (value.phone) field = 'phone'

    switch (req.method) {
      case 'POST':
        const user = await prisma.user.findUnique({
          where: { [field]: value[field] },
        })
        if (!user) {
          res.status(200).send({ message: 'User not found' })
        }
        const hash = await hashPassword(value.password)
        await prisma.user.update({
          where: { id: user.id },
          data: { password: hash },
        })
        res.status(200).send({ success: true })
        break
      default:
        res.status(405).json({ message: 'This request cannot be processed' })
    }
  } catch (err) {
    console.log(err)
    if (err instanceof joi.ValidationError) {
      res.status(400).send({ message: err.message })
      return
    }
    res.status(401).send({ message: 'Something went wrong' })
  }
}
