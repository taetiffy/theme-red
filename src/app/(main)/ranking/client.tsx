"use client";

import React from "react";
import { Button, Image } from "@heroui/react";
import { OnStartAnimate } from "@/components/OnStartAnimate";
import { CurrentRankCard } from "@/components/specific/rank/CurrentRankCard";
import withAuth from "@/components/withAuth";
import { useShareStore } from "@/stores/share";
import { FiInfo } from "react-icons/fi";
import { FaTrophy, FaUser } from "react-icons/fa6";

function Client() {
  const { state } = useShareStore();

  return (
    <OnStartAnimate>
      <div className="dark min-h-screen">
        <div className="w-full mx-auto px-3 sm:px-4 md:px-6 py-6">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/25">
            <div className="absolute -inset-10 bg-linear-to-r from-red-800/50 via-black/20 to-transparent blur-2xl" />

            <div className="relative p-4 sm:p-5">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0B0B0B]/40 border border-white/10 flex items-center justify-center">
                    <span className="text-white font-bold">
                      <FaUser />
                    </span>
                  </div>

                  <div className="flex flex-col leading-tight">
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl sm:text-2xl font-semibold text-white">
                        Ranking
                      </h1>
                      <FiInfo className="text-white/50" />
                    </div>
                    <p className="text-xs sm:text-sm text-white/60">
                      ดูแรงก์ปัจจุบัน และความคืบหน้า EXP ของคุณ
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    isIconOnly
                    size="sm"
                    radius="full"
                    className="bg-white/10 border border-white/10 text-white hover:bg-white/15"
                    aria-label="Ranking info"
                  >
                    <FiInfo />
                  </Button>
                </div>
              </div>

              <div className="mt-4 h-px w-full bg-linear-to-r from-white/10 via-white/5 to-transparent" />
  
            </div>
          </div>

          {state?.icon?.rank ? (
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B0B]">
              <div className="relative">
                <Image
                  src={state.icon.rank}
                  alt="rank banner"
                  removeWrapper
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
              </div>
            </div>
          ) : null}

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-3 sm:p-4">
            <CurrentRankCard />
          </div>
        </div>
      </div>
    </OnStartAnimate>
  );
}

export default withAuth(Client);
