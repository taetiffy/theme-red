import { buildAuthorizeHeader } from "@/services/cookies";
import { BonusAdmin } from "@/types/bonus";
import { fetchWithToken } from "@/utils/fetchUtils";
import { getServerBaseUrl } from "@/utils/url/server";
import { Suspense, lazy } from "react";
const Client = lazy(() => import('./client'))
// import { fetchBonusService } from "@/services/bonus";

export const dynamic = "force-dynamic";

// มา refactor กันเอาเองนะครับ ใช้ชั่วคราว
// มา refactor กันเอาเองนะครับ ใช้ชั่วคราว
// มา refactor กันเอาเองนะครับ ใช้ชั่วคราว
const fetchBonusService = async (): Promise<BonusAdmin[]> => {
    const response = await fetchWithToken(
        await getServerBaseUrl(),
        "/bonus/",
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

export default async function Page() {
    const bonus = await fetchBonusService();

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Client bonus={bonus} />
        </Suspense>
    );
}
