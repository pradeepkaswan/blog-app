import type { Post } from '@prisma/client'
import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/dashboard/${post.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>{post.content}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
