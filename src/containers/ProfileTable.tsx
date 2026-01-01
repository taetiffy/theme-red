'use client'
import React from 'react'
import { Tabs, Tab } from "@heroui/react";
import styles from "@/styles/profile.module.css";
import { GameHistory } from '@/components/specific/history/game';
import { WithdrawDepositHistory } from '@/components/specific/history/withdraw';
import { DepositHistory } from '@/components/specific/profile/deposit';
import { MissionHistory } from '@/components/specific/history/mission';

export function ProfileTable() {
    return (
        <div className={styles.historyWrap}>
        <h2 className={styles.historyTitle}>ประวัติการใช้งาน</h2>

        <Tabs
            aria-label="History tabs"
            variant="underlined"
            className={`${styles.tabs} ${styles.customTabs} `}
            classNames={{
                tabList: styles.tabList,
                cursor: 'bg-[var(--main-color)] ',
                tab: `${styles.tab} *:text-[var(--main-color)]`,
                tabContent: styles.tabContent,
            }}
        >
            <Tab key="income" title="รายการเดิมพัน" className={styles.tabPanel}>
                <GameHistory />
            </Tab>

            <Tab key="withdraw" title="รายการธุรกรรม" className={styles.tabPanel}>
                <WithdrawDepositHistory />
            </Tab>

            <Tab key="bonus" title="ภารกิจ" className={styles.tabPanel}>
                <MissionHistory />
            </Tab>

        `    {/* <Tab key="reports" title="วันที่สมา" className={styles.tabPanel}>
                <div className={styles.panelPad}>
                <Card className={styles.panelCard}>
                <CardBody className={styles.empty}>
                    <h1 className={styles.empty}>ไม่มีข้อมูล</h1>
                    </CardBody>
                </Card>
                </div>
            </Tab> */}
            </Tabs>
        </div>
    )
}
