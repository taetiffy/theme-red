"use client";
import React from "react";
import { 
    Select, 
    SelectItem, 
    Card, 
    CardBody, 
    Chip 
} from "@heroui/react";
import { bankAccountsWithdraw } from "@/variables/MockBank";
// import type { BankAccount } from "@/types/transaction";
import styles from "@/styles/transaction.module.css";

interface BankWithdrawSelectionProps {
    selectedBankId: string;
    onBankSelect: (bankId: string) => void;
}

export function BankwithSelec({ selectedBankId, onBankSelect }: BankWithdrawSelectionProps) {
    const availableWithdrawBanks = bankAccountsWithdraw.filter(bank => bank.isActive);
    const selectedWithdrawBank = bankAccountsWithdraw.find(bank => bank.id === selectedBankId);

    return (
        <div className={styles.bankSelectionContainer}>
            {/* <h3 className={styles.bankSelectionTitle}>เลือกบัญชีธนาคารปลายทางที่จะฝาก</h3> */}
            {availableWithdrawBanks.length === 0 ? (
                <Card className="bg-red-400/5 border border-red-500/20 h-full min-h-[120px] sm:min-h-[140px] lg:min-h-[160px]">
                    <CardBody className="p-4 h-full flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-red-400 text-sm sm:text-base font-medium">ไม่มีบัญชีอื่นๆ</p>
                            <p className="text-red-300/70 text-xs sm:text-sm mt-1">
                                กรุณาเพิ่มบัญชีธนาคารในหน้าโปรไฟล์
                            </p>
                        </div>
                    </CardBody>
                </Card>
            ) : (
                <div className=" flex items-start">
                  <Select
                      placeholder="เลือกบัญชีธนาคารปลายทางที่จะฝาก"
                      aria-label="BankSelect"
                      selectedKeys={selectedBankId ? [selectedBankId] : []}
                      onSelectionChange={(keys) => {
                          const key = Array.from(keys)[0] as string;
                          onBankSelect(key || "");
                      }}
                      variant="bordered"
                      size="lg"
                      className="w-full"
                    renderValue={(items) => {
                        if (items.length === 0) {
                            return <span>เลือกบัญชีธนาคาร</span>;
                        }
                        const selectedItem = items[0];
                        const bank = availableWithdrawBanks.find(b => b.id === selectedItem.key);
                        if (!bank) return <span>เลือกบัญชีธนาคาร</span>;
                        
                        return (
                            <div className={styles.bankSelectItem}>
                                {/* <div className={styles.bankSelectItemIcon}>
                                    <span className={styles.bankSelectItemIconText}>
                                        {bank.bankCode.charAt(0)}
                                    </span>
                                </div> */}
                                <div className={styles.bankSelectItemInfo}>
                                    <p className={styles.bankSelectItemName}>{bank.bankName}</p>
                                    <p className={styles.bankSelectItemDetails}>
                                        {bank.accountNumber} - {bank.accountName}
                                    </p>
                                </div>
                            </div>
                        );
                    }}
                    classNames={{
                        trigger: styles.bankSelectTrigger,
                        value: styles.bankSelectValue,
                        listbox: styles.bankSelectListbox,
                        popoverContent: styles.bankSelectPopover,
                    }}
                    popoverProps={{
                        classNames: {
                            content: styles.bankSelectPopoverContent,
                        }
                    }}
                >
                    {availableWithdrawBanks.map((bankAccountsWithdraw) => (
                        <SelectItem 
                            aria-label="itemBankSelect"
                            key={bankAccountsWithdraw.id}
                            textValue={`${bankAccountsWithdraw.bankName} - ${bankAccountsWithdraw.accountNumber}`}
                            className=" *:text-white"
                            classNames={{
                                base: styles.bankSelectItemBase,
                                wrapper: styles.bankSelectItemWrapper,
                            }}
                        >
                            <div className={` ${styles.bankSelectItem}`}>
                                {/* <div className={styles.bankSelectItemIcon}>
                                    <span className={styles.bankSelectItemIconText}>
                                        {bankAccountsWithdraw.bankCode.charAt(0)}
                                    </span>
                                </div> */}
                                <div className={styles.bankSelectItemInfo}>
                                    <p className={styles.bankSelectItemName}>{bankAccountsWithdraw.bankName}</p>
                                    <p className={styles.bankSelectItemDetails}>
                                        {bankAccountsWithdraw.accountNumber} - {bankAccountsWithdraw.accountName}
                                    </p>
                                </div>
                            </div>
                        </SelectItem>
                    ))}
                </Select>
                </div>
            )}
{/*             
            {selectedWithdrawBank && (
                <Card className="bg-red-400/5 border h-full border-red-500/20">
                <CardBody className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex-1">
                            <p className="text-sm text-red-400 text-center">ไม่มีบัญอื่นๆ</p>
                        </div>
                    </div>
                </CardBody>
            </Card>
            )} */}
                            <Card className="bg-red-400/5 border h-full border-red-500/20">
                <CardBody className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex-1">
                            {/* <h6 className="font-semibold text-white">{selectedWithdrawBank.bankName}</h6> */}
                            <p className="text-sm text-red-400 text-center">ไม่มีบัญอื่นๆ</p>
                            {/* <p className="text-sm text-gray-400 font-mono">{selectedWithdrawBank.accountNumber}</p> */}
                        </div>
                        {/* <Chip color="success" size="sm" className={styles.selectedBankStatus}>
                            ใช้งานได้
                        </Chip> */}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}