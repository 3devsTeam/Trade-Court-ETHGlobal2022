import { useInfiniteQuery } from '@tanstack/react-query'
import { useCallback, useRef } from 'react'
import { OfferService } from '../api/offer.services'
import { IActiveFilters } from '../pages/Home'

export const useInfiniteOffers = (activeFilters: IActiveFilters, limit?: number) => {
  const { data, fetchNextPage, status, error, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
    ['offers', activeFilters],
    ({ pageParam = 1 }) => OfferService.getAll(pageParam, limit, activeFilters),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined
      },
      refetchOnMount: true
    }
  )

  const observer = useRef<any>()

  const lastItemRef = useCallback(
    (ref: any) => {
      if (isFetchingNextPage) return

      if (observer.current) {
        observer.current.disconnect()
      }

      observer.current = new IntersectionObserver((observer) => {
        if (observer[0].isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      })

      if (ref) {
        observer.current!.observe(ref)
      }
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  )

  return { data, status, error, lastItemRef, hasNextPage, isFetchingNextPage }
}
