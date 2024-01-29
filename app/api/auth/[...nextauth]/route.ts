// NextAuth v5 *beta*
// export { GET, POST } from '@/auth'

// NextAuth v4
import NextAuth from 'next-auth/next'
import { authOptions } from '@/lib/auth-options'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
