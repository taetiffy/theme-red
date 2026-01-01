"use client";

import { BankApiResponse, BankSettingApiResponse } from "@/types/bankLists";
import { fetchWithToken } from "@/utils/fetchUtils";
import { buildAuthorizeHeader } from "../cookies";
import { getClientBaseUrl } from "@/utils/url/client";

export const getMemberBankService = async (): Promise<BankApiResponse[]> => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        "/member/bank",
        { method: "GET", headers: await buildAuthorizeHeader() },
        { noStore: true },
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};

export const getSettingBanksService = async (): Promise<BankSettingApiResponse[]> => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        "/setting/bank/BANK",
        { method: "GET", headers: await buildAuthorizeHeader() },
        { noStore: true },
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};

export const createBankService = async (bankName: string, bankCode: string, bankNumber: string) => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        "/member/bank",
        {
            method: "POST",
            headers: await buildAuthorizeHeader(),
            body: JSON.stringify({ bank_name: bankName, bank_code: bankCode, bank_number: bankNumber })
        },
        { noStore: true }
    );
    const data = await response.json();
    if (response.ok) return data;
    throw new Error(data.message);
}
