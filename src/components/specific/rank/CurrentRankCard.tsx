"use client";

import React, { useEffect, useMemo, useState } from "react";
import { NowRankCard } from "./NowRankCard";
import { RankCard } from "./RankCard";
import { CardSelected } from "./CardSelected";
import { useShareStore } from "@/stores/share";
import { useMemberStore } from "@/stores/member";

interface RankType {
  img: string;
  name: string;
  start: number;
  end: number;

  // extra fields (คุณมีอยู่แล้วใน rankList)
  commission?: number;
  commissionSlot?: number;
  loss?: number;
  lossSlot?: number;
}

const DEFAULT_RANK: RankType = {
  name: "MEMBER",
  img: "/img/ranks/1.png",
  start: 0,
  end: 0,
};

export function CurrentRankCard() {
  const { member: user, rank, isAuthenticated } = useMemberStore();
  const {
    state: { rank: rankList },
  } = useShareStore();

  const [selectedRank, setSelectedRank] = useState<string>(DEFAULT_RANK.name);

  const userCurrentRank = useMemo(() => {
    if (!isAuthenticated) return DEFAULT_RANK;

    const lv = Number(rank?.level ?? 0);
    return (
      (rankList as RankType[])?.find((item) => item.start <= lv && item.end >= lv) ??
      DEFAULT_RANK
    );
  }, [rank?.level, isAuthenticated, rankList]);

  useEffect(() => {
    setSelectedRank(userCurrentRank.name);
  }, [userCurrentRank.name]);

  const selectedRankData = useMemo(() => {
    return (rankList as RankType[])?.find((item) => item.name === selectedRank) ?? userCurrentRank;
  }, [rankList, selectedRank, userCurrentRank]);

  if (!user) return null;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-8 flex flex-col gap-4">
          <NowRankCard />

          <div className="rounded-2xl border border-white/10 bg-black/20 overflow-hidden">
            <div className="relative p-4">
              <div className="absolute inset-0 bg-linear-to-r from-white/6 via-white/[0.02] to-transparent pointer-events-none" />
              <div className="relative flex items-center justify-between gap-3">
                <div>
                  <div className="text-white font-semibold text-base">
                    เลือกแรงก์
                  </div>
                  <div className="text-white/50 text-xs">
                    แตะเพื่อดูสิทธิประโยชน์ของแรงก์นั้น
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full text-[11px] bg-black/40 border border-white/10 text-white/70">
                  เลือกอยู่: <span className="text-white">{selectedRank}</span>
                </div>
              </div>

              <div className="mt-4 h-px bg-linear-to-r from-white/10 via-white/5 to-transparent" />
            </div>

            <div className="p-3 sm:p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                {(rankList as RankType[]).map((r, index) => {
                  const isActive = r.name === selectedRank;

                  return (
                    <RankCard
                      key={`${r.name}-${index}`}
                      rankImage={r.img}
                      rankName={r.name}
                      setRank={setSelectedRank}
                      className={`
                        ${isActive ? "ring-2 ring-white/20" : "ring-0"}
                        ${isActive ? "bg-[#0B0B0B] border border-white/15" : ""}
                      `}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-4">
          <div className="xl:sticky xl:top-6">
            <div className="rounded-2xl border border-white/10 bg-black/20 overflow-hidden">
              <div className="relative p-4">
                <div className="absolute inset-0 bg-linear-to-r from-white/6 via-white/[0.02] to-transparent pointer-events-none" />
                <div className="relative">
                  <div className="text-white font-semibold text-base">
                    รายละเอียดแรงก์
                  </div>
                  <div className="text-white/50 text-xs">
                    โบนัส / คืนยอดเสีย / ค่าคอมมิชชั่น
                  </div>
                </div>

                <div className="mt-4 h-px bg-linear-to-r from-white/10 via-white/5 to-transparent" />
              </div>

              <div className="p-3 sm:p-4">
                {selectedRankData ? (
                  <CardSelected
                    className="bg-transparent border-0 shadow-none"
                    rankImage={selectedRankData.img}
                    rankName={selectedRankData.name}
                    setRank={setSelectedRank}
                    nowExp={Number(rank?.level ?? 0)}
                    maxExp={Number(selectedRankData.end ?? 0)}
                    rewardAmount={{
                      commission: Number(selectedRankData.commission ?? 1),
                      commissionSlot: Number(selectedRankData.commissionSlot ?? 1),
                      loss: Number(selectedRankData.loss ?? 1),
                      lossSlot: Number(selectedRankData.lossSlot ?? 1),
                    }}
                  />
                ) : (
                  <div className="text-white/60 text-sm">
                    ไม่พบข้อมูลแรงก์
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3 text-[11px] text-white/40 px-1">
              * เคล็ดลับ: เลือกแรงก์ด้านซ้ายเพื่อดูสิทธิประโยชน์
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
