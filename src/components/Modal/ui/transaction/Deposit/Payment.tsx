'use client'
import React, { useState, useEffect } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@heroui/modal";
import { Image,Button } from '@heroui/react';
import { DataModal, PaymentSend } from '@/types/modal';
import { bankLists } from "@/variables/BankSelect"
import { copyToClipboard } from '@/hooks/copyToCB';
import { toast } from 'sonner';
import { UseCustomDisclosureReturn } from '@/hooks/useCustomDisclosure';

function ImageCheck(str: string): string {
    const data = bankLists.find((item) => item.code === str)
    return data?.image || ''
}

function NameBankCheck(str: string): string {
    const data = bankLists.find((item) => item.code === str)
    return data?.name || ''
}

export default function PaymentModal({ disclosure }: { disclosure: UseCustomDisclosureReturn<{ accountNo: string; bankCode: string; fullName: string; amount: number; }>}) {
    const [timeLeft, setTimeLeft] = useState(5 * 60)

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
                                <Image width={60} src={ImageCheck(data.bankCode)} />
                                <div className='h-full flex justify-between flex-col'>
                                    <span className='text-lg'>{NameBankCheck(data.bankCode)}</span>
                                    <span>{data.fullName}</span>
                                    <span>{data.accountNo}</span>
                                </div>
                                <div className=' absolute top-2 right-2'>
                                    <Button onPress={() => copyToClipboard(data.accountNo)} className='Btn2' size='sm' isIconOnly>
                                        <i className="fa-solid fa-copy"></i>
                                    </Button>
                                </div>
                            </div>
                            <div className='flex justify-between p-2 border-2 border-[var(--navbar-color)] rounded-md'>
                                <span>จำนวนเงินที่ต้องโอน</span>
                                <span>{data.amount.toFixed(2)} บาท</span>
                            </div>
                            <div className='flex flex-col items-center *:text-center'>
                                <p>กรุณาโอนเงินภายใน <span className='text-xl'>{formatTime(timeLeft)} นาที</span></p>
                                <span>โอนเงินเข้าบัญชีนี้เท่านั้น! ระบบจะเติมเครดิตโดยอัตโนมัติ</span>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
