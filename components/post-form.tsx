'use client'

import { createPost } from '@/app/(dashboard)/dashboard/actions'
import { Input } from '@/components/ui/input'
import { useRef, useState } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { useFormStatus } from 'react-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Label } from '@radix-ui/react-label'
import Link from 'next/link'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" aria-disabled={pending}>
      Submit {pending && 'ing...'}
    </Button>
  )
}

type Props = {}

export default function PostForm() {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create New Post</CardTitle>
        <CardDescription>Fill the inputs to create a new post</CardDescription>
      </CardHeader>
      <form ref={formRef} action={createPost}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" type="text" name="title" required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" name="content" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/">
            <Button variant="outline">Cancel</Button>
          </Link>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  )
}
