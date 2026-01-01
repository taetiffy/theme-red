"use client";

import React, { useMemo, useState } from "react";
import { Card, CardBody, CardHeader, Avatar, Button } from "@heroui/react";
import { useModal } from "@/hooks/useModal";
import { useMemberStore } from "@/stores/member";
import { HiInformationCircle } from "react-icons/hi2";
import { FaTrophy } from "react-icons/fa6";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export function ProfileCard() {
  const { resetPass } = useModal();
  const { member: user, rank } = useMemberStore();
  const [hide, setHide] = useState(true);

  const maskedPass = useMemo(() => {
    const p = user?.text_password || "";
    return p ? "•".repeat(Math.min(10, p.length)) : "********";
  }, [user?.text_password]);

  return (
    <Card className="h-full CardBackground overflow-hidden">
      <CardHeader className="p-0">
        <div className="w-full px-4 py-3 bg-linear-to-r from-red-700/70 via-red-700/25 to-transparent">
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/35 border border-white/10 backdrop-blur">
              <FaTrophy className="text-yellow-300 text-sm" />
              <span className="text-sm font-semibold text-white tracking-wide">
                โปรไฟล์สมาชิก
              </span>
              <HiInformationCircle className="text-white/70 text-lg" />
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 border border-white/10">
              <span className="text-[11px] text-white/70">EXP</span>
              <span className="text-[11px] font-semibold text-white">
                {rank?.exp?.toLocaleString?.() ?? "-"}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardBody className="px-5 py-5 space-y-4">
        {/* ✅ TOP SECTION: Avatar + Name + Chips */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-linear-to-br from-red-600/60 to-orange-500/30 blur-sm" />
            <Avatar className="relative w-20 h-20" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-(--text-color) text-xl font-semibold truncate">
              {user?.username ?? "—"}
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] bg-black/30 border border-white/10 text-white/80">
                เบอร์: <b className="text-white">{user?.phone ?? "-"}</b>
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] bg-black/30 border border-white/10 text-white/80">
                EXP: <b className="text-white">{rank?.exp ?? "-"}</b>
              </span>
            </div>
          </div>
        </div>

        {/* ✅ INFO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Password */}
          <div className="rounded-xl bg-black/25 border border-white/10 p-3">
            <div className="text-[11px] text-white/60 mb-1">รหัสผ่าน</div>

            <button
              type="button"
              onClick={() => setHide((v) => !v)}
              className="w-full flex items-center justify-between gap-2"
            >
              <span className="text-(--text-color) text-sm">
                {hide ? maskedPass : user?.text_password ?? "-"}
              </span>
              <span className="text-white/60">
                {hide ? <IoMdEye className="text-lg" /> : <IoMdEyeOff className="text-lg" />}
              </span>
            </button>

            <div className="mt-2 text-[10px] text-white/40">
              คลิกเพื่อ {hide ? "แสดง" : "ซ่อน"}
            </div>
          </div>

           <div className="rounded-xl bg-black/25 border border-white/10 p-3">
            <div className="text-[11px] text-white/60 mb-1">ประสบการณ์ (EXP)</div>
            <div className="text-(--text-color) text-sm font-medium">
              {rank?.exp?.toLocaleString?.() ?? "-"}
            </div>
             <div className="mt-2 h-2 rounded bg-[#212121] overflow-hidden">
              <div className="h-full w-2/3 bg-red-800" />
            </div>
        </div>

          <div className="rounded-xl bg-black/25 border border-white/10 p-3">
            <div className="text-[11px] text-white/60 mb-1">เบอร์โทร</div>
            <div className="text-(--text-color) text-sm font-medium">
              {user?.phone ?? "-"}
            </div>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          <Button onPress={resetPass.state.onOpen} className="Btn2 w-full">
            เปลี่ยนรหัสผ่าน
          </Button>
          <Button isDisabled className="Btn1 w-full">
            เปลี่ยนกรอบ
          </Button>
        </div>
        </div>
      </CardBody>
    </Card>
  );
}
