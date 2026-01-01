"use client";

import { Mission } from "@/types/mission";
import { fetchWithToken } from "@/utils/fetchUtils";
import { getClientBaseUrl } from "@/utils/url/client";

export const fetchMissionService = async (): Promise<Mission[]> => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        "/mission",
        {
            method: "GET",
        },
        { noStore: true },
    );

    const data = await response.json();

    if (response.ok) return data.data.missions;

    throw new Error(data.message);
};

export const fetchMissionClaimService = async (id: string | number): Promise<any> => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        `/mission/claim/${id}`,
        {
            method: "GET",
        },
        { noStore: true },
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};
