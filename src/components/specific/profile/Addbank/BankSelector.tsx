"use client";
import React, { useEffect, useState } from "react";
import { Select, SelectItem, Card, CardBody, Avatar } from "@heroui/react";
import styles from "@/styles/profile.module.css";
import { bankLists } from "@/variables/BankSelect";
import { BankLists } from "@/types/bankLists";

interface BankSelectorProps {
  selectedBankCode: string;
  onBankSelect: (bankCode: string) => void;
}

export function BankSelector({
  selectedBankCode,
  onBankSelect,
}: BankSelectorProps) {

  const [bls, setBLS] = useState<BankLists[]>([]);

  useEffect(() => {
    const clean = bankLists.filter((item) => item.code !== "999");
    setBLS(clean)
  }, [bankLists])

  const selectedBank = bls.find(
    (bank) => bank.code === selectedBankCode
  );

  return (
    <div className={styles.addBankSection}>
      <h3 className={styles.addBankSectionTitle}>เลือกธนาคาร</h3>

      <Select
        placeholder="เลือกธนาคาร"
        selectedKeys={selectedBankCode ? [selectedBankCode] : []}
        onSelectionChange={(keys) => {
          const key = Array.from(keys)[0] as string;
          onBankSelect(key || "");
        }}
        name="Bank"
        renderValue={(items) => {
          return(
            <div>
              {items.map((item) => (
                <div className="flex items-center  gap-2" key={item.key}>
                  <Avatar size="sm" src={item.data?.image} />
                  <span>{item.data?.name}</span>
                </div>
              ))}
            </div>
          )
        }}
        classNames={{
          trigger: styles.addBankSelectTrigger,
          value: styles.addBankSelectValue,
        }}
        items={bls}
      >
        {(bank) => (
          <SelectItem
            startContent={
              <Avatar
                alt={bank.code}
                className="shrink-0"
                size="sm"
                src={bank.image}
              />
            }
            aria-label={bank.code}
            key={bank.code}
          >
            <div className="text-white">
              {bank.name}
            </div>
          </SelectItem>
        )}
      </Select>
    </div>
  );
}
