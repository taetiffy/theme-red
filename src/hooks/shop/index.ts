import { buyItemService, fetchShopExchangeService } from "@/services/shop";
import { toast } from "sonner";

export const useShop = () => {

    const buyItem = (id: string, qty: number) => {
        toast.promise(buyItemService(id, qty), {
            loading: "กำลังดำเนินการ...",
            success: (data) => (data as unknown as { message?: string }).message ?? "ดำเนินการสำเร็จ",
            error: (data) => (data as unknown as { message?: string }).message ?? "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งในภายหลัง",
        });
    };

    const exchange = (gem: number) => {
        toast.promise(fetchShopExchangeService(gem), {
            loading: "กำลังดำเนินการ...",
            success: (data) => (data as unknown as { message?: string }).message ?? "ดำเนินการสำเร็จ",
            error: (data) => (data as unknown as { message?: string }).message ?? "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งในภายหลัง",
        });
    }

    return { exchange, buyItem };
};
