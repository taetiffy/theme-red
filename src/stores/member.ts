import { removeTokenFromCookie } from "@/utils/cookieUtils";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IUser {
    username: string;
    real_username: string;
    phone: string;
    text_password: string;
    full_name: string;
    bonus_status: boolean;
    affiliateCode: string;
}

export interface IBalance {
    credit: number;
    gem: number;
    bonus: number;
    returnLost: number;
    untoan_amount: number;
    returnCommission: number;
    comToDay: number;
    lossToDay: number;
}

export interface IRank {
    level: number;
    exp: number;
    progress: number;
    total: number;
}

export interface InventoryType {
    id: string;
    itemId: string;
    memberId: string;
    amount: number;
    info: {
        name: string;
        detail: string;
        item_img: string;
        type: "COUPON_SPIN" | "COUPON_ITEM" | "COUPON_CREDIT" | "COUPON_GEM" | "COUPON_RANDOM_BOX";
        RandomBox?: {
            name: string;
            desc: string;
            box: string;
        };
    };
    items: string[];
}

interface MemberStore {
    isAuthenticated: boolean;
    isInitialized: boolean;
    member: IUser | null;
    balance: IBalance;
    rank: IRank;
    notification: Array<string>;
    inventory: Array<InventoryType | null>;
    contact: boolean;
    setMember: (data: Partial<IUser | null>) => void;
    setInventory: (data: Array<InventoryType>) => void;
    setBalance: (data: Partial<IBalance>) => void;
    setNotification: (data: Array<string>) => void;
    setRank: (data: Partial<IRank>) => void;
    logout: () => void;
    initialize: () => void;
    setContact: (data: boolean) => void;
}

export const useMemberStore = create<MemberStore>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            isInitialized: false,
            logout: () => {
                // remove token and cleanup state
                removeTokenFromCookie();
                set({
                    member: null,
                    isAuthenticated: false,
                    isInitialized: true,
                    inventory: [],
                    balance: {
                        credit: 0,
                        gem: 0,
                        bonus: 0,
                        returnLost: 0,
                        untoan_amount: 0,
                        returnCommission: 0,
                        comToDay: 0,
                        lossToDay: 0,
                    },
                    rank: { exp: 0, progress: 0, total: 0, level: 0 },
                });
            },
            member: null,
            setMember: (data: Partial<IUser | null>) =>
                set((state) => ({
                    member: data ? ({ ...(state.member ?? {}), ...data } as IUser) : null,
                    isAuthenticated: Boolean(data),
                    isInitialized: Boolean(data),
                })),
            balance: {
                credit: 0,
                gem: 0,
                bonus: 0,
                returnLost: 0,
                untoan_amount: 0,
                returnCommission: 0,
                comToDay: 0,
                lossToDay: 0,
            },
            setBalance: (data: Partial<IBalance>) =>
                set((state) => ({
                    balance: { ...state.balance, ...data },
                })),
            notification: [],
            setNotification: (data: Array<string>) =>
                set({
                    notification: data,
                }),
            rank: { exp: 0, progress: 0, total: 0, level: 0 },
            setRank: (data) =>
                set((state) => ({
                    rank: { ...state.rank, ...data },
                })),
            inventory: Array(40).fill(null),
            setInventory: (data: Array<InventoryType>) =>
                set({
                    inventory: data,
                }),
            initialize: () => {
                // ตรวจสอบ auth state จาก localStorage/sessionStorage/cookies
                // หรือทำการ validate token
                // ข้ามไปเพราะทำที่ AuthLayout แล้ว

                // example use
                // ใน layout.tsx หรือ file อื่นๆ
                // useEffect(() => {
                //     useMemberStore.getState().initialize();
                // }, []);
                set({
                    isInitialized: true,
                });
            },
            contact: true,

            setContact: (data: boolean) => set({ contact: data }),
        }),
        {
            name: "member-store",
            onRehydrateStorage: () => (state) => {
                // เรียก initialize หลังจาก rehydrate เสร็จ
                if (state) {
                    state.initialize();
                }
            },
        },
    ),
);
