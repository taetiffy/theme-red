'use client'
import React, { useState, useEffect, useRef } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@heroui/modal";
import { UseCustomDisclosureReturn } from '@/hooks/useCustomDisclosure';
import { toast } from 'sonner';
import { QRCode } from "react-qrcode-logo";
import { Button } from '@heroui/react';
import dayjs from 'dayjs';
import Image from 'next/image';


export default function PaymentGatewayModal({ disclosure }: { disclosure: UseCustomDisclosureReturn<{ qrcode: string, amount: number, type: string, expiredAt: string }>}) {
    const [timeLeft, setTimeLeft] = useState(5 * 60)
    const qrRef = useRef<HTMLDivElement>(null);

    const data = disclosure.data

    useEffect(() => {
        if (!disclosure.state.isOpen) {
            return
        }
        setTimeLeft(5 * 60)

        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    toast.error("หมดเวลาแล้ว")
                    disclosure.state.onClose
                    return 0
                }
                return prevTime - 1
            })
        }, 1000)

        return () => clearInterval(intervalId)
    }, [disclosure.state.isOpen, disclosure.state.onClose])

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    }


    const handleDownload = () => {
        const canvas = qrRef.current?.querySelector("canvas");
        if (!canvas) return;
        const url = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = url;
        link.download = "qrcode.png";
        link.click();
    };

    return (
        <>
            <Modal
                isOpen={disclosure.state.isOpen}
                onClose={disclosure.state.onClose}
                placement="center"
                className="text-white ModalBackground"
            >
                <ModalContent>
                    <ModalHeader>
                        โอนเงิน
                    </ModalHeader>
                    <ModalBody>
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center relative gap-4 backdrop-blur-lg bg-black/50 rounded-md px-4 py-2'>
                                <div className='flex justify-center' ref={qrRef}>
                                    {data.type === "IMAGE"? 
                                        <Image width={200} height={100} alt='money-topup' className='!w-[90%] !h-auto' src={data.qrcode}/>:
                                        <QRCode
                                            qrStyle="dots"
                                            ecLevel="Q"
                                            enableCORS={true}
                                            logoPaddingStyle="circle"
                                            logoPadding={2}
                                            logoWidth={35}
                                            logoImage={""}
                                            value={data.qrcode}
                                        />
                                    }
                                    <div>

                                    </div>
                                </div>
                            </div>
                            {/* <div className='flex flex-col items-center *:text-center'>
                                <p>กรุณาโอนเงินภายใน <span className='text-xl'>{formatTime(timeLeft)} นาที</span></p>
                                <span>โอนเงินเข้าบัญชีนี้เท่านั้น! ระบบจะเติมเครดิตโดยอัตโนมัติ</span>
                            </div> */}
                            <span className="text-red-600 text-sm text-center mt-3">โปรดใช้บัญชีที่ได้แจ้งไว้เท่านั้นในการสแกนชำระ หากไม่ตรงตามข้อมูลที่ระบุ เงินจะไม่เข้าระบบ</span>
                            <span className='text-center'>หมดอายุใน : {dayjs(new Date(data.expiredAt || new Date())).format("DD/MM/YYYY hh:mm")}</span>
                            <Button variant="flat" color="success" size="lg" onPress={handleDownload}>
                                ดาวน์โหลด Qrcode
                            </Button>
                        </div>
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
