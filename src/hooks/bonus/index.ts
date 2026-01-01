import { clearBonusService, fetchPatchBonusService, fetchUserBonusService } from "@/services/bonus";
import { useFetchData } from "../useFetchData";
import { useCallback } from "react";
import { toast } from "sonner";

export const useBonus = () => {

    const { data, refresh } = useFetchData(fetchUserBonusService);

    const handleClearBonus = useCallback(() => {
        toast.promise(clearBonusService, {
            loading: "กำลังดำเนินการ...",
            success: (data) => (data as unknown as { message?: string }).message ?? "ดำเนินการสำเร็จ",
            error: (data) => (data as unknown as { message?: string }).message ?? "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งในภายหลัง",
        });

    }, []);

    const handlePatchBonus = useCallback(async (update?: (d: boolean) => void) => {
        try {
            const data = await fetchPatchBonusService();
            if (update) {
                update(data.bonus_status)
            }
            return data;
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Unexpected error");
            }
        }
    }, []);


    return { user_bonus: data, handleClearBonus, handlePatchBonus };
};