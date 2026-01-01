"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Tabs, Tab, Card } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/react";
import { toast } from "sonner";
import { BankSelection } from "@/components/specific/transaction/withdraw/BankSelection";
// import { TrueSelection } from "@/components/specific/transaction/withdraw/TrueSelection";

import { AmountInput } from "@/components/specific/transaction/AmountInput";
import styles from "@/styles/transaction.module.css";
import { Barmoney } from "@/components/specific/transaction/Barmoney";
import { useBank } from "@/hooks/bank";
import { useMemberStore } from "@/stores/member";
import { UseCustomDisclosureReturn } from "@/hooks/useCustomDisclosure";
import { useShareStore } from "@/stores/share";
import ModeSelection from "@/components/specific/transaction/withdraw/ModeSelection";
import CommonLoading from "@/components/common/CommonLoading";
import { isLightColor } from "@/utils/lightColor";

export default function WithdrawModal({ disclosure }: { disclosure: UseCustomDisclosureReturn }) {

    const [selectedBankId, setSelectedBankId] = useState<string | undefined>(undefined);
    const [withdrawAmount, setWithdrawAmount] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { state } = useShareStore()

    const { bankMember, createWithdrawTransaction } = useBank();
    const { member, balance, setMember } = useMemberStore();
    const [target, setTarget] = useState<"TRUEMONEY" | "BANK">("BANK");
    const [mode, setMode] = useState<"CREDIT" | "PROMOTION">("CREDIT");

    const userBalance = useMemo(() => member ? (member.bonus_status ? balance.bonus : balance.credit) : balance.credit, [balance, member?.bonus_status]);
    const { state: { bank_withdraw_setting } } = useShareStore();
    const [color1, setColor1] = useState('');

    useEffect(() => {
        const navbarColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--navbar-color')
            .trim();
        setColor1(navbarColor);
    }, []);

    const isLight = isLightColor(color1)

    const [bonusStatus, setBonusStatus] = useState<{
        message: string;
        status: boolean;
        balanceWithdraw: number;
    }>({
        message: "",
        status: false,
        balanceWithdraw: 0
    })

    const selectTruemoneyId = useMemo(() => {
        return bankMember?.find((bk) => bk.bank_code === "999")?.id;
    }, [bankMember, target])

    // const selectedBank = useMemo(() => {
    //     return (bankMember || []).find((bank) => bank.id === selectedBankId);
    // }, [selectedBankId]);

    const handleWithdraw = async () => {

        if (target === "BANK" && !selectedBankId) {
            toast.error("กรุณาเลือกบัญชีที่ต้องการถอนเงิน");
            return;
        }

        if (target === "TRUEMONEY" && !selectTruemoneyId) {
            toast.error("กรุณาเลือกบัญชีที่ต้องการถอนเงิน");
            return;
        }

        if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
            toast.error("กรุณาใส่จำนวนเงินที่ต้องการถอน");
            return;
        }

        const amount = parseFloat(withdrawAmount);

        if (amount < bank_withdraw_setting.min) {
            toast.error(`จำนวนเงินขั้นต่ำ ${bank_withdraw_setting.min.toLocaleString()} บาท`);
            return;
        }

        if (amount > bank_withdraw_setting.max) {
            toast.error(`จำนวนเงินสูงสุด ${bank_withdraw_setting.max.toLocaleString()} บาท`);
            return;
        }

        if (amount > userBalance) {
            toast.error("ยอดเงินคงเหลือไม่เพียงพอ");
            return;
        }

        if (target === "BANK" && selectedBankId) {
            await createWithdrawTransaction({
                amount: amount,
                bankId: selectedBankId,
            });
        }

        if (target === "TRUEMONEY" && selectTruemoneyId) {
            await createWithdrawTransaction({
                amount: amount,
                bankId: selectTruemoneyId,
            });
        }

        handleReset();
        if (disclosure.state.onClose) {
            disclosure.state.onClose();
        }
    };

    const handleReset = () => {
        setSelectedBankId("");
        setWithdrawAmount("");
        setIsLoading(false);
    };

    if (!bankMember) return <CommonLoading />;

    return (
        <Modal
            isOpen={disclosure.state.isOpen}
            onClose={disclosure.state.onClose}
            placement="center"
            className={`ModalBackground ${styles.withdrawModal}`}
            size="lg"
            classNames={{
                body: styles.withdrawModalBody,
                header: styles.withdrawModalHeader,
            }}
        >
            <ModalContent className={styles.withdrawModalContent}>
                <ModalHeader className={styles.withdrawModalHeader}>
                    <h2 className={styles.withdrawModalTitle}>ถอนเงิน</h2>
                </ModalHeader>

                <ModalBody
                    className={`${styles.withdrawModalBody} overflow-y-auto max-h-[40vh] sm:max-h-[80vh] !px-2 sm:!px-4`}
                >
                    <Tabs classNames={{cursor: "Btn1",tabList: `*:text-white ${isLight ? 'mini_navbar_bgColor_light':'mini_navbar_bgColor_dark'}`}} aria-label="Disabled Options" disabledKeys={["music"]}>
                        <Tab key="ธนาคาร" title="ธนาคาร" onClick={() => setTarget("BANK")}>
                            <Card classNames={{base:' bg-transparent'}} className="bg-none border-0 shadow-none">
                                <Barmoney isLight={isLight} value={userBalance} />

                                <BankSelection
                                  bankList={bankMember?.filter((bk) => bk.bank_code !== "999") || []}
                                  selectedBankId={selectedBankId}
                                  onBankSelect={setSelectedBankId}
                                  isLight={ isLight }
                                />

                                <div className="mt-6">
                                    <ModeSelection
                                        toggle={(e) => {
                                            setMode(e.mode);
                                            setBonusStatus(e.data);
                                            const AllInState = state.user.allIn ?? false
                                            if (e.mode === "PROMOTION") {
                                                setWithdrawAmount(e.data.balanceWithdraw.toString());
                                            } else {
                                                if(AllInState){
                                                    setWithdrawAmount(state.user.integerWithdraw ? String(Math.floor(userBalance )) : String(Math.floor(userBalance * 100) / 100));
                                                }else{ 
                                                    setWithdrawAmount("")
                                                }
                                            }
                                        }}
                                    />
                                </div>


                                {/* <Divider className={`${styles.summaryDivider} my-4`} /> */}

                                <AmountInput
                                    key={"FORNORMAL"}
                                    withdrawAmount={withdrawAmount}
                                    onAmountChange={setWithdrawAmount}
                                    userBalance={userBalance}
                                    minWithdraw={bank_withdraw_setting.min}
                                    maxWithdraw={bank_withdraw_setting.max}
                                    type="withdraw"
                                    quickAmountEnable={(mode === "CREDIT")}
                                    maxButtonEnable={(mode === "CREDIT")}
                                    isDisabled={(mode === "PROMOTION")}
                                />
                                {!bonusStatus.status && member && member.bonus_status ? <span className="text-red-600 text-xs">{bonusStatus.message}</span> : <></>}
                            </Card>
                        </Tab>
                        <Tab key="TrueWallet" title="ทรูมันนี่วอเล็ต" onClick={() => setTarget("TRUEMONEY")}>
                            <Card className="border-0 shadow-none">
                                <div className="">
                                    <ModeSelection
                                        toggle={(e) => {
                                            setMode(e.mode);
                                            setBonusStatus(e.data);
                                            const AllInState = state.user.allIn ?? false
                                            if (e.mode === "PROMOTION") {
                                                setWithdrawAmount(e.data.balanceWithdraw.toString());
                                            } else {
                                                if(AllInState){
                                                    setWithdrawAmount(String(Math.floor(userBalance * 100) / 100));
                                                }else{ 
                                                    setWithdrawAmount("")
                                                }
                                            }
                                        }}
                                    />
                                </div>
                                <Barmoney isLight={isLight} value={userBalance} />
                                <AmountInput
                                    key={"FORWALLET"}
                                    withdrawAmount={withdrawAmount}
                                    onAmountChange={setWithdrawAmount}
                                    userBalance={userBalance}
                                    minWithdraw={bank_withdraw_setting.min}
                                    maxWithdraw={bank_withdraw_setting.max}
                                    type="withdraw"
                                    quickAmountEnable={(mode === "CREDIT")}
                                    maxButtonEnable={(mode === "CREDIT")}
                                    isDisabled={(mode === "PROMOTION")}
                                    isLight={ isLight }
                                  //มาแก้
                                />
                                {!bonusStatus.status && member && member.bonus_status ? <span className="text-red-600 text-xs">{bonusStatus.message}</span> : <></>}
                            </Card>
                        </Tab>
                    </Tabs>
                </ModalBody>

                <ModalFooter className={styles.withdrawModalFooter}>
                    <Button
                        variant="flat"
                        onPress={disclosure.state.onClose}
                        className={styles.withdrawModalCancel}
                        disabled={isLoading}
                    >
                        ยกเลิก
                    </Button>
                    <Button
                        onPress={handleWithdraw}
                        className={`${styles.withdrawModalSubmit} Btn2 disabled:cursor-not-allowed`}
                        isLoading={isLoading}
                    >
                        {isLoading ? "กำลังดำเนินการ..." : "ยืนยันการถอน"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
