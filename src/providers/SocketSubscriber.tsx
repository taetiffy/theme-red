"use client"

import { getTokenFromCookie } from '@/utils/cookieUtils';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useWebSocket } from '@/hooks/useWebSocket';
import { WebSocketEvent } from '@/contexts/WebSocketContext';
import { InventoryType, useMemberStore } from '@/stores/member';
import { useModal } from '@/hooks/useModal';

export default function SocketSubscriber() {

    //////////////////////////////////////////////////////
    ///                 PROCESS SECTION                ///
    //////////////////////////////////////////////////////

    const { setMember, logout, setBalance, setInventory, setRank } = useMemberStore();
    const { realtimeAlert } = useModal();

    // อัพเดทการแจ้งเตือน
    const onNotify = (data: any) => {
        toast.success(data?.detail);
        if (data.type === "ADD_BALANCE") {
            // onOpen("CLOSE-MODAL-DUMMY");
        }
    };

    // ฟังก์ชันที่ทำงานเมื่อได้รับการอัพเดทข้อมูลผู้ใช้
    const onUpdateMember = (data: {
        accessToken?: string;
        member?: {
            username?: string;
            real_username?: string;
            phone?: string;
            text_password?: string;
            full_name?: string;
            bonus_status?: boolean;
            affiliateCode?: string;
        },
        balance?: {
            credit?: number;
            gem?: number;
            bonus?: number;
            returnLost?: number;
        },
        frame?: string;
        rank?: {
            level?: number;
            exp?: number;
            progress?: number;
            total?: number;
        },
        inventory?: Array<InventoryType>,
        bonus?: {
            id: string;
            status: boolean;
            memberId: string;
            turnover: number;
            checkinId: string | null;
            createdAt: Date;
            updatedAt: Date;
            bonusadmin: any;
            bonusadminId: string;
            currentBonus: number;
            totalBalance: number;
            accountBalance: number;
        },
        alert?: Array<{ type: "RANK_UP", name: string, level: number } | { type: "LEVEL_UP", level: number } | { type: "ITEM", name: string, image: string }>
    }) => {
        // ตรวจสอบว่า token ตรงกับที่มีอยู่หรือไม่
        if (data.accessToken) {
            if (data.accessToken !== getTokenFromCookie()) {
                logout();
                return;
            }
        }
        if (data.member) setMember(data.member);
        // if (data.frame) setFrame(data.frame);
        if (data.rank) setRank(data.rank);
        if (data.balance) setBalance(data.balance);
        // if (data.bonus) setBonus(data.bonus);
        if (data.inventory) {
            const final = [...data.inventory, ...Array(36 - data.inventory.length).fill(null)];
            setInventory(final);
        }
        if (data.alert && data.alert.length > 0) {
            for (const dx of data.alert) toast.success(dx.type === "RANK_UP" ? `ยินดีด้วยแรงค์คุณได้อัพเป็น ${dx.name}` : (dx.type === "LEVEL_UP" ? `ยินดีด้วยเลเวลอัพเป็น ${dx.level}` : (dx.type === "ITEM" ? `คุณได้รับไอเทม ${dx.name}` : "")));
            realtimeAlert.setData(data.alert);
            if (realtimeAlert.state.onOpen) realtimeAlert.state.onOpen();
        }
    };

    const { subscribe } = useWebSocket();

    useEffect(() => {
        const unsubscribe = subscribe((msg) => {

            if (msg.type === 'broadcast') {

                const onTest = (data: any) => toast.success(data);
                switch (msg.pattern) {
                    case WebSocketEvent.TEST: onTest(msg.data);
                        break;
                    default: break;
                }

            } else if (msg.type === "direct") {

                switch (msg.pattern) {
                    case WebSocketEvent.NOTIFY: onNotify(msg.data);
                        break;
                    case WebSocketEvent.UPDATE_MEMBER: onUpdateMember(msg.data);
                        break;
                    default: break;
                }

            }

        });

        return unsubscribe; // cleanup
    }, [subscribe]);

    return null;

}