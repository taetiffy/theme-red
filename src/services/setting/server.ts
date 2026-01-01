import { fetchWithoutToken } from "@/utils/fetchUtils";
import { ISettingHost, ISettingSOS } from "@/types/setting";
import { getServerBaseUrl } from "@/utils/url/server";

export const getSettingMeta = async (): Promise<ISettingHost> => {
    const load_setting = await fetchWithoutToken(
        await getServerBaseUrl(),
        "/setting/website",
        { method: "GET" },
        { noStore: true },
    );

    const init_setting = await load_setting.json();

    return init_setting;
};

export const getSOS = async (): Promise<ISettingSOS> => {
    const load_setting = await fetchWithoutToken(
        await getServerBaseUrl(),
        "/sos",
        { method: "GET" },
        { noStore: true },
    );

    const init_setting = await load_setting.json();

    return init_setting;
};