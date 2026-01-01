"use client";

import React, { useState } from "react";

const MESSAGE =
  "ยินดีต้อนรับเข้าสู่ Xin88 คาสิโนออนไลน์ อันดับ 1 ครบจบในเว็บเดียว สล็อต บาคาร่า คาสิโน บอล หวย มีให้เลือกเล่นมากกว่า 4,000 เกม ให้บริการตลอด 24 ชั่วโมง เว็บตรง ลิขสิทธิ์แท้ คืนค่าคอม ยอดเสียทุกวันจันทร์ จัดโปรโมชั่นจำนวนมาก";

export default function MarqueeAnnouncement() {
  const [paused, setPaused] = useState(false);

  return (
    <div className="w-full h-10 flex items-center overflow-hidden rounded-md border border-red-500 bg-black/30">
      <div className="px-2 shrink-0 flex items-center">
        <img
          src="https://cdn.zabbet.com/_INIT/lobby_settings/festival_theme_christmas/v2_dt_s1/announce_icon.webp"
          className="w-4 h-4"
          alt="announce"
        />
      </div>

      <div
        className="relative flex-1 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className={`marquee-track ${paused ? "paused" : ""}`}>
          <span className="marquee-item">{MESSAGE}</span>
          <span className="marquee-item">{MESSAGE}</span>
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          min-width: 200%;
          animation: marquee 28s linear infinite;
        }

        .marquee-item {
          padding-right: 2rem;
          font-size: 0.875rem; /* text-sm */
          color: rgba(255, 255, 255, 0.9);
        }

        /* tailwind responsive: text-xs -> text-sm */
        @media (max-width: 639px) {
          .marquee-item {
            font-size: 0.75rem; /* text-xs */
          }
        }

        .paused {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
