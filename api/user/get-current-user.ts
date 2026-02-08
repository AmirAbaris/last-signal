'use server'

import { createClient } from '@/lib/supabase/server'
import { ApiResponse } from '@/types/shared/api'
import { User } from '@supabase/supabase-js'

export const getCurrentUser = async (): Promise<ApiResponse<User | null>> => {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

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
    data: data.user,
  }
}
