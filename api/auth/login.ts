'use server'

import { createClient } from '@/lib/supabase/server'
import { loginSchema, LoginType } from '@/schemas/auth/login'
import { ApiResponse } from '@/types/shared/api'

export const login = async (inputData: LoginType): Promise<ApiResponse> => {
  const isValidInputData = loginSchema.safeParse(inputData)

  if (!isValidInputData) {
    return {
      success: false,
      error: {
        code: '400',
        message: 'input is not valid bro, come on man',
      },
    }
  }

  const supabase = await createClient()

  const { email, password } = inputData

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return {
      success: false,
      error: {
        code: error.code,
        message: error.message,
      },
    }
  }

  if (data.user) {
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('id', data.user.id)
      .limit(1)
      .maybeSingle()

    if (!existing) {
      await supabase.from('users').insert({
        id: data.user.id,
        email: data.user.email ?? '',
      })
    }
  }

  return {
    success: true,
    data,
  }
}
