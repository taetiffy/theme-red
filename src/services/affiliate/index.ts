"use client";

import { fetchWithToken } from "@/utils/fetchUtils";
import { buildAuthorizeHeader } from "../cookies";
import { getClientBaseUrl } from "@/utils/url/client";

export const getAffiliate = async function (): Promise<{data: Array<{ username: string, step: number, createdAt: string }>, length: number}> {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        "/member/affiliate",
        { method: "GET", headers: await buildAuthorizeHeader() },
        { noStore: true },
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};

export const getAffiliateStatistics = async function () {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        "/member/affiliate/statistics",
        { method: "GET", headers: await buildAuthorizeHeader() },
        { noStore: true },
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};

export const getRevenueShareService = async (): Promise<{ commission: number }> => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        "/member/affiliate/revenue-share",
        { method: "GET", headers: await buildAuthorizeHeader() },
        { noStore: true },
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};

export const claimCommission = async (): Promise<{ commission: number }> => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        "/member/return-commission",
        { method: "PATCH", headers: await buildAuthorizeHeader() },
        { noStore: true },
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};

export const claimReturnLoss = async (): Promise<{ commission: number }> => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        "/member/claim-return-lost",
        { method: "PATCH", headers: await buildAuthorizeHeader() },
        { noStore: true },
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};

export const claimAffiliate = async (): Promise<{ commission: number }> => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        "/member/affiliate/claim-revenue-share",
        { method: "PATCH", headers: await buildAuthorizeHeader() },
        { noStore: true },
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};