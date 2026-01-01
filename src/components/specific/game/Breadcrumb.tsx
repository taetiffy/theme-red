"use client";
import React from "react";
import styles from "@/styles/game.module.css";

interface BreadcrumbProps {
    currentCategory: string;
}

export function Breadcrumb({ currentCategory }: BreadcrumbProps) {
    return (
        <div className={styles.breadcrumb}>
            <span>หน้าแรก</span>
            <span>{">"}</span>
            <span className={styles.breadcrumbCurrent}>{currentCategory}</span>
        </div>
    );
}