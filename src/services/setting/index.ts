"use client";

import { ISetting } from "@/types/setting";
import { fetchWithToken } from "@/utils/fetchUtils";
import { getClientBaseUrl } from "@/utils/url/client";
import { ISettingHost } from "@/types/setting";

export const getSettingRequest = async (): Promise<ISetting> => {
    const load_setting = await fetchWithToken(
        getClientBaseUrl(),
        "/setting/load/init",
        { method: "GET" },
        { noStore: true },
    );

    const init_setting = await load_setting.json();

    return init_setting;
};