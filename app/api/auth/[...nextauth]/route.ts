// NextAuth v5 *beta*
// export { GET, POST } from '@/auth'

// NextAuth v4

import { Account, AuthOptions, Session, User, Profile } from 'next-auth'
import CrendentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/lib/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT } from 'next-auth/jwt'
import NextAuth from 'next-auth/next'

export const authOptions: AuthOptions = {
  providers: [
    CrendentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        })

        if (!user) {
          return null
        }

        const passwordValid = await bcrypt.compare(
          credentials?.password as string,
          user.hashedPassword
        )

        if (passwordValid) {
          // return {
          //   id: user.id,
          //   name: user.name,
          //   email: user.email,
          // }

          return user
        } else {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    async encode({ secret, token }) {
      if (!token) {
        throw new Error('No token to encode')
      }
      return jwt.sign(token, secret)
    },
    async decode({ secret, token }) {
      if (!token) {
        throw new Error('No token to decode')
      }
      const decodedToken = jwt.verify(token, secret)
      if (typeof decodedToken === 'string') {
        return JSON.parse(decodedToken)
      } else {
        return decodedToken
      }
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30days
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async session(params: { session: Session; token: JWT; user: User }) {
      if (params.session.user) {
        params.session.user.email = params.token.email
      }
      return params.session
    },
    async jwt(params: {
      token: JWT
      user?: User | undefined
      account?: Account | null | undefined
      profile?: Profile | undefined
      isNewUser?: boolean | undefined
    }) {
      if (params.user) {
        params.token.email = params.user.email
      }
      return params.token
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
