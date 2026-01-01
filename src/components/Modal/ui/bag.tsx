"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button, Image, Popover, PopoverTrigger, PopoverContent, Chip, Divider } from "@heroui/react";
import { InventoryType, useMemberStore } from "@/stores/member";
import { useRouter } from "next/navigation";
import { UseCustomDisclosureReturn } from "@/hooks/useCustomDisclosure";
import { useClaimReward } from "@/hooks/claimreward";
import { useModal } from "@/hooks/useModal";
import { FiInfo, FiX, FiPackage } from "react-icons/fi";
import { FaDice, FaGift } from "react-icons/fa6";

export default function BackpackModal({ disclosure }: { disclosure: UseCustomDisclosureReturn }) {
  const { inventory } = useMemberStore();
  const router = useRouter();
  const { rewardsome } = useClaimReward();
  const { drawerMenu } = useModal();

  const inv = useMemo(() => (Array.isArray(inventory) ? inventory : []), [inventory]);
  const invCount = inv.length;

  const handleClose = useCallback(() => {
    drawerMenu.state.onClose?.();
    disclosure.state.onClose?.();
  }, [drawerMenu.state, disclosure.state]);

  const handleSpinPage = useCallback(() => {
    router.push("/wheel");
    handleClose();
  }, [router, handleClose]);

  const handleRamdomBox = useCallback(() => {
    router.push("/randombox");
    handleClose();
  }, [router, handleClose]);

  // responsive columns: md=6, mobile=5
  const [cols, setCols] = useState<number>(() =>
    typeof window !== "undefined" ? (window.innerWidth >= 768 ? 6 : 5) : 5
  );

  useEffect(() => {
    const getCols = () => (window.innerWidth >= 768 ? 6 : 5);
    const onResize = () => setCols(getCols());
    setCols(getCols());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const emptySlotsNeeded = useMemo(() => {
    if (!invCount) return 0;
    const remainder = invCount % cols;
    return remainder === 0 ? 0 : cols - remainder;
  }, [invCount, cols]);

  const ItemContent = ({ item }: { item: InventoryType | null }) => {
    if (!item) {
      return (
        <div className="w-64">
          <div className="text-sm font-semibold text-white">ช่องว่าง</div>
          <div className="text-xs text-white/50 mt-1">ยังไม่มีไอเทมในช่องนี้</div>
        </div>
      );
    }

    const name = item.info?.name ?? "ไม่ทราบชื่อไอเทม";
    const detail = item.info?.detail ?? "";
    const type = item.info?.type;

    const ActionButton = () => {
      if (type === "COUPON_SPIN") {
        return (
          <Button
            onPress={handleSpinPage}
            size="sm"
            className="w-full bg-white/10 hover:bg-white/15 border border-white/10 text-white"
            startContent={<FaDice className="text-white/80" />}
          >
            ไปหมุนกงล้อ
          </Button>
        );
      }

      if (type === "COUPON_RANDOM_BOX") {
        return (
          <Button
            onPress={handleRamdomBox}
            size="sm"
            className="w-full bg-white/10 hover:bg-white/15 border border-white/10 text-white"
            startContent={<FaGift className="text-white/80" />}
          >
            เปิดกล่องสุ่ม
          </Button>
        );
      }

      return (
        <Button
          onPress={() => rewardsome(item.items[0])}
          size="sm"
          className="w-full bg-white text-black hover:bg-white/90"
        >
          ใช้งานไอเทม
        </Button>
      );
    };

    return (
      <div className="w-72 text-white">
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 rounded-xl bg-black border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
            <Image
              src={item.info?.item_img}
              alt={name}
              className="w-full h-full object-contain p-2"
              classNames={{ wrapper: "w-full h-full" }}
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="font-semibold text-sm truncate">{name}</div>
              <Chip size="sm" className="bg-white/10 border border-white/10 text-white/70 text-[11px]">
                x{item.amount ?? 1}
              </Chip>
            </div>

            {detail ? (
              <div className="text-xs text-white/60 mt-1 line-clamp-3">{detail}</div>
            ) : (
              <div className="text-xs text-white/40 mt-1">ไม่มีรายละเอียดเพิ่มเติม</div>
            )}
          </div>
        </div>

        <Divider className="my-3 bg-white/10" />
        <ActionButton />
      </div>
    );
  };

  return (
    <Modal
      isOpen={disclosure.state.isOpen}
      onClose={handleClose}
      placement="center"
      size="lg"
      className="dark text-white"
    >
      <ModalContent className="bg-[#0B0B0B] border border-white/10 rounded-2xl overflow-hidden">
        {/* ===== Header (style member/profile) ===== */}
        <ModalHeader className="relative p-0">
          <div className="w-full px-4 py-3 bg-linear-to-r from-white/[0.07] via-white/3 to-transparent border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center">
                  <FiPackage className="text-white/80" />
                </div>

                <div className="leading-tight">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-white">กระเป๋า</span>
                    <FiInfo className="text-white/40" />
                  </div>
                  <div className="text-xs text-white/50">จัดการไอเทมของคุณ / ใช้งานคูปอง</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Chip size="sm" className="bg-white/10 border border-white/10 text-white/70 text-[11px]">
                  ทั้งหมด {invCount} ช่อง
                </Chip>
                <Button
                  isIconOnly
                  size="sm"
                  radius="full"
                  className="bg-white/10 hover:bg-white/15 border border-white/10 text-white"
                  onPress={handleClose}
                  aria-label="close"
                >
                  <FiX />
                </Button>
              </div>
            </div>
          </div>
        </ModalHeader>

        <ModalBody className="p-4 sm:p-5">
          {/* empty state */}
          {!invCount ? (
            <div className="rounded-2xl border border-white/10 bg-black/30 p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <FiPackage className="text-white/70 text-xl" />
              </div>
              <div className="text-white font-semibold mt-3">ยังไม่มีไอเทม</div>
              <div className="text-xs text-white/50 mt-1">
                เมื่อได้รับรางวัลหรือคูปอง ไอเทมจะมาแสดงที่นี่
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-3 sm:p-4">
              <div className="grid grid-cols-5 md:grid-cols-6 gap-2">
                {inv.map((item, index) => (
                  <Popover key={index} placement="top" className="text-white dark">
                    <PopoverTrigger>
                      <div className="aspect-square p-1.5 cursor-pointer select-none">
                        <div className="relative h-full w-full rounded-xl border border-white/10 bg-[#101010] hover:bg-[#141414] transition overflow-hidden">
                          {/* soft glow */}
                          <div className="absolute inset-0 bg-linear-to-b from-white/[0.05] to-transparent pointer-events-none" />

                          <div className="h-full w-full flex items-center justify-center p-2">
                            <Image
                              src={item?.info?.item_img}
                              alt={item?.info?.name ?? "item"}
                              className="object-contain w-full h-full"
                              classNames={{ wrapper: "w-full h-full" }}
                            />
                          </div>

                          {!!item?.amount && (
                            <div className="absolute bottom-1 right-1 z-20 rounded-full px-2 py-0.5 text-[11px] font-semibold bg-black/20 backdrop-blur-md text-red-700">
                              x{item.amount}
                            </div>
                          )}
                        </div>
                      </div>
                    </PopoverTrigger>

                    <PopoverContent className="bg-[#0B0B0B] border border-white/10 rounded-2xl p-3">
                      <ItemContent item={item} />
                    </PopoverContent>
                  </Popover>
                ))}

                {Array.from({ length: emptySlotsNeeded }, (_, i) => (
                  <div key={`empty-${i}`} className="aspect-square p-1.5">
                    <div className="h-full w-full rounded-xl border border-white/5 bg-[#0F0F0F] opacity-60" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </ModalBody>

        <ModalFooter className="p-4 sm:p-5 border-t border-white/10 bg-black/30">
          <Button
            className="bg-white/10 hover:bg-white/15 border border-white/10 text-white"
            onPress={handleClose}
          >
            ปิด
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
