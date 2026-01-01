"use client";
import React from "react";
import { Button } from "@heroui/react";
import { FiRefreshCw } from "react-icons/fi";
import styles from "@/styles/commission.module.css";

interface DateRefreshSectionProps {
    onRefresh: () => void;
}

export function DateRefreshSection({ onRefresh }: DateRefreshSectionProps) {
    const currentDate = new Date().toLocaleDateString('th-TH', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className={styles.dateRefreshSection}>
            <div className={styles.dateInfo}>
                <span>อัพเดทล่าสุด : {currentDate}</span>
            </div>
            <Button 
                className={styles.refreshButton}
                onPress={onRefresh}
            >
                <FiRefreshCw className={styles.refreshIcon} />
                รีเฟรช
            </Button>
        </div>
    );
}