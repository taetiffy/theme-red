'use client'
import React, { useState, useEffect } from "react";
import { HeroUIProvider } from "@heroui/react";
import { toast, Toaster } from "sonner";
import { AuthProvider } from "@/components/layout/auth";
import ModalProvider from "@/providers/ModalProvider";
import { getSettingRequest } from "@/services/setting";
import { SWRConfig } from "swr";
import { fetcher } from "@/lib/fetcher";
// import WebSocketClient from "@/providers/SocketProvider";
import Image from "next/image"
import { WebSocketProvider } from "@/providers/WebSocketProvider";
import SocketSubscriber from "@/providers/SocketSubscriber";
import PresenceProvider from "@/providers/PresenceProvider";

interface RootLayoutTokioProps {
    children: React.ReactNode;
}

export default function RootLayoutTokio({ children }: RootLayoutTokioProps) {
    const [isBackground, setBackground] = useState<string>("");

    useEffect(() => {
        const handleFetchShare = async () => {
            const initSetting = await getSettingRequest();

            const init = {
                announce_commission: initSetting.announce_commission,
                a: initSetting.website.data,
                b: initSetting.banner.data,
                c: initSetting.exchange.data,
                d: initSetting.bank_deposit_setting.data,
                e: initSetting.gateway_deposit_setting.data,
                f: initSetting.bank_withdraw_setting.data,
                g: initSetting.gateway_withdraw_setting.data,
                h: initSetting.method_of_withdraw.data,
                i: initSetting.menu.data,
                j: initSetting.rank.data.data,
                k: initSetting.gameStat.data,
                l: initSetting.specialIcon.data,
                m: initSetting.affiliateBanner.data,
                n: initSetting.user.data,
            };

            setBackground(init?.a?.general?.bg_img || "");
        };

        handleFetchShare();
    }, []);

    return (
        <HeroUIProvider>
            <Toaster
                richColors
                position="top-right"
                closeButton
                toastOptions={{
                    style: {
                        fontFamily: "Kanit, sans-serif",
                    },
                    className: "KanitFont",
                }}
                theme="dark"
                duration={1500}
            />
            <SWRConfig
                value={{
                    refreshInterval: 3000,
                    fetcher,
                    onError: (error) => toast.error("FAIL TO FETCH.")
                }}
            >
                <AuthProvider>
                    <ModalProvider>
                        <WebSocketProvider>
                            <SocketSubscriber />
                            <PresenceProvider>
                                <div className="w-full h-full relative bg-[#0e0d0d]/90 overflow-x-hidden">
                                    {isBackground ? (
                                        <Image
                                            width={1920}
                                            height={1080}
                                            alt="background"
                                            className=" fixed top-0 left-0 w-full h-full -z-10 object-cover object-left"
                                            src="https://img.freepik.com/free-photo/view-roulette-game-casino_23-2151007833.jpg?semt=ais_hybrid&w=740&q=80"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-[var(--navbar-color)] absolute top-0 left-0"></div>
                                    )}
                                    {children}
                                </div>
                            </PresenceProvider>
                        </WebSocketProvider>
                    </ModalProvider>
                </AuthProvider>
            </SWRConfig>
        </HeroUIProvider>
    );
}
