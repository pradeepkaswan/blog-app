'use server'

import prisma from '@/lib/db'
import bcrypt from 'bcrypt'

// import { signIn } from '@/auth'
// import { AuthError } from 'next-auth'

// server action to register a user
export async function register(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (existingUser) {
      return 'User already exists!'
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    })

    return 'User created.'
  } catch (error) {
    console.error(error)
    return 'Something went wrong.'
  }
}

// server action to authenticate a user
// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData
// ) {
//   try {
//     await signIn('credentials', formData)
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return 'Invalid credentials.'
//         default:
//           return 'Something went wrong.'
//       }
//     }
//     throw error
//   }
// }
