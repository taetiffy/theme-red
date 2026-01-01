"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMemberStore } from "@/stores/member";
import { Spinner } from "@heroui/react";

// higher-order component (HOC) by.krakendev
export default function withAuth<P extends object>(
    WrappedComponent: React.ComponentType<P>
) {
    return function ProtectedComponent(props: P) {
        const router = useRouter();
        const [isLoading, setIsLoading] = useState(true);
        const isAuthenticated = useMemberStore((state) => state.isAuthenticated);
        const isInitialized = useMemberStore((state) => state.isInitialized); // เพิ่ม state นี้ใน store

        useEffect(() => {
            // รอให้ store initialize เสร็จก่อน
            if (!isInitialized) {
                return;
            }

            setIsLoading(false);

            if (!isAuthenticated) {
                router.replace("/");
            }
        }, [isAuthenticated, isInitialized, router]);

        // แสดง loading ขณะรอ store initialize หรือขณะ redirect
        if (!isInitialized || isLoading || !isAuthenticated) {
            return (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <Spinner size="lg" color="primary" />
                </div>
            );
        }

        return <WrappedComponent {...props} />;
    };
}