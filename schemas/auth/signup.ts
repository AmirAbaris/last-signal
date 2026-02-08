import { z } from 'zod'

export const signupSchema = z.object({
  email: z.email('invalid email bro'),
  password: z.string('nope, L password'),
})

export type SignupType = z.infer<typeof signupSchema>
