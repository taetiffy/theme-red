import React from "react";
import { Skeleton } from "./skeleton";

export const ProviderCardSkeleton: React.FC = () => {
  return (
    <div className="relative cursor-pointer">
      <Skeleton className="w-full h-20 rounded-xl" />
    </div>
  );
};

export const CategoryButtonSkeleton: React.FC = () => {
  return (
    <Skeleton className="h-12 w-24 rounded-lg" />
  );
};

export const SwiperSkeleton: React.FC<{ count?: number; cardType?: 'provider' | 'category' }> = ({ 
  count = 7, 
  cardType = 'provider' 
}) => {
  return (
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: count }).map((_, index) => (
        <div key={`swiper-skeleton-${index}`} className="flex-shrink-0">
          {cardType === 'provider' ? (
            <ProviderCardSkeleton />
          ) : (
            <div className="relative cursor-pointer">
              <Skeleton className="w-32 h-40 rounded-xl" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export const WithdrawalCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  );
};

export const MainPageSkeleton: React.FC = () => {
  return (
    <div className="page">

      <div className="mb-8">
        <div className="flex gap-3 flex-wrap">
          {Array.from({ length: 4 }).map((_, index) => (
            <CategoryButtonSkeleton key={`category-skeleton-${index}`} />
          ))}
        </div>
      </div>

      {Array.from({ length: 3 }).map((_, sectionIndex) => (
        <div key={`section-skeleton-${sectionIndex}`} className="mb-8">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Skeleton className="w-8 h-8 rounded" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-8 w-20 rounded" />
          </div>
          
          <SwiperSkeleton count={7} cardType="category" />
        </div>
      ))}

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-6 h-6 rounded" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
        
        {/* Withdrawal Cards */}
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={`withdrawal-skeleton-${index}`} className="flex-shrink-0 w-80">
              <WithdrawalCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};