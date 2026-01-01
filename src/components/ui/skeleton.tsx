import React from "react";

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse bg-gray-300 dark:bg-gray-700 rounded ${className}`}
    />
  );
};

export const GameCardSkeleton: React.FC = () => {
  return (
    <div className="relative hover:scale-110 transition-all cursor-pointer">
      {/* Image skeleton */}
      <Skeleton className="w-30 md:w-50 h-40 md:h-60 rounded-xl" />

      {/* Gradient overlay skeleton - matching the original design */}
      <div className="absolute z-20 bottom-0 w-full h-1/2 bg-linear-to-t from-gray-500 to-transparent rounded-b-xl opacity-30" />

      {/* Title skeleton - positioned like the original */}
      <div className="absolute z-21 bottom-6 w-full text-center px-2">
        <Skeleton className="h-4 w-3/4 mx-auto" />
      </div>
    </div>
  );
};

export const GamesGridSkeleton: React.FC<{ count?: number }> = ({ count = 12 }) => {
  return (
    <div className="page-landing grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
      {Array.from({ length: count }).map((_, index) => (
        <GameCardSkeleton key={`skeleton-${index}`} />
      ))}
    </div>
  );
};
