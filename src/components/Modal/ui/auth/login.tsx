"use client";
import { useEffect, useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    Input,
    Checkbox,
    Form,
} from "@heroui/react";
import Link from "next/link";
import styles from "@/styles/auth/login.module.css";
import { toast } from "sonner";
import { useMemberStore } from "@/stores/member";
import { fetchMeService, signInService } from "@/services/auth";
import { setTokenInCookie } from "@/utils/cookieUtils";
import { UseCustomDisclosureReturn } from "@/hooks/useCustomDisclosure";
import { useModal } from "@/hooks/useModal";
import Image from 'next/image'
import { Image as HeroImage } from "@heroui/react";
import { newNotificationPopupService } from "@/services/notification";

interface RememData {
    telephone: string;
    password: string;
}

export default function LoginModal({ disclosure }: { disclosure: UseCustomDisclosureReturn }) {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [defaultTel, setDefaultTel] = useState<string>("");
    const [defaultPass, setDefaultPass] = useState<string>("");
    const [isCheck, setIsCheck] = useState(false);
    const { setMember, setBalance, setInventory, setRank } = useMemberStore();
    const { signup, notification } = useModal();

    useEffect(() => {
        const storedData = localStorage.getItem("RememPass");
        if (storedData) {
            try {
                const parsed: RememData = JSON.parse(storedData);
                setDefaultTel(parsed.telephone || "");
                setDefaultPass(parsed.password || "");
                setIsCheck(true);
            } catch (error) {
                console.error("Error parsing RememPass:", error);
            }
        } else {
            setDefaultTel("");
            setDefaultPass("");
            setIsCheck(false);
        }
    }, [disclosure.state.isOpen]);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        try {
            if (formData.has("rememberMe")) {
                localStorage.setItem("RememPass", JSON.stringify(data));
            } else {
                localStorage.removeItem("RememPass");
            }

            const { telephone, password } = data;

            toast.promise(
                async () => {
                    const { access_token } = await signInService({
                        username: telephone as string,
                        password: password as string,
                    });
                    setTokenInCookie(access_token);
                    const user = await fetchMeService();
                    const { member } = user;
                    setMember({
                        affiliateCode: user.member.affiliateCode,
                        bonus_status: user.member.bonus_status,
                        full_name: user.member.full_name,
                        phone: user.member.phone,
                        text_password: user.text_password,
                        username: user.username
                    });
                    setBalance({
                        credit: user.accountBalance,
                        gem: user.accountGems,
                        bonus: user.member.bonus_data ? user.member.bonus_data.accountBalance : 0,
                        returnLost: user.returnLost,
                        untoan_amount: user.member.bonus_data ? user.member.bonus_data.bonusadmin.untoan_amount : 0,
                        returnCommission: user.returnCommission,
                        comToDay: (user.returnCommissionSlot + user.returnCommissionCalculate),
                        lossToDay: (user.returnLostCalculate + user.returnLostSlot)
                    });
                    setRank({
                        level: Number(member.level),
                        exp: Number(member.exp),
                        progress: Number(member.exp_progress),
                        total: member.exp_total,
                    });
                    setInventory([...user.inventories, ...Array(36 - user.inventories.length).fill(null)]);

                    const popup = await newNotificationPopupService()
                    console.log(popup)
                    if (popup.length > 0) {
                        notification.setData({
                            value: popup.map((item) => (
                                {
                                    id: item.id,
                                    img: item.news.banner_img,
                                    innerHtml: { __html: item.news.detail }
                                }
                            ))
                        })
                        notification.state.onOpen?.();
                    }

                    return { message: "ดำเนินการสำเร็จ" }
                },
                {
                    loading: "กำลังดำเนินการ...",
                    success: (data) => (data as unknown as { message?: string }).message ?? "ดำเนินการสำเร็จ",
                    error: (data) => (data as unknown as { message?: string }).message ?? "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งในภายหลัง",
                },
            );
        } catch (err: unknown) {
            console.error(err);
            // toast.error("มีปัญหาค่ะ");
        }
    };


    return (
        <>
            <Modal
                isOpen={disclosure.state.isOpen}
                onClose={disclosure.state.onClose}
                placement="center"
                className={`${styles.LoginModal}`}
                classNames={{
                    backdrop: styles.LoginBackdrop,
                    base: styles.LoginBase,
                    body: styles.LoginBodyRoot,
                    header: styles.LoginHeaderRoot,
                    closeButton: styles.LoginCloseButton,
                }}
            >
                <ModalContent className={styles.LoginContentRoot}>
                    <div className={styles.LoginContainer}>
                        <div className={`flex flex-col md:flex-row `}>
                            {/*<div
                                className={`flex-1 flex flex-col max-h-40 sm:max-h-50 md:max-h-170 sm:flex-row overflow-hidden`}
                            >
                                <HeroImage
                                    src="https://d3v6iwqdidgccc.cloudfront.net/PLAY97/register-banner/1744105576672056120z6IL8bz43U/play97%20wcc.png"
                                    alt="awd"
                                    className={` object-contain w-full h-full object-top`}
                                />
                            </div>*/}
                            <div className={'h-0 md:h-170 w-full md:w-[50%] md:block hidden overflow-hidden'}>
                                         <Image width="1080" height="240" alt='banner' className={'w-full h-full object-cover object-top'} src="https://cdn.zabbet.com/KPFM/lobby_settings/a688dc32-91b0-43be-955d-a83422edbfc4.jpg"  />
                                       </div>
                            <div className={styles.LoginPanel}>
                                <div className={styles.LoginCard}>
                                    <ModalHeader className={styles.LoginHeader}>
                                        <h2 className={styles.LoginTitle}>เข้าสู่ระบบ</h2>
                                        <div className={styles.LoginHelpRow}>
                                            <span>พบปัญหา</span>
                                            <Link href="#" className="text-red-500 mx-2">
                                                ติดต่อฝ่ายบริการลูกค้า
                                            </Link>
                                        </div>
                                    </ModalHeader>
                                    <Form onSubmit={handleLogin} className="w-full xl:px-5">
                                        <ModalBody className={`${styles.LoginBody} w-full`}>
                                            {/* <div className="pointer-events-none absolute -inset-8 bg-linear-to-b from-red-500/15 via-white/3 to-transparent rounded-2xl blur-2xl" /> */}
                                            <div className="relative">
                                                <div className="pointer-events-none absolute -inset-8 
    bg-linear-to-b from-red-500/20 via-red-400/10 to-transparent 
    rounded-3xl blur-2xl opacity-80" />

                                                <div className="relative w-full rounded-3xl bg-[#1F1F1F] backdrop-blur-xl overflow-hidden">
                                                    <div className="relative px-4 pt-7 pb-3">
                                                <div className="relative">
                                                    <div>
                                                        <label className={styles.LoginLabel}>
                                                            เบอร์โทรศัพท์
                                                        </label>
                                                        <Input
                                                            type="tel"
                                                            placeholder="เบอร์โทรศัพท์"
                                                            name="telephone"
                                                            inputMode="numeric"
                                                            isRequired
                                                            errorMessage={({ validationDetails }) => {
                                                                if (validationDetails.valueMissing) {
                                                                    return "โปรดใส่เบอร์โทร";
                                                                }
                                                                if (validationDetails.patternMismatch) {
                                                                    return "โปรดใส่เบอร์โทรศัพท์ให้ถูกต้อง";
                                                                }
                                                                if (validationDetails.tooShort) {
                                                                    return "โปรดใส่ให้ครบ 10 ตัว";
                                                                }
                                                            }}
                                                            defaultValue={defaultTel}
                                                            className={styles.LoginInput}
                                                            maxLength={10}
                                                            minLength={10}
                                                            pattern="^0[689]\d{8}$"
                                                            classNames={{
                                                                input: styles.LoginInputField,
                                                                inputWrapper: styles.LoginInputWrapper,
                                                            }}
                                                            radius="lg"
                                                            size="lg"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className={styles.LoginLabel}>
                                                            รหัสผ่าน
                                                        </label>
                                                        <Input
                                                            type={showPassword ? "text" : "password"}
                                                            placeholder="รหัสผ่าน"
                                                            isRequired
                                                            name="password"
                                                            defaultValue={defaultPass}
                                                            className={styles.LoginInput}
                                                            minLength={6}
                                                            errorMessage={({ validationDetails }) => {
                                                                if (validationDetails.valueMissing) {
                                                                    return "โปรดใส่รหัสผ่าน";
                                                                }
                                                                if (validationDetails.tooShort) {
                                                                    return "โปรดใส่รหัสผ่านให้ครบ";
                                                                }
                                                            }}
                                                            classNames={{
                                                                input: styles.LoginInputField,
                                                                inputWrapper: styles.LoginInputWrapper,
                                                            }}
                                                            radius="lg"
                                                            size="lg"
                                                            endContent={
                                                                <Button
                                                                    isIconOnly
                                                                    className={styles.LoginPasswordToggle}
                                                                    size="sm"
                                                                    onPress={() =>
                                                                        setShowPassword(!showPassword)
                                                                    }
                                                                >
                                                                    {showPassword ? (
                                                                        <svg
                                                                            className={
                                                                                styles.LoginPasswordIcon
                                                                            }
                                                                            fill="currentColor"
                                                                            viewBox="0 0 20 20"
                                                                        >
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                                                                                clipRule="evenodd"
                                                                            />
                                                                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                                                        </svg>
                                                                    ) : (
                                                                        <svg
                                                                            className={
                                                                                styles.LoginPasswordIcon
                                                                            }
                                                                            fill="currentColor"
                                                                            viewBox="0 0 20 20"
                                                                        >
                                                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                                                                clipRule="evenodd"
                                                                            />
                                                                        </svg>
                                                                    )}
                                                                </Button>
                                                            }
                                                        />
                                                    </div>

                                                    <div className={styles.LoginCheckboxRow}>
                                                        <Checkbox
                                                            className={styles.LoginCheckbox}
                                                            classNames={{
                                                                base: styles.LoginCheckboxBase,
                                                                wrapper: styles.LoginCheckboxWrapper,
                                                                label: styles.LoginCheckboxLabel,
                                                            }}
                                                            color="warning"
                                                            name="rememberMe"
                                                            defaultSelected={isCheck}
                                                        >
                                                            จดจำข้อมูลของฉัน
                                                        </Checkbox>
                                                    </div>

                                                    <Button
                                                        className={`${styles.LoginSubmitButton} Btn2`}
                                                        size="lg"
                                                        type="submit"
                                                    >
                                                        เข้าสู่ระบบ
                                                    </Button>

                                                    <div className={styles.LoginFooter}>
                                                        <span className={styles.LoginFooterText}>
                                                            ยังไม่มีบัญชี?
                                                        </span>
                                                        <Link onClick={signup.state.onOpen} href="#" className={styles.LoginRegisterLink}>
                                                            สมัครสมาชิก
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                                </div>
                                            </div>


                                            
                                        </ModalBody>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalContent>
            </Modal>
        </>
    );
}
