"use client";

import { useState, useEffect, useCallback } from "react";

export const useFetchData = <T, A extends any[]>(
    service: (...args: A) => Promise<T>,
    ...args: A
) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        service(...args)
            .then((res) => {
                if (isMounted) setData(res);
            })
            .catch((err) => {
                if (isMounted) setError(err.message || "Unknown error");
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [...args]);

    const refresh = useCallback(() => {
        setLoading(true);
        service(...args)
            .then((res) => setData(res))
            .catch((err) => setError(err.message || "Unknown error"))
            .finally(() => setLoading(false));
    }, []);

    return { data, loading, error, refresh };
};
