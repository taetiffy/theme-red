"use client";
import React from "react";
import { Input } from "@heroui/react";
import styles from "@/styles/profile.module.css";

interface AccountNameProps {
    accountName: string;
    onAccountNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AccountName({
    accountName,
    onAccountNameChange
}: AccountNameProps) {
    return (
        <div className={styles.addBankSection}>
            <h3 className={styles.addBankSectionTitle}>ชื่อ - นามสกุล</h3>

            <div className={styles.addBankFormContent}>
                <Input
                    type="text"
                    label="ชื่อ - นามสกุล"
                    placeholder="ใส่ชื่อ - นามสกุล"
                    value={accountName}
                    onChange={onAccountNameChange}
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
