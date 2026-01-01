"use client";
import React from "react";
import { FiClock } from "react-icons/fi";
import styles from "@/styles/commission.module.css";

export function CommissionHeader() {
    return (
        <div className={styles.header}>
            <div className={styles.headerTitle}>
                <h1 className={styles.pageTitle}>คอมมิชชั่น : คาสิโน</h1>
                <FiClock className={styles.clockIcon} />
            </div>
        </div>
    );
}