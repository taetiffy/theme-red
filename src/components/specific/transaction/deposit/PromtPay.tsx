"use client";
import React, { useState, useEffect } from "react";
import { Button, Input } from "@heroui/react";
import { toast } from "sonner";
import styles from "@/styles/transaction.module.css";

export function PromtPay() {
  const [amount, setAmount] = useState<string>("");
  const [showQR, setShowQR] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (showQR && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setShowQR(false);
            setQrCodeUrl("");
            toast.error("QR Code หมดอายุแล้ว กรุณาสร้างใหม่");
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showQR, timeLeft]);

  const handleGenerateQR = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("กรุณาใส่จำนวนเงินที่ถูกต้อง");
      return;
    }
    if (parseFloat(amount) < 100) {
      toast.error("จำนวนเงินขั้นต่ำ 100 บาท");
      return;
    }

    const qrData = `00020101021229370016A000000677010111011300665xxxxxx540${amount}5303764540${amount}63047E3A`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
      qrData
    )}`;

    setQrCodeUrl(qrUrl);
    setShowQR(true);
    setTimeLeft(900);

    toast.success("สร้าง QR Code สำเร็จ");
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleReset = () => {
    setShowQR(false);
    setQrCodeUrl("");
    setTimeLeft(0);
    setAmount("");
  };

  return (
    <div className={styles.promtpaycontainer}>
      {!showQR ? (
        <div className={styles.promtpayform}>
          <div className={styles.promtpayformGroup}>
            <Input
              type="number"
              label="จำนวนเงิน (บาท)"
              placeholder="ใส่จำนวนเงินที่ต้องการฝาก"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              errorMessage={({validationDetails}) => {
                if(validationDetails.rangeUnderflow){
                  return "จำนวนเงินขั้นต่ำ 100 บาท"
                }
              }}
              startContent="฿"
              min={100}
              classNames={{
                input: styles.promtpayinputText,
                label: styles.promtpayinputLabel,
              }}
            />
            <p className={styles.promtpayhelperText}>
              จำนวนเงินขั้นต่ำ 100 บาท
            </p>
          </div>

          <Button
            onClick={handleGenerateQR}
            className={`${styles.promtpaybtnPrimary} Btn1`}
            size="lg"
          >
            สร้าง QR Code
          </Button>
        </div>
      ) : (
        <div className={styles.promtpaycenter}>
          <div className={styles.promtpayqrWrapper}>
            <img
              src={qrCodeUrl}
              alt="PromtPay QR Code"
              className={styles.promtpayqrImage}
            />
          </div>

          <div className="space-y-2">
            <p className={styles.promtpayamountText}>
              จำนวนเงิน: ฿{parseFloat(amount).toLocaleString()}
            </p>

            <div className={styles.promtpaycountdownBox}>
              <p className={styles.promtpaycountdownLabel}>
                QR Code หมดอายุใน
              </p>
              <p className={styles.promtpaycountdownTime}>
                {formatTime(timeLeft)}
              </p>
            </div>
          </div>

          <div className={styles.promtpaytips}>
            <p className={styles.promtpaytip}>
              เปิดแอพธนาคารหรือแอพที่รองรับ PromptPay
            </p>
            <p className={styles.promtpaytip}>
              สแกน QR Code นี้เพื่อทำการโอนเงิน
            </p>
            <p className={styles.promtpaytipWarn}>
              กรุณาโอนตามจำนวนที่แสดงเท่านั้น
            </p>
          </div>

          <div className={styles.promtpayactions}>
            <Button
              onPress={handleReset}
              className={styles.promtpaybtnCancel}
              size="lg"
            >
              ยกเลิก
            </Button>
            <Button
              onPress={() => toast.info("กรุณารอการตรวจสอบการโอนเงิน")}
              className={`${styles.promtpaybtnSecondary} Btn1`}
              size="lg"
            >
              ฉันโอนเงินแล้ว
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
