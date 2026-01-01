import { claimCommission, claimReturnLoss, getRevenueShareService, claimAffiliate } from "@/services/affiliate";
import { useFetchData } from "../useFetchData";
import { useCallback } from "react";
import { toast } from "sonner";
import { useMemberStore } from "@/stores/member";

export const useAffiliate = () => {
    const { setBalance } = useMemberStore()
    const { data } = useFetchData(getRevenueShareService)

    const handleClainCommission = useCallback(() => {
        toast.promise(claimCommission, {
            loading: "กำลังดำเนินการ...",
            success: (data) => {
                setBalance({
                    returnCommission: 0
                })
                return (data as unknown as { message?: string }).message ?? "ดำเนินการสำเร็จ"
            },
            error: (data) => (data as unknown as { message?: string }).message ?? "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งในภายหลัง",
        });

    }, []);

    const handleClaimReturnLoss = useCallback(() => {
        toast.promise(claimReturnLoss, {
            loading: "กำลังดำเนินการ...",
            success: (data) => {
                setBalance({
                    returnLost: 0
                })
                return (data as unknown as { message?: string }).message ?? "ดำเนินการสำเร็จ"
            },
            error: (data) => (data as unknown as { message?: string }).message ?? "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งในภายหลัง",
        });

    }, []);

    const handleClaimAffiliate = useCallback(() => {
        toast.promise(claimAffiliate, {
            loading: "กำลังดำเนินการ...",
            success: (data) => (data as unknown as { message?: string }).message ?? "ดำเนินการสำเร็จ",
            error: (data) => (data as unknown as { message?: string }).message ?? "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งในภายหลัง",
        });

    }, []);

    return { handleClainCommission, handleClaimReturnLoss, handleClaimAffiliate, affiliateComs: data };
};