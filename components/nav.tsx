'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { LogoutButton } from './auth/logout-button'
import { Suspense, useState } from 'react'
import { PostCardSkeleton } from './skeletons/post-card-skeleton'

export default function Nav() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <div className="flex p-4 mx-2 w-full bg-slate-100">
      <div className="flex flex-row space-x-2 ">
        <div className="flex flex-row space-x-2 ">
          <Link href="/">
            <Button
              variant="outline"
              className={clsx(' w-full', {
                'border-black': pathname === '/',
              })}
            >
              Home
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              variant="outline"
              className={clsx('w-full', {
                'border-black': pathname === '/dashboard',
              })}
            >
              Dashboard
            </Button>
          </Link>
        </div>
        <div className="flex flex-row space-x-2 text-black ">
          {session ? (
            <div className="flex flex-row">
              <LogoutButton />
              <p className="ml-4 outline-dotted rounded p-2 ">
                {session?.user?.name}
              </p>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="outline"
                  className={clsx(' w-full', {
                    'border-black': pathname === '/login',
                  })}
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  variant="outline"
                  className={clsx('w-full', {
                    'border-black': pathname === '/register',
                  })}
                >
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
