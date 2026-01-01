import { claimCheckInService, getDailyCheckInService } from "@/services/checkin";
import DailyInterface from "@/types/checkIn";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export const useCheckin = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<DailyInterface[]>([]);
    const [target, setTarget] = useState<DailyInterface>();

    const LoadData = async () => {
        try {
            const data = await getDailyCheckInService();

            setData(data);
            setTarget(
                data.filter((item: DailyInterface) => item.day === new Date().getDate())[0],
            );
        } catch (error) {
            console.log("useCheckin ->", error);
        }
    };

    useEffect(() => {
        LoadData();
    }, []);

    const claim = useCallback(async (checkinId: string | null | undefined) => {
        setLoading(true);
        setError(null);

        if (!checkinId) {
            return toast.error("เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง");
        }

        toast.promise(claimCheckInService(checkinId), {
            loading: "กำลังดำเนินการ...",
            success: (data) => {
                setLoading(false);
                LoadData()
                return (data as unknown as { message?: string }).message ?? "ดำเนินการสำเร็จ";
            },
            error: (data) => {
                setError(data);
                setLoading(false);
                return (data as unknown as { message?: string }).message ?? "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งในภายหลัง";
            },
        });
    }, []);

    return { claim, data, target, loading, error };
};
