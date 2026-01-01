"use client";
import React from "react";
import { 
    Select, 
    SelectItem, 
    Card, 
    CardBody, 
    Chip 
} from "@heroui/react";
import { trueAccounts } from "@/variables/MockBank";
import type { BankAccount } from "@/types/transaction";
import styles from "@/styles/transaction.module.css";

interface TrueSelection {
    selectedBankId: string;
    onBankSelect: (bankId: string) => void;
}

export function TrueSelection({ selectedBankId, onBankSelect }: TrueSelection) {
    const activeBanks = trueAccounts.filter(bank => bank.isActive);
    const selectedBank = trueAccounts.find(bank => bank.id === selectedBankId);

    return (
        <div className={styles.bankSelectionContainer}>
            <h3 className={styles.bankSelectionTitle}>เลือกบัญชีปลายทาง</h3>
            {activeBanks.length === 0 ? (
                <Card className={styles.bankSelectionEmpty}>
                    <CardBody className={styles.bankSelectionEmptyContent}>
                        <p className={styles.bankSelectionEmptyText}>ไม่มีบัญชีธนาคารที่ใช้งานได้</p>
                        <p className={styles.bankSelectionEmptySubtext}>
                            กรุณาเพิ่มบัญชีธนาคารในหน้าโปรไฟล์
                        </p>
                    </CardBody>
                </Card>
            ) : (
                <Select
                    placeholder="เลือกบัญชีธนาคาร"
                    aria-label="BankSelect"
                    selectedKeys={selectedBankId ? [selectedBankId] : []}
                    onSelectionChange={(keys) => {
                        const key = Array.from(keys)[0] as string;
                        onBankSelect(key || "");
                    }}
                    variant="bordered"
                    size="lg"
                    renderValue={(items) => {
                        if (items.length === 0) {
                            return <span>เลือกบัญชีธนาคาร</span>;
                        }
                        const selectedItem = items[0];
                        const bank = activeBanks.find(b => b.id === selectedItem.key);
                        if (!bank) return <span>เลือกบัญชีธนาคาร</span>;
                        
                        return (
                            <div className={styles.bankSelectItem}>
                                <div className={styles.bankSelectItemIcon}>
                                    <span className={styles.bankSelectItemIconText}>
                                        {bank.bankCode.charAt(0)}
                                    </span>
                                </div>
                                <div className={styles.bankSelectItemInfo}>
                                    <p className={styles.bankSelectItemName}>{bank.bankName}</p>
                                    <p className={styles.bankSelectItemDetails}>
                                        {bank.accountNumber}
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
                    {activeBanks.map((bank) => (
                        <SelectItem 
                            aria-label="itemBankSelect"
                            key={bank.id}
                            textValue={`${bank.bankName} - ${bank.accountNumber}`}
                            className=" *:text-white"
                            classNames={{
                                base: styles.bankSelectItemBase,
                                wrapper: styles.bankSelectItemWrapper,
                            }}
                        >
                            <div className={` ${styles.bankSelectItem}`}>
                                <div className={styles.bankSelectItemIcon}>
                                    <span className={styles.bankSelectItemIconText}>
                                        {bank.bankCode.charAt(0)}
                                    </span>
                                </div>
                                <div className={styles.bankSelectItemInfo}>
                                    <p className={styles.bankSelectItemName}>{bank.bankName}</p>
                                    <p className={styles.bankSelectItemDetails}>
                                        {bank.accountNumber}
                                    </p>
                                </div>
                            </div>
                        </SelectItem>
                    ))}
                </Select>
            )}
            
            {selectedBank && (
                <Card className={styles.selectedBankCard}>
                    <CardBody className={styles.selectedBankContent}>
                        <div className={styles.selectedBankContainer}>
                            <div className={styles.selectedBankIcon}>
                                <span className={styles.selectedBankIconText}>
                                    {selectedBank.bankCode.charAt(0)}
                                </span>
                            </div>
                            <div className={styles.selectedBankInfo}>
                                <h4 className={styles.selectedBankName}>{selectedBank.bankName}</h4>
                                {/* <p className={styles.selectedBankAccountName}>{selectedBank.accountName}</p> */}
                                <p className={styles.selectedBankAccountNumber}>{selectedBank.accountNumber}</p>
                            </div>
                            <Chip color="success" size="sm" className={styles.selectedBankStatus}>
                                ใช้งานได้
                            </Chip>
                        </div>
                    </CardBody>
                </Card>
            )}
        </div>
    );
}