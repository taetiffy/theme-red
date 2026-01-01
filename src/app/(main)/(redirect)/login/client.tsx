"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
export default function PageContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    useEffect(() => {
        if (token && document) {
            document.cookie = `accessToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=strict`;
            window.location.href = "/";
        }
    }, [token]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
            <p className="text-xl font-semibold animate-pulse">กำลังเข้าสู่ระบบ...</p>
        </div>
    );
}