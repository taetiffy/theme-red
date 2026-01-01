export interface IMember {
    id: string;
    exp: number;
    email: any;
    level: number;
    phone: string;
    lineid: string;
    social: string;
    userId: string;
    turnover: number;
    full_name: string;
    MemberBonus: any[];
    bonus_status: boolean;
    affiliateCode: string;
    exp_progress: string;
    exp_total: number;
    frame: any;
    bonus_data?: any;
}

export interface ResponseUser {
    id: string;
    username: string;
    real_username: any;
    text_password: string;
    accessToken: string;
    pgaccessToken: any;
    returnLost: number;
    returnLostCalculate: number;
    returnLostSlot: number;
    returnCommission: number;
    returnCommissionCalculate: number;
    returnCommissionSlot: number;
    accountBalance: number;
    accountGems: number;
    role: string;
    createdAt: string;
    updatedAt: string;
    member: IMember;
    inventories: InventoryType[];
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