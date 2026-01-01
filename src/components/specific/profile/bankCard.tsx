"use client";

import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Button, Image } from "@heroui/react";
import { useModal } from "@/hooks/useModal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { getMemberBankService } from "@/services/bank";
import { findBankWithCode } from "@/utils/helpers";

import { HiInformationCircle } from "react-icons/hi2";
import { FaPlus, FaWallet } from "react-icons/fa6";
import { MdCreditCard } from "react-icons/md";

export function BankCard() {
  const { AddBank } = useModal();
  const [banks, setBanks] = useState<Array<any>>([]);

  const init = async () => {
    const data = await getMemberBankService();
    setBanks(data);
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AddBank.state.isOpen]);

  return (
    <Card className="h-full CardBackground overflow-hidden z-50">
      <CardHeader className="p-0">
        <div className="w-full px-4 py-3 bg-linear-to-r from-red-600/70 via-red-700/25 to-transparent">
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/35 border border-white/10 backdrop-blur">
              <FaWallet className="text-yellow-300 text-sm" />
              <span className="text-sm font-semibold text-white tracking-wide">
                บัญชีธนาคาร
              </span>
              <HiInformationCircle className="text-white/70 text-lg" />
            </div>

            <Button
              onPress={AddBank.state.onOpen}
              isIconOnly
              className="Btn2 !min-w-0 w-9 h-9 rounded-md"
              aria-label="เพิ่มบัญชีธนาคาร"
            >
              <FaPlus />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardBody className="p-4">
        <div className="w-full h-full">
          <Swiper spaceBetween={14} slidesPerView={1.15} className="h-full">
            {banks.map((items: any) => {
              const bank = findBankWithCode(items.bank_code);
              if (!bank) return null;

              const isWallet = items.bank_code === "999";
              const subText = isWallet
                ? "อีวอลเล็ท (ผูกวอเลตกับเบอร์ เปลี่ยนแจ้งแอดมิน)"
                : "บัญชีธนาคาร";

              return (
                <SwiperSlide key={items.id}>
                  {/* ✅ CARD BANK: premium / casino vibe */}
                  <div className="relative overflow-hidden rounded-2xl border border-white/10">
                    {/* background gradient */}
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${bank.gradient}`}
                    />
                    {/* vignette overlay */}
                    <div className="absolute inset-0 bg-linear-to-r from-black/35 via-transparent to-black/15" />

                    <div className="pointer-events-none absolute -right-6 -top-6 w-24 h-24 opacity-25 bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:10px_10px]" />
                    <div className="pointer-events-none absolute -right-10 top-14 w-28 h-28 rounded-full bg-white/10 blur-2xl" />

                    <div className="relative p-5 sm:p-6 flex flex-col justify-between min-h-[160px]">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl bg-white/15 border border-white/15 flex items-center justify-center overflow-hidden">
                            <Image
                              src={bank.image}
                              alt="bank logo"
                              radius="sm"
                              className="w-9 h-9 object-contain"
                            />
                          </div>

                          <div className="min-w-0">
                            <div className="text-white font-bold text-lg leading-tight truncate">
                              {bank.name}
                            </div>
                            <div className="text-white/85 text-[11px] leading-snug line-clamp-2">
                              {subText}
                            </div>
                          </div>
                        </div>

                        <div className="w-9 h-9 rounded-full bg-white/15 border border-white/10 flex items-center justify-center">
                          <MdCreditCard className="text-white/90 text-lg" />
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="text-white/80 text-[11px]">เลขบัญชี</div>
                        <div className="mt-1 text-white text-lg font-mono tracking-wider">
                          {items.bank_number}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-white/85 text-[11px]">
                          ชื่อบัญชี:{" "}
                          <span className="text-white font-semibold">
                            {items.bank_name ?? "-"}
                          </span>
                        </div>

                        <div className="px-2.5 py-1 rounded-full bg-black/25 border border-white/10 text-[10px] text-white/90">
                          {isWallet ? "WALLET" : "BANK"}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </CardBody>
    </Card>
  );
}
