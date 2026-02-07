'use client'

import { signup } from '@/api/auth/signup'
import { Button } from '@/components/ui/button'
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
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useTransition } from 'react'
import { Spinner } from '../ui/spinner'

export default function SignupCard() {
  const [isPending, startTransition] = useTransition()

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
      <form
        action={(formData: FormData) => startTransition(() => signup(formData))}
      >
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input name="password" id="password" type="password" required />
            </div>
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
