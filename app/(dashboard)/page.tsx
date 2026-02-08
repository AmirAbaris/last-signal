import UserList from '@/components/dashboard/user-list'
import { Spinner } from '@/components/ui/spinner'
import { Suspense } from 'react'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default function DashboardData({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-dvh">
          <Spinner className="size-12" />
        </div>
      }
    >
      <UserListWrapper searchParams={searchParams} />
    </Suspense>
  )
}

async function UserListWrapper({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { page, pageSize } = await searchParams

  return (
    <UserList
      inputPage={page?.toString() || '1'}
      inputPageSize={pageSize?.toString() ?? '10'}
    />
  )
}
