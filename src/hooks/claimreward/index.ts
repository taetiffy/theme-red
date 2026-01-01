import { claimreward } from "@/services/claimreward";
import { useFetchData } from "../useFetchData";
import { useCallback } from "react";
import { toast } from "sonner";

export const useClaimReward = () => {
  const rewardsome = useCallback((id: string) => {
    toast.promise(claimreward(id), {
      loading: "กำลังดำเนินการ...",
      success: (data) =>
        (data as unknown as { message?: string }).message ?? "ดำเนินการสำเร็จ",
      error: (data) =>
        (data as unknown as { message?: string }).message ??
        "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งในภายหลัง",
    });
  }, []);

  return { rewardsome };
};
