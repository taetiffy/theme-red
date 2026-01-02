"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button, Image } from "@heroui/react";
import { useRouter, usePathname } from "next/navigation";
import { useShareStore } from "@/stores/share";
import { isLightColor } from "@/utils/lightColor";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { useModal } from "@/hooks/useModal";

type Variant = "mobileSidebar" | "mobileSwiper" | "desktop";

export function GameCategories({
    activeByType,
    variant,
    onChange,
}: {
    activeByType: string;
    variant?: Variant;
    onChange?: () => void;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const { state } = useShareStore();
    const modals = useModal();
    const [color1, setColor1] = useState("");

    useEffect(() => {
        const navbarColor = getComputedStyle(document.documentElement)
            .getPropertyValue("--navbar-color")
            .trim();
        setColor1(navbarColor);
    }, []);

    const handleOpenModal = (name: string) => {
        const maps: Record<string, (() => void) | undefined> = {
            checkIn: modals.checkIn.state.onOpen,
            backpack: modals.backpack.state.onOpen,
        };

        const toggle = maps[name];
        if (toggle) toggle();
    };


    const isLight = isLightColor(color1);

    const containerBg = isLight ? "bg-black/10 border-white/10" : "bg-[#0B0B0B]";
    const tileIdle = isLight
        ? "bg-white/5 border-white/5 hover:bg-white/10"
        : "bg-black/30 border-white/10 hover:bg-white/5";

    const tileActive = "bg-red-800/70 shadow-[0_0_0_1px_rgba(239,68,68,0.18)]";

    const categories = useMemo(
        () => state.category.filter((dis) => dis.disable !== true),
        [state.category]
    );

    const TileDesktop = ({
        active,
        icon,
        title,
        onPress,
    }: {
        active: boolean;
        icon: string;
        title: string;
        onPress: () => void;
    }) => {
        return (
            <Button
                size="md"
                onPress={onPress}
                className={[
                    "w-full h-[86px] px-0",
                    "rounded-2xl border-1 border-white/5 py-2",
                    "flex flex-row items-center justify-start gap-3",
                    "transition-all duration-200",
                    "focus:outline-none",
                    active ? tileActive : tileIdle,
                ].join(" ")}
            >
                <div className="w-12 h-12 rounded-xl bg-black/25 flex items-center justify-center overflow-hidden shrink-0">
                    <Image src={icon} alt={title} removeWrapper className="w-8 h-8 object-contain" />
                </div>

                <div className="min-w-0 flex-1 text-left">
                    <div className="text-[14px] font-semibold text-(--text-color) truncate">{title}</div>
                    <div className="text-[11px] text-white/50 truncate">เลือกหมวดหมู่</div>
                </div>
            </Button>
        );
    };

    const TileMobile = ({
        active,
        icon,
        title,
        onPress,
        compact,
    }: {
        active: boolean;
        icon: string;
        title: string;
        onPress: () => void;
        compact?: boolean;
    }) => {
        return (
            <div
                onClick={onPress}
                className={[
                    "w-full rounded-2xl border border-white/5 transition-all duration-200 select-none cursor-pointer",
                    active ? tileActive : tileIdle,
                    compact
                        ? "h-[76px] p-2 flex flex-col items-center justify-center gap-1"
                        : "h-[76px] px-0 py-2 flex flex-row items-center gap-2",
                ].join(" ")}
            >
                <div
                    className={[
                        "rounded-xl bg-black/25 flex items-center justify-center overflow-hidden shrink-0",
                        compact ? "w-10 h-10" : "w-12 h-12",
                    ].join(" ")}
                >
                    <Image
                        src={icon}
                        alt={title}
                        removeWrapper
                        className={compact ? "w-16 h-16 object-contain" : "w-16 h-16 object-contain"}
                    />
                </div>

                <div
                    className={[
                        "truncate text-center",
                        compact ? "text-[10px] leading-tight" : "text-[14px] text-left",
                    ].join(" ")}
                >
                    {title}
                </div>

                {!compact && (
                    <div className="text-[11px] text-white/50 truncate">
                        เลือกหมวดหมู่
                    </div>
                )}
            </div>
        );
    };


    const tiles = useMemo(() => {
        const arr: Array<{
            key: string;
            active: boolean;
            icon: string;
            title: string;
            href: string;
        }> = [];

        if (pathname.includes("category")) {
            arr.push(
                { key: "news", active: activeByType === "news", icon: state.icon.newGame, title: "เกมใหม่", href: "/category/news" },
                { key: "jackpots", active: activeByType === "jackpots", icon: state.icon.jackpotGame, title: "เกมแตก", href: "/category/jackpots" },
                { key: "populars", active: activeByType === "populars", icon: state.icon.hitGame, title: "เกมฮิต", href: "/category/populars" }
            );
        }

        categories.forEach((item) => {
            const key = item.href.split("/")[2];
            arr.push({
                key,
                active: activeByType === key && !item.disable,
                icon: item.src,
                title: item.title,
                href: item.href,
            });
        });

        return arr;
    }, [
        pathname,
        activeByType,
        state.icon.newGame,
        state.icon.jackpotGame,
        state.icon.hitGame,
        categories,
    ]);

    const mode: Variant | "auto" = variant ?? "auto";

    return (
        <div className="w-full">
            <div
                className={[
                    "relative overflow-hidden rounded-2xl",
                    "p-1 border border-white/5",
                ].join(" ")}
            >
                <div className="pointer-events-none absolute -inset-10 bg-linear-to-b from-red-500/10 via-white/3 to-transparent blur-2xl" />
                <div className="relative h-px w-full bg-linear-to-r from-white/10 via-white/5 to-transparent mb-3" />

                <div className="xl:hidden block">
                    {/* <div className="mb-2">
                        <TileMobile
                            icon="/image/wheel.gif"
                            title="กงล้อ"
                            onPress={() => handleOpenModal("wheel")}
                            compact
                            active={false}
                        />
                    </div> */}

                    <div className="mb-2">
                        <TileMobile
                            icon="/image/bag.gif"
                            title="กระเป๋าไอเท็ม"
                            onPress={() => handleOpenModal("backpack")}
                            compact
                            active={false}
                        />
                    </div>

                    <div className="mb-2">
                        <TileMobile
                            icon="/image/mission.gif"
                            title="ภารกิจ"
                            onPress={() => router.push("/mission")}
                            compact
                            active={false}
                        />
                    </div>

                    <div className="mb-2">
                        <TileMobile
                            icon="/image/checkin.gif"
                            title="เช็คอิน"
                            onPress={() => handleOpenModal("checkIn")}
                            compact
                            active={false}
                        />
                    </div>
                </div>

                {(mode === "mobileSidebar") && (
                    <div className="relative flex flex-col gap-2">
                        {tiles.map((t) => (
                            <TileMobile
                                key={t.key}
                                active={t.active}
                                icon={t.icon}
                                title={t.title}
                                onPress={() => {
                                    router.replace(t.href);
                                }}
                                compact
                            />
                        ))}
                    </div>
                )}

                {(mode === "mobileSwiper") && (
                    <div className="relative">
                        <Swiper
                            modules={[FreeMode]}
                            slidesPerView="auto"
                            spaceBetween={10}
                            freeMode={{ enabled: true, momentum: true }}
                            allowTouchMove
                            nested
                            resistanceRatio={0.6}
                            touchStartPreventDefault={false}
                            touchMoveStopPropagation={false}
                            className="!overflow-visible"
                            style={{ touchAction: "pan-x" }}
                        >
                            {tiles.map((t) => (
                                <SwiperSlide
                                    key={t.key}
                                    className="!w-[150px] sm:!w-[100px]"
                                    style={{ touchAction: "pan-x" }}
                                >
                                    <TileMobile
                                        active={t.active}
                                        icon={t.icon}
                                        title={t.title}
                                        onPress={() => {
                                            router.replace(t.href);
                                        }}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}

                {/* ===================== DESKTOP (เดิม) ===================== */}
                {(mode === "desktop") && (
                    <div className="relative flex flex-col gap-2">
                        {tiles.map((t) => (
                            <TileDesktop
                                key={t.key}
                                active={t.active}
                                icon={t.icon}
                                title={t.title}
                                onPress={() => {
                                    router.replace(t.href);
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* ===================== AUTO (โหมดเดิมตาม breakpoint) ===================== */}
                {mode === "auto" && (
                    <>
                        {/* mobile แนวนอน */}
                        <div className="relative md:hidden">
                            <Swiper
                                modules={[FreeMode]}
                                slidesPerView="auto"
                                spaceBetween={10}
                                freeMode={{ enabled: true, momentum: true }}
                                allowTouchMove
                                nested
                                resistanceRatio={0.6}
                                touchStartPreventDefault={false}
                                touchMoveStopPropagation={false}
                                className="!overflow-visible"
                                style={{ touchAction: "pan-x" }}
                            >
                                {tiles.map((t) => (
                                    <SwiperSlide key={t.key} className="!w-[150px] sm:!w-[100px]" style={{ touchAction: "pan-x" }}>
                                        <TileMobile
                                            active={t.active}
                                            icon={t.icon}
                                            title={t.title}
                                            onPress={() => {
                                                router.replace(t.href);
                                            }}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        {/* desktop แนวตั้ง */}
                        <div className="relative hidden md:flex flex-col gap-2">
                            {tiles.map((t) => (
                                <TileDesktop
                                    key={t.key}
                                    active={t.active}
                                    icon={t.icon}
                                    title={t.title}
                                    onPress={() => {
                                        router.replace(t.href);
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
