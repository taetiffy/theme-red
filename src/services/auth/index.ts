"use client";

import { fetchWithoutToken, fetchWithToken } from "@/utils/fetchUtils";
import type { ResponseUser } from "./types";
import { buildAuthorizeHeader } from "../cookies";
import { getClientBaseUrl } from "@/utils/url/client";

export const requestOTPService = async (phone: string): Promise<{ ref: string }> => {
    const response = await fetchWithoutToken(getClientBaseUrl(), "/auth/request-otp", {
        method: "POST",
        headers: await buildAuthorizeHeader(),
        body: JSON.stringify({ phone: phone }),
    });

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};

export const verifyOTPService = async (options: { phone: string; otp: string; ref: string }) => {
    const response = await fetchWithoutToken(getClientBaseUrl(), "/auth/verify-otp", {
        method: "POST",
        headers: await buildAuthorizeHeader(),
        body: JSON.stringify(options),
    });

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};

export const signUpService = async (options: {
    ref: string;
    phonenumber: string;
    bankCode: string;
    bankName?: string;
    bankAccount: string;
    password: string;
    refOtp: string;
    otp: string;
    isTruemoney: boolean;
    social: string;
}): Promise<{ username: string; password: string; access_token: string }> => {
    const response = await fetchWithoutToken(getClientBaseUrl(), "/auth/signupWithData", {
        method: "POST",
        headers: await buildAuthorizeHeader(),
        body: JSON.stringify(options),
    });

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};

export const signInService = async (options: {
    username: string;
    password: string;
}): Promise<{ access_token: string }> => {
    const response = await fetchWithoutToken(getClientBaseUrl(), "/auth/signin", {
        method: "POST",
        headers: await buildAuthorizeHeader(),
        body: JSON.stringify(options),
    });

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};

export const fetchMeService = async (): Promise<ResponseUser> => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        "/auth/me",
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

export const logoutService = async () => {};

export const changePasswordService = async ({
    oldPassword,
    newPassword,
    confirmNewPassword,
}: {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}): Promise<void> => {
    const response = await fetchWithToken(getClientBaseUrl(), "/auth/changepassword", {
        method: "PATCH",
        headers: await buildAuthorizeHeader(),
        body: JSON.stringify({
            passwordold: oldPassword,
            passwordnew: newPassword,
            passwordnewconfirm: confirmNewPassword,
        }),
    });

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};

export const getOtpStatus = async (): Promise<{ status: boolean } | null> => {
    const response = await fetchWithToken(getClientBaseUrl(), "/auth/otp-status", {
        method: "GET",
        headers: await buildAuthorizeHeader(),
    });

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};

export const checkPhoneService = async ({ phone }: { phone: string }) => {
    const response = await fetchWithToken(getClientBaseUrl(), "/auth/phone-check", {
        method: "POST",
        headers: await buildAuthorizeHeader(),
        body: JSON.stringify({
            phone,
        }),
    });

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};
