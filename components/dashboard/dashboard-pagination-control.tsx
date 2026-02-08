import { Button } from '../ui/button'
import Link from 'next/link'

type Props = {
  page: number | undefined
  totalPages: number | undefined
  pageSize: number | undefined
}

export default function DashboardPaginationControl({
  page,
  totalPages,
  pageSize,
}: Props) {
  if (!totalPages || !page || !pageSize) return null

  return (
    <div className="flex gap-2 justify-center mt-4 flex-wrap">
      <Button disabled={page <= 1}>
        <Link href={`?page=${page - 1}&pageSize=${pageSize}`}>Prev</Link>
      </Button>

      <p className="mx-2">{page}</p>

      <Button disabled={page >= totalPages}>
        <Link href={`?page=${page + 1}&pageSize=${pageSize}`}>Next</Link>
      </Button>
    </div>
  )
}
