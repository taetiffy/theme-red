"use client";
import React from "react";
import { Card, CardBody, Divider } from "@heroui/react";
import type { BankAccount } from "@/types/transaction";
import styles from "@/styles/transaction.module.css";

interface WithdrawSummaryProps {
    withdrawAmount: string;
    selectedBank: BankAccount | undefined;
}

export function WithdrawSummary({ withdrawAmount, selectedBank }: WithdrawSummaryProps) {
    if (!withdrawAmount || !selectedBank) {
        return null;
    }

    return (
        <>
            <Divider className={styles.summaryDivider} />
            <Card className={styles.summaryCard}>
                <CardBody className={styles.summaryContent}>
                    <h4 className={styles.summaryTitle}>สรุปการถอนเงิน</h4>
                    <div className={styles.summaryDetails}>
                        <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>จำนวนเงิน:</span>
                            <span className={styles.summaryValue}>
                                ฿{parseFloat(withdrawAmount || "0").toLocaleString()}
                            </span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>ค่าธรรมเนียม:</span>
                            <span className={styles.summaryValue}>ฟรี</span>
                        </div>
                        <Divider className={styles.summaryDividerInner} />
                        <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>ยอดที่ได้รับ:</span>
                            <span className={styles.summaryTotal}>
                                ฿{parseFloat(withdrawAmount || "0").toLocaleString()}
                            </span>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}