// This file contains type definitions for the data recieved from the database.
// For simplicity ,manually defining these types.
// However, these types are generated automatically if using an ORM such as Prisma.

export type User = {
  id: string
  name: string
  email: string
  password: string
}

export type Post = {
  id: string
  title: string
  content: string
  author_id: string
  created_at: string
}

export type Comment = {
  id: string
  content: string
  post_id: string
  user_id: string
}
