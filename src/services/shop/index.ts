import { ShopItem, ShopTransactins } from "@/types/shop";
import { fetchWithToken } from "@/utils/fetchUtils";
import { getClientBaseUrl } from "@/utils/url/client";

export const fetchShopItemsService = async (): Promise<ShopItem[]> => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        `/shop`,
        {
            method: "GET",
        },
        { noStore: true },
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};

export const fetchShopExchangeService = async (gem: number): Promise<any> => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        "/shop/exchange",
        {
            method: "POST",
            body: JSON.stringify({
                gem,
            }),
        }
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};

export const fetchShopTransactionsService = async (
    pages: number = 1,
    page_size: number = 10,
): Promise<ShopTransactins> => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        `/shop/transactions?page=${pages}&page_size=${page_size}`,
        {
            method: "GET",
        },
        { noStore: true },
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};

export const buyItemService = async (id: string, qty: number): Promise<{ message: string }> => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        "/shop",
        {
            method: "POST",
            body: JSON.stringify({ id, qty }),
        }
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};
