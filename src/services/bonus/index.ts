"use client";

import { fetchWithToken } from "@/utils/fetchUtils";
import { buildAuthorizeHeader } from "../cookies";
import { BonusAdmin, ReceiveUserBonusResponse } from "@/types/bonus";
import { getClientBaseUrl } from "@/utils/url/client";

export const ReceiveUserBonusService = async (id: string): Promise<ReceiveUserBonusResponse> => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        "/bonus",
        {
            method: "POST",
            body: JSON.stringify({ id }),
            headers: await buildAuthorizeHeader(),
        }
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};

export const clearBonusService = async (): Promise<{ message: string }> => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        "/member/clear/bonus",
        {
            method: "PATCH",
            cache: "no-store",
            headers: await buildAuthorizeHeader(),
        }
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};

export const fetchBonusService = async (): Promise<BonusAdmin[]> => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        "/bonus/",
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

export const fetchUserBonusService = async (): Promise<{
    bonus_img: string;
    detail: string;
    name: string;
    status: boolean;
}> => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        "/bonus/status",
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


export const fetchPatchBonusService = async () => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        "/bonus/status",
        {
            method: "PATCH",
            headers: await buildAuthorizeHeader(),
            body: JSON.stringify({})
        }
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};

export const fetchBonusDetails = async (amount: number): Promise<any> => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        `/member/bonus-checked/${amount}`,
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
