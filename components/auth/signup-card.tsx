'use client'

import { signup } from '@/api/auth/signup'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Spinner } from '../ui/spinner'
import z from 'zod'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { useSignup } from '@/hooks/auth/use-signup'

export default function SignupCard() {
  const { isPending, form, submitSignupForm } = useSignup()

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create a new account</CardTitle>
        <CardDescription>Enter your email below</CardDescription>
        <CardAction>
          <Link href={'/login'}>
            <Button variant="link">Login</Button>
          </Link>
        </CardAction>
      </CardHeader>

      <form onSubmit={form.handleSubmit(submitSignupForm)}>
        <CardContent>
          <div className="flex flex-col gap-6">
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                      {...field}
                      placeholder="you@example.com"
                      type="email"
                    />
                    {fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <FieldGroup>
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Password</FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter password"
                    />
                    {fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2 mt-6">
          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? <Spinner /> : 'Sign up'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
