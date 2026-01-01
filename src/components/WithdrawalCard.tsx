"use client"
import { useState, useEffect } from "react"
import { Card, CardBody, Button } from "@heroui/react";
import { isLightColor } from "@/utils/lightColor";

interface WithdrawalData {
    id: string;
    amount: number;
    timestamp: string;
    game: string;
    status: 'Withdraw' | 'Completed' | 'Pending';
}

interface WithdrawalCardProps {
    withdrawal: WithdrawalData;
}

export default function WithdrawalCard({ withdrawal }: WithdrawalCardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Withdraw':
                return 'text-red-400';
            case 'Completed':
                return 'text-green-400';
            case 'Pending':
                return 'text-yellow-400';
            default:
                return 'text-gray-400';
        }
    };

    const [color1, setColor1] = useState('');

    useEffect(() => {
        const navbarColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--navbar-color')
            .trim();
        setColor1(navbarColor);
    }, []);

    return (
        <Card shadow="sm" className={` ${isLightColor(color1) ? 'CardBackground_light':'CardBackground_dark'}  backdrop-blur-sm min-w-[280px]transition-all duration-300`}>
            <CardBody className="">
                <div className="flex flex-col  justify-between items-start mb-3">
                    <div className="  flex justify-between items-center w-full">
                        <div className="text-sm text-(--text-color)">
                            {withdrawal.id}
                        </div>
                        <div className={`text-xs ${isLightColor(color1) ? 'bg-white/40':'bg-black/40'} px-2 py-1 rounded-full font-medium ${getStatusColor(withdrawal.status)}`}>
                            {withdrawal.status}
                        </div>
                    </div>
                    <div className="text-right flex items-center justify-between w-full">
                        <div className="text-xs mt-1 text-(--text-color)">
                            {withdrawal.timestamp}
                        </div>
                        <div className="text-(--text-color) text-lg mt-1">
                            {withdrawal.amount.toLocaleString()} ฿
                        </div>
                    </div>
                </div>

                <div className={`flex justify-between items-center ${isLightColor(color1) ? 'bg-white/10':'bg-black/40'} rounded-xl px-2 py-1`}>
                    <div className=" text-(--text-color)">
                        <span className="text-(--text-color) text-xs line-clamp-1">เกมที่เล่น: {withdrawal.game}</span>
                    </div>
                    <Button
                        size="sm"
                        className=" Btn1 rounded-full w-8 h-8"
                        isIconOnly
                    >
                      <i className="fa-solid fa-play text-xs "></i>
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
}
