"use client";

import React, { useEffect, useState } from "react";
import { FaTrophy } from "react-icons/fa6";
import { HiInformationCircle } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

type Row = {
  rank: number;
  game: string;
  userId: string;
  amount: number;
  image: string;
};

const initialRows: Row[] = [
  {
    rank: 1,
    game: "Ganesha Fortune",
    userId: "099XXXX699",
    amount: 5616,
    image: "https://cdn.zabbet.com/games/1700031307459-0e84e58f-d72c-4aea-a712-f9b944c986f6.jpg",
  },
  {
    rank: 2,
    game: "Lucky Neko",
    userId: "063XXXX599",
    amount: 2880,
    image: "https://cdn.zabbet.com/games/1700031307459-0e84e58f-d72c-4aea-a712-f9b944c986f6.jpg",
  },
  {
    rank: 3,
    game: "3 Charge Buffalo",
    userId: "061XXXX973",
    amount: 2140,
    image: "https://cdn.zabbet.com/games/1750840729683-e2bcc2b3-8ec0-4b11-b0e0-bad51c06c638.jpeg",
  },
  {
    rank: 4,
    game: "Mahjong Ways 2",
    userId: "080XXXX262",
    amount: 2025,
    image: "https://cdn.zabbet.com/games/1700033770272-4f757686-460a-4b95-a8f0-ad2dd32fc572.jpg",
  },
  {
    rank: 5,
    game: "Ganesha Fortune",
    userId: "099XXXX699",
    amount: 1692,
    image: "https://cdn.zabbet.com/games/1700031307459-0e84e58f-d72c-4aea-a712-f9b944c986f6.jpg",
  },
];

export default function LeaderboardTable() {
  const [rows, setRows] = useState<Row[]>(initialRows);

  // 🔁 DEMO: สลับที่ทุก 4 วินาที
  useEffect(() => {
    const timer = setInterval(() => {
      setRows((prev) => {
        const shuffled = [...prev];
        const i = Math.floor(Math.random() * shuffled.length);
        const j = Math.floor(Math.random() * shuffled.length);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        return shuffled;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full mt-5">
      <div className="w-full px-3 py-2 rounded-t-md bg-linear-to-r from-black/60 via-red-600/40 to-transparent">
        <div className="inline-flex items-center gap-2 px-3 w-full py-1.5 rounded-md bg-black/30">
          <FaTrophy className="text-yellow-300 text-sm" />
          <span className="text-sm font-semibold text-white">Leaderboard</span>
          <HiInformationCircle className="text-white/70 text-lg" />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto overflow-y-hidden no-scrollbar rounded-b-md">
        <table
          className="w-full text-[12px] text-white"
          style={{ backgroundColor: "rgb(18,3,3)" }}
        >
          <thead>
            <tr className="sticky top-0 z-1" style={{ backgroundColor: "rgb(18,3,3)" }}>
              <th className="px-2 py-1 text-center">ลำดับ</th>
              <th className="px-2 py-1 text-left">Game/Jackpot</th>
              <th className="px-2 py-1"></th>
              <th className="px-2 py-1"></th>
            </tr>
          </thead>

          <motion.tbody layout>
            <AnimatePresence>
              {rows.map((row, idx) => (
                <motion.tr
                  key={row.userId + row.amount}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  style={{
                    background: idx % 2 === 0 ? "#0B0202" : "#2D0607",
                  }}
                >
                  <td className="px-2 py-2">
                    <img
                      src={`https://xin88.eco/images/LeaderBoard/rank1.png`}
                      className="w-5 h-6 mx-auto"
                    />
                  </td>

                  <td className="px-2 py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg overflow-hidden">
                        <img src={row.image} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div>{row.game}</div>
                        <div className="text-[10px]">{row.userId}</div>
                        <div className="text-[10px]">
                          ชนะ{" "}
                          <span className="text-red-500 font-medium">
                            {row.amount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td></td>

                  <td className="px-2 py-2">
                    <div className="bg-black/20 rounded-md flex justify-center py-1">
                      ▶
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </motion.tbody>
        </table>
      </div>
    </div>
  );
}
