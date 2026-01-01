"use client";

import { fetchWithToken } from "@/utils/fetchUtils";
import { getClientBaseUrl } from "@/utils/url/client";

export const fetchRedeemGiftService = async (code: string): Promise<any> => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        "/giftcode/redeem",
        {
            method: "POST",
            body: JSON.stringify({
                code,
            }),
        }
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};
