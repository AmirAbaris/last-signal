'use server'

import { createClient } from '@/lib/supabase/server'
import { ApiResponse } from '@/types/shared/api'
import { Message } from '@/types/chat/message'

export async function sendMessage(
  message: string,
  senderId: string,
  receiverId: string
): Promise<ApiResponse<Message>> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('messages')
    .insert({
      content: message,
      sender_id: senderId,
      receiver_id: receiverId,
    })
    .select()
    .single()

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
