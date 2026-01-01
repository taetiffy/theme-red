export type BankLists = {
    type: string;
    name: string;
    image: string;
    alt: string;
    code: string;
    validate: Array<number>;
    gradient: string;
};

export interface BankApiResponse {
    id: string;
    bank_name: string;
    bank_number: string;
    bank_code: string;
    memberId: string;
    createdAt: string;
}

export interface BankSettingApiResponse {
    id: string;
    code: string;
    name: string;
    number: string;
    createdAt: string;
}