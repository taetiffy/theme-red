import { getTokenFromCookie } from "@/utils/cookieUtils";

export const fetcher = async (url: string, options?: RequestInit) => {

    const token = getTokenFromCookie();
    const headers = new Headers(options?.headers);

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const res = await fetch(url, {
        ...options,
        headers,
        cache: "no-store", // ป้องกัน Next.js cache
    });

    if (!res.ok) {
        const error = new Error("An error occurred while fetching the data");
        (error as any).status = res.status;
        (error as any).statusText = res.statusText;
        throw error;
    }

    // ตัดสินใจ return format ตาม Content-Type
    const contentType = res.headers.get('Content-Type') || '';
    if (contentType.includes('application/json')) {
        return res.json();
    } else if (contentType.includes('text/')) {
        return res.text();
    } else {
        // สำหรับ blob, binary data
        return res.blob();
    }

};