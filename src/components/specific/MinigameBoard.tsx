"use client";

import Link from "next/link";
import React from "react";
import { FaTrophy } from "react-icons/fa6";
import { HiInformationCircle } from "react-icons/hi2";

export default function MinigameBoard() {
  return (
    <div className="w-full">
      <div className="w-full px-3 py-2 rounded-t-md bg-linear-to-r from-black/60 via-red-600/40 to-transparent">
        <div className="inline-flex items-center gap-2 px-3 w-full py-1.5 rounded-md bg-black/30">
          <FaTrophy className="text-yellow-300 text-sm" />
          <span className="text-sm font-semibold text-white">Minigames</span>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto overflow-y-hidden no-scrollbar rounded-b-md p-5 bg-[#120303]">
        <div className="grid grid-cols-3 gap-5 text-center text-sm text-white">
          <Link href="/wheel">
          <div className="badge flex flex-col items-center gap-2 p-3 bg-black/40 rounded-md">
            <img src="https://cdn.zabbet.com/KPFM/lobby_settings/1766329980701-f8feafee-f63c-4cac-8982-a935cb58b6d4.gif" alt="" />
            <span>กงล้อ</span>
          </div>
          </Link>
          <Link href="/mission">
          <div className="badge flex flex-col items-center gap-2 p-3 bg-black/40 rounded-md">
            <img src="https://cdn.zabbet.com/KPFM/lobby_settings/1766332185701-9e72f5b9-391b-45eb-8597-2df7ddb50f37.gif" alt="" />
            <span>ทำภารกิจ</span>
          </div>
          </Link>
          <Link href="/randombox">
          <div className="badge flex flex-col items-center gap-2 p-3 bg-black/40 rounded-md">
            <img src="https://cdn.zabbet.com/KPFM/lobby_settings/1766332185701-9e72f5b9-391b-45eb-8597-2df7ddb50f37.gif" alt="" />
            <span>กล่องสุ่ม</span>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
