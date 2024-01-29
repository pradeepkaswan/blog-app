import { LoginForm } from '@/components/auth/login-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
}

export default async function LoginPage() {
  return (
    <div className="mt-24">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back.
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to Login into your account
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
