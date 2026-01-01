import React from 'react'
import { Card, CardBody } from "@heroui/card";
import styles from "@/styles/profile.module.css";

export function DepositHistory() {
    return (
        <div className={styles.panelPad}>
            <Card className={`${styles.panelCard} CardBackground`}>
            <CardBody className={styles.empty}>
                <h1 className={styles.empty}>ไม่มีข้อมูล</h1>
            </CardBody>
            </Card>
        </div>
    )
}
