"use client";

import React from "react";
import { PromotionContent } from "@/containers/PromotionContent";
import { OnStartAnimate } from "@/components/OnStartAnimate";
import withAuth from "@/components/withAuth";
import { BonusAdmin } from "@/types/bonus";
import { FiInfo } from "react-icons/fi";

interface PromotionProps {
  bonus: BonusAdmin[];
}

function Client({ bonus }: PromotionProps) {
  return (
    <OnStartAnimate>
      <div className="dark min-h-screen">
        <div className="w-full mx-auto px-3 sm:px-4 md:px-6 py-6">
          {/* ===== Header / Title Bar ===== */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/25">
            <div className="absolute -inset-10 bg-linear-to-r from-red-700/50 via-red-600/10 to-transparent blur-2xl" />

            <div className="relative p-4 sm:p-5">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Title */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex gap-5">
                    <div className="w-10 h-10 rounded-xl bg-black/30 flex items-center justify-center">
                    <span className="text-white font-bold">%</span>
                  </div>

                  <div className="flex flex-col  leading-tight">
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl sm:text-2xl font-semibold text-white">
                        โปรโมชั่น
                      </h1>
                      <FiInfo className="text-white/60" />
                    </div>
                    <p className="text-xs sm:text-sm text-white/60">
                      เลือกโปรโมชั่นที่เหมาะกับคุณ แล้วกดรับได้ทันที
                    </p>
                  </div>
                  </div>

                  <div className="mt-3 flex justify-end gap-2">
                <span className="px-3 py-1 rounded-full text-[11px] text-white/70 bg-black/30 border border-white/10">
                  โบนัสฝาก
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] text-white/70 bg-black/30 border border-white/10">
                  คืนยอดเสีย
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] text-white/70 bg-black/30 border border-white/10">
                  ภารกิจ & ของรางวัล
                </span>
              </div>
                </div>

                <div className="flex items-center gap-2">
                </div>
              </div>

              <div className="mt-4 h-px w-full bg-linear-to-r from-white/10 via-white/5 to-transparent" />

              
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-3 sm:p-4">
            <PromotionContent bonus={bonus} />
          </div>
        </div>
      </div>
    </OnStartAnimate>
  );
}

export default withAuth(Client);
