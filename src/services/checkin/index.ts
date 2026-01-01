"use client";

import DailyInterface from "@/types/checkIn";
import { fetchWithToken } from "@/utils/fetchUtils";
import { getClientBaseUrl } from "@/utils/url/client";

export const getDailyCheckInService = async (): Promise<DailyInterface[]> => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        `/checkin/days?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}`,
        { method: "GET" },
        { noStore: true },
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};

export const claimCheckInService = async (checkinId: string) => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        `/checkin/claims`,
        {
            method: "POST",
            body: JSON.stringify({
                checkinId: checkinId,
            }),
        }
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};
