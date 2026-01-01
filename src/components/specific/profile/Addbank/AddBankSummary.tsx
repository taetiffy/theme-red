"use client";
import React from "react";
import { Card, CardBody } from "@heroui/react";
import { bankLists } from "@/variables//BankSelect";
import styles from "@/styles/profile.module.css";

interface AddBankSummaryProps {
    selectedBankCode: string;
    accountNumber: string;
}

export function AddBankSummary({ selectedBankCode, accountNumber }: AddBankSummaryProps) {
    const selectedBank = bankLists.find(bank => bank.code === selectedBankCode);

    if (!selectedBank || !accountNumber) {
        return null;
    }

    return (
        <Card className={`CardBackground ${styles.addBankSummaryCard}`}>
            <CardBody className={styles.addBankSummaryContent}>
                <h4 className={styles.addBankSummaryTitle}>ข้อมูลบัญชีที่จะเพิ่ม</h4>
                <div className={styles.addBankSummaryDetails}>
                    <div className={styles.addBankSummaryRow}>
                        <span className={styles.addBankSummaryLabel}>ธนาคาร:</span>
                        <span className={styles.addBankSummaryValue}>
                            {selectedBank.name}
                        </span>
                    </div>
                    <div className={styles.addBankSummaryRow}>
                        <span className={styles.addBankSummaryLabel}>หมายเลขบัญชี:</span>
                        <span className={styles.addBankSummaryValue}>
                            {accountNumber}
                        </span>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}
