"use client";
import { Card, CardBody, Button } from "@heroui/react";
import React from "react";
import { cashItems } from "@/variables/DataShop";
import styles from "@/styles/shop.module.css";

export const CashContent = () => {
    return(
        <div className={styles.ShopGrid}>
        {cashItems.map((item) => (
            <Card key={item.id} className={styles.ShopCard}>
            <CardBody className={styles.ShopCardBody}>
                <div className={styles.ShopImageWrap}>
                </div>

                <div className={styles.ShopCardContent}>
                <p className={styles.ShopPrice}>{item.price}</p>
                <h3 className={styles.ShopItemTitle}>{item.title}</h3>
                <Button className={`${styles.ShopBtn1} Btn1`} size="md">
                    {item.buttonText}
                </Button>
                </div>
            </CardBody>
            </Card>
        ))}
        </div>
    )
}