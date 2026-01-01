"use client";
import React, { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "@heroui/modal";
import { Button } from "@heroui/react";
import { NoDataModal } from "@/types/modal";
import { toast } from "sonner";
import { BankSelector } from "@/components/specific/profile/Addbank/BankSelector";
import { AccountForm } from "@/components/specific/profile/Addbank/AccountForm";
import { AddBankSummary } from "@/components/specific/profile/Addbank/AddBankSummary";
import styles from "@/styles/profile.module.css";
import { UseCustomDisclosureReturn } from "@/hooks/useCustomDisclosure";
import { createBankService } from "@/services/bank";
import { useMemberStore } from "@/stores/member";


export default function AddBankModal({ disclosure }: { disclosure: UseCustomDisclosureReturn }) {

    const [selectedBankCode, setSelectedBankCode] = useState<string>("");
    const [accountNumber, setAccountNumber] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { member } = useMemberStore();

    const selectedBank = undefined; // Will be handled by AddBankSummary component

    const handleSubmit = async () => {
        if (!selectedBankCode) {
            toast.error("กรุณาเลือกธนาคาร");
            return;
        }

        if (!accountNumber || accountNumber.length < 10) {
            toast.error("กรุณาใส่หมายเลขบัญชีที่ถูกต้อง (อย่างน้อย 10 หลัก)");
            return;
        }

        setIsLoading(true);

        toast.promise(createBankService(member ? member.full_name : "", selectedBankCode.trim(), accountNumber.trim()), {
            loading: "กำลังดำเนินการ...",
            success: (data) => {
                handleReset();
                if (disclosure.state.onClose) disclosure.state.onClose();
                return (data as unknown as { message?: string }).message ?? "ดำเนินการสำเร็จ"
            },
            error: (data) => (data as unknown as { message?: string }).message ?? "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งในภายหลัง",
        });

    };

    const handleReset = () => {
        setSelectedBankCode("");
        setAccountNumber("");
        setIsLoading(false);
    };

    const formatAccountNumber = (value: string) => {
        const digits = value.replace(/\D/g, '');
        return digits.slice(0, 15);
    };

    const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatAccountNumber(e.target.value);
        setAccountNumber(formatted);
    };


    return (
        <Modal
            isOpen={disclosure.state.isOpen}
            onClose={disclosure.state.onClose}
            placement="center"
            className={`${styles.addBankModal} ModalBackground`}
            size="lg"
            classNames={{
                body: styles.addBankModalBody,
                header: styles.addBankModalHeader
            }}
        >
            <ModalContent className={styles.addBankModalContent}>
                <ModalHeader className={styles.addBankModalHeader}>
                    <h2 className={styles.addBankModalTitle}>เพิ่มบัญชีธนาคาร</h2>
                    <p className={styles.addBankModalBalance}>
                        กรอกข้อมูลบัญชีธนาคารของคุณ
                    </p>
                </ModalHeader>

                <ModalBody className={styles.addBankModalBody}>
                    <BankSelector
                        selectedBankCode={selectedBankCode}
                        onBankSelect={setSelectedBankCode}
                    />

                    <AccountForm
                        accountNumber={accountNumber}
                        onAccountNumberChange={handleAccountNumberChange}
                    />

                    <AddBankSummary
                        selectedBankCode={selectedBankCode}
                        accountNumber={accountNumber}
                    />
                </ModalBody>

                <ModalFooter className={styles.addBankModalFooter}>
                    <Button
                        variant="flat"
                        onPress={() => {
                            handleReset();
                            if (disclosure.state.onClose) disclosure.state.onClose();
                        }}
                        className={styles.addBankModalCancel}
                        disabled={isLoading}
                    >
                        ยกเลิก
                    </Button>
                    <Button
                        onPress={handleSubmit}
                        className={`${styles.addBankModalSubmit} Btn1 `}
                        isLoading={isLoading}
                        isDisabled={!selectedBankCode || !accountNumber}
                    >
                        {isLoading ? "กำลังเพิ่มบัญชี..." : "เพิ่มบัญชี"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
