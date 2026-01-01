"use client";
import React, { useState } from "react";
import { Button, NumberInput } from "@heroui/react";
import { useShareStore } from "@/stores/share";

export function InputValue({ min, max }: { min: number; max: number }) {
  const data = [50, 100, 200, 300, 500, 1000, 1500, 2000];
  const [value, setValue] = useState(0);
  const { state } = useShareStore();

  return (
    <>
      {/* INPUT */}
      <NumberInput
        className="pt-4"
        isRequired
        name="money"
        minValue={min}
        maxValue={max}
        placeholder="กรอกจำนวนเงิน"
        inputMode="numeric"
        type="number"
        label={`ระบุจำนวนเงิน (ฝากขั้นต่ำ ${min.toLocaleString()} บาท สูงสุด ${max.toLocaleString()} บาท)`}
        classNames={{
          label: "!text-(--text-color)",
        }}
        value={value}
        onChange={(e: any) => {
          if (state.user.integerDeposit) {
            const v = e.target.value.replace(/[^0-9]/g, "");
            setValue(Number(v));
          } else {
            setValue(Number(e.target.value));
          }
        }}
        labelPlacement="outside"
        errorMessage={({ validationDetails }) => {
          if (validationDetails.rangeUnderflow) {
            return `ขั้นต่ำครั้งละ ${min.toLocaleString()} บาท`;
          }
          if (validationDetails.rangeOverflow) {
            return `มากที่สุดครั้งละ ${max.toLocaleString()} บาท`;
          }
          if (validationDetails.valueMissing) {
            return "โปรดใส่จำนวนเงิน";
          }
        }}
      />

      {/* QUICK SELECT (BAR STYLE) */}
      <div className="grid grid-cols-4 gap-3 mt-4">
        {data.map((amount, index) => {
          if (amount < min || amount > max) return null;

          const isActive = value === amount;

          return (
            <Button
              key={index}
              type="button"
              onClick={() => setValue(amount)}
              className="w-full focus:outline-none mt-4 px-0 bg-transparent rounded-none"
            >
              <div className="w-full flex flex-col items-center gap-2">
                <div className="w-full h-2 overflow-hidden bg-[#212121]">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isActive ? "bg-red-800 w-full" : "bg-[#212121] w-1/3"
                    }`}
                  />
                </div>

                <div
                  className={`text-xs transition-colors ${
                    isActive ? "text-red-500 font-semibold" : "text-white/70"
                  }`}
                >
                  {amount.toLocaleString()} บาท
                </div>
              </div>
            </Button>
          );
        })}
      </div>
    </>
  );
}
