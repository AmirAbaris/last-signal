// hooks/useLogin.ts
'use client'

import { login } from '@/api/auth/login'
import { loginSchema, LoginType } from '@/schemas/auth/login'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const useLogin = () => {
  const [isPending, startTransition] = useTransition()

  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const submitLoginForm = async (data: LoginType) => {
    startTransition(async () => {
      const result = await login(data)

      if (result.error) {
        toast.error(result.error.message ?? 'Login failed')
        return
      }

      toast.success('welcome bro')
      // TODO: redirect user after login
    })
  }

  return {
    isPending,
    form,
    submitLoginForm,
  }
}
