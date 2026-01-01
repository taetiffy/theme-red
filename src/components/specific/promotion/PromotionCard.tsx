"use client";

import React, { useMemo } from "react";
import { Card, CardBody, CardFooter, Button, Image, Chip } from "@heroui/react";
import { toast } from "sonner";
import { BonusAdmin } from "@/types/bonus";
import { ReceiveUserBonusService } from "@/services/bonus";
import { useModal } from "@/hooks/useModal";

interface PromotionCardProps {
  bonus: BonusAdmin;
}

export function PromotionCard({ bonus }: PromotionCardProps) {
  const detailHtml = useMemo(() => ({ __html: bonus.detail ?? "" }), [bonus.detail]);
  const { promotionDetail } = useModal();

  const handleGetPromotion = () => {
    toast.promise(ReceiveUserBonusService(bonus.id), {
      loading: "กำลังดำเนินการ...",
      success: (data) =>
        (data as unknown as { message?: string }).message ?? "ดำเนินการสำเร็จ",
      error: (data) =>
        (data as unknown as { message?: string }).message ??
        "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งในภายหลัง",
    });
  };

  const handlerOpenMissionDetail = () => {
    // ปลอดภัยกว่า: setData ทีเดียว (ถ้าของคุณเป็นแบบ setData)
    // แต่เพื่อไม่ทำให้ระบบเดิมพัง จะคงการ assign แบบเดิมไว้
    promotionDetail.data.bonus_img = bonus?.bonus_img;
    promotionDetail.data.detail = bonus?.detail;
    promotionDetail.data.name = bonus?.name;
    promotionDetail.data.status = bonus?.status;

    promotionDetail.state.onOpen?.();
  };

  const statusText =
    bonus?.status === "ACTIVE"
      ? "พร้อมรับ"
      : bonus?.status === "INACTIVE"
      ? "ปิดรับ"
      : bonus?.status === "EXPIRE"
      ? "หมดเขต"
      : bonus?.status
      ? String(bonus.status)
      : "โปรโมชั่น";

  const statusClass =
    bonus?.status === "ACTIVE"
      ? "bg-emerald-500/15 text-emerald-200 border-emerald-500/20"
      : bonus?.status === "EXPIRE"
      ? "bg-amber-500/15 text-amber-200 border-amber-500/20"
      : "bg-white/10 text-white/70 border-white/10";

  const canReceive = bonus?.status === "ACTIVE" || bonus?.status === true;

  return (
    <Card className="bg-black/25 border border-white/10 rounded-2xl overflow-hidden">
      <CardBody className="p-0">
        {/* ===== image hero ===== */}
        <div className="relative w-full">
          <Image
            src={bonus.bonus_img}
            alt={bonus?.name ?? "Promotion"}
            removeWrapper
            className="w-full aspect-video object-cover"
          />

          {/* overlays */}
          <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />
          <div className="absolute -inset-8 bg-linear-to-r from-red-900/25 via-red-600/10 to-transparent blur-2xl pointer-events-none" />

          {/* badge */}
          <div className="absolute top-3 left-3">
            <Chip
              size="sm"
              className={`border ${statusClass} backdrop-blur`}
            >
              {statusText}
            </Chip>
          </div>
        </div>

        {/* ===== content ===== */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[15px] sm:text-base font-semibold text-(--text-color) truncate">
                {bonus?.name ?? "โปรโมชั่น"}
              </div>

              {/* detail (2 lines) */}
              <div
                className="mt-1 text-xs sm:text-sm text-white/70 line-clamp-2"
                dangerouslySetInnerHTML={detailHtml}
              />
            </div>

            {/* small icon block */}
            <div className="hidden sm:flex shrink-0 w-10 h-10 rounded-xl border border-white/10 bg-black/30 items-center justify-center">
              <span className="text-white/80 font-bold">%</span>
            </div>
          </div>
        </div>
      </CardBody>

      <CardFooter className="p-4 pt-0">
        <div className="w-full grid grid-cols-2 gap-2">
          <Button
            className="Btn2 w-full"
            onPress={handleGetPromotion}
            isDisabled={!canReceive}
          >
            รับโปรโมชั่น
          </Button>

          <Button className="Btn1 w-full" onPress={handlerOpenMissionDetail}>
            ดูเพิ่มเติม
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
