"use client";

import React, { useCallback, useMemo } from "react";
import { toast } from "sonner";
import { useMemberStore } from "@/stores/member";
import { useModal } from "@/hooks/useModal";
import { useRouter, usePathname } from "next/navigation";
import { useShareStore } from "@/stores/share";
import { isLightColor } from "@/utils/lightColor";

type NavItem = {
  key: string;
  label: string;
  icon: string;
  onPress: () => void;
  auth?: boolean;
};

export function BottomBar() {
  const { isAuthenticated } = useMemberStore();
  const { deposit, withdraw, drawerMenu } = useModal();
  const { state } = useShareStore();
  const router = useRouter();
  const pathname = usePathname();

  const isLight = useMemo(() => {
    const navbarColor =
      typeof window !== "undefined"
        ? getComputedStyle(document.documentElement)
            .getPropertyValue("--navbar-color")
            .trim()
        : "";
    return isLightColor(navbarColor);
  }, []);

  const click = useCallback(
    (press?: () => void, needAuth = true) => {
      if (needAuth && !isAuthenticated) {
        toast.error("กรุณาเข้าสู่ระบบก่อนทำรายการ");
        return;
      }
      press?.();
    },
    [isAuthenticated]
  );

  const items: NavItem[] = useMemo(
    () => [
      {
        key: "home",
        label: "หน้าแรก",
        icon: "/icons/Hamburger/home.svg",
        onPress: () => router.push("/"),
        auth: false,
      },
      {
        key: "deposit",
        label: "ฝากเงิน",
        icon: "/icons/deposit.svg",
        onPress: () => deposit.state.onOpen(),
        auth: true,
      },
      {
        key: "menu",
        label: "เมนูหลัก",
        icon: "/icons/menu.svg",
        onPress: () => drawerMenu.state.onOpen(),
        auth: true,
      },
      {
        key: "withdraw",
        label: "ถอนเงิน",
        icon: "/icons/withdraw.svg",
        onPress: () => withdraw.state.onOpen(),
        auth: true,
      },
      {
        key: "promo",
        label: "โปรโมชัน",
        icon: "/icons/announcement.svg",
        onPress: () => router.push("/promotion"),
        auth: false,
      },
    ],
    [router, deposit.state, withdraw.state, drawerMenu.state]
  );

  const isActive = (key: string) => {
    if (key === "home") return pathname === "/";
    if (key === "promo") return pathname?.startsWith("/promotion");
    return false;
  };

  const barBg = isLight ? "mini_navbar_bgColor_light" : "bg-[#0E0D0D]";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[80]">
      {/* Glow + border */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
      <div className="pointer-events-none absolute -inset-10 bg-linear-to-r from-red-500/10 via-white/[0.03] to-transparent blur-2xl" />

      <div
        className={[
          "relative",
          "px-3 py-2",
          "border-t border-white/10",
          "backdrop-blur-xl",
          barBg,
        ].join(" ")}
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 8px)" }}
      >
        <div className="grid grid-cols-5 gap-2">
          {items.map((it) => {
            const active = isActive(it.key);

            return (
              <button
                key={it.key}
                onClick={() => click(it.onPress, it.auth !== false)}
                className={[
                  "relative",
                  "flex flex-col items-center justify-center",
                  "rounded-2xl",
                  "py-2",
                  "transition",
                  "active:scale-[0.97]",
                  active
                    ? "bg-transparent shadow-md shadow-black/25"
                    : "hover:bg-white/6]",
                ].join(" ")}
              >
                {/* active dot */}
                {active && (
                  <div className="absolute -top-1 w-6 h-1 rounded-full bg-red-500/80 shadow-[0_0_12px_rgba(239,68,68,0.5)]" />
                )}

                {/* icon */}
                <div
  className={[
    "w-10 h-10",
    "rounded-2xl",
    "border",
    "flex items-center justify-center",
    "transition-all duration-300",
    active
      ? [
          "bg-red-500/20",
          "border-none",
          "shadow-[0_0_18px_rgba(239,68,68,0.55)]",
        ].join(" ")
      : [
          "bg-black/25",
          "border-white/10",
        ].join(" "),
  ].join(" ")}
>
  <img
    src={it.icon}
    alt={it.label}
    className={[
      "w-5 h-5 object-contain transition-all duration-300",
      active ? "opacity-100 drop-shadow-[0_0_6px_rgba(239,68,68,0.9)]" : "opacity-80",
    ].join(" ")}
  />
</div>


                <span
                  className={[
                    "mt-1 text-[11px] leading-none",
                    active ? "text-red-800" : "text-white/70",
                  ].join(" ")}
                >
                  {it.label}
                </span>

                {/* Menu as special center button */}
                {it.key === "menu" && (
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-b from-red-500/10 via-transparent to-transparent" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
