"use client";
import React from "react";
import { Avatar } from "@heroui/react";
import { bankLists } from "@/variables/BankSelect";
import { FaCircleCheck } from "react-icons/fa6";

function getBankImage(code?: string) {
  const data = bankLists.find((b) => b.code === code);
  return data?.image || "";
}

type BaseBank = {
  id: string;
  bank_name?: string;
  bank_number?: string;
  bank_code?: string;

  name?: string;
  number?: string;
  code?: string;
};

interface CardBankSelectProps<T extends BaseBank> {
  label: string;
  bankList: T[];
  value?: string;
  onChange: (id: string) => void;
}

export function CardBankSelect<T extends BaseBank>({
  label,
  bankList,
  value,
  onChange,
}: CardBankSelectProps<T>) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm text-white/80">
        <span>{label}</span>
        <span>บัญชี : {bankList.length}</span>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-2 gap-3">
        {bankList.map((bank) => {
          const isActive = value === bank.id;

          const bankName = bank.bank_name ?? bank.name;
          const bankNumber = bank.bank_number ?? bank.number;
          const bankCode = bank.bank_code ?? bank.code;

          return (
            <>
           <div>
             <div
              key={bank.id}
              onClick={() => onChange(bank.id)}
              className={[
                "cursor-pointer rounded-2xl p-4 transition-all duration-200",
                "border backdrop-blur-xl",
                isActive
                  ? "border-red-500/20 bg-red-500/10 shadow-[0_0_0_1px_red] shadow-red-500/30"
                  : "border-none bg-white/5 hover:bg-white/10",
              ].join(" ")}
            >
              <div className="flex items-center gap-3">
                <Avatar
                  size="lg"
                  src={getBankImage(bankCode)}
                  className="shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">
                    {bankName}
                  </div>
                  <div className="text-xs text-white/60 truncate">
                    {bankNumber}
                  </div>
                </div>

                {isActive && (
                  <FaCircleCheck className="text-red-500 w-4 h-4 shrink-0" />
                )}
              </div>
            </div>
           </div>
            </>
          );
        })}
      </div>

      {bankList.length === 0 && (
        <div className="text-sm text-red-400">
          ไม่มีบัญชีธนาคาร
        </div>
      )}
    </div>
  );
}
