import NextAuth from 'next-auth'
import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { loginUser } from '@/src/utils/loginUser'

const prisma = new PrismaClient()

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const user = await loginUser({ ...credentials })

        if (user) {
          return user
        } else {
          return null
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token, user }) {
      // @ts-ignore
      session.user.role = user?.role ? user.role : token.user.role
      // @ts-ignore
      session.user.id = user?.id ? user.id : token.user.id
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return Promise.resolve(token)
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
