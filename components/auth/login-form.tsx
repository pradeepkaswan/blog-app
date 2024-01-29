'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { Input } from '@/components/ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
// import { authenticate } from '@/app/(auth)/actions'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" aria-disabled={pending}>
      Submit {pending && 'ing...'}
    </Button>
  )
}

async function authenticate(formData: FormData) {
  try {
    const signInResponse = await signIn('credentials', {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      redirect: false,
    })

    if (!signInResponse?.error || !signInResponse?.ok !== true) {
      console.error(signInResponse?.error)
    }
  } catch (error) {
    console.error(error)
  }
}

export const LoginForm = () => {
  const router = useRouter()
  const { status } = useSession()

  // const [errorMessage, dispatch] = useFormState(authenticate, undefined)

  useEffect(() => {
    if (status === 'authenticated') {
      router.refresh()
      router.push('/')
    }
  }, [status])

  return (
    <div className="grid gap-6">
      <form action={authenticate}>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              required
            />
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            required
            minLength={6}
          />

          <SubmitButton />

          {/* <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <>
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            )}
          </div> */}

          <p className="text-center mt-4 text-black underline">
            <Link href="/">Back to home</Link>
          </p>
        </div>
      </form>
    </div>
  )
}
