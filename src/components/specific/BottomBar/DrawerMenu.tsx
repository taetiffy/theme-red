"use client"
import React, { lazy, Suspense, useState } from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter
} from "@heroui/drawer";
import { Button } from "@heroui/button"
import { CgMenuGridO } from "react-icons/cg";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { Divider } from "@heroui/divider";
import { PiHandDeposit } from "react-icons/pi";
import { BTNCommon } from '@/components/BTNCommon';
import { MoneyBar } from '@/containers/MoneyBar';
import { NavigateSideBar } from "@/variables/sidebar";
import { useRouter } from 'next/navigation';

import { FaLine } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";
import { Tabs, Tab } from "@heroui/tabs";
import { useNavigation } from '@/utils/navigate/link';
import { useMemberStore } from '@/stores/member';
import { LevelBar } from '@/containers/LevelBar';
import { toast } from 'sonner';
import { useModal } from '@/hooks/useModal';
import { UseCustomDisclosureReturn } from '@/hooks/useCustomDisclosure';
import { useShareStore } from '@/stores/share';


export default function DrawerMenu({ disclosure }: { disclosure: UseCustomDisclosureReturn }) {

    const router = useRouter();
    const { logout, isAuthenticated } = useMemberStore();
    const { state: { line, telegram } } = useShareStore();
    const modals = useModal();

    const handleOpenModal = (name: string) => {
        const maps: Record<string, (() => void) | undefined> = {
            "checkIn": modals.checkIn.state.onOpen,
            "deposit": modals.deposit.state.onOpen,
            "withdraw": modals.withdraw.state.onOpen,
            "coupon": modals.coupon.state.onOpen,
            "reward": modals.gemReward.state.onOpen,
            "commission": modals.commission.state.onOpen,
            "creditFree": modals.creditFree.state.onOpen,
            "backpack": modals.backpack.state.onOpen,
            "cashback": modals.cashback.state.onOpen,
        }
        const toggle = maps[name] || undefined;
        if (toggle) toggle();
    };

    const [selectedTab, setSelectedTab] = useState<string>("home")
    const { toHome, toGame } = useNavigation()

    const handleLink = (href: string) => {
        router.push(href)

    }

    const handleLine = () => {
        router.push(line.link)
    }

    const handleTelegram = () => {
        router.push(telegram.link)
    }

    const handleTabChange = (key: string) => {
        setSelectedTab(key)
        if (key === "home") {
            toHome()
        } else if (key === "game") {
            toGame()
        //   if(isAuthenticated){
        //     toGame()
        //   }else{
        //     toast.error("กรุณาเข้าสู่ระบบก่อนทำรายการ");
        //   }
        }
    }

    const handleLogout = () => {
        try {
            logout()
            toast.success('ออกจากระบบสำเร็จ')
        }
        catch (err: unknown) {
            toast.success('ออกจากระบบผิดพลาด')
        }
    }

    return (
        <>
            <Drawer className='bg-[#0E0D0D]/70 backdrop-blur-md text-white' classNames={{base: "h-full"}} isOpen={disclosure.state.isOpen} onClose={disclosure.state.onClose}>
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="flex flex-col gap-1">
                                <div className='flex gap-1 items-center'>
                                    <CgMenuGridO size={30} />
                                    <span>เมนูหลัก</span>
                                </div>
                            </DrawerHeader>
                            <DrawerBody className=' max-h-[80vh]'>
                                <div className='h-full overflow-auto flex flex-col gap-2'>
                                    <div>
                                        <div className=' py-2'>
                                            <Divider />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <div className=' flex gap-2 w-full'>
                                                <BTNCommon
                                                    needAuthen={true}
                                                    onPress={modals.deposit.state.onOpen}
                                                    startContent={<i className="fa-solid fa-money-from-bracket text-lg"></i>}
                                                    className='Btn2 flex-1'>
                                                    ฝากเงิน
                                                </BTNCommon>
                                                <BTNCommon
                                                    needAuthen={true}
                                                    onPress={modals.withdraw.state.onOpen}
                                                    startContent={<PiHandDeposit size={25} />}
                                                    className='Btn1 flex-1'>
                                                    ถอนเงิน
                                                </BTNCommon>
                                            </div>
                                            <div className='flex flex-col gap-2'>
                                                <MoneyBar
                                                    cols={2}
                                                    commission
                                                    lost
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='flex items-center gap-1 mt-4'>
                                            <i className="fa-solid fa-bars-sort text-xl"></i>
                                            <span>เมนูทั่วไป</span>
                                        </div>
                                        <div className=' py-2'>
                                            <Divider />
                                        </div>
                                        <div className='grid grid-cols-2 gap-2'>
                                            {NavigateSideBar.map((item, index) => (
                                                <div className='' key={index}>
                                                    <BTNCommon
                                                        needAuthen={item.needAuthen}
                                                        onPress={() => {
                                                            if (item.modal === null) {
                                                                handleLink(item.link)
                                                                onClose()
                                                            } else {
                                                                handleOpenModal(item.modal)
                                                            }
                                                        }}
                                                        Disable={item.link === 'awd' ? true : false}
                                                        className='Btn3 w-full py-10'>
                                                        <div className='flex flex-col items-center gap-2'>
                                                            <i className={`${item.icon} text-xl`}></i>
                                                            <span className=' w-20 text-xs'>
                                                                {item.title}
                                                            </span>
                                                        </div>
                                                    </BTNCommon>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </DrawerBody>
                            <DrawerFooter>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    )
}
