"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/specific/Navbar/Navbar";
import { Sidebar } from "@/components/specific/Sidebar";
import { BottomBar } from "@/components/specific/BottomBar/BottomBar";
import { usePathname } from "next/navigation";
import Lenis from "@studio-freight/lenis";
import { useMemberStore } from "@/stores/member";
import { useShareStore } from "@/stores/share";
import { getSettingRequest } from "@/services/setting";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { FaLine } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface CommonLayoutProps {
    children: React.ReactNode;
}

export default function CommonLayout({ children }: CommonLayoutProps) {
    const pathname = usePathname();
    const router = useRouter();

    const lenis = useRef<Lenis | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isBottomBarVisible, setIsBottomBarVisible] = useState<boolean>(true);
    const [isBackground, setBackground] = useState<string>("");
    const lastScrollY = useRef(0);
    const { isAuthenticated, contact, setContact } = useMemberStore();
    const { setState, state } = useShareStore();

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

            setState({
                announce_commission: init.announce_commission,
                announcement: init.a.general.announcement,
                line: init.a.contact.line,
                telegram: init.a.contact.telegram,
                banners: init.b,
                gem_to_credit_rate: init.c.gem_to_credit_rate,
                web_name: init.a.general.title,
                web_logo: init.a.general?.img || "",
                web_play: init.a.general.web_play,
                bank_deposit_setting: init.d,
                gateway_deposit_setting: init.e,
                bank_withdraw_setting: init.f,
                gateway_withdraw_setting: init.g,
                method_of_withdraw: init.h,
                footherDetail: init.a.general.description,
                menu: init.i.menu,
                category: init.i.category,
                rank: init.j,
                gameStat: init.k,
                icon: init.l,
                affiliateBanner: init.m.imgs,
                user: init.n,
            });
        };

        handleFetchShare();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!scrollContainerRef.current) return;

            const currentScrollY = scrollContainerRef.current.scrollTop;
            const scrollThreshold = 10;

            if (Math.abs(currentScrollY - lastScrollY.current) > scrollThreshold) {
                if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                    setIsBottomBarVisible(false);
                } else if (currentScrollY < lastScrollY.current) {
                    setIsBottomBarVisible(true);
                }
                lastScrollY.current = currentScrollY;
            }
        };

        if (scrollContainerRef.current) {
            lenis.current = new Lenis({
                wrapper: scrollContainerRef.current,
                content: scrollContainerRef.current.firstElementChild as HTMLElement,
                duration: 0.6,
                easing: (t: number) => 1 - Math.pow(1 - t, 3),
                // smooth: true,
                // smoothTouch: true,
            });

            scrollContainerRef.current.addEventListener("scroll", handleScroll, { passive: true });

            const animate = (time: number) => {
                lenis.current?.raf(time);
                requestAnimationFrame(animate);
            };

            requestAnimationFrame(animate);
        }

        return () => {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.removeEventListener("scroll", handleScroll);
            }
            lenis.current?.destroy();
        };
    }, []);

	// const ContactAction = useCallback(() => {
	// 	return contact ? <FaCircleChevronLeft /> : <FaCircleChevronRight />
	// }, [contact])

    const isHidden = useMemo(() => {
    	return !state.line.status && !state.telegram.status
    }, [state.line.status, state.telegram.status])

	const ContactAction = useCallback(() => {
		return contact ? <FaCircleChevronLeft /> : <FaCircleChevronRight />
	}, [contact])

	const isContact = useCallback(() => {
		setContact(!contact)
	}, [contact, setContact])
	const Contact = [state.line.status,state.telegram.status]
    return (
        <div className="flex flex-col h-screen text-foreground relative w-screen overflow-hidden">
            <div className="fixed top-0 z-50 w-full">
                <Navbar />
            </div>

            <div
                hidden={isHidden}
                className={`fixed bottom-20 ${contact ? "right-0" : "-right-[55px]"} z-[50] transition-all bg-black/80 px-5 py-2 rounded-l-xl`}
            >
                <div className="relative">
                    <div className={`${Contact.filter(h => h === true).length > 1 ? 'h-20' : 'h-10'} w-8 flex items-center justify-center flex-col gap-2 *:cursor-pointer`}>
                        {Contact[0] && (
                            <div onClick={() => router.push(state.line.link)}>
                                <FaLine className='text-green-400' size={30} />
                            </div>
                        )}
                        {Contact[1] && (
                            <div onClick={() => router.push(state.telegram.link)}>
                                <FaTelegram className='text-blue-400' size={30} />
                            </div>
                        )}
                    </div>
                    <div
                        onClick={isContact}
                        className="absolute top-[50%] -translate-y-[50%] -left-[30px] text-2xl cursor-pointer"
                    >
						<ContactAction />
                    </div>
                </div>
            </div>

            <div
                className={`flex-auto min-h-0 flex ${isAuthenticated ? `mt-30 md:mt-20` : `mt-15`}`}
            >
                <div className="lg:flex hidden">
                    <Sidebar />
                </div>
                <div className=" text-white grow overflow-auto">
                    {pathname === "/wheel" || pathname === "/randombox" ? (
                        <div className="">{children}</div>
                    ) : (
                        <div
                            className={`px-2 xl:py-8 pb-16 lg:pb-0 ${isAuthenticated ? "md:pt-20" : ""} relative`}
                        >
                            <div className="*:z-1">{children}</div>
                        </div>
                    )}
                </div>
            </div>
            <div
                className={`lg:hidden flex z-50 bg-[var(--navbar-color)] fixed transition-all duration-300 ease-in-out w-full ${
                    isBottomBarVisible ? "bottom-0" : "-bottom-20"
                }`}
            >
                <BottomBar />
            </div>
        </div>
    );
}
