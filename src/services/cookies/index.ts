"use server";

import { cookies } from "next/headers";

export const getClientCookie = async (): Promise<string> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken") ? cookieStore.get("accessToken")?.value : "";

    return token || "";
};

export const buildAuthorizeHeader = async (token?: string) => {
    const _token = token ? token : await getClientCookie();

    return { Authorization: `Bearer ${_token}` };
};
