"use client";
import React, { useEffect } from "react";
import { Button, Input } from "@heroui/react";
import styles from "@/styles/transaction.module.css";
import { formatWithOutCurrency } from "@/utils/format.utils";
import { useShareStore } from "@/stores/share";

interface AmountInputProps {
    withdrawAmount: string;
    onAmountChange: (amount: string) => void;
    userBalance: number;
    minWithdraw: number;
    maxWithdraw: number;
    type: "withdraw" | "deposit";
    quickAmountEnable?: boolean;
    maxButtonEnable?: boolean;
    isDisabled?: boolean;
    isLight?: boolean
}

export function AmountInput({
    withdrawAmount,
    onAmountChange,
    userBalance,
    minWithdraw,
    maxWithdraw,
    type,
    quickAmountEnable = true,
    maxButtonEnable = true,
    isDisabled = false,
    isLight
}: AmountInputProps) {

    const { state } = useShareStore();
    const AllInState = state.user.allIn ?? false

    useEffect(() => {
        if (AllInState) {
            onAmountChange(String(Math.floor(userBalance * 100) / 100))
        }
    }, [])

    const handleSetMax = () => {
        if (!maxButtonEnable) return
        // เอา 100% ของ userBalance แต่ไม่เกิน maxWithdraw
        let maxAmount = Math.min(userBalance, maxWithdraw);
        // ถ้า maxAmount น้อยกว่า minWithdraw ให้ใช้ minWithdraw แทน
        if (maxAmount < minWithdraw) maxAmount = minWithdraw;
        onAmountChange(maxAmount.toString());
    };


    return (
        <div className={`${styles.amountInputContainer} mt-5`}>
            <h3 className={styles.amountInputTitle}>จำนวนเงินที่ต้องการ{type === "withdraw" ? 'ถอน' : 'ฝาก'}</h3>

            <div className={styles.amountInputContent}>
                <div className={styles.amountInputWrapper}>
                    <Input
                        type="number"
                        label="จำนวนเงิน (บาท)"
                        name="amount"
                        step="1"
                        pattern="\d*"
                        placeholder={`ใส่จำนวนเงินที่ต้องการ${type === "withdraw" ? 'ถอน' : 'ฝาก'}`}
                        value={withdrawAmount}
                        onChange={(e) => {
                            if (type === "withdraw" && state.user.integerWithdraw) {
                                const value = e.target.value;
                                const integerValue = value.replace(/[^0-9]/g, '');
                                onAmountChange(String(Number(integerValue)));
                            }else{
                                const value = e.target.value;
                                onAmountChange(String(Number(value)));
                            }
                        }}
                        min={minWithdraw}
                        inputMode={type === "withdraw" && state.user.integerWithdraw ? "numeric" : "decimal"}
                        errorMessage={({ validationDetails }) => {
                            if (validationDetails.rangeUnderflow) {
                                return `จำนวนเงินขั้นต่ำ ${formatWithOutCurrency(minWithdraw)} บาท`
                            }
                        }}
                        isDisabled={isDisabled || AllInState}
                        startContent="฿"
                        endContent={
                            <Button
                                size="sm"
                                variant="flat"
                                onPress={handleSetMax}
                                className={`bg-red-500/10 text-red-500 ${styles.amountMaxButton} ${maxButtonEnable ? '' : styles.quickAmountButtonDisabled}`}
                                isDisabled={!maxButtonEnable}
                            >
                                MAX
                            </Button>
                        }
                        classNames={{
                            input: styles.amountInputField,
                            label: styles.amountInputLabel,
                            inputWrapper: styles.amountInputContainer
                        }}
                    />
                </div>

                <div className={styles.amountLimits}>
                    <span className={styles.amountLimitText}>
                        ขั้นต่ำ: ฿{formatWithOutCurrency(minWithdraw)}
                    </span>
                    <span className={styles.amountLimitText}>
                        สูงสุด: ฿{formatWithOutCurrency(maxWithdraw)}
                    </span>
                </div>

                <div className={styles.quickAmountGrid}>
                    {[50, 100, 200, 300].map((amount) => {
    if (amount < minWithdraw || amount > maxWithdraw) return null;

    const isActive = withdrawAmount === amount.toString();

    return (
        <Button
            key={"INPUTBOX" + amount}
            size="sm"
            onPress={() => quickAmountEnable && onAmountChange(amount.toString())}
            isDisabled={AllInState}
            className={`
                ${styles.quickAmountButton}
                col-span-1
                ${isActive 
                    ? (isLight ? 'bg-tranparent' : 'bg-tranparent') 
                    : 'bg-tranparent'}
            `}
        >
            <div className="w-full flex flex-col items-center gap-1">
                <div className="w-full h-2 overflow-hidden">
                    <div
                        className={`h-full transition-all ${
                            isActive ? 'bg-red-800' : 'bg-[#212121]'
                        }`}
                    />
                </div>
                <div className="text-xs">
                    {amount} บาท
                </div>
            </div>
        </Button>
    );
})}

                </div>

            </div>
        </div>
    );
}
