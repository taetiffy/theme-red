import { useClaimReward } from "@/hooks/claimreward";
import { InventoryType, useMemberStore } from "@/stores/member";
import {
  Button,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";

/** ✅ Popup content (สวยขึ้น + อ่านง่าย) */
const ItemContent = ({ item }: { item: InventoryType | null }) => {
  const { rewardsome } = useClaimReward();
  const router = useRouter();

  const handleSpinPage = useCallback(() => router.push("/wheel"), [router]);
  const handleRandomBox = useCallback(() => router.push("/randombox"), [router]);

  if (!item) {
    return (
      <div className="w-56 p-2">
        <div className="rounded-sm border border-white/10 bg-black/40 p-3 text-center">
          <div className="text-sm font-semibold text-white/80">ช่องเปล่า</div>
          <div className="text-[11px] text-white/50 mt-1">
            ยังไม่มีไอเทมในช่องนี้
          </div>
        </div>
      </div>
    );
  }

  const type = item.info.type;

  const action = useMemo(() => {
    if (type === "COUPON_SPIN") {
      return { label: "หมุนกงล้อ", onPress: handleSpinPage };
    }
    if (type === "COUPON_RANDOM_BOX") {
      return { label: "กล่องสุ่ม", onPress: handleRandomBox };
    }
    return {
      label: "ใช้งานไอเทม",
      onPress: () => rewardsome(item.items[0]),
    };
  }, [type, handleSpinPage, handleRandomBox, rewardsome, item]);

  return (
    <div className="w-64">
      <div className="relative overflow-hidden rounded-md border border-white/10 bg-black/40 p-3">
        <div className="pointer-events-none absolute -inset-10 bg-linear-to-tr from-red-500/10 via-white/3 to-transparent blur-2xl" />

        <div className="relative flex items-center gap-3">
          <div className="w-12 h-12 rounded-md bg-black/35 border border-white/10 flex items-center justify-center overflow-hidden">
            <Image
              src={item.info.item_img}
              alt={item.info.name}
              className="w-10 h-10 object-contain rounded-none"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-white truncate">
              {item.info.name}
            </div>
            <div className="text-[11px] text-white/60 line-clamp-2 mt-0.5">
              {item.info.detail}
            </div>
          </div>

          <div className="shrink-0">
            <span className="px-2 py-1 rounded-full text-[10px] text-white/80 bg-black/40 border border-white/10">
              x{item.amount}
            </span>
          </div>
        </div>

        <div className="my-3 h-px w-full bg-linear-to-r from-white/10 via-white/5 to-transparent" />

        <div className="relative flex justify-end">
          <Button
            onPress={action.onPress}
            size="sm"
            className={[
              "rounded-full px-4",
              "border border-white/10",
              "bg-black/30 hover:bg-black/45",
              "text-white",
              "shadow-md shadow-black/20",
              "transition active:scale-[0.98]",
            ].join(" ")}
          >
            {action.label}
          </Button>
        </div>
      </div>
    </div>
  );
};

export const MobileControlInventory = () => {
  const { inventory: rawInventory, isAuthenticated } = useMemberStore();
  const inventory = useMemo(() => rawInventory.slice(0, 9), [rawInventory]);

  const EmptySlot = ({ k }: { k: string }) => (
    <div key={k} className="aspect-square w-full">
      <div
        className={[
          "h-full w-full rounded-md",
          "border border-white/10",
          "bg-black/25",
          "relative overflow-hidden",
        ].join(" ")}
      >
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/6 to-transparent" />
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-3 gap-2 w-full h-full px-0">
      {isAuthenticated
        ? inventory.map((item, index) => {
            if (!item) return <EmptySlot k={`empty-${index}`} />;

            return (
              <Popover
                key={`inv-${index}`}
                placement="top"
                className="text-white dark"
                offset={10}
              >
                <PopoverTrigger>
                  <div className="aspect-square w-full cursor-pointer select-none">
                    <div
                      className={[
                        "h-full w-full rounded-md",
                        "border border-white/10",
                        "bg-black/25 hover:bg-black/35",
                        "transition active:scale-[0.98]",
                        "relative overflow-hidden",
                        "flex items-center justify-center",
                      ].join(" ")}
                    >
                      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/8 via-transparent to-black/30" />

                      <Image
                        className="relative object-contain w-[80%] h-[80%] rounded-none drop-shadow"
                        src={item.info.item_img}
                        alt={item.info.name}
                      />

                      <div className="absolute bottom-1.5 right-1.5 z-20">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white bg-red-500/90 border border-white/10 shadow-lg shadow-black/30">
                          {item.amount}
                        </span>
                      </div>
                    </div>
                  </div>
                </PopoverTrigger>

                <PopoverContent className="bg-transparent border-none p-0 shadow-none">
                  <ItemContent item={item} />
                </PopoverContent>
              </Popover>
            );
          })
        : Array.from({ length: 9 }).map((_, index) => (
            <EmptySlot k={`empty-guest-${index}`} key={`empty-guest-${index}`} />
          ))}
    </div>
  );
};
