"use client"

import { PresenceActivityType, usePresence } from "@/hooks/usePresence";
import { useWebSocket } from "@/hooks/useWebSocket";
import { StartGame } from "@/types/games";
import { BasicObjectEncoder } from "@/utils/crypto";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PresenceProvider({ children }: { children: React.ReactNode }) {

    const { isAuthenticated } = useWebSocket();
    const { setActivity } = usePresence();
    const pathname = usePathname();

    const are_you_playing = (): boolean => {
        if (pathname.startsWith("/play/")) {
            const hash = pathname.split("/play/")[1];
            if (!hash) return false;
            const decode = BasicObjectEncoder.decodeBase64FromUrl<StartGame>(hash);
            setActivity({ type: PresenceActivityType.PLAYING, name: `กำลังเล่นเกม ${decode.name} ค่าย ${decode.productId}` });
            return true;
        }
        return false;
    };

    useEffect(() => {

        // Run immediately on mount or when pathname changes
        are_you_playing();

        // Set interval to check periodically (e.g., every 5 seconds)
        const interval = setInterval(() => {
            are_you_playing();
        }, 5000);

        // Cleanup when component unmounts
        return () => {
            clearInterval(interval);
            setActivity({ type: PresenceActivityType.IDLE })
        };

    }, [pathname, isAuthenticated]);

    return children;

}