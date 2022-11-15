import React from 'react'
import Skeleton from 'react-loading-skeleton'

interface ISkeletonWrapper {
  children: any
  isLoading: boolean
  height: number
  count?: number
  margin?: string
}

export const SkeletonWrapper = ({
  children,
  isLoading,
  height,
  count,
  margin
}: ISkeletonWrapper) => {
  return isLoading ? (
    <Skeleton
      height={height}
      borderRadius={20}
      count={count}
      style={{
        marginBottom: margin
      }}
    />
  ) : (
    children
  )
}
