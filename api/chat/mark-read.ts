'use server'

import { createClient } from '@/lib/supabase/server'
import { ApiResponse } from '@/types/shared/api'
import { Message } from '@/types/chat/message'

export async function markRead(
  messageId: string
): Promise<ApiResponse<Message>> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('messages')
    .update({ read_at: new Date().toISOString() })
    .eq('id', messageId)
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
