import PostCard from '@/components/post-card'
import { Suspense } from 'react'
import prisma from '@/lib/db'
// import { auth } from '@/auth'
import { PostCardSkeleton } from '@/components/skeletons/post-card-skeleton'

async function getAllPosts() {
  const posts = await prisma.post.findMany()
  return posts
}

export default async function DashboardPage() {
  // const session = await auth()
  const posts = await getAllPosts()

  return (
    <div>
      <h2 className="text-lg font-semibold p-2 rounded-md">Public Feed</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<PostCardSkeleton />}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Suspense>
      </div>
    </div>
  )
}
