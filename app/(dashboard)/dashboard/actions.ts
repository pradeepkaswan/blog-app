'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'

// utility function to get user id from session.user.email
async function getUserId() {
  const session = await getServerSession(authOptions)

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  })

  if (!user) {
    throw new Error('User not found')
  }

  return user.id
}

// server action to create a post
export async function createPost(postData: FormData) {
  const title = postData.get('title') as string
  const content = postData.get('content') as string
  console.log('title', title)

  const userId = await getUserId()

  const post = await prisma.post.create({
    data: {
      title,
      content,
      author: {
        connect: {
          id: userId,
        },
      },
    },
  })

  revalidatePath('/dashboard')
}

// export async function updatePost({
//   postData,
//   postId,
// }: {
//   postData: FormData
//   postId: string
// }) {
//   try {
//     const post = await prisma.post.update({
//       where: {
//         id: postId,
//       },
//       data: {
//         title: postData.get('title'),
//         content: postData.get('content'),
//       },
//     })

//     return { message: `Updated post ${post.title}` }
//   } catch (error) {
//     return { message: 'Failed to update post' }
//   }
// }

export async function deletePost({ postId }: { postId: string }) {
  try {
    if (!postId) {
      return { message: 'Not found' }
    }

    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
      },
    })

    revalidatePath('/dashboard')

    return { message: `Deleted post ${postId}` }
  } catch (error) {
    return { message: 'Failed to delete post' }
  }
}

// export async function addComment({ commentData }: { commentData: FormData }) {
//   try {
//     const comment = await prisma.comment.create({
//       data: {
//         content: commentData.get('content'),
//         postId: commentData.get('postId'),
//       },
//     })

//     return { message: `Added comment ${comment.id}` }
//   } catch (error) {
//     return { message: 'Failed to add comment' }
//   }
// }

export async function deleteComment({ commentId }: { commentId: string }) {
  try {
    const comment = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    })

    return { message: `Deleted comment ${comment.id}` }
  } catch (error) {
    return { message: 'Failed to delete comment' }
  }
}

export async function likePost({ postId }: { postId: string }) {
  try {
    const id = await getUserId()

    const likedPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        likes: true,
      },
    })

    if (!likedPost) {
      return { message: 'Post not found' }
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: {
          create: {
            userId: id,
          },
        },
      },
    })

    return { message: `Liked post "${likedPost.title}"` }
  } catch (error) {
    return { message: 'Failed to like post' }
  }
}

// export async function unlikePost({ postId }: { postId: string }) {
//   try {
//     const post = await prisma.post.update({
//       where: {
//         id: postId,
//       },
//       data: {
//         likes: {
//           decrement: 1,
//         },
//       },
//     })

//     return { message: `Unliked post ${post.title}` }
//   } catch (error) {
//     return { message: 'Failed to unlike post' }
//   }
// }
