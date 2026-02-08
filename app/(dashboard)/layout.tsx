import DashboardNavbar from '@/components/dashboard/dashboard-navbar'
import { ReactNode, Suspense } from 'react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense>
        <DashboardNavbar />
      </Suspense>
      {children}
    </>
  )
}
