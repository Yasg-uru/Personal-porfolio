export interface Comment {
  _id: string
  userId: string
  userDetails: {
    _id: string
    email: string
    userName: string
    profileUrl: string
  }
  text: string
  likes: string[]
  dislikes: string[]
  replies: Comment[]
  createdAt: string
  updatedAt: string
}
