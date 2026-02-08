'use server'

import { createClient } from '@/lib/supabase/server'
import { User } from '@/types/dashboard/user'
import { PaginatedResponse } from '@/types/shared/api'

export const getUsers = async (
  page = 1,
  pageSize = 10,
  excludeUserId?: string
): Promise<PaginatedResponse<User>> => {
  const supabase = await createClient()

  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, error, count } = await supabase
    .from('users')
    .select('*', { count: 'exact' })
    .range(from, to)

  if (error) {
    return {
      success: false,
      error: {
        code: error.code,
        message: error.message,
      },
    }
  }

  const filteredResult = excludeUserId
    ? data?.filter((item) => item.id !== excludeUserId)
    : data

  const total = (count ?? 0) - (excludeUserId ? 1 : 0)
  const totalPages = Math.ceil(total / pageSize)
  const hasPrevious = page > 1
  const hasNext = page < totalPages

  return {
    success: true,
    data: filteredResult,
    pagination: {
      total,
      totalPages,
      page,
      pageSize,
      hasPrevious,
      hasNext,
    },
  }
}
