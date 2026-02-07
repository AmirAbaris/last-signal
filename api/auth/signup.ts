'use server'

import { createClient } from '@/lib/supabase/server'
import { ApiResponse } from '@/types/shared/api'

export const signup = async (formData: FormData): Promise<void> => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()

  const { data } = await supabase.auth.signUp({ email, password })
  console.log({ data })
}
