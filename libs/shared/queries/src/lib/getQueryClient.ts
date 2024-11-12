import { cache } from 'react'
import { QueryClient, dehydrate } from '@tanstack/react-query'

import type { FetchQueryOptions } from '@tanstack/react-query'

export const getQueryClient = cache(() => new QueryClient())

type PrefetchQueryParams<T> = FetchQueryOptions<T>

export const prefetchQuery = async <T>(options: PrefetchQueryParams<T>) => {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(options)

  return dehydrate(queryClient)
}
