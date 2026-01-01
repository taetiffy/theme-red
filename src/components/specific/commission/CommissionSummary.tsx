"use client";
import React from "react";
import { Card } from "@heroui/react";
import styles from "@/styles/commission.module.css";

interface CommissionData {
    totalCommission: number;
    accumulatedCommission: number;
    todayCommission: number;
}

interface CommissionSummaryProps {
    data: CommissionData;
}

export function CommissionSummary({ data }: CommissionSummaryProps) {
    const formatAmount = (amount: number) => {
        return amount.toFixed(2);
    };

    return (
        <div className={styles.summaryGrid}>
            {/* Total Commission Card */}
            <div className={styles.summaryCardWrapper}>
                <Card className={styles.summaryCard}>
                    <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>คอมมิชชั่นรวมทั้งหมด</h3>
                        <p className={styles.cardAmount}>{formatAmount(data.totalCommission)}</p>
                    </div>
                </Card>
            </div>

            {/* Accumulated Commission Card */}
            <div className={styles.summaryCardWrapper}>
                <Card className={styles.summaryCard}>
                    <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>คอมมิชชั่นสะสม</h3>
                        <p className={styles.cardAmount}>{formatAmount(data.accumulatedCommission)}</p>
                    </div>
                </Card>
            </div>

            {/* Today Commission Card */}
            <div className={styles.summaryCardWrapper}>
                <Card className={styles.summaryCard}>
                    <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>คอมมิชชั่นวันนี้</h3>
                        <p className={styles.cardAmount}>{formatAmount(data.todayCommission)}</p>
                    </div>
                </Card>
            </div>
        </div>
    );
}