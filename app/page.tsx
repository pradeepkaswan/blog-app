import Hero from '@/components/hero'
import prisma from '@/lib/db'
import { Suspense } from 'react'
import PostCard from '@/components/post-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
// import { auth } from '@/auth'
import { PostCardSkeleton } from '@/components/skeletons/post-card-skeleton'
import { authOptions } from '@/lib/auth-options'

async function getUserPosts(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  if (!user) {
    throw new Error('User not found')
  }

  const posts = await prisma.post.findMany({
    where: {
      authorId: user.id,
    },
  })

  return posts
}

export default async function Home() {
  // const session = await auth()
  const session = await getServerSession(authOptions)

  const posts = await getUserPosts(session?.user?.email as string)

  return (
    <>
      <Hero />
      <div className="mt-4 border border-black rounded-lg flex justify-between">
        <h2 className="text-lg font-semibold m-2 pl-2">Posts</h2>
        <Link href="/create">
          <Button className="m-1" disabled={!session}>
            + New post
          </Button>
        </Link>
      </div>
      <div>
        {session ? (
          <div className="grid grid-cols-3 gap-4 mt-4">
            <Suspense fallback={<PostCardSkeleton />}>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </Suspense>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <p>You need to be logged in to see your posts.</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
