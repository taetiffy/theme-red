import { fetchGemService, getGemService } from "@/services/gem";
import { useFetchData } from "../useFetchData";
import { useCallback } from "react";
import { toast } from "sonner";

export const useDailyGems = () => {
    const { data } = useFetchData(fetchGemService);

    const getGems = useCallback(() => {
        toast.promise(getGemService, {
            loading: "กำลังดำเนินการ...",
            success: (data) => (data as unknown as { message?: string }).message ?? "ดำเนินการสำเร็จ",
            error: (data) => (data as unknown as { message?: string }).message ?? "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งในภายหลัง",
        });
    }, []);

    return { data, getGems };
};
