import { comparePassword } from '@/helpers/password'
import prisma from '@/lib/prisma'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

let userAccount = null

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
        credentials.username = credentials.username.toLowerCase()
        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        })
        if (!user) return false
        const isValid = await comparePassword(
          credentials.password,
          user.password
        )
        if (!isValid) return false
        delete user.password
        userAccount = user
        return user
      },
    }),
  ],
  callbacks: {
    async signIn(user) {
      return user.user
    },
    async session({ session, token, user }) {
      return token
    },
    async jwt({ token, user }) {
      return token
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
})
