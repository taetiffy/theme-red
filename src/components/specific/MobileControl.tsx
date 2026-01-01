"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button, Image } from "@heroui/react";
import { MobileControlInventory } from "./MobileControlInventory";
import { Mission } from "@/types/mission";
import { useModal } from "@/hooks/useModal";
import { useRouter } from "next/navigation";
import { useShareStore } from "@/stores/share";
import { useFetchData } from "@/hooks/useFetchData";
import { fetchMissionService } from "@/services/mission";

export function MobileControl() {
  const { data } = useFetchData(fetchMissionService);
  const router = useRouter();
  const [missions, setMissions] = useState<Mission[]>([]);
  const { checkIn, gemReward, coupon } = useModal();

  const [isHovered, setIsHovered] = useState(false);
  const [currentClass, setCurrentClass] = useState("Btn1");

  const { state } = useShareStore();

  useEffect(() => {
    if (!data) return;
    setMissions(data);
  }, [data]);

  const claimMissionCount = missions.filter(
    (h) => h.isComplete && !(h.claimMission.length > 0)
  ).length;

  const CreateBtn = useMemo(() => {
    return state.menu.map((item) => {
      const buttonConfig: Record<string, { onPress: () => void }> = {
        "กรอกโค้ด": { onPress: coupon.state.onOpen },
        "รับเพชรฟรี": { onPress: gemReward.state.onOpen },
        "เช็คอิน": { onPress: checkIn.state.onOpen },
        "ร้านค้า": { onPress: () => router.push("/shop") },
      };

      const config = buttonConfig[item.title];
      if (!config) return null;

      return (
        <Button
          key={item.title}
          onPress={config.onPress}
          className={[
            "w-full h-[74px] rounded-2xl",
            "border border-white/5",
            "bg-black/50",
            "shadow-[0_10px_30px_rgba(0,0,0,0.45)]",
            "hover:bg-white/2",
            "transition active:scale-[0.98]",
            "flex flex-col items-center justify-center gap-1.5",
            "relative overflow-hidden",
          ].join(" ")}
        >
          <div className="pointer-events-none absolute -inset-10 bg-linear-to-tr from-red-500/14 via-transparent to-transparent blur-2xl" />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/6 via-transparent to-transparent" />

          <Image
            className="relative w-8 h-8 rounded-none object-contain opacity-95 drop-shadow-[0_0_10px_rgba(239,68,68,0.20)]"
            src={item.src}
            alt={item.title}
          />
          <span className="relative text-[11px] text-white/85">{item.title}</span>
        </Button>
      );
    });
  }, [state.menu, router, coupon.state, gemReward.state, checkIn.state]);

  return (
    <div className="my-2 flex gap-2 sm:hidden">
      {/* ===== Left: Inventory ===== */}
      <div className="flex-1 rounded-2xl bg-black/30 overflow-hidden relative">
        <div className="pointer-events-none absolute -inset-10 bg-linear-to-b from-red-500/10 via-white/2 to-transparent blur-2xl" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/6 via-transparent to-black/40" />

        <div className="relative p-3">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-red-500/10 via-transparent to-transparent" />

          <div className="relative w-full flex justify-center py-1">
            <Image
              className="w-28 h-10 rounded-none object-contain opacity-90"
              src={state.icon.backpack}
              alt="backpack"
            />
          </div>

          <div className="relative mt-2 h-[185px] overflow-auto no-scrollbar pr-1">
            <MobileControlInventory />
          </div>
        </div>
      </div>

<div className="flex-1 rounded-2xl bg-black/30 overflow-hidden relative">
  <div className="pointer-events-none absolute -inset-10 bg-linear-to-tr from-red-500/14 via-white/3 to-transparent blur-2xl" />
  <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/6 via-transparent to-black/45" />

  <div className="relative p-3 flex flex-col gap-2">
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <Button
        onPress={() => router.push("/mission")}
        className={[
          "w-full h-[86px] rounded-2xl",
          "border border-white/5",
          "bg-black/50",
          "shadow-[0_10px_30px_rgba(0,0,0,0.45)]",
          "transition active:scale-[0.985]",
          "relative overflow-hidden",
          "flex items-center justify-between gap-3 px-3",
        ].join(" ")}
      >
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-white/8 via-white/2 to-transparent" />
        <div className="pointer-events-none absolute -inset-10 bg-linear-to-tr from-red-500/18 via-transparent to-transparent blur-2xl" />

        <div className="relative flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-red-900/10 flex items-center justify-center">
            <Image
              className="w-9 h-9 rounded-none object-contain drop-shadow-[0_0_14px_rgba(239,68,68,0.25)]"
              src={state.icon.quest}
              alt="quest"
            />
          </div>

          <div className="text-left leading-tight">
            <div className="text-base font-semibold text-white/95">
              ภารกิจ
            </div>
            <div className="text-[14px] text-white/55">
              ทำภารกิจ
            </div>
          </div>
        </div>
      </Button>

      {claimMissionCount > 0 && (
        <div className="absolute -top-2 -right-2">
          <div className="rounded-full border border-red-500/25 bg-red-500/15 px-2.5 py-1 shadow-lg shadow-black/40">
            <span className="text-[10px] text-red-100 font-semibold">
              ยังไม่รับ: {claimMissionCount}
            </span>
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-full bg-red-500/20 blur-md" />
        </div>
      )}
    </div>

    <div className="grid grid-cols-2 gap-2">{CreateBtn}</div>
  </div>
</div>

    </div>
  );
}
