export type CheckInType = "GEMS" | "ITEM" | "CREDIT" | null;

export default interface DailyInterface {
    id: string;
    day: number;
    type: CheckInType;
    claim: boolean;
    typeMessage: string;
    quantity: number;
    thumbnail: string;
    conditionType: string;
    conditionRange: number;
    conditionMessage: string;
}
