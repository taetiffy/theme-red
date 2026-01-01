"use client";

import { fetchWithToken } from "@/utils/fetchUtils";
import { buildAuthorizeHeader } from "../cookies";
import { BetTransactionHistory, TransactionHistory, MissionsHistroy, TruemoneyWalletHook } from "@/types/transaction";
import { getClientBaseUrl } from "@/utils/url/client";
import { fetchUploadWithToken } from "@/utils/fetchUtils";

export interface IDeposit {
    channel: "BANK" | "GATEWAY" | "WALLET";
    amount: number;
    user_bank_id: string;
    system_bank_id: string;
    promotion_id: string;
}

export interface SDeposit {
    amount: number;
    bankId: string;
    system_bank_id: string;
    promotion_id: string;
    file?: File;
}

export interface ReceiverDeposit {
    accountNo: string;
    bankCode: string;
    fullName: string;
}

export const depositService = async ({
    promotion_id,
    system_bank_id,
    user_bank_id,
    amount,
    channel,
}: IDeposit) => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        "/transactions/deposit",
        {
            method: "POST",
            body: JSON.stringify({
                channel: channel,
                amount: amount,
                user_bank_id,
                system_bank_id,
                promotion_uuid: promotion_id,
            }),
            headers: await buildAuthorizeHeader(),
        }
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};

export const depositMultiService = async ({
    promotion_id,
    system_bank_id,
    user_bank_id,
    amount,
    channel,
}: IDeposit) => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        "/transactions/multi-deposit",
        {
            method: "POST",
            body: JSON.stringify({
                channel: channel,
                amount: amount,
                user_bank_id,
                system_bank_id,
                promotion_uuid: promotion_id,
            }),
            headers: await buildAuthorizeHeader(),
        }
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};


export const depositGatewayService = async ({
    promotion_id,
    system_bank_id,
    user_bank_id,
    amount,
    channel,
}: IDeposit) => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        "/gateway/create-gateway",
        {
            method: "POST",
            body: JSON.stringify({
                bankId: user_bank_id,
                balance: amount
            }),
            headers: await buildAuthorizeHeader(),
        }
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};

export const depositSlipsService = async ({
    promotion_id,
    system_bank_id,
    bankId,
    amount,
    file
}: SDeposit) => {
    if (!file) {
        alert("กรุณาอัปโหลดสลิปการโอนเงิน");
        return;
    }
    const formData = new FormData();
    formData.append("bankId", bankId);
    formData.append("system_bank_id", system_bank_id);
    formData.append("amount", amount.toString());
    formData.append("file", file);
    const response = await fetchUploadWithToken(
        getClientBaseUrl(),
        "/gateway/create-slips",
        {
            method: "POST",
            body: formData,
            headers: await buildAuthorizeHeader(),
        }
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};

export interface IWithdraw {
    bankId: string;
    amount: number;
}

export const withdrawService = async ({ amount, bankId }: IWithdraw) => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        "/transactions/withdraw",
        {
            method: "POST",
            body: JSON.stringify({
                bankId,
                amount,
            }),
            headers: await buildAuthorizeHeader(),
        }
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};

export const missionsHistroy = async (
    date: "all" | "1" | "7" | "30" = "all"
): Promise<Array<MissionsHistroy>> => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        `/transactions/mission-reward?date=${date}`,
        {
            method: "GET",
            headers: await buildAuthorizeHeader(),
        },
        { noStore: true },
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
}


export const transactionHistoryService = async (
    date: "all" | "1" | "7" | "30" = "all",
    type: "all" | "deposit" | "withdraw" = "all",
    status: "all" | "success" | "pending" | "manual" | "revoke" | "fail" = "all"
): Promise<Array<TransactionHistory>> => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        `/transactions?date=${date}&type=${type}&status=${status}`,
        {
            method: "GET",
            headers: await buildAuthorizeHeader(),
        },
        { noStore: true },
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};


export const betTransactionHistoryService = async (date: "all" | "1" | "7" | "30" = "all"): Promise<Array<BetTransactionHistory>> => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        `/transactions/bett-transactions?date=${date}`,
        {
            method: "GET",
            headers: await buildAuthorizeHeader(),
        },
        { noStore: true },
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};


export const fetchSystemWallets = async (): Promise<Array<TruemoneyWalletHook>> => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        `/setting/wallet/truemoney`,
        {
            method: "GET",
            headers: await buildAuthorizeHeader(),
        },
        { noStore: true },
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};
