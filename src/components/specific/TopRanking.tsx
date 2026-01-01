"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardHeader, CardBody, Select, SelectItem } from "@heroui/react";
import { isLightColor } from "@/utils/lightColor";
import { LiveCasinoIcon } from "@/components/icon/LiveCasinoIcon";
import { SlotIcon } from "@/components/icon/SlotIcon";
import { SportIcon } from "@/components/icon/SportIcon";
import { FaRankingStar, FaTrophy } from "react-icons/fa6";
import { HiInformationCircle } from "react-icons/hi2";

export function TopRanking({ data }: { data: string[] }) {
  const [select, setSelect] = useState("EGAMES");
  const [color1, setColor1] = useState("");

  useEffect(() => {
    const navbarColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--navbar-color")
      .trim();
    setColor1(navbarColor);
  }, []);

  const isLight = useMemo(() => isLightColor(color1), [color1]);

  const getLabelFromCategory = (category: string): string => {
    switch (category.toUpperCase()) {
      case "EGAMES":
        return "สล็อต";
      case "LIVECASINO":
        return "คาสิโน";
      case "SPORT":
        return "กีฬา";
      case "POKER":
        return "ป้อกเด้ง";
      default:
        return "ไม่พอ";
    }
  };

  const getIcon = (category: string) => {
    const c = category.toUpperCase();
    if (c === "LIVECASINO") return <LiveCasinoIcon />;
    if (c === "EGAMES") return <SlotIcon />;
    return <SportIcon />;
  };

  const rankList = useMemo(() => {
    return Array.from({ length: 10 }, () => {
      const random = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
      const profit = Math.floor(Math.random() * (400000 - 50000 + 1)) + 50000;
      return { phone: `xxxxxx${random}`, profit };
    }).sort((a, b) => b.profit - a.profit);
  }, [select]);

  const rowBg = isLight ? "CardBackground_light" : "CardBackground_dark";

  const rankBadge = (idx: number) => {
    if (idx === 0)
      return "bg-linear-to-r from-yellow-300 to-amber-400 text-white shadow-[0_0_12px_rgba(245,158,11,0.35)]";
    if (idx === 1)
      return "bg-linear-to-r from-slate-200 to-slate-400 text-white shadow-[0_0_12px_rgba(148,163,184,0.30)]";
    if (idx === 2)
      return "bg-linear-to-r from-amber-600 to-orange-700 text-white shadow-[0_0_12px_rgba(217,119,6,0.25)]";
    return "bg-black/30 text-white/90 border border-white/10";
  };

  return (
    <Card
      shadow="sm"
      className={[
        "w-full overflow-hidden",
        "bg-[#120303]",
        "backdrop-blur-xl",
        "relative",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute -inset-10 bg-linear-to-tr from-[#120303]/30 via-white/3 to-transparent blur-2xl" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/6 via-transparent to-black/30" />

      <CardHeader className="relative flex items-center justify-between gap-3 p-0 rounded-sm">
      <div className="flex w-full px-3 py-2 rounded-t-md bg-linear-to-r from-black/60 via-red-600/40 to-transparent">
        <div className="inline-flex items-center gap-2 px-3 w-full py-1.5 rounded-md bg-black/30">
          <FaTrophy className="text-yellow-300 text-sm" />
          <span className="text-sm font-semibold text-white">Leaderboard</span>
          <HiInformationCircle className="text-white/70 text-lg" />
              <div className="w-[70px] sm:w-[180px] dark">
          <Select
            selectedKeys={[select]}
            size="sm"
            onChange={(e) => setSelect(e.target.value)}
            disallowEmptySelection
            className="max-w-xs"
            classNames={{
              trigger:
                "bg-black/25 border border-white/10 rounded-2xl shadow-sm hover:bg-black/35",
              value: "text-white/85",
              popoverContent: "bg-[#0B0B0B] border border-white/10",
            }}
          >
            {data.map((i) => (
              <SelectItem className="text-white" key={i}>
                {getLabelFromCategory(i)}
              </SelectItem>
            ))}
          </Select>
        </div>
        </div>

      </div>

        
      </CardHeader>

      <CardBody className="relative pt-0">
        <div className="mt-3 h-px w-full bg-linear-to-r from-white/10 via-white/5 to-transparent" />

        <div className="mt-3 flex flex-col gap-2 max-h-[296px] overflow-auto no-scrollbar pr-1">
          {rankList.map((item, index) => (
            <div
              key={index}
              className={[
                "group",
                "flex items-center justify-between gap-2",
                "p-2.5 rounded-2xl",
                "transition bg-red-900/10",
                "hover:translate-x-[2px] hover:bg-white/4",
              ].join(" ")}
            >
              <div className="w-10 flex justify-center">
                <div
                  className={[
                    "w-7 h-7 rounded-full flex items-center justify-center",
                    "text-xs font-extrabold",
                    rankBadge(index),
                  ].join(" ")}
                >
                  {index + 1}
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-semibold text-white/90 tracking-wide">
                  {item.phone}
                </div>
                <div className="text-[10px] text-white/50">ผู้เล่น</div>
              </div>

              <div className="shrink-0 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/25 border border-white/10">
                <div className="scale-[0.7]">{getIcon(select)}</div>
                <span className="text-[10px] text-white/75">
                  {getLabelFromCategory(select)}
                </span>
              </div>

              <div className="shrink-0 text-right w-[96px]">
                <div className="text-[12px] font-bold text-white/80">
                  +{item.profit.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
