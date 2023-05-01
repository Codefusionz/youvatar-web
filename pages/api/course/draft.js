import prisma from '@/lib/prisma'
import { draftCourseSchema } from '@/schema/course'
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
        if (req.query.id) {
          const draft = await prisma.draft.findUnique({
            where: { id: req.query.id },
          })
          res.status(200).json({ success: true, data: draft })
          return
        }
        const drafts = await prisma.draft.findMany({
          where: { userId: token.sub },
        })
        res.status(200).json({ success: true, data: drafts })
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false })
      }
      break

    case 'POST':
      try {
        const value = await draftCourseSchema.validateAsync(req.body)
        const draft = await prisma.draft.create({
          data: { ...value, userId: token.sub },
        })
        res.status(201).json({ success: true, data: draft })
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false })
      }
      break

    case 'PATCH':
      try {
        const value = await draftCourseSchema.validateAsync(req.body)
        const draft = await prisma.draft.update({
          where: { id: req.query.id },
          data: { ...value },
        })
        res.status(200).json({ success: true, data: draft })
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE':
      try {
        const draft = await prisma.draft.delete({
          where: { id: req.query.id },
        })
        res.status(200).json({ success: true, data: draft })
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(405).json({ message: 'This request cannot be processed' })
  }
}
