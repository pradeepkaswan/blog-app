'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { Input } from '@/components/ui/input'
import { register } from '@/app/(auth)/actions'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" aria-disabled={pending} disabled={pending}>
      Submit {pending && 'ing...'}
    </Button>
  )
}

export const RegisterForm = () => {
  const [message, dispatch] = useFormState(register, undefined)

  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      router.refresh()
      router.push('/')
    }
  }, [status])

  return (
    <div className="grid gap-6">
      <form action={dispatch}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Input
              name="name"
              type="text"
              placeholder="Enter your Name"
              required
            />

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

          <div
            className="flex h-8 items-center space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {message && (
              <>
                <p className="text-sm text-blue-500">{message}</p>
              </>
            )}
          </div>

          <p className="text-center mt-4 text-black underline">
            <Link href="/">Back to home</Link>
          </p>
        </div>
      </form>
    </div>
  )
}
