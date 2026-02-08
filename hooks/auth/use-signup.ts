'use client'

import { signup } from '@/api/auth/signup'
import { signupSchema, SignupType } from '@/schemas/auth/signup'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const useSignup = () => {
  const [isPending, startTransition] = useTransition()
  const form = useForm<SignupType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const submitSignupForm = async (data: SignupType) => {
    startTransition(async () => {
      const result = await signup(data)

      if (result.error) {
        toast.error(result.error.message ?? 'error on signup')
        return
      }

      toast.success('sign up successful :D')
      // TODO: add redirect route
    })
  }

  return {
    isPending,
    form,
    submitSignupForm,
  }
}
