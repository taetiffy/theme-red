import React from "react";
import { Card, CardBody, Image, Progress, Divider } from "@heroui/react";

interface Reward {
  commission: number;
  commissionSlot: number;
  loss: number;
  lossSlot: number;
}

interface CardSelectedProps {
  rankImage: string;
  rankName: string;
  rewardAmount?: Reward;
  className?: string;
  setRank: (rank: string) => void;
  nowExp?: number;
  maxExp?: number;
}

export function CardSelected({
  rankImage,
  rankName,
  rewardAmount,
  className,
  setRank,
  nowExp = 0,
  maxExp = 0,
}: CardSelectedProps) {
  const percent =
    maxExp > 0 ? Math.min(100, Math.max(0, (nowExp / maxExp) * 100)) : 0;

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
        hover:-translate-y-1 hover:scale-[1.02]
        select-none
      `}
    >
      <div className="absolute inset-0 bg-linear-to-b from-white/[0.04] to-transparent pointer-events-none" />

      <CardBody className="relative py-8 px-6">
        <div className="flex flex-col items-center gap-4">
          <div className="w-28 h-28 rounded-2xl bg-black border border-white/5 flex items-center justify-center">
            <Image
              src={rankImage}
              alt={rankName}
              removeWrapper
              className="w-full h-full object-contain p-3"
            />
          </div>

          <div className="text-xl font-semibold text-white tracking-wide">
            {rankName}
          </div>

          <div className="w-full mt-2">
            <Progress
              label="เลเวล"
              value={percent}
              showValueLabel
              valueLabel={
                <span className="text-white/80 text-xs tabular-nums">
                  {nowExp}/{maxExp}
                </span>
              }
              classNames={{
                track: "bg-white/10",
                indicator: "bg-white",
                label: "text-white/60",
                value: "text-white/70",
              }}
            />
          </div>

          <Divider className="my-3 bg-white/10" />

          <div className="w-full grid grid-cols-2 gap-3 text-sm text-white/80">
            <RewardRow
              label="คืนยอดเสีย Casino"
              value={`${rewardAmount?.loss ?? 1}%`}
            />
            <RewardRow
              label="คืนยอดเสีย Slot"
              value={`${rewardAmount?.lossSlot ?? 1}%`}
            />
            <RewardRow
              label="ค่าคอม Casino"
              value={`${rewardAmount?.commission ?? 1}%`}
            />
            <RewardRow
              label="ค่าคอม Slot"
              value={`${rewardAmount?.commissionSlot ?? 1}%`}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

/* ===== Reward row ===== */
function RewardRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col rounded-lg bg-black/20 border border-white/5 p-3">
      <span className="text-[11px] text-white/50">{label}</span>
      <span className="font-semibold text-white tabular-nums">{value}</span>
    </div>
  );
}
