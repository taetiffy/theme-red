"use client";
import React from "react";
import { Card, CardBody, Chip } from "@heroui/react";
import styles from "@/styles/transaction.module.css";
import { BankApiResponse } from "@/types/bankLists";
import { findBankWithCode } from "@/utils/helpers";

interface BankSelectionProps {
  bankList: BankApiResponse[];
  selectedBankId: string | undefined;
  onBankSelect: (bankId: string) => void;
  isLight: boolean;
  label?: string;
}

export function BankSelection({
  bankList,
  selectedBankId,
  onBankSelect,
  isLight,
  label = "เลือกบัญชีธนาคารปลายทางที่จะถอน",
}: BankSelectionProps) {
  const availableBanks = bankList; // parent filter มาแล้ว (!= 999)
  const selectedBank = availableBanks.find((bank) => bank.id === selectedBankId);

  const cardIdle = isLight
    ? "border-black/10 bg-black/5 hover:bg-black/10"
    : "border-none bg-white/5 hover:bg-white/10";

  const cardActive = isLight
    ? "border-blue-500/60 bg-blue-500/10"
    : "border-red-500/60 border-none bg-red-500/10";

  return (
    <div className={styles.bankSelectionContainer}>
      {availableBanks.length === 0 ? (
        <Card className="bg-red-400/5 border border-red-500/20 h-full min-h-[120px] sm:min-h-[140px] lg:min-h-[160px]">
          <CardBody className="p-4 h-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-400 text-sm sm:text-base font-medium">
                ไม่มีบัญชีธนาคารที่ใช้งานได้
              </p>
              <p className="text-red-300/70 text-xs sm:text-sm mt-1">
                กรุณาเพิ่มบัญชีธนาคารในหน้าโปรไฟล์
              </p>
            </div>
          </CardBody>
        </Card>
      ) : (
        <>
          <div className="mb-2 flex items-center justify-between">
            <p className={isLight ? "text-black/70 text-sm" : "text-white/80 text-sm"}>
              {label}
            </p>
            <p className={isLight ? "text-black/45 text-xs" : "text-white/45 text-xs"}>
              บัญชี : {availableBanks.length}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
            {availableBanks.map((bank) => {
              const active = bank.id === selectedBankId;
              const tump = findBankWithCode(bank.bank_code);

              return (
                <div
                  key={bank.id}
                  onClick={() => onBankSelect(bank.id)}
                  className={[
                    "cursor-pointer rounded-2xl border p-4 transition-all duration-200 select-none",
                    active ? cardActive : cardIdle,
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className={isLight ? "text-black font-semibold truncate" : "text-white font-semibold truncate"}>
                        {bank.bank_name}
                      </p>
                      <p className={isLight ? "text-black/60 text-xs mt-0.5 truncate" : "text-white/60 text-xs mt-0.5 truncate"}>
                        {bank.bank_number} {tump?.name ? `- ${tump.name}` : ""}
                      </p>
                    </div>

                    {active ? (
                      <i
                        className={[
                          "fa-solid fa-circle-check text-xl",
                          isLight ? "text-red-500" : "text-red-600",
                        ].join(" ")}
                      />
                    ) : (
                      <i className={isLight ? "fa-regular fa-circle text-xl text-black/25" : "fa-regular fa-circle text-xl text-white/25"} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {selectedBank ? (
        <Card className={styles.selectedBankCard}>
          <CardBody className={styles.selectedBankContent}>
            <div className={styles.selectedBankContainer}>
              <div className={styles.selectedBankInfo}>
                <h4 className={styles.selectedBankName}>{selectedBank.bank_name}</h4>
                <p className={styles.selectedBankAccountName}>
                  {findBankWithCode(selectedBank.bank_code)?.name}
                </p>
                <p className={styles.selectedBankAccountNumber}>{selectedBank.bank_number}</p>
              </div>
              <Chip size="sm" className={styles.selectedBankStatus}>
                ใช้งานได้
              </Chip>
            </div>
          </CardBody>
        </Card>
      ) : (
        <Card className="bg-red-400/5 border h-full border-red-500/20">
          <CardBody className="p-4">
            <p className="text-sm text-red-400 text-center">กรุณาเลือกบัญชีธนาคาร</p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
