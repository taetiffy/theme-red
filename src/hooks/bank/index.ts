import { getMemberBankService, getSettingBanksService } from "@/services/bank";
import { fetchSystemWallets, depositSlipsService } from "@/services/transaction";
import { useFetchData } from "../useFetchData";
import { toast } from "sonner";
import { depositService, IDeposit, IWithdraw, withdrawService, depositGatewayService, depositMultiService, SDeposit } from "@/services/transaction";
import { useModal } from "../useModal";

export const useBank = () => {
    const { data: bankMember } = useFetchData(getMemberBankService);
    const { data: bankSetting } = useFetchData(getSettingBanksService);
    const { data: walletSetting } = useFetchData(fetchSystemWallets);
    const PaymentController = useModal();


    const createDepositMulti = async (data: IDeposit) => {
        toast.promise(depositMultiService(data), {
            loading: "กำลังดำเนินการ...",
            success: (data) => {
                if (data.data.type === "ACCOUNT") {
                    PaymentController.depositDetails.setData({
                        accountNo: data.data.account_number,
                        bankCode: data.data.bank_code,
                        fullName: data.data.account_name,
                        amount: data.data.amount
                    });
                    PaymentController.depositDetails.state.onOpen?.();
                } else {
                    PaymentController.payment.setData({
                        amount: data.data.amount,
                        expiredAt: data.data.expiredAt,
                        qrcode: data.data.qrcode,
                        type: data.data.type
                    });
                    PaymentController.payment.state.onOpen?.();
                }

                return (data as unknown as { message?: string }).message ?? "ดำเนินการสำเร็จ"
            },
            error: (data) => (data as unknown as { message?: string }).message ?? "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งในภายหลัง",
        });
    };

    const createDepositTransaction = async (data: IDeposit) => {
        toast.promise(depositService(data), {
            loading: "กำลังดำเนินการ...",
            success: (data) => {
                PaymentController.depositDetails.setData({
                    accountNo: data.data.account_number,
                    bankCode: data.data.bank_code,
                    fullName: data.data.account_name,
                    amount: data.data.amount
                });
                PaymentController.depositDetails.state.onOpen?.();
                return (data as unknown as { message?: string }).message ?? "ดำเนินการสำเร็จ"
            },
            error: (data) => (data as unknown as { message?: string }).message ?? "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งในภายหลัง",
        });
    };


    const createDepositTransactionGateway = async (data: IDeposit) => {
        toast.promise(depositGatewayService(data), {
            loading: "กำลังดำเนินการ...",
            success: (data) => {
                if (data.data.type === "ACCOUNT") {
                    PaymentController.depositDetails.setData({
                        accountNo: data.data.account_number,
                        bankCode: data.data.bank_code,
                        fullName: data.data.account_name,
                        amount: data.data.amount
                    });
                    PaymentController.depositDetails.state.onOpen?.();
                } else {
                    PaymentController.payment.setData({
                        amount: data.data.amount,
                        expiredAt: data.data.expiredAt,
                        qrcode: data.data.qrcode,
                        type: data.data.type
                    });
                    PaymentController.payment.state.onOpen?.();
                }
                return (data as unknown as { message?: string }).message ?? "ดำเนินการสำเร็จ"
            },
            error: (data) => (data as unknown as { message?: string }).message ?? "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งในภายหลัง",
        });
    }

    const createDepositSlips = async (data: SDeposit) => {
        toast.promise(depositSlipsService(data), {
            loading: "กำลังดำเนินการ...",
            success: (data) => {
                return (data as unknown as { message?: string }).message ?? "ดำเนินการสำเร็จ"
            },
            error: (data) => (data as unknown as { message?: string }).message ?? "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งในภายหลัง",
        });
    }

    const createWithdrawTransaction = async (data: IWithdraw) => {
        toast.promise(withdrawService(data), {
            loading: "กำลังดำเนินการ...",
            success: (data) => (data as unknown as { message?: string }).message ?? "ดำเนินการสำเร็จ",
            error: (data) => (data as unknown as { message?: string }).message ?? "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งในภายหลัง",
        });
    };

    return {
        createDepositTransaction,
        createWithdrawTransaction,
        createDepositTransactionGateway,
        createDepositMulti,
        createDepositSlips,
        bankMember,
        bankSetting,
        walletSetting
    };
};
