import prisma from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'

export const isAuthenticated = async (req) => {
  const token = await getToken({ req })

  if (!token) return false

  const user = await prisma.user.findUnique({
    where: { id: token.sub },
  })

  if (!user) return

  return user
}
