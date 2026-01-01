"use client";
import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import styles from "@/styles/transaction.module.css";
import { bankAccounts } from "@/variables/MockBank";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function Bank() {
    return (
        <div className={styles.bankContainer}>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={12}
                slidesPerView={1.1}
                breakpoints={{
                    640: {
                        slidesPerView: 1.2,
                        spaceBetween: 16,
                    },
                    768: {
                        slidesPerView: 1.3,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 1.1,
                        spaceBetween: 24,
                    },
                }}
                navigation={{
                    prevEl: `.${styles.bankNavPrev}`,
                    nextEl: `.${styles.bankNavNext}`,
                }}
                pagination={{
                    el: `.${styles.bankPagination}`,
                    clickable: true,
                    renderBullet: (index, className) => {
                        return `<span class="${className}">${index + 1}/${bankAccounts.length}</span>`;
                    },
                }}
                className={styles.bankSwiper}
            >
                {bankAccounts.map((bank) => (
                    <SwiperSlide key={bank.id}>
                        <Card className={styles.bankCard}>
                            <CardBody className="p-0">
                                <div className={styles.bankCardHeader}>
                                    <div className={styles.bankInfo}>
                                        {/* <div className={`${styles.bankLogo} ${getBankLogoColor(bank.bankCode)}`}>
                      <span className={styles.bankLogoText}>
                        {getBankLogo(bank.bankCode)}
                      </span>
                    </div> */}
                                        <div className={styles.bankDetails}>
                                            <h3 className={styles.bankName}>{bank.bankName}</h3>
                                            <p className={styles.bankType}>บัญชีออมทรัพย์</p>
                                        </div>
                                    </div>
                                    <div
                                        className={`${styles.bankStatus} ${bank.isActive ? styles.bankStatusActive : styles.bankStatusInactive}`}
                                    >
                                        {bank.isActive ? "ใช้งานได้" : "ปิดใช้งาน"}
                                    </div>
                                </div>

                                <div className={styles.bankAccount}>
                                    <p className={styles.bankAccountName}>{bank.accountName}</p>
                                    <p className={styles.bankAccountNumber}>{bank.accountNumber}</p>
                                </div>
                            </CardBody>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

