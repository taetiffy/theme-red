"use client"

import { fetchWithoutToken, fetchWithToken } from "@/utils/fetchUtils";
import { getClientBaseUrl } from "@/utils/url/client";
import { buildAuthorizeHeader } from "../cookies";
import { INotification } from "@/types/notification";
import { NewsNotificationsPopup } from "@/types/notification";

export const getNotificationService = async (): Promise<INotification[]> => {
    const response = await fetchWithoutToken(getClientBaseUrl(), "/member/notification", {
        method: "GET",
        headers: await buildAuthorizeHeader(),
    });

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
}

export const readNotificationService = async () => {
    const response = await fetchWithoutToken(getClientBaseUrl(), "/member/read-notification", {
        method: "PATCH",
        headers: await buildAuthorizeHeader(),
    });

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
}

export const newNotificationPopupService = async ():Promise<Array<NewsNotificationsPopup>> =>{
    const response = await fetchWithToken(getClientBaseUrl(), "/member/popup-notification", {
        method: "GET",
        headers: await buildAuthorizeHeader(),
    });

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
}