import React from "react";
import { Card, CardBody, Image, Chip } from "@heroui/react";

interface RankCardProps {
  rankImage: string;
  rankName: string;
  rewardAmount?: number;
  className?: string;
  setRank: (rank: string) => void;
}

export function RankCard({
  rankImage,
  rankName,
  rewardAmount,
  className,
  setRank,
}: RankCardProps) {
  return (
    <Card
      onPress={() => setRank(rankName)}
      isPressable
      className={`
        ${className ?? ""}
        relative overflow-hidden rounded-2xl
        bg-[#0B0B0B]
        border border-white/5
        hover:border-white/15
        transition-all duration-300
        hover:-translate-y-1 hover:scale-[1.03]
        cursor-pointer select-none
      `}
    >
      {/* subtle glow */}
      <div className="absolute inset-0 bg-linear-to-b from-white/[0.04] to-transparent pointer-events-none" />

      <CardBody className="relative py-8 flex flex-col items-center gap-3">
        {/* Rank Image */}
        <div className="relative w-24 h-24 rounded-2xl bg-black/5 border border-white/5 flex items-center justify-center">
          <Image
            src={rankImage}
            alt={rankName}
            removeWrapper
            className="w-full h-full object-contain p-3"
          />

          {/* inner shadow */}
          <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] pointer-events-none" />
        </div>

        {/* Rank Name */}
        <div className="text-lg font-semibold text-white tracking-wide">
          {rankName}
        </div>

        {/* Reward (optional) */}
        {typeof rewardAmount === "number" && (
          <Chip
            size="sm"
            className="mt-1 bg-black border border-white/10 text-white/70"
          >
            +{rewardAmount.toLocaleString()} เครดิต
          </Chip>
        )}
      </CardBody>
    </Card>
  );
}
