export interface NoDataModal {
    isOpen: boolean;
    onClose: () => void;
}
//////////////////////////////////////////////////

export interface DataModal<T> {
    isOpen: boolean;
    onClose: () => void;
    data: T;
}


//////////////////////////////////////////////////
export interface PaymentSend {
    yourBank: string;
    myBank:string;
    money:string;
    promotion:string;
    senderBank: string;
    receiveBank: string;
    file?: File;
}

//////////////////////////////////////////////////

export interface WheelReward {
    reward: string;
}