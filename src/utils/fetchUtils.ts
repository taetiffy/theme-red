import { getTokenFromCookie } from "./cookieUtils";

interface CacheOptions {
    revalidate?: number;
    noStore?: boolean;
    tags?: string[];
}

const CACHE_CONFIG = {
    // DEFAULT_REVALIDATE: 60,
    DEFAULT_REVALIDATE: 0,
    NO_CACHE: 0,
    UPLOAD_REVALIDATE: 0,
} as const;

const getCacheConfig = (cacheOptions: CacheOptions = {}) => {
    const { revalidate, noStore, tags } = cacheOptions;

    if (noStore) {
        return { cache: "no-store" as const };
    }

    const config: any = { revalidate: revalidate ?? CACHE_CONFIG.DEFAULT_REVALIDATE };

    if (tags && tags.length > 0) {
        config.tags = tags;
    }

    return config;
};

const getCommonRequestOptions = (
    options: RequestInit = {},
    cacheOptions: CacheOptions = {},
    signal: AbortSignal | null = null,
): RequestInit => {
    const requestOptions: RequestInit = {
        ...options,
        headers: {
            Connection: "close",
            "Content-Type": "application/json",
            "Accept-Encoding": "gzip, deflate, br",
            ...options.headers,
        },
        next: getCacheConfig(cacheOptions),
    };

    if (signal) requestOptions.signal = signal;

    return requestOptions;
};

const getUploadRequestOptions = (
    options: RequestInit = {},
    cacheOptions: CacheOptions = {},
    signal: AbortSignal | null = null,
): RequestInit => {
    const requestOptions: RequestInit = {
        ...options,
        headers: {
            Connection: "close",
            ...options.headers,
        },
        next: getCacheConfig(cacheOptions),
    };

    if (signal) requestOptions.signal = signal;

    return requestOptions;
};

export const fetchWithoutToken = async (
    BASE_URL: string,
    url: string,
    options: RequestInit = {},
    cacheOptions: CacheOptions = {},
    signal: AbortSignal | null = null,
): Promise<Response> => {
    try {
        const requestOptions = getCommonRequestOptions(options, cacheOptions, signal);
        const response = await fetch(`${BASE_URL}/api/v3${url}`, requestOptions);
        return response;
    } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
            throw error;
        }
        throw error;
    }
};

export const fetchWithToken = async (
    BASE_URL: string,
    url: string,
    options: RequestInit = {},
    cacheOptions: CacheOptions = {},
    signal: AbortSignal | null = null,
): Promise<Response> => {
    try {
        const token = getTokenFromCookie();
        const requestOptions = getCommonRequestOptions(options, cacheOptions, signal);
        if (token) {
            requestOptions.headers = {
                ...requestOptions.headers,
                Authorization: `Bearer ${token}`,
            };
        }
        const response = await fetch(`${BASE_URL}/api/v3${url}`, requestOptions);
        return response;
    } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
            throw error;
        }
        throw error;
    }
};

export const fetchUploadWithToken = async (
    BASE_URL: string,
    url: string,
    options: RequestInit = {},
    cacheOptions: CacheOptions = { noStore: true },
    signal: AbortSignal | null = null,
): Promise<Response> => {
    try {
        const token = getTokenFromCookie();
        const requestOptions = getUploadRequestOptions(options, cacheOptions, signal);

        if (token) {
            requestOptions.headers = {
                ...requestOptions.headers,
                Authorization: `Bearer ${token}`,
            };
        }

        const response = await fetch(`${BASE_URL}/api/v3${url}`, requestOptions);

        return response;
    } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
            throw error;
        }
        throw error;
    }
};
