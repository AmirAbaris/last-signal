'use server'

import { createClient } from '@/lib/supabase/server'

export const signup = async (formData: FormData): Promise<void> => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()

  // TODO: improve error handling
  const { data } = await supabase.auth.signUp({ email, password })

  if (data.user) {
    await supabase.from('users').insert({
      id: data.user.id,
      email: data.user.email,
    })
  }
}
