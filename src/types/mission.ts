export interface Mission {
    id: string;
    name: string;
    detail: string;
    minlevel: number;
    maxlevel: number;
    amount: number;
    total: number;
    mission_img: string;
    level: number;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
    betAmount: number;
    betEpoch: number;
    playEpoch: number;
    playGame: PlayGame;
    depositAmount: DepositAmount;
    deposit: number;
    onlineAmount: number;
    rewards: Reward[];
    rankId: string;
    claimMission: any[];
    result: Result;
    game: any;
    isComplete: boolean;
    checkconditions: Checkcondition[];
}

export interface PlayGame {
    amount: string;
    gameId: string;
    providerId: string;
}

export interface DepositAmount {
    value: number;
    depositDate: number;
}

export interface Reward {
    type: string;
    value: string;
}

export interface Result {
    betEpoch: number;
    playEpoch: number;
    betAmount: number;
    playGame: number;
    deposite: number;
    depositeStack: number;
}

export interface Checkcondition {
    type: string;
    message: string;
    complete: boolean;
    now: number;
    end: number;
}
