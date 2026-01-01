'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { MoneyBar } from '@/containers/MoneyBar'
import { LevelBar } from '@/containers/LevelBar'
import { isLightColor } from '@/utils/lightColor'

export function PlayBar({ open, IsOpen }: { open: boolean, IsOpen: (open: boolean) => void }) {
    // const [open, IsOpen] = useState(true)
    const router = useRouter()

    const handleClose = () => {
        IsOpen(!open)
    }

    const handleGoBack = () => {
        router.back()
    }

    const [color1, setColor1] = useState('');

    useEffect(() => {
        const navbarColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--navbar-color')
            .trim();
        setColor1(navbarColor);
    }, []);
    return (
        <div className={`fixed ${open ? "-top-20 md:-top-12" : "top-0"} transition-all w-full ${isLightColor(color1) ? 'mini_navbar_bgColor_light' : 'mini_navbar_bgColor_dark'} h-20 md:h-12 px-4 gap-4 flex items-center`}>
            <div className="flex flex-1 items-center gap-3 md:gap-4">
                <Button
                    isIconOnly
                    size="sm"
                    onPress={handleGoBack}
                    className={[
                        "bg-red-400/20 text-red-700",
                        "w-10 h-10 md:w-7 md:h-7",
                        "rounded-2xl",
                        "shadow-lg shadow-black/20",
                        "transition active:scale-[0.97]",
                    ].join(" ")}
                >
                    <i className="fa-solid fa-arrow-left-to-arc" />
                </Button>

                <div className="flex-1 min-w-0">
                    <div className="flex h-full w-full lg:w-[60%] flex-col md:flex-row items-stretch gap-2">
                        <div className="w-full flex items-center">
                            <div
                                className={[
                                    "relative overflow-hidden",
                                    "rounded-2xl",
                                    "border border-white/10",
                                    "bg-black/20",
                                    "shadow-sm shadow-black/20",
                                ].join(" ")}
                            >
                                <div className="pointer-events-none absolute -inset-8 bg-linear-to-r from-red-500/10 via-white/3 to-transparent blur-2xl" />
                                <div className="relative">
                                    <MoneyBar diamond play cols={1} />
                                </div>
                            </div>

                            <div className="w-full">
                                <div
                                    className={[
                                        "relative overflow-hidden",
                                        "rounded-2xl",
                                        "border border-white/10",
                                        "bg-black/20",
                                        "px-3",
                                        "shadow-sm shadow-black/20",
                                    ].join(" ")}
                                >
                                    <div className="pointer-events-none absolute -inset-8 bg-linear-to-r from-white/6 via-transparent to-transparent blur-2xl" />
                                    <div className="relative">
                                        <LevelBar position="Play" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div onClick={handleClose} className={` absolute right-0 top-20 select-none md:top-12 px-8 rounded-bl-xl ${isLightColor(color1) ? 'mini_navbar_bgColor_light' : 'mini_navbar_bgColor_dark'} flex gap-1 cursor-pointer items-center`}>
                <i className={`fa-solid fa-angle-down transition-all text-(--text-color) ${open ? 'rotate-0' : 'rotate-180'}`}></i>
                <span className="text-(--text-color)">{open ? 'แสดง' : 'ซ่อน'}</span>
            </div>
        </div>
    )
}
