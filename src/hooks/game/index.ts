import {
    getGametop10,
    getProviders,
    getSearchProvider,
    getPopularProvider,
    getProvidersOnCategory,
    getGamesOnProviders,
    getPoppularCategory,
    getGameHot,
} from "@/services/game";
import { useFetchData } from "../useFetchData";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    GameProvider,
    top10Game,
    PopularProvider,
    CategoryProvider,
    GameProviderByType,
    CategoryProviderPopuplar,
} from "@/types/games";

export const useHotGames = (search: string | null) => {
    const [data, setData] = useState<top10Game[]>([]);
    const { data: providers_response } = useFetchData(getGameHot, search);
    useEffect(() => {
        if (providers_response) {
            setData(providers_response.data);
        }
    }, [providers_response]);
    return { data };
};

export const useGames = () => {
    const [providers, setProviders] = useState<top10Game[]>([]);

    // const { data: providers_response } = useFetchData(getProviders, "populars");
    // const { data: providers_response } = useFetchData(getProviders, "jackpots");
    // const { data: providers_response } = useFetchData(getProviders, "jackpots");
    const { data: providers_response } = useFetchData(getGametop10, "egames");

    // const { data } = useFetchData(getSearchProvider, "", "");

    useEffect(() => {
        if (providers_response) {
            setProviders(providers_response.data);
        }
    }, [providers_response]);

    return { providers };
};

export const useProviderCategory = (type: string) => {
    const [loading, setLoading] = useState(true);
    const [Provider, setProvider] = useState<CategoryProvider[] | GameProviderByType[]>([]);

    const isPopularGames = useMemo(() => {
        return type === "news" || type === "jackpots" || type === "populars";
    }, [type]);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);

        const fetchData = async () => {
            try {
                const res = isPopularGames
                    ? await getProviders(type)
                    : await getProvidersOnCategory(type);

                if (!cancelled && res?.data) {
                    setProvider(res.data);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchData();

        return () => {
            cancelled = true;
        };
    }, [isPopularGames, type]);

    return { Provider, loading, is_populars_games: isPopularGames };
};

export const useProviderPopuplar = () => {
    const { data: providers_response } = useFetchData(getPoppularCategory);
    const { data: providersTop_response } = useFetchData(getPopularProvider);

    const [popularCategory, setPopularCategory] = useState<CategoryProviderPopuplar[]>([]);
    const [popularProvider, setPopularProvider] = useState<PopularProvider[]>([]);

    useEffect(() => {
        if (providers_response) {
            setPopularCategory(providers_response);
        }

        if (providersTop_response) {
            setPopularProvider(providersTop_response);
        }
    }, [providers_response, providersTop_response]);

    return { popularCategory, popularProvider };
};

export const useGamesProviders = (type: string, provider: string) => {
    const { data: providers_response, loading } = useFetchData(
        getGamesOnProviders,
        type.toLowerCase(),
        provider.toLowerCase(),
    );

    const [total, setTotal] = useState<number>(0);
    const [Provider, setProvider] = useState<GameProviderByType[]>([]);

    useEffect(() => {
        if (providers_response) {
            setProvider(providers_response.data);
            setTotal(providers_response.data_total);
        }
    }, [providers_response]);

    return { Provider, total, loading };
};
