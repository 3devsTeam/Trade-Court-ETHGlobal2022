import React from 'react'
import Skeleton from 'react-loading-skeleton'

interface ISkeletonWrapper {
  children: any
  isLoaded: boolean
  height: number
  count?: number
  margin?: string
}

export const SkeletonWrapper = ({
  children,
  isLoaded,
  height,
  count,
  margin
}: ISkeletonWrapper) => {
  return isLoaded ? (
    children
  ) : (
    <Skeleton
      height={height}
      borderRadius={20}
      count={count}
      style={{
        marginBottom: margin
      }}
    />
  )
}
