"use client";

import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Image,
} from "@heroui/react";
import { useCheckin } from "@/hooks/checkin";
import DailyInterface from "@/types/checkIn";
import { UseCustomDisclosureReturn } from "@/hooks/useCustomDisclosure";
import CommonLoading from "@/components/common/CommonLoading";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

type TargetType = {
  id: string | null;
  day: number;
  claim: boolean;
  conditionMessage?: string;
};

export default function CheckInModal({
  disclosure,
}: {
  disclosure: UseCustomDisclosureReturn;
}) {
  const [countdown, setCountdown] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = dayjs().tz("Asia/Bangkok");
      setCurrentDate(now.format("DD/MM/YYYY"));

      const nextMidnight = now.add(1, "day").startOf("day");
      const diff = nextMidnight.diff(now);
      const d = dayjs.duration(diff);

      const hours = String(d.hours()).padStart(2, "0");
      const minutes = String(d.minutes()).padStart(2, "0");
      const seconds = String(d.seconds()).padStart(2, "0");

      setCountdown(`${hours}:${minutes}:${seconds}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const { claim, data, target } = useCheckin();
  const t = target as unknown as TargetType | undefined;

  const handleCheckIn = () => {
    if (!t?.id) return;
    if (t?.claim) return;
    claim(t.id);
  };

  const statusForDay = (day: DailyInterface) => {
    if (day.claim === false && typeof t?.day === "number" && day.day < t.day) return "missed";
    if (day.id !== null && day.claim === true) return "claimed";
    if (day.id === null && day.claim === false) return "empty";
    if (typeof t?.day === "number" && day.day === t.day && !t.claim) return "today";
    return "normal";
  };

  const getRewardIcon = (day: DailyInterface) => {
    const st = statusForDay(day);

    if (st === "missed") {
      return (
        <div className="grid place-items-center w-full h-full">
          <i className="fa-solid fa-circle-xmark text-red-700 text-3xl drop-shadow" />
        </div>
      );
    }
    if (st === "claimed") {
      return (
        <div className="grid place-items-center w-full h-full">
          <i className="fa-solid fa-circle-check text-emerald-400 text-3xl drop-shadow" />
        </div>
      );
    }
    if (st === "empty") {
      return (
        <div className="grid place-items-center w-full h-full">
          <i className="fa-solid fa-circle-exclamation text-yellow-400/80 text-3xl drop-shadow" />
        </div>
      );
    }

    if (day.type === "GEMS") {
      return (
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 grid place-items-center">
          <Image
            src="icons/diamond.gif"
            alt=""
            removeWrapper
            className="w-8 h-8 object-contain"
          />
        </div>
      );
    }

    if (day.type === "CREDIT") {
      return (
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 grid place-items-center">
          <Image
            src="icons/gold.png"
            alt=""
            removeWrapper
            className="w-8 h-8 object-contain animate-[spin_6s_linear_infinite]"
          />
        </div>
      );
    }

    if (day.type === "ITEM") {
      return (
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 grid place-items-center">
          <Image
            src={(day as any).thumbnail}
            alt=""
            removeWrapper
            className="w-8 h-8 object-contain"
          />
        </div>
      );
    }

    return null;
  };

  const titleRight = useMemo(() => {
    const isClaimed = !!t?.claim;
    return (
<div className="w-full">
  <div className="text-[11px] sm:text-xs text-white/70 leading-snug">
    เช็คอินประจำวันที่{" "}
    <span className="text-white/90 font-medium">{currentDate}</span>
  </div>

  <div className="mt-2 grid grid-cols-2 xl:grid-cols-2 gap-2">
    <div className="w-full px-2 py-1 rounded-xl border border-white/10 bg-black/30 text-[11px] text-white/80 text-center">
      รีเซ็ตใน {countdown || "--:--:--"}
    </div>

    <div
      className={[
        "w-full px-2 py-1 rounded-xl border text-[11px] text-center font-medium",
        isClaimed
          ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-200"
          : "border-red-500/25 bg-red-500/10 text-red-200",
      ].join(" ")}
    >
      {isClaimed ? "รับแล้ววันนี้" : "ยังไม่ได้รับ"}
    </div>
  </div>
</div>

    );
  }, [countdown, currentDate, t?.claim]);

  if (!data || data.length <= 0) return <CommonLoading />;

  return (
    <Modal
      isOpen={disclosure.state.isOpen}
      onClose={disclosure.state.onClose}
      placement="center"
      size="2xl"
      className="ModalBackground *:text-white"
    >
      <ModalContent className="max-h-[85vh] overflow-hidden">
        {/* ===== Header ===== */}
        <ModalHeader className="p-0">
          <div className="w-full relative overflow-hidden rounded-t-2xl border-b border-white/10">
            <div className="absolute -inset-12 bg-linear-to-r from-red-900/45 via-red-600/10 to-transparent blur-2xl" />
            <div className="relative px-4 sm:px-5 py-4 flex items-start justify-between gap-4">
              <div className="xl:flex items-center gap-3 hidden">
                <div className="w-11 h-11 rounded-2xl bg-black/30 border border-white/10 grid place-items-center">
                  <i className="fa-solid fa-calendar-check text-red-700 text-lg" />
                </div>
              </div>

              {titleRight}
            </div>
          </div>
        </ModalHeader>

        {/* ===== Body ===== */}
        <ModalBody className="p-4 sm:p-5 overflow-auto">
          {/* Grid */}
          <div className="grid grid-cols-4 md:grid-cols-6 gap-2 md:gap-3 max-h-[320px] md:max-h-[420px] overflow-auto pr-1">
            {data.map((day: DailyInterface) => {
              const st = statusForDay(day);
              const isToday = st === "today";
              const isClaimed = st === "claimed";
              const isMissed = st === "missed";

              return (
                <div
                  key={day.day}
                  className={[
                    "relative rounded-2xl border p-2 md:p-3 select-none transition-transform",
                    "bg-black/25 border-white/10",
                    "hover:-translate-y-[1px]",
                    isToday ? "ring-1 ring-red-500/40 border-red-500/20" : "",
                    isClaimed ? "ring-1 ring-emerald-500/30 border-emerald-500/15" : "",
                    isMissed ? "ring-1 ring-red-500/15 border-red-500/10 opacity-80" : "",
                  ].join(" ")}
                >
                  {/* top row */}
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] text-white/70">
                      วันที่ <span className="text-white/90 font-semibold">{day.day}</span>
                    </div>

                    {isToday && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/15 border border-red-500/20 text-red-200">
                        วันนี้
                      </span>
                    )}

                    {isClaimed && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-200">
                        ✓
                      </span>
                    )}
                  </div>

                  <div className="mt-2 grid place-items-center h-[62px] md:h-[74px]">
                    {getRewardIcon(day)}
                  </div>

                  <div className="mt-2 text-[11px] text-center text-white/75 line-clamp-2">
                    {(day as any).typeMessage ?? ""}
                  </div>

                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-t from-black/30 via-transparent to-white/5 opacity-60" />
                </div>
              );
            })}
          </div>

          <div className="mt-4 sm:mt-5 rounded-2xl border border-white/10 bg-black/25 p-3 sm:p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="text-sm text-white/80">
                <div className="font-semibold">พร้อมรับของรางวัลวันนี้?</div>
                <div className="text-xs text-white/60 mt-0.5">
                  {t?.conditionMessage ?? "ทำภารกิจตามเงื่อนไขเพื่อรับรางวัล"}
                </div>
              </div>

              <div className="flex gap-2">
                {t?.claim ? (
                  <Button isDisabled size="lg" className="Btn1 min-w-[180px]">
                    เช็คอินแล้ว
                  </Button>
                ) : t?.id ? (
                  <Button size="lg" className="Btn1 min-w-[180px]" onPress={handleCheckIn}>
                    เช็คอินเพื่อรับรางวัล
                  </Button>
                ) : (
                  <Button isDisabled size="lg" className="Btn1 min-w-[180px]">
                    ไม่มีรางวัล
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-3 sm:p-4">
            <div className="text-sm font-semibold text-white/90 mb-2">สถานะเช็คอิน</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <LegendRow
                color="bg-emerald-500/20 border-emerald-500/25"
                text="วันที่เช็คอินไปแล้ว"
                mark="✓"
              />
              <LegendRow
                color="bg-red-500/20 border-red-500/25"
                text="วันที่ไม่ได้เช็คอิน (พลาด)"
                mark="✕"
              />
              <LegendRow
                color="bg-yellow-600/30 border-yellow-600/25"
                text="วันที่สามารถเช็คอินได้ (วันนี้)"
                mark=""
              />
              <LegendRow
                color="bg-red-800/20 border-red-800/25"
                text="ไม่มีรางวัลสำหรับการเช็คอิน"
                mark="!"
              />
            </div>
          </div>

          {/* Inline keyframes (ไฟล์เดียว) */}
          <style jsx global>{`
            @keyframes spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

function LegendRow({
  color,
  text,
  mark,
}: {
  color: string;
  text: string;
  mark: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={[
          "w-7 h-7 rounded-xl border grid place-items-center",
          color,
        ].join(" ")}
      >
        <span className="text-xs text-white/90 font-semibold">{mark}</span>
      </div>
      <div className="text-xs text-white/70">{text}</div>
    </div>
  );
}
