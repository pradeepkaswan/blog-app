import prisma from '@/lib/db'
import { PostPage } from '@/components/post-page'
import type { Post } from '@prisma/client'

type Props = {
  params: {
    id: string
  }
}

const PostsPage: React.FC<Props> = async ({ params }) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: params.id,
    },
  })

  return <PostPage post={post} />
}

export default PostsPage
