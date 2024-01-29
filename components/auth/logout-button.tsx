'use client'

import { signOut } from 'next-auth/react'
import { Button } from '../ui/button'

export const LogoutButton = () => {
  return (
    <Button
      onClick={() => signOut()}
      variant="outline"
      className=" text-white bg-red-400 hover:bg-red-500 hover:text-white"
    >
      Logout
    </Button>
  )
}
