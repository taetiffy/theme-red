"use client";
import React, { useState, useCallback, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Form, Button, Tabs, Tab } from "@heroui/react";
import { OneCardBank, TwoCardBank } from "./CardBank";
import { Card, CardBody } from "@heroui/react";
import { PromotionSelect } from "./Promotion";
import { InputValue } from "./InputValue";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { useModal } from "@/components/Modal/action/modal";
import { PaymentSend } from "@/types/modal";
import { useBank } from "@/hooks/bank";
import { UseCustomDisclosureReturn } from "@/hooks/useCustomDisclosure";
import { useMemo } from "react";
import Image from "next/image";
import { Chip } from "@heroui/chip";
import TrueMoneyWalletCard from "./truemoney";
import { useShareStore } from "@/stores/share";
import { useFetchData } from "@/hooks/useFetchData";
import { fetchUserBonusService } from "@/services/bonus";
import CommonLoading from "@/components/common/CommonLoading";
import { Reward } from "./Reward"
import { SlipCard } from "./SlipCard"
import { depositSlipsService } from "@/services/transaction";

export default function DepositModal({ disclosure }: { disclosure: UseCustomDisclosureReturn }) {
    const {
        state: { bank_deposit_setting, gateway_deposit_setting, user },
    } = useShareStore();
    const {
        bankMember,
        bankSetting,
        walletSetting,
        createDepositTransaction,
        createDepositMulti,
        createDepositTransactionGateway,
        createDepositSlips
    } = useBank();
    const { data: bonusData } = useFetchData(fetchUserBonusService);
    const [formData, setFormData] = useState<PaymentSend>({
        money: "",
        promotion: "",
        myBank: "",
        yourBank: "",
        receiveBank: "",
        senderBank: "",
    });
    const [bankType, setBankType] = useState<string>("BANK");
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const PaymentController = useModal();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const extractedData = Object.fromEntries(data);

        setFormData({
            money: extractedData.money.toString(),
            promotion: extractedData.promotion.toString(),
            myBank: (extractedData?.myBank || "").toString(),
            yourBank: (extractedData?.yourBank || "").toString(),
            file: extractedData?.file instanceof File ? extractedData.file : undefined,
            senderBank:
                bankMember != undefined
                    ? bankMember.find(
                        (item) => item.id === (extractedData?.yourBank || "").toString(),
                    )?.bank_number || ""
                    : "",
            receiveBank:
                bankSetting != undefined
                    ? bankSetting.find(
                        (item) => item.id === (extractedData?.myBank || "").toString(),
                    )?.number || ""
                    : "",
        });
        setIsPopoverOpen(true);
    };

    const handleConfirmDeposit = async () => {
        switch (bankType) {
            case "BANK":
                if (user.quickDeposit) {
                    const systemBank = bankSetting ?? []
                    const systemBankId = systemBank.length > 0 ? systemBank[0].id : ""
                    await createDepositMulti({
                        channel: "BANK",
                        amount: parseFloat(formData.money),
                        promotion_id: "",
                        system_bank_id: systemBankId,
                        user_bank_id: formData.yourBank,
                    });
                } else {
                    await createDepositTransaction({
                        channel: "BANK",
                        amount: parseFloat(formData.money),
                        promotion_id: "",
                        system_bank_id: formData.myBank,
                        user_bank_id: formData.yourBank,
                    });
                }
                break;
            // PaymentController.openModal();
            // setIsPopoverOpen(false);

            case "GATEWAY":
                await createDepositTransactionGateway({
                    amount: parseFloat(formData.money),
                    channel: "GATEWAY",
                    promotion_id: "",
                    system_bank_id: "",
                    user_bank_id: formData.yourBank,
                });
                break;

            case "SLIP":
                await createDepositSlips({
                    amount: parseFloat(formData.money),
                    promotion_id: "",
                    system_bank_id: formData.myBank,
                    bankId: formData.yourBank,
                    file: formData?.file ? formData.file : undefined,
                });
                break;
        }

        if (disclosure.state.onClose) {
            disclosure.state.onClose();
        }
    };

    const CheckBankOnline = useCallback(
        (truemoneyCheck: boolean) => {
            if (bankType !== "BANK") {
                return;
            }

            if (bank_deposit_setting.use) {
                setBankType("BANK");
            } else if (gateway_deposit_setting.use) {
                setBankType("GATEWAY");
            } else if (truemoneyCheck) {
                setBankType("WALLET");
            }
        },
        [bank_deposit_setting.use, gateway_deposit_setting.use],
    );

    useEffect(() => {
        CheckBankOnline(walletSetting != null ? walletSetting.length > 0 : false);
    }, []);

    const filterUserBank = useMemo(() => {
        return bankMember !== null ? bankMember.filter((item) => item.bank_code !== "999") : [];
    }, [bankMember]);

    if (!bankMember || !bankSetting || !walletSetting || !bonusData) return <CommonLoading />;

    return (
        <>
            <Modal
                isOpen={disclosure.state.isOpen}
                onClose={disclosure.state.onClose}
                placement="center"
                className="dark text-white ModalBackground"
                size="lg"
            >
                <Form onSubmit={handleSubmit}>
                    <ModalContent>
                        <ModalHeader>
                            <span className="text-(--text-color)">ฝากเงิน</span>
                        </ModalHeader>
                        <ModalBody className="flex flex-col gap-2 overflow-auto max-h-230">
                            <Tabs
                                onSelectionChange={(key) => {
                                    setBankType(key.toString());
                                }}
                                classNames={{ cursor: "Btn2", tabList: ' overflow-y-hidden' }}
                                defaultSelectedKey={bankType}
                            >
                                {bank_deposit_setting.use && (
                                    <Tab
                                        className="min-h-[60px]"
                                        key={"BANK"}
                                        title={
                                            <div className="flex gap-2 items-center relative">
                                                <div>
                                                    <Image
                                                        src="/image/deposit.png"
                                                        alt=""
                                                        width={100}
                                                        height={100}
                                                        className="w-[30px] max-w-[30px] h-auto"
                                                    />
                                                </div>
                                                <div className="text-sm">ฝากเงินออโต้</div>
                                                {/* <div className={` absolute -bottom-4 -right-3 text-[8px] Btn2 px-2 py-0 rounded-full`}>dwaefsgred</div> */}
                                            </div>
                                        }
                                    >
                                        {/* <div className={` h-20 mini_navbar_bgColor_dark rounded-md mb-4 flex overflow-auto p-2 gap-2`}>
                                            <Reward/>
                                        </div> */}
                                        <PromotionSelect onClose={disclosure.state.onClose} />
                                        <Card className={`w-full bg-transparent ${user.quickDeposit ? "" : "py-0"} my-5`}>
                                            <CardBody className="gap-5 h-full">
                                                <OneCardBank bankList={filterUserBank} />
                                                {/* {!user.quickDeposit && <TwoCardBank bankList={bankSetting || []} />} */}
                                            </CardBody>
                                        </Card>
                                        <InputValue
                                            min={bank_deposit_setting.min}
                                            max={bank_deposit_setting.max}
                                        />
                                    </Tab>
                                )}
                                {(!user.quickDeposit && gateway_deposit_setting.use) && (
                                    <Tab
                                        className="min-h-[60px]"
                                        key={"GATEWAY"}
                                        title={
                                            <div className="flex gap-2 items-center relative">
                                                <div>
                                                    <Image
                                                        src="/image/qrtopup.png"
                                                        alt=""
                                                        width={100}
                                                        height={100}
                                                        className="w-[30px] max-w-[30px] h-auto"
                                                    />
                                                </div>
                                                <div className="text-sm">{user.payment === "QRCODE" ? "QR พร้อมเพย์" : "ฝากเงินด่วน"} </div>
                                                {/* <div className={` absolute -bottom-4 -right-3 text-[8px] Btn2 px-2 py-0 rounded-full`}>dwaefsgred</div> */}
                                            </div>
                                        }
                                    >
                                        {/* <div className={` h-20 mini_navbar_bgColor_dark rounded-md mb-4 flex overflow-auto p-2 gap-2`}>
                                            <Reward/>
                                        </div> */}
                                        <PromotionSelect onClose={disclosure.state.onClose} />
                                        <Card className="w-full my-5">
                                            <CardBody className="gap-5 h-full">
                                                <OneCardBank bankList={filterUserBank} />
                                            </CardBody>
                                        </Card>
                                        <InputValue
                                            min={gateway_deposit_setting.min}
                                            max={gateway_deposit_setting.max}
                                        />
                                    </Tab>
                                )}
                                <Tab
                                    className="min-h-[60px]"
                                    key={"WALLET"}
                                    title={
                                        <div className="flex gap-2 items-center relative">
                                            <div>
                                                <Image
                                                    src="/image/wallet.png"
                                                    alt=""
                                                    width={100}
                                                    height={100}
                                                    className="w-[30px] max-w-[30px] h-auto"
                                                />
                                            </div>
                                            <div className="text-sm">True Money</div>
                                            {/* <div className={` absolute -bottom-4 -right-3 text-[8px] Btn2 px-2 py-0 rounded-full`}>dwaefsgred</div> */}
                                        </div>
                                    }
                                >
                                    {/* <div className={` h-20 mini_navbar_bgColor_dark rounded-md mb-4 flex overflow-auto p-2 gap-2`}>
                                        <Reward/>
                                    </div> */}
                                    <PromotionSelect onClose={disclosure.state.onClose} />
                                    <Card className="w-full my-5">
                                        <CardBody className="gap-5 h-full">
                                            <TrueMoneyWalletCard data={walletSetting || []} />
                                        </CardBody>
                                    </Card>
                                </Tab>
                                {(user.slipsDeposit) && (
                                    <Tab
                                        className="min-h-[60px]"
                                        key={"SLIP"}
                                        title={
                                            <div className="flex gap-2 items-center relative">
                                                <div>
                                                    <Image
                                                        src="/image/deposit.png"
                                                        alt=""
                                                        width={100}
                                                        height={100}
                                                        className="w-[30px] max-w-[30px] h-auto"
                                                    />
                                                </div>
                                                <div className="text-sm px-2">แนบสลิป</div>
                                            </div>
                                        }
                                    >
                                        {/* <div className={` h-20 mini_navbar_bgColor_dark rounded-md mb-4 flex overflow-auto p-2 gap-2`}>
                                        <Reward/>
                                    </div> */}
                                        <PromotionSelect onClose={disclosure.state.onClose} />
                                        {/*<Card className="w-full my-5">
                                        <CardBody className="gap-5 h-full">
                                            <TrueMoneyWalletCard data={walletSetting || []} />
                                        </CardBody>
                                    </Card>*/}
                                        <SlipCard filterData={filterUserBank} />
                                    </Tab>
                                )}
                            </Tabs>
                        </ModalBody>
                        <ModalFooter
                            hidden={bankType !== "WALLET" ? false : true}
                            className="flex flex-col md:flex-row"
                        >
                            <Button
                                onPress={disclosure.state.onClose}
                                className="Btn1 w-full md:w-auto order-2 md:order-1"
                            >
                                ยกเลิก
                            </Button>
                            <Popover
                                aria-label="PopConfirmDeposit"
                                isOpen={isPopoverOpen}
                                onOpenChange={setIsPopoverOpen}
                            >
                                <PopoverTrigger>
                                    <Button
                                        type="submit"
                                        className="Btn2 w-full md:w-auto order-1 md:order-2"
                                    >
                                        ฝากเงิน
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="text-white">
                                    <div className="flex flex-col p-4 gap-3 w-70">
                                        <h3 className="font-semibold text-lg">ยืนยันการฝากเงิน</h3>
                                        <div className="space-y-2 ">
                                            <p>
                                                <strong>บัญชีของคุณ:</strong>{" "}
                                                {formData.senderBank || "ไม่ระบุ"}
                                            </p>
                                            <p>
                                                <strong>บัญชีที่จะโอนเข้า:</strong>{" "}
                                                {formData.receiveBank || "ไม่ระบุ"}
                                            </p>
                                            <p>
                                                <strong>จำนวนเงิน:</strong>{" "}
                                                {formData.money
                                                    ? `${Number(formData.money).toLocaleString()} บาท`
                                                    : "0 บาท"}
                                            </p>
                                            <p>
                                                <strong>โปรโมชั่น:</strong>{" "}
                                                {formData.promotion === "nopromotion"
                                                    ? "ไม่มี"
                                                    : formData.promotion}
                                            </p>
                                        </div>
                                        <div className="flex gap-2 mt-4">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onPress={() => setIsPopoverOpen(false)}
                                                className="text-white"
                                            >
                                                ยกเลิก
                                            </Button>
                                            <Button
                                                size="sm"
                                                color="success"
                                                onPress={handleConfirmDeposit}
                                            >
                                                ยืนยัน
                                            </Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </ModalFooter>
                    </ModalContent>
                </Form>
            </Modal>
        </>
    );
}
