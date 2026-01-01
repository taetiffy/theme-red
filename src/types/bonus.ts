export interface ReceiveUserBonusResponse {
    id: string;
    checkinId: any;
    accountBalance: number;
    totalBalance: number;
    currentBonus: number;
    turnover: number;
    status: boolean;
    memberId: string;
    bonusadminId: string;
    createdAt: string;
    updatedAt: string;
    txId: any;
    bonusadmin: BonusAdmin;
}

export interface BonusAdmin {
    id: string;
    name: string;
    type: string;
    detail: string;
    deposit_min: number;
    deposit_max: number;
    bonus_type: string;
    bonus_amount: number;
    bonus_total: number;
    untoan_type: string;
    untoan_amount: number;
    turn_type: string;
    turn_amount: number;
    clear_bill: number;
    freecredit: number;
    condition: Condition[];
    day_can_receive: string[];
    categorygame: string[];
    gamelist: string[];
    startedAt: string;
    endedAt: string;
    start_time: string;
    end_time: string;
    bonus_img: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Condition {
    type: string;
    label: string;
    value: string;
}

