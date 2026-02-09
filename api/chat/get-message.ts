import 'server-only'
import { createClient } from '@/lib/supabase/server'
import { ApiResponse } from '@/types/shared/api'
import { Message } from '@/types/chat/message'

export async function getMessages(
  senderId: string,
  receiverId: string
): Promise<ApiResponse<Message[]>> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('sender_id', senderId)
    .eq('receiver_id', receiverId)
    .order('created_at', { ascending: true })
    .limit(100)

  if (error) {
    return {
      success: false,
      error: {
        code: error.code,
        message: error.message,
      },
    }
  }

  return {
    success: true,
    data,
  }
}
