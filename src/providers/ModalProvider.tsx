"use client"

import ModalContext from '@/contexts/ModalContext';
import useCustomDisclosure, { UseCustomDisclosureReturn } from '@/hooks/useCustomDisclosure';
import { useMemberStore } from '@/stores/member';
import { Spinner } from '@heroui/react';
import { lazy, PropsWithChildren, Suspense, useMemo } from 'react';
import { Mission } from '@/types/mission'
import CommonLoading from '@/components/common/CommonLoading';

const modalComponents = {
    signin: lazy(() => import('@/components/Modal/ui/auth/login')),
    signup: lazy(() => import('@/components/Modal/ui/auth/register')),
    gemReward: lazy(() => import('@/components/Modal/ui/Reward')),
    checkIn: lazy(() => import('@/components/Modal/ui/checkIn')),
    deposit: lazy(() => import('@/components/Modal/ui/transaction/Deposit/depositModal')),
    payment: lazy(() => import('@/components/Modal/ui/transaction/Deposit/PaymentGatewayModal')),
    depositDetails: lazy(() => import('@/components/Modal/ui/transaction/Deposit/Payment')),
    withdraw: lazy(() => import('@/components/Modal/ui/transaction/withdraw')),
    creditFree: lazy(() => import('@/components/Modal/ui/Credit')),
    coupon: lazy(() => import('@/components/Modal/ui/coupon')),
    commission: lazy(() => import("@/components/Modal/ui/Commission")),
    backpack: lazy(() => import("@/components/Modal/ui/bag")),
    cashback: lazy(() => import("@/components/Modal/ui/cashBack")),
    demoWithData: lazy(() => import('@/components/Modal/ui/Demo')),
    resetPass: lazy(() => import("@/components/Modal/ui/auth/ResetPass")),
    detailCommission: lazy(() => import("@/components/Modal/ui/DetailCommission")),
    missionDetail: lazy(() => import("@/components/Modal/ui/MissionDetail")),
    shopHistory: lazy(() => import('@/components/Modal/ui/History/shop')),
    notification: lazy(() => import('@/components/Modal/ui/Notification')),
    rewardWheelAlert: lazy(() => import('@/components/Modal/ui/RewardWheel')),
    AddBank: lazy(() => import('@/components/Modal/ui/Addbank')),
    promotionDetail: lazy(() => import('@/components/Modal/ui/PromotionDetail')),
    drawerMenu: lazy(() => import('@/components/specific/BottomBar/DrawerMenu')),
    realtimeAlert: lazy(() => import('@/components/Modal/ui/RealtimeAlert')),
    confirmpop: lazy(() => import('@/components/Modal/ui/Confirm'))
} as const;


type ModalType = keyof typeof modalComponents;


type ModalState = {
    type: ModalType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    disclosure: UseCustomDisclosureReturn<any, any>;
    allowedWhen: boolean;
}


export default function ModalProvider({ children }: PropsWithChildren) {


    const { isAuthenticated } = useMemberStore();


    const signin = useCustomDisclosure();
    const signup = useCustomDisclosure();
    const gemReward = useCustomDisclosure();
    const checkIn = useCustomDisclosure();
    const deposit = useCustomDisclosure();
    const payment = useCustomDisclosure<{ qrcode: string; amount: number; type: string, expiredAt: string }>({ qrcode: "", amount: 0, type: "QR", expiredAt: "" });
    const depositDetails = useCustomDisclosure<{ accountNo: string; bankCode: string; fullName: string; amount: number; }>({ accountNo: "", bankCode: "000", fullName: "", amount: 0 });
    const withdraw = useCustomDisclosure();
    const creditFree = useCustomDisclosure();
    const coupon = useCustomDisclosure();
    const commission = useCustomDisclosure();
    const backpack = useCustomDisclosure();
    const cashback = useCustomDisclosure();
    const drawerMenu = useCustomDisclosure();
    const demoWithData = useCustomDisclosure<{ message: string }>({ message: "Hello World!" });
    const resetPass = useCustomDisclosure();
    const detailCommission = useCustomDisclosure();
    const missionDetail = useCustomDisclosure<{ missiondata: Mission }, { acceptQuest?: () => void }>({ missiondata: {} as Mission });
    const shopHistory = useCustomDisclosure()
    const rewardWheelAlert = useCustomDisclosure<{ reward: string }>({ reward: "" })
    const AddBank = useCustomDisclosure();
    const confirmpop = useCustomDisclosure<{name:string}, {confirm:() => void}>();
    const notification = useCustomDisclosure<{ value: Array<{ id: string; img: string; innerHtml: { __html: string | TrustedHTML; }}> }>({value: []});
    const promotionDetail = useCustomDisclosure<{ bonus_img: string; detail: string; name: string; status: boolean; }>({ bonus_img: "", detail: "", name: "", status: false });
    const realtimeAlert = useCustomDisclosure<Array<{ type: "RANK_UP", name: string, level: number } | { type: "LEVEL_UP", level: number } | { type: "ITEM", name: string, image: string }>>([]);


    const modalStates: ModalState[] = useMemo(
        () => [
            { type: 'signin', disclosure: signin, allowedWhen: !isAuthenticated },
            { type: 'signup', disclosure: signup, allowedWhen: !isAuthenticated },
            { type: 'gemReward', disclosure: gemReward, allowedWhen: isAuthenticated },
            { type: 'checkIn', disclosure: checkIn, allowedWhen: isAuthenticated },
            { type: 'deposit', disclosure: deposit, allowedWhen: isAuthenticated },
            { type: 'payment', disclosure: payment, allowedWhen: isAuthenticated },
            { type: 'depositDetails', disclosure: depositDetails, allowedWhen: isAuthenticated },
            { type: 'withdraw', disclosure: withdraw, allowedWhen: isAuthenticated },
            { type: 'creditFree', disclosure: creditFree, allowedWhen: isAuthenticated },
            { type: 'coupon', disclosure: coupon, allowedWhen: isAuthenticated },
            { type: 'commission', disclosure: commission, allowedWhen: isAuthenticated },
            { type: 'backpack', disclosure: backpack, allowedWhen: isAuthenticated },
            { type: 'cashback', disclosure: cashback, allowedWhen: isAuthenticated },
            { type: 'drawerMenu', disclosure: drawerMenu, allowedWhen: isAuthenticated },
            { type: 'demoWithData', disclosure: demoWithData, allowedWhen: true },
            { type: 'resetPass', disclosure: resetPass, allowedWhen: isAuthenticated },
            { type: 'missionDetail', disclosure: missionDetail, allowedWhen: isAuthenticated },
            { type: 'shopHistory', disclosure: shopHistory, allowedWhen: isAuthenticated },
            { type: 'notification', disclosure: notification, allowedWhen: isAuthenticated },
            { type: 'rewardWheelAlert', disclosure: rewardWheelAlert, allowedWhen: isAuthenticated },
            { type: 'AddBank', disclosure: AddBank, allowedWhen: isAuthenticated },
            { type: 'promotionDetail', disclosure: promotionDetail, allowedWhen: isAuthenticated },
            { type: 'realtimeAlert', disclosure: realtimeAlert, allowedWhen: isAuthenticated },
            { type: 'confirmpop', disclosure: confirmpop, allowedWhen: isAuthenticated }
        ],
        [
            isAuthenticated,
            signin,
            signup,
            gemReward,
            checkIn,
            deposit,
            payment,
            depositDetails,
            withdraw,
            creditFree,
            coupon,
            commission,
            backpack,
            cashback,
            drawerMenu,
            demoWithData,
            resetPass,
            missionDetail,
            shopHistory,
            notification,
            rewardWheelAlert,
            promotionDetail,
            realtimeAlert,
            confirmpop
        ]
    );


    const openModals = useMemo(() => modalStates.filter(modal => modal.disclosure.state.isOpen && modal.allowedWhen), [modalStates]);


    const getModalComponents = () => {
        return openModals.map((modal, index) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const Component = modalComponents[modal.type] as React.ComponentType<any>;
            if (!Component) return null;
            const { type, disclosure } = modal;
            return (
                <Suspense
                    key={type}
                    fallback={<CommonLoading index={index} />}
                >
                    <Component disclosure={disclosure} />
                </Suspense>
            );
        }).filter(Boolean);
    };


    return (
        <ModalContext.Provider
            value={{
                signin,
                signup,
                depositDetails,
                gemReward,
                checkIn,
                deposit,
                payment,
                withdraw,
                creditFree,
                coupon,
                commission,
                backpack,
                cashback,
                drawerMenu,
                demoWithData,
                resetPass,
                detailCommission,
                missionDetail,
                shopHistory,
                notification,
                rewardWheelAlert,
                AddBank,
                promotionDetail,
                realtimeAlert,
                confirmpop
            }}
        >
            {getModalComponents()}
            {children}
        </ModalContext.Provider>
    );

}
