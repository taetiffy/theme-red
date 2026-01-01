"use client";
import React, { useMemo, useState } from "react";
import { Button, Form } from "@heroui/react";
import { PhoneNumber } from "@/components/specific/register/PhoneNumber";
import { InputPassword } from "@/components/specific/register/Password";
import { RegisterForm } from "@/components/specific/register/RegisterForm";
import { ProgressBar } from "@/components/specific/register/ProgressBar";
import { useModal } from "@/hooks/useModal";
import { toast } from "sonner";
import {
    checkPhoneService,
    fetchMeService,
    getOtpStatus,
    requestOTPService,
    signUpService,
    verifyOTPService,
} from "@/services/auth";
import { useMemberStore } from "@/stores/member";
import { setTokenInCookie } from "@/utils/cookieUtils";
import Cookies from "js-cookie";
import { useFetchData } from "@/hooks/useFetchData";

type FormStep1 = {
    phoneNumber: string;
    otp?: string;
};

type FormStep2 = {
    firstName: string;
    lastName: string;
    password: string;
    ConfirmPassword?: string;
};

type FormStep3 = {
    bankCode: string;
    bankAccount: string;
    affiliateCode: string,
};

type AllFormData = FormStep1 & FormStep2 & FormStep3;

const IsPhoneNumber = (phone: string) => {
    return /^(09|08|06)\d{8}$/.test(phone);
};

export function StepAll() {
    const [userPhone, setUserPhone] = useState<string>("");

    const { setMember, setBalance, setInventory, setRank } = useMemberStore();
    const [step, setStep] = useState<number>(1);
    const [allFormData, setAllFormData] = useState<Partial<AllFormData>>({});
    const [otp, setOtp] = useState<string>("");
    const [otpRef, setOtpRef] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { signin } = useModal();

    const { data: otpResponse } = useFetchData(getOtpStatus);

    const otpStatus = useMemo(() => {
        if (!otpResponse) return false;

        return otpResponse.status;
    }, [otpResponse]);

    const handleNextStep = () => {
        if (step > 3) {
            setStep(3);
        } else {
            setStep((prev) => prev + 1);
        }
    };

    const RequestOtp = () =>
        toast.promise(requestOTPService(userPhone), {
            loading: "กําลังส่ง OTP",
            success: (data) => {
                setOtpRef(data.ref);

                return "ส่ง OTP สําเร็จ";
            },
            error: "ส่ง OTP ไม่สําเร็จ",
        });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const formData = Object.fromEntries(data);

        const { ConfirmPassword, ...dataToStore } = formData;

        const updatedAllData: Partial<AllFormData> = { ...allFormData, ...dataToStore };

        setAllFormData(updatedAllData);

        if (step === 1) {
            const phone = updatedAllData.phoneNumber;
            if (!phone) {
                toast.error("กรุณากรอกเบอร์โทรศัพท์");
                return;
            }

            try {
                if (otpStatus) {
                    if (!updatedAllData.otp) return toast.error("กรุณากรอกรหัส OTP");

                    setOtp(updatedAllData.otp);

                    await verifyOTPService({ otp: updatedAllData.otp, ref: otpRef, phone });
                } else {
                    await checkPhoneService({ phone });
                }

                handleNextStep();
            } catch (error: any) {
                toast.error(error.message);
            }
            console.log("success")
            console.log(phone)
        } else if (step === 2) {
            if (formData.password != formData.ConfirmPassword) {
                return toast.error("รหัสผ่านไม่ตรงกัน");
            }
            setPassword(`${formData.password}`)

            handleNextStep();
        } else {
            toast.promise(
                async () => {
                    const data = await signUpService({
                        ref: updatedAllData.affiliateCode || "null",
                        phonenumber: updatedAllData.phoneNumber!,
                        bankCode: updatedAllData.bankCode!,
                        bankName: `${updatedAllData.firstName} ${updatedAllData.lastName}`,
                        bankAccount:
                            updatedAllData.bankCode === "999"
                                ? updatedAllData.phoneNumber!
                                : updatedAllData.bankAccount!,
                        password: password,
                        refOtp: otpRef || "",
                        otp: otp || "",
                        isTruemoney: updatedAllData.bankCode === "999",
                        social: "other",
                    });

                    setTokenInCookie(data.access_token);

                    const user = await fetchMeService();
                    const { member } = user;
                    setMember({
                        affiliateCode: user.member.affiliateCode,
                        bonus_status: user.member.bonus_status,
                        full_name: user.member.full_name,
                        phone: user.member.phone,
                        text_password: user.text_password,
                        username: user.username,
                    });
                    setBalance({
                        credit: user.accountBalance,
                        gem: user.accountGems,
                        bonus: user.member.bonus_data ? user.member.bonus_data.accountBalance : 0,
                        returnLost: user.returnLost,
                        untoan_amount: user.member.bonus_data
                            ? user.member.bonus_data.bonusadmin.untoan_amount
                            : 0,
                        returnCommission: user.returnCommission,
                        comToDay: user.returnCommissionSlot + user.returnCommissionCalculate,
                        lossToDay: user.returnLostCalculate + user.returnLostSlot,
                    });
                    setRank({
                        level: Number(member.level),
                        exp: Number(member.exp),
                        progress: Number(member.exp_progress),
                        total: member.exp_total,
                    });
                    setInventory([
                        ...user.inventories,
                        ...Array(36 - user.inventories.length).fill(null),
                    ]);
                    return { message: "ดำเนินการสำเร็จ" };
                },
                {
                    loading: "กำลังดำเนินการ...",
                    success: (data) =>
                        (data as unknown as { message?: string }).message ?? "ดำเนินการสำเร็จ",
                    error: (data) =>
                        (data as unknown as { message?: string }).message ??
                        "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งในภายหลัง",
                },
            );
        }
    };

return (
  <Form
    className="w-full flex justify-center flex-col items-center gap-4 py-5"
    onSubmit={handleSubmit}
  >
    <div className="w-full relative">
      <div className="pointer-events-none absolute -inset-8 bg-linear-to-b from-red-800/20 via-white/3 to-transparent rounded-2xl blur-2xl" />

      <div className="relative w-full rounded-3xl bg-black/20 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.55)] overflow-hidden">
        <div className="relative px-4 pt-14 pb-3">
          <div className="pointer-events-none absolute py-10 inset-0 bg-linear-to-r from-black/10 via-black/20 to-transparent" />
          <div className="relative">
            <ProgressBar step={step} />
          </div>
        </div>

        <div className="px-0 pb-4">
          <div className="w-full rounded-2xl p-4">
            {step === 1 && (
              <PhoneNumber
                onValue={setUserPhone}
                RequestOtp={RequestOtp}
                enableOtp={otpStatus}
              />
            )}

            {step === 2 && <InputPassword />}

            {step === 3 && <RegisterForm userPhone={userPhone} />}
          </div>

          <div className="w-full mt-0 px-4">
            <Button
              type="submit"
              className={[
                "Btn2 w-full h-[48px] rounded-2xl",
                "border border-white/10",
                "bg-linear-to-r from-red-700 via-red-600 to-red-500",
                "text-white font-semibold",
                "shadow-[0_10px_30px_rgba(239,68,68,0.20)]",
                "hover:brightness-110 active:scale-[0.99] transition",
                "focus:outline-none focus:ring-2 focus:ring-red-500/60",
              ].join(" ")}
            >
              {step === 1 ? "ยืนยัน" : step === 2 ? "กรอกรหัสผ่าน" : "สมัครสมาชิก"}
            </Button>
          </div>

          <div className="mt-4 flex gap-2 items-center justify-center text-[12px] text-white/70">
            <span>มีบัญชีอยู่แล้ว?</span>
            <span
              onClick={signin.state.onOpen}
              className="text-[var(--text-color)] cursor-pointer hover:underline underline-offset-4"
            >
              เข้าสู่ระบบ
            </span>
          </div>
        </div>
      </div>
    </div>
  </Form>
);

}
