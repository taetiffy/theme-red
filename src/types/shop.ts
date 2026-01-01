export interface Reward {
    id: string | number;
    title: string;
    price: string;
    image: string;
    description: string;
    buttonText: string;
}

export interface Credit {
    id: string | number;
    title: string;
    price: string;
    buttonText: string;
}

export interface Cash {
    id: string | number;
    title: string;
    price: string;
    buttonText: string;
}

export interface ShopItem {
    id: string;
    price: number;
    itemId: string;
    priceType: string;
    createdAt: string;
    updatedAt: string;
    item: Item;
}

export interface Item {
    id: string;
    name: string;
    detail: string;
    type: string;
    qty: number;
    itemId: any;
    item_img: string;
    spinWheelId?: string;
    bonus: Bonus;
    createdAt: string;
    updatedAt: string;
    randomBoxId: any;
}

export interface Bonus {
    used: boolean;
    games: string[];
    providers: string[];
    turn_type: string;
    clear_bill: number;
    turn_amount: number;
    untoan_type: string;
    untoan_amount: number;
}

export interface ShopTransactins {
    page: number;
    page_size: number;
    page_total: number;
    data_total: number;
    data: ShopTransaction[];
}

export type ShopTransaction = {
    id: string;
    name: string; // ชื่อรายการ: ชื่อไอเทมที่ซื้อ & แลกเครดิต
    type: "BUY" | "EXCHANGWE"; // ประเภท shop action
    rate: number;      // exchange rate
    price: number;     // ราคา / เรท (gem)
    quantity: number;  // จำนวนไอเทมที่ซื้อ
    priceType: "CREDIT" | "DIAMOND";
    thumbnail?: string; // รูปสำหรับไอเทม
    createdAt: string;
};