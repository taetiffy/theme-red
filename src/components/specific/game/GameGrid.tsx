"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { top10Game } from "@/types/games";
import { BasicObjectEncoder } from "@/utils/crypto";

interface GameGridProps {
  games: top10Game[];
  onToggleFavorite: (gameId: string) => void;
}

export function GameGrid({ games, onToggleFavorite }: GameGridProps) {
  const router = useRouter();

  const handleClick = (to: string) => router.push(to);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
      {games.map((game) => {
        const href = `/play/${BasicObjectEncoder.encodeBase64ForUrl({
          productId: game.provider.product_id,
          gameCode: game.code,
          name: game.name,
        })}`;

        return (
          <button
            type="button"
            key={game.id}
            onClick={() => handleClick(href)}
            className="group relative text-left rounded-2xl border border-white/10 bg-[#0B0B0B] overflow-hidden
                       transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.99]"
          >
            {/* soft highlight */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/6 via-transparent to-black/40" />
            {/* inner glow */}
            <div className="pointer-events-none absolute -inset-10 bg-linear-to-tr from-white/[0.05] via-transparent to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* HOT badge */}
            <div className="absolute top-2 left-2 z-10 flex items-center gap-1 rounded-full bg-black/60 border border-white/10 px-2 py-1">
              <img src="/icons/Fire.gif" alt="hot" className="w-4 h-4" />
              <span className="text-[10px] text-white/80">HOT</span>
            </div>

            {/* Favorite (optional) - ไม่เปลี่ยน behavior เดิม แต่เตรียมไว้ให้ */}
            {/* 
            <div className="absolute top-2 right-2 z-10">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(String(game.id));
                }}
                className="w-9 h-9 rounded-full bg-black/60 border border-white/10 text-white/80
                           hover:bg-white/10 transition flex items-center justify-center"
                aria-label="favorite"
              >
                ♥
              </button>
            </div>
            */}

            <div className="relative w-full aspect-3/4">
              <img
  src={game.img_old}
  alt={game.name}
  className="w-full h-full object-cover"
/>


              <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/80 to-transparent" />
            </div>

            <div className="relative p-3">
              <div className="text-[12px] sm:text-[13px] font-semibold text-white line-clamp-2 leading-snug">
                {game.name}
              </div>

              <div className="mt-1 flex items-center justify-between">
                <span className="text-[10px] text-white/50 truncate max-w-[70%]">
                  {game.provider?.product_id ?? ""}
                </span>
                <span className="text-[10px] text-white/60 group-hover:text-white/80 transition">
                  เล่นเลย →
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
