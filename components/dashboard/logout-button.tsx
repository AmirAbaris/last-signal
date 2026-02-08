'use client'

import { startTransition } from 'react'
import { Button } from '../ui/button'
import { signOut } from '@/api/user/signout'

export default function LogoutButton() {
  return (
    <Button
      variant="destructive"
      onClick={() => startTransition(() => signOut())}
    >
      Logout
    </Button>
  )
}
