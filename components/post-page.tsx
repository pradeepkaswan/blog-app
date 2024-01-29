'use client'

import { likePost } from '@/app/(dashboard)/dashboard/actions'
import { Button } from './ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from './ui/card'
import type { Post } from '@prisma/client'

type Props = {
  post: Post
}

export const PostPage: React.FC<Props> = ({ post }) => {
  const id = post.id

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>{post.content}</CardDescription>
        </CardHeader>

        <CardFooter className="gap-2">
          <Button>Like</Button>
          <Button>Comment</Button>
        </CardFooter>
      </Card>
    </>
  )
}
