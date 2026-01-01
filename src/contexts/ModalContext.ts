"use client"

import { UseCustomDisclosureReturn } from '@/hooks/useCustomDisclosure';
import { createContext } from 'react';
import { Mission } from '@/types/mission'

interface ModalContextInterface {
    signin: UseCustomDisclosureReturn;
    signup: UseCustomDisclosureReturn;
    gemReward: UseCustomDisclosureReturn;
    checkIn: UseCustomDisclosureReturn;
    deposit: UseCustomDisclosureReturn;
    payment: UseCustomDisclosureReturn<{ qrcode: string; amount: number; type: string, expiredAt: string }>;
    depositDetails: UseCustomDisclosureReturn<{ accountNo: string; bankCode: string; fullName: string; amount: number;}>
    withdraw: UseCustomDisclosureReturn;
    creditFree: UseCustomDisclosureReturn;
    coupon: UseCustomDisclosureReturn;
    commission: UseCustomDisclosureReturn;
    backpack: UseCustomDisclosureReturn;
    cashback: UseCustomDisclosureReturn;
    drawerMenu: UseCustomDisclosureReturn;
    demoWithData: UseCustomDisclosureReturn<{ message: string }>;
    resetPass: UseCustomDisclosureReturn;
    detailCommission: UseCustomDisclosureReturn;
    missionDetail: UseCustomDisclosureReturn<{ missiondata: Mission }, { acceptQuest?: () => void }>
    shopHistory: UseCustomDisclosureReturn;
    rewardWheelAlert: UseCustomDisclosureReturn<{ reward: string }>;
    AddBank: UseCustomDisclosureReturn;
    confirmpop: UseCustomDisclosureReturn<{ name: string }, { confirm: () => void }>
    notification: UseCustomDisclosureReturn<{ value: Array<{ id: string; img: string; innerHtml: { __html: string | TrustedHTML; }}> }>;
    promotionDetail: UseCustomDisclosureReturn<{ bonus_img: string; detail: string; name: string; status: boolean; }>;
    realtimeAlert: UseCustomDisclosureReturn<Array<{ type: "RANK_UP", name: string, level: number } | { type: "LEVEL_UP", level: number } | { type: "ITEM", name: string, image: string }>>;
}

const ModalContext = createContext<ModalContextInterface>({} as ModalContextInterface);
export default ModalContext
