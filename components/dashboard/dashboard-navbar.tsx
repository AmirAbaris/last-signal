import { getCurrentUser } from '@/api/user/get-current-user'
import ErrorMessage from '../shared/error'
import { Button } from '../ui/button'
import LogoutButton from './logout-button'

export default async function DashboardNavbar() {
  const userResponse = await getCurrentUser()

  if (!userResponse.success) {
    return <ErrorMessage message={userResponse.error?.message} />
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white px-4 py-3 flex justify-between items-center shadow-md z-50">
      <div className="text-lg font-bold">Dashboard</div>
      <div className="text-sm">{userResponse.data?.email}</div>
      <LogoutButton />
    </nav>
  )
}
