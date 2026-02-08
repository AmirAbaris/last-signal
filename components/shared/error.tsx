// components/ui/error-message.tsx
'use client'

type Props = {
  message?: string | undefined
}

export default function ErrorMessage({ message }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh">
      <div className="w-full max-w-sm mx-auto p-4 bg-red-100 text-red-800 border border-red-300 rounded-md text-center">
        {message ?? 'Something went wrong!'}
      </div>
    </div>
  )
}
