"use client";
import React from "react";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import { FiBarChart, FiUsers, FiGift } from "react-icons/fi";
import styles from "@/styles/affiliate.module.css";
import Incomehistory from "./Incomehistory";
import { OnStartAnimate } from "@/components/OnStartAnimate";
interface PromotionTabsProps {
    selectedTab: string;
    onTabChange: (tab: string) => void;
}

export function AffiliateTabs({ selectedTab, onTabChange }: PromotionTabsProps) {
    return (
        <div className={styles.tabsContainer}>
            <Tabs
                selectedKey={selectedTab}
                onSelectionChange={(key) => onTabChange(key as string)}
                className=" w-full md:w-md"

                classNames={{
                    tabList: styles.tabList,
                    cursor: styles.tabCursor,
                    tab: styles.tab,
                    tabContent: styles.tabContent
                }}
            >
                <Tab
                    key="summary"
                    title={
                        <div className={styles.tabTitle}>
                            <FiBarChart className="text-white"/>
                            <span>ภาพรวม</span>
                        </div>
                    }
                >
                    <OnStartAnimate>
                    <div className={styles.tabContentContainer}>
                        <div className={styles.summarySection}>
                            <h3 className={styles.sectionTitle}>ประวัติรายได้</h3>
                            
                            <div className={styles.statsGrid}>
                                <div className={styles.statCard}>
                                    <div className={styles.statHeader}>
                                        <span className={styles.statLabel}>ยอดเสียทั้งหมด</span>
                                        <button className={`${styles.guideButton} Btn1`}>คู่มือ</button>
                                    </div>
                                    <div className={styles.statValue}>0.00</div>
                                </div>
                                
                                <div className={styles.statCard}>
                                    <div className={styles.statLabel}>รายได้ทั้งหมด (บาท)</div>
                                    <div className={styles.statValue}>0.00</div>
                                </div>
                                
                                <div className={styles.statCard}>
                                    <div className={styles.statLabel}>รายได้วันนี้ (บาท)</div>
                                    <div className={styles.statValue}>0.00</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </OnStartAnimate>
                </Tab>
            </Tabs>
        </div>
    );
}