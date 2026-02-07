'use server'

import { createClient } from '@/lib/supabase/server'

export const login = async (formData: FormData): Promise<void> => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()

  await supabase.auth.signInWithPassword({ email, password })
}
