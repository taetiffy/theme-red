"use client";

import { fetchWithToken } from "@/utils/fetchUtils";
import { getClientBaseUrl } from "@/utils/url/client";

export const getGemService = async (): Promise<{ message: string }> => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        "/member/gemsfree",
        {
            method: "POST",
        }
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};

export const fetchGemService = async (): Promise<{ value: number }> => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        "/member/gemsfree",
        {
            method: "GET",
        },
        { noStore: true },
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};
