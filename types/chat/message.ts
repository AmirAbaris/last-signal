export type Message = {
  id: string
  content: string
  createdAt: string
  readAt: string | null
  senderId: string
  receiverId: string
}

export type ChatParticipant = {
  id: string
  email: string
}