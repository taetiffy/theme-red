import { motion } from "framer-motion";
import { Skeleton } from "@heroui/react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export function MissionLoading({ size = "md", text = "Loading..." }: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <motion.div
        className={`${sizeClasses[size]} border-2 border-gray-300 border-t-blue-500 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      {text && (
        <motion.p
          className="text-gray-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}

export function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-2 h-auto overflow-auto">
      <div className="flex gap-4">
        {/* ShowCard skeleton */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="hidden md:flex flex-4"
        >
          <Skeleton className="w-full h-96 rounded-lg" />
        </motion.div>

        {/* Sidebar skeleton */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-3 xl:flex-2"
        >
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-lg" />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}