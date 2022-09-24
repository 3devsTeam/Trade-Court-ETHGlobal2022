import React from "react";
import Skeleton from "react-loading-skeleton";

interface ISkeletonWrapper {
  children: any;
  isLoaded: boolean;
  height: number;
}

export const SkeletonWrapper = ({
  children,
  isLoaded,
  height,
}: ISkeletonWrapper) => {
  return isLoaded ? children : <Skeleton height={height} borderRadius={20} />;
};
