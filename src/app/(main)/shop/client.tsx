"use client";

import React from "react";
import { Button, Tabs, Tab } from "@heroui/react";
import { RewardContent } from "@/containers/shop/RewardContent";
import { CreditContent } from "@/containers/shop/CreditContent";
import { OnStartAnimate } from "@/components/OnStartAnimate";
import { useModal } from "@/hooks/useModal";
import withAuth from "@/components/withAuth";
import { FiInfo } from "react-icons/fi";
import { FaStore } from "react-icons/fa6";
import { HiOutlineClock } from "react-icons/hi2";

function Client() {
  const { shopHistory } = useModal();

  return (
    <OnStartAnimate>
      <div className="dark min-h-screen">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 flex flex-col gap-4">
          {/* ===== Header ===== */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/25">
            <div className="absolute -inset-12 bg-linear-to-r from-red-900/45 via-red-600/10 to-transparent blur-2xl pointer-events-none" />

            <div className="relative p-4 sm:p-5">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Left: Title */}
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-black/30 border border-white/10 flex items-center justify-center">
                    <FaStore className="text-red-200 text-lg" />
                  </div>

                  <div className="flex flex-col leading-tight">
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl sm:text-2xl font-semibold text-white">
                        ร้านค้า
                      </h1>
                      <FiInfo className="text-white/60" />
                    </div>
                    <p className="text-xs sm:text-sm text-white/60">
                      แลกของรางวัล/เครดิตได้ทันที และดูประวัติการแลกย้อนหลัง
                    </p>
                  </div>
                </div>

                {/* Right: Action */}
                <Button
                  onPress={shopHistory.state.onOpen}
                  className="Btn1"
                  size="sm"
                  startContent={<HiOutlineClock className="text-white/90 text-lg" />}
                >
                  ประวัติการแลก
                </Button>
              </div>

          </div>
          </div>

          {/* ===== Tabs Container ===== */}
          <div className="rounded-2xl border border-white/10 bg-black/20 p-3 sm:p-4">
            <Tabs
              aria-label="Shop tabs"
              variant="underlined"
              color="warning"
              className="w-full"
              classNames={{
                tabList:
                  "gap-6 border-b border-white/10 bg-black/20 rounded-xl px-2 py-2",
                cursor:
                  "bg-linear-to-r from-red-600/80 via-red-500/60 to-transparent h-[2px]",
                tab:
                  "h-10 px-3 rounded-lg data-[hover=true]:bg-white/5 transition",
                tabContent:
                  "text-sm text-white/70 group-data-[selected=true]:text-white font-medium",
                panel: "pt-4",
              }}
            >
              <Tab
                key="rewards"
                title={
                  <div className="flex items-center gap-2">
                    <span>แลกของรางวัล</span>
                  </div>
                }
              >
                <div className="rounded-2xl border border-white/10 bg-black/20 p-3 sm:p-4">
                  <RewardContent />
                </div>
              </Tab>

              <Tab
                key="credit"
                title={
                  <div className="flex items-center gap-2">
                    <span>แลกเครดิต</span>
                  </div>
                }
              >
                <div className="rounded-2xl border border-white/10 bg-black/20 p-3 sm:p-4">
                  <CreditContent />
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </OnStartAnimate>
  );
}

export default withAuth(Client);
