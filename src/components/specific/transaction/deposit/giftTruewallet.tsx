"use client";
import React, { useState } from "react";
import { Button, Input } from "@heroui/react";
import { toast } from "sonner";
import styles from "@/styles/transaction.module.css";

export function GiftTrueWallet() {
  const [giftLink, setGiftLink] = useState<string>("");

  const handleConfirm = () => {
    if (!giftLink.trim()) {
      toast.error("กรุณาใส่ลิงก์ของขวัญ TrueWallet");
      return;
    }

    if (!giftLink.includes("truewallet") && !giftLink.includes("tmn.gift")) {
      toast.error("กรุณาใส่ลิงก์ของขวัญ TrueWallet ที่ถูกต้อง");
      return;
    }
    toast.success("ส่งลิงก์ของขวัญเรียบร้อยแล้ว กรุณารอการตรวจสอบ");
    setGiftLink("");
  };

  const handleInfoClick = () => {
    const youtubeUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    window.open(youtubeUrl, "_blank");
  };

  return (
    <div className={styles.giftContainer}>
      <div className={styles.giftHeader}>
        <h3 className={styles.giftTitle}>ซองของขวัญ TrueWallet</h3>
        <Button
          onClick={handleInfoClick}
          className={styles.giftInfoBtn}
          isIconOnly
          size="sm"
        >
          <svg className={styles.giftInfoIcon} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
        </Button>
      </div>

      <div className={styles.giftForm}>
        <div className={styles.giftInputGroup}>
          <Input
            type="url"
            label="ลิงก์ของขวัญ TrueWallet"
            placeholder="วางลิงก์ของขวัญ TrueWallet ที่นี่"
            value={giftLink}
            onChange={(e) => setGiftLink(e.target.value)}
            classNames={{
              input: styles.giftInputText,
              label: styles.giftInputLabel,
            }}
          />
        </div>

        <Button
          onClick={handleConfirm}
          className={`${styles.giftBtnPrimary} Btn1`}
          size="lg"
          disabled={!giftLink.trim()}
        >
          ยืนยันการรับของขวัญ
        </Button>
      </div>
    </div>
  );
}