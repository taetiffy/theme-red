import { create } from "zustand";

type MenuType = {
    id: string;
    sort: number;
    src: string;
    title: string;
    onOpen: string;
    disable: boolean;
};

type CategoryType = {
    id: string;
    sort: number;
    src: string;
    title: string;
    title_en: string;
    href: string;
    disable: boolean;
};

type rankType = {
    img: string;
    name: string;
    sort: number;
    start: number;
    end: number;
    commission: number;
    commissionSlot: number;
    loss: number;
    lossSlot: number;
};

interface ShareContextInterface {
    user: {
        userBankName: boolean;
        allIn: boolean;
        payment: string;
        quickDeposit: boolean;
        slipsDeposit: boolean;
        integerDeposit: boolean;
        integerWithdraw: boolean;
    };
    announce_commission: string;
    line: {
        link: string;
        value: string;
        status: boolean;
    };
    telegram: {
        link: string;
        value: string;
        status: boolean;
    };
    banners: {
        imgs: Array<string>;
        mini: {
            img1: string;
            img2: string;
        };
    };
    announcement: string;
    gem_to_credit_rate: number;
    web_name: string;
    web_play: string;
    web_logo: string;
    footherDetail: string;
    bank_deposit_setting: {
        use: boolean;
        min: number;
        max: number;
    };
    gateway_deposit_setting: {
        use: boolean;
        min: number;
        max: number;
    };
    bank_withdraw_setting: {
        use: boolean;
        auto: {
            status: boolean;
            manual: number;
        };
        min: number;
        max: number;
        limit: number;
    };
    gateway_withdraw_setting: {
        use: boolean;
        auto: {
            status: boolean;
            manual: number;
        };
        min: number;
        max: number;
        limit: number;
    };
    method_of_withdraw: {
        type: "BANK" | "GATEWAY";
    };
    menu: Array<MenuType>;
    category: Array<CategoryType>;
    rank: Array<rankType>;
    icon: {
        quest: string;
        backpack: string;
        rank: string;
        hitGame: string;
        newGame: string;
        jackpotGame: string;
    };
    gameStat: {
        game_name: boolean;
        vender_name: boolean;
        jackpot_show: boolean;
        withdraw_show: boolean;
    };
    affiliateBanner: Array<string>;
}

const defaultState = {
    user: {
        userBankName: false,
        allIn: false,
        payment: "QRCODE",
        quickDeposit: false,
        slipsDeposit: false,
        integerDeposit: false,
        integerWithdraw: false
    },
    announce_commission: "",
    line: { link: "", value: "", status: false },
    telegram: { link: "", value: "", status: false },
    banners: {
        imgs: [],
        mini: {
            img1: "",
            img2: "",
        },
    },
    announcement: "",
    gem_to_credit_rate: 999999,
    web_name: "",
    web_play: "",
    web_logo: "",
    footherDetail: "",
    bank_deposit_setting: {
        use: false,
        max: 0,
        min: 0,
    },
    gateway_deposit_setting: {
        use: false,
        max: 0,
        min: 0,
    },
    bank_withdraw_setting: {
        use: false,
        auto: {
            status: false,
            manual: 0,
        },
        min: 0,
        max: 0,
        limit: 0,
    },
    gateway_withdraw_setting: {
        use: false,
        auto: {
            status: false,
            manual: 0,
        },
        min: 0,
        max: 0,
        limit: 0,
    },
    method_of_withdraw: {
        type: "BANK",
    },
    menu: [],
    category: [],
    rank: [],
    icon: {
        quest: "",
        backpack: "",
        rank: "",
        hitGame: "",
        newGame: "",
        jackpotGame: "",
    },
    gameStat: {
        game_name: false,
        vender_name: false,
        jackpot_show: true,
        withdraw_show: true,
    },
    affiliateBanner: [],
} as ShareContextInterface;

interface ShareStore {
    state: ShareContextInterface;
    setState: (data: ShareContextInterface) => void;
}

export const useShareStore = create<ShareStore>()((set) => ({
    state: defaultState,
    setState: (data) => set({ state: data }),
}));
