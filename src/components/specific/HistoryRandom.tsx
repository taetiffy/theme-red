"use client"
import React from 'react'
import { Card, CardBody } from '@heroui/react'
import styles from '@/styles/random.module.css'

export function HistoryRandom() {
    return (
        <Card className={styles.card}>
            <CardBody className={styles.cardBody}>
                <div className={styles.emptyState}>
                <p className={styles.emptyStateTitle}>ไม่พบข้อมูล</p>
                <p className={styles.emptyStateSub}>
                    คุณยังไม่ได้เปิดกล่องสุ่มเลย
                </p>
                </div>
            </CardBody>
        </Card>
    )
}
