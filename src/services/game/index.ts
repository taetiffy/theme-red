"use client";

import { fetchWithoutToken, fetchWithToken } from "@/utils/fetchUtils";
import { buildAuthorizeHeader } from "../cookies";
import { GameType, GameProviderApiResponse, CategoryProvider, SearchProviderCategoryApiResponse } from "@/types/games";
import { getClientBaseUrl } from "@/utils/url/client";

export const getProviders = async function (type: string): Promise<GameProviderApiResponse> {
    let Link = `/game/list/${type.toUpperCase()}`;

    if (type == "news" || type == "jackpots" || type == "populars") {
        Link = `/game/getPopularGame?type=${type.toUpperCase()}`;
    }

    const response = await fetchWithToken(
        getClientBaseUrl(),
        Link,
        { method: "GET", headers: await buildAuthorizeHeader() },
        { noStore: true },
    );

    if (response.ok) return await response.json();

    throw new Error();
};

export const getBasicGames = async function (type: GameType, provider: string) {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        `/game/getGames?category=${type.toUpperCase()}&provider=${provider.toUpperCase()}&page=1&page_size=32`,
        { method: "GET", headers: await buildAuthorizeHeader() },
        { noStore: true },
    );

    if (response.ok) {
        return await response.json();
    } else {
        return false;
    }
};

export const getPopularProvider = async function () {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        `/game/popuplar-provider`,
        { method: "GET", headers: await buildAuthorizeHeader() },
        { noStore: true },
    );

    if (response.ok) {
        return await response.json();
    } else {
        return false;
    }
};

export const getSearchProvider = async (type: string, name: string) => {
    let response_target = `/game/getSearchProvider?category=${type.toUpperCase()}&search=${name}`;
    if (type == "news" || type == "jackpots" || type == "populars") {
        response_target = `/game/getSearchGame?category=${type.toUpperCase()}&provider=null&search=${name}`;
    }

    const response = await fetchWithoutToken(
        getClientBaseUrl(),
        response_target,
        {
            method: "GET",
        },
        { noStore: true },
    );
    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};

export const getGametop10 = async (topgame: string) => {
    const response = await fetchWithoutToken(
        getClientBaseUrl(),
        `/game/top10/${topgame.toUpperCase()}`,
        {
            method: "GET",
        },
        { noStore: true },
    );
    const data = await response.json();
    if (response.ok) return data;

    throw new Error(data.message);
};

export const getGameHot = async (search: string | null = null) => {
    const response = await fetchWithoutToken(
        getClientBaseUrl(),
        `/game/hot?search=${search}`,
        {
            method: "GET",
        },
        { noStore: true },
    );
    const data = await response.json();
    if (response.ok) return data;

    throw new Error(data.message);
};

export const getProvidersOnCategory = async (
    category: string,
): Promise<SearchProviderCategoryApiResponse> => {
    const response = await fetchWithoutToken(
        getClientBaseUrl(),
        `/game/getSearchProvider?category=${category.toUpperCase()}`,
        {
            method: "GET",
        },
        { noStore: true },
    );
    const data = await response.json();
    if (response.ok) return data;
    throw new Error(data.message);
};

export const getPoppularCategory = async () => {
    const response = await fetchWithoutToken(
        getClientBaseUrl(),
        `/game/popuplar-game-category`,
        {
            method: "GET",
        },
        { noStore: true },
    );
    const data = await response.json();
    if (response.ok) return data;
    throw new Error(data.message);
};

export const getGamesOnProviders = async (category: string, provider: string) => {
    const response = await fetchWithoutToken(
        getClientBaseUrl(),
        `/game/getSearchGame?category=${category.toUpperCase()}&provider=${provider?.toUpperCase()}`,
        {
            method: "GET",
        },
        { noStore: true },
    );
    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.message);
};

export const getProvidersPROMAX = async (category: string) => {
    const response = await fetchWithoutToken(
        getClientBaseUrl(),
        `/game/getProvider?category=${category.toUpperCase()}`,
        {
            method: "GET",
        },
        { noStore: true },
    );
    const data = await response.json();
    if (response.ok) return data;

    throw new Error(data.message);
};
