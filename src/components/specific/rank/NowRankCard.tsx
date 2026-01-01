"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Progress, Image, Chip } from "@heroui/react";
import { useMemberStore } from "@/stores/member";
import { useShareStore } from "@/stores/share";

type RankType = {
  img: string;
  name: string;
  start: number;
  end: number;
};

export function NowRankCard() {
  const { member: user, rank, isAuthenticated } = useMemberStore();
  const {
    state: { rank: rankList },
  } = useShareStore();

  const [ranking, setRanking] = useState<RankType>({
    name: "MEMBER",
    img: "/img/ranks/1.png",
    start: 0,
    end: 25,
  });

  useEffect(() => {
    if (!user || !isAuthenticated) return;

    const lv = Number(rank?.level ?? 0);
    const found = (rankList as RankType[])?.find(
      (item) => item.start <= lv && item.end >= lv
    );
    if (found) setRanking(found);
  }, [user, isAuthenticated, rank?.level, rankList]);

  if (!user) return null;

  const exp = Number(rank?.exp ?? 0);
  const total = Math.max(Number(rank?.total ?? 0), 1);
  const remain = Math.max(0, total - exp);

  const percent = useMemo(
    () => Math.min(100, Math.max(0, (exp / total) * 100)),
    [exp, total]
  );

  return (
    <div className="relative rounded-2xl bg-[#0B0B0B] border border-white/5">
      <div className="absolute inset-0 rounded-2xl bg-linear-to-b from-white/[0.03] to-transparent pointer-events-none" />

      <div className="relative p-4 sm:p-5">
        {/* ===== Header ===== */}
        <div className="flex justify-between items-start">
          <div>
            <div className="text-lg font-semibold text-white">เลเวลปัจจุบัน</div>
            <div className="text-xs text-white/50">สะสม EXP เพื่อเลื่อนแรงก์</div>
          </div>

          <div className="text-right">
            <div className="text-[11px] text-white/40">LEVEL</div>
            <div className="text-3xl font-bold text-white tabular-nums">
              LV. {rank?.level ?? 0}
            </div>
          </div>
        </div>

        {/* ===== Content ===== */}
        <div className="mt-4 flex flex-col md:flex-row gap-4">
          {/* Rank Card */}
          <div className="md:w-[200px] w-full">
            <div className="rounded-xl bg-[#0F0F0F] border border-white/5 p-4 flex md:flex-col flex-row items-center gap-4">
              <div className="w-20 h-20 rounded-xl bg-[#0B0B0B] border border-white/5 flex items-center justify-center">
                <Image
                  src={ranking.img}
                  alt={ranking.name}
                  removeWrapper
                  className="w-full h-full object-contain p-2"
                />
              </div>

              <div className="flex-1 md:flex-none text-center">
                <div className="text-xs text-white/40">แรงก์</div>
                <div className="text-base font-semibold text-white">{ranking.name}</div>

                <div className="mt-2 flex flex-wrap gap-2">
                  <Chip
                    size="sm"
                    className="bg-[#0B0B0B] border border-white/10 text-white/60 px-10"
                  >
                    {ranking.start} – {ranking.end}
                  </Chip>
                </div>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="flex-1">
            <div className="rounded-xl bg-[#0F0F0F] border border-white/5 p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-white">ความคืบหน้า</span>
                <span className="text-xs text-white/50 tabular-nums">
                  {exp} / {total} EXP
                </span>
              </div>

              <Progress
                value={percent}
                showValueLabel
                valueLabel={`${percent.toFixed(0)}%`}
                label={ranking.name}
                className="mt-3"
                classNames={{
                  track: "bg-white/10",
                  indicator: "bg-red-700",
                  label: "text-white/50",
                  value: "text-white/70",
                }}
              />

              {/* Stats + Progress (เพิ่มให้ตรงนี้ตามที่ขอ) */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                <StatBox
                  label="EXP ปัจจุบัน"
                  value={exp}
                  progress={percent}
                  accent="red"
                />
                <StatBox
                  label="EXP รวม"
                  value={total}
                  progress={100}
                  accent="white"
                />
                <StatBox
                  label="เหลืออีก"
                  value={remain}
                  // ยิ่งเหลือน้อย แถบยิ่งเต็ม (ใกล้ถึง)
                  progress={Math.min(100, Math.max(0, ((total - remain) / total) * 100))}
                  accent="red"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Small stat card (เพิ่ม progress ในกล่อง) ===== */
function StatBox({
  label,
  value,
  progress,
  accent = "red",
}: {
  label: string;
  value: number;
  progress: number;
  accent?: "red" | "white";
}) {
  const indicator = accent === "white" ? "bg-white/80" : "bg-red-700";

  return (
    <div className="rounded-lg bg-[#0B0B0B] border border-white/5 p-3">
      <div className="text-[11px] text-white/60">{label}</div>

      <div className="mt-0.5 text-sm font-semibold text-white tabular-nums">
        {value}
      </div>

      <div className="mt-2 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${indicator}`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>

      <div className="mt-1 text-[10px] text-white/40 text-right tabular-nums">
        {Math.round(progress)}%
      </div>
    </div>
  );
}
