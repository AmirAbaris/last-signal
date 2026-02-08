import { getUsers } from '@/api/user/get-users'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '../ui/button'
import { PaginatedResponse } from '@/types/shared/api'
import { User } from '@/types/dashboard/user'
import DashboardPaginationControl from './dashboard-pagination-control'
import ErrorMessage from '../shared/error'
import { getCurrentUser } from '@/api/user/get-current-user'

type Props = {
  inputPage: string | string[] | undefined
  inputPageSize: string | string[] | undefined
}

export default async function UserList(props: Props) {
  const { inputPage, inputPageSize } = props
  const page = Number(inputPage ?? 1)
  const pageSize = Number(inputPageSize ?? 10)

  const currentUserResponse = await getCurrentUser()
  const usersResponse: PaginatedResponse<User> = await getUsers(
    page,
    pageSize,
    currentUserResponse.data?.id
  )

  if (!usersResponse.success) {
    return <ErrorMessage message={usersResponse.error?.message} />
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh">
      <Table className="max-w-sm w-full mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {usersResponse.data && usersResponse.data.length > 0 ? (
            usersResponse.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.email}</TableCell>

                <TableCell className="text-right">
                  <Button variant="outline">Chat</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} className="text-center">
                No users found!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DashboardPaginationControl
        page={page}
        totalPages={usersResponse.pagination?.totalPages}
        pageSize={pageSize}
      />
    </div>
  )
}
