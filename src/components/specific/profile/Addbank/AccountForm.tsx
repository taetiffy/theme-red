"use client";
import React from "react";
import { Input } from "@heroui/react";
import styles from "@/styles/profile.module.css";

interface AccountFormProps {
    accountNumber: string;
    onAccountNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AccountForm({ 
    accountNumber,
    onAccountNumberChange
}: AccountFormProps) {
    return (
        <div className={styles.addBankSection}>
            <h3 className={styles.addBankSectionTitle}>ข้อมูลบัญชี</h3>
            
            <div className={styles.addBankFormContent}>
                <Input
                    type="text"
                    label="หมายเลขบัญชี"
                    placeholder="ใส่หมายเลขบัญชีธนาคาร"
                    value={accountNumber}
                    onChange={onAccountNumberChange}
                    // maxLength={15}
                    classNames={{
                        input: styles.addBankInputField,
                        label: styles.addBankInputLabel,
                        inputWrapper: styles.addBankInputWrapper
                    }}
                    // description={`${accountNumber.length}/15 หลัก`}
                />
            </div>
        </div>
    );
}