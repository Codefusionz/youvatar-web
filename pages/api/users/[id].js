import prisma from '@/lib/prisma'
import { updateProfileSchema } from '@/schema/user'
import { getToken } from 'next-auth/jwt'

export default async function (req, res) {
  const token = await getToken({ req })

  if (!token) {
    res.status(401).send({ message: 'Unauthorized' })
    return
  }
  switch (req.method) {
    case 'GET':
      try {
        const user = await prisma.user.findUnique({
          where: { id: token.sub },
        })
        delete user.password
        res.status(200).send(user)
        break
      } catch (err) {
        return res.status(503).send({ message: 'Something went wrong' })
      }

    case 'PATCH':
      try {
        const value = await updateProfileSchema.validateAsync(req.body)
        await prisma.user.update({
          where: { id: token.sub },
          data: value,
        })
        res.status(200).send({ success: true })
        break
      } catch (err) {
        console.log(err)
        return res.status(503).send({ message: 'Something went wrong' })
      }

    default:
      res.status(405).json({ message: 'This request cannot be processed' })
  }
}
