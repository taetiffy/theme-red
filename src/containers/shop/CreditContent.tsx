"use client";

import React, { useMemo, useState } from "react";
import { useShop } from "@/hooks/shop";
import { useShareStore } from "@/stores/share";
import { formatWithOutCurrency } from "@/utils/format.utils";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Input,
  Image,
  Form,
  Chip,
} from "@heroui/react";
import { FaExchangeAlt } from "react-icons/fa";

export const CreditContent = () => {
  const { state } = useShareStore();
  const { exchange } = useShop();

  const [diamond, setDiamond] = useState<string>("");

  const diamondNumber = useMemo(() => {
    const n = Number(String(diamond || "").replace(/[^0-9]/g, ""));
    return Number.isFinite(n) ? n : 0;
  }, [diamond]);

  const creditPreview = useMemo(() => {
    const rate = Number(state.gem_to_credit_rate || 1);
    if (!diamondNumber || !rate) return "0.00";
    return formatWithOutCurrency(diamondNumber / rate);
  }, [diamondNumber, state.gem_to_credit_rate]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ใช้ค่าที่ sanitize แล้ว
    if (!diamondNumber || diamondNumber <= 0) return;
    exchange(diamondNumber);
  };

  return (
    <div className="w-full flex justify-center">
      <Form onSubmit={onSubmit} className="w-full flex justify-center">
        <Card className="w-full md:w-3/5 xl:w-1/2 bg-black/25 border border-white/10 rounded-2xl overflow-hidden">
          {/* ===== Header ===== */}
          <CardHeader className="p-0">
            <div className="w-full px-4 py-4 relative overflow-hidden border-b border-white/10">
              <div className="absolute -inset-12 bg-linear-to-r from-red-900/45 via-red-600/10 to-transparent blur-2xl pointer-events-none" />
              <div className="relative flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-black/30 border border-white/10 flex items-center justify-center">
                    <FaExchangeAlt className="text-red-200" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <div className="text-xl font-semibold text-white">
                      แลกเครดิต
                    </div>
                    <div className="text-xs text-white/60">
                      แปลงเพชรเป็นเครดิตได้ทันที
                    </div>
                  </div>
                </div>

                <Chip
                  size="sm"
                  className="bg-black/30 border border-white/10 text-white/80"
                >
                  Rate: {state.gem_to_credit_rate} 💎 / 1.00
                </Chip>
              </div>
            </div>
          </CardHeader>

          {/* ===== Body ===== */}
          <CardBody className="p-4 sm:p-5">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Left panel */}
              <div className="md:w-[200px] w-full shrink-0">
                <div className="rounded-2xl border border-white/10 bg-black/25 p-4 h-full flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl border border-white/10 bg-black/30 flex items-center justify-center">
                    <Image
                      src="/icons/diamond.gif"
                      alt="diamond"
                      removeWrapper
                      className="w-12 h-12 object-contain"
                    />
                  </div>

                  <div className="mt-3 text-sm font-semibold text-white">
                    เพชร → เครดิต
                  </div>
                  <div className="mt-1 text-[11px] text-white/60 text-center">
                    อัตราแลกเปลี่ยน {state.gem_to_credit_rate} เพชร ต่อ 1.00 เครดิต
                  </div>
                </div>
              </div>

              {/* Right panel */}
              <div className="flex-1 flex flex-col gap-3">
                <Input
                  isRequired
                  label="กรอกจำนวนเพชร"
                  labelPlacement="outside"
                  inputMode="numeric"
                  type="text"
                  name="diamond"
                  value={diamond}
                  onValueChange={(v) => setDiamond(v.replace(/[^0-9]/g, ""))}
                  placeholder="เช่น 100"
                  classNames={{
                    label: "text-white/80",
                    inputWrapper:
                      "bg-black/20 border border-white/10 data-[hover=true]:bg-black/25",
                    input: "text-white",
                  }}
                  startContent={
                    <Image width={26} src="/icons/diamond.gif" alt="diamond" />
                  }
                  errorMessage={() => {
                    if (diamond && !/^\d+$/.test(diamond)) return "โปรดใส่เฉพาะตัวเลข";
                    return "";
                  }}
                />

                {/* Preview */}
                <div className="relative rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm text-white/70">จำนวนเครดิตที่จะได้</div>

                    <div className="flex items-center gap-2">
                      <Image
                        className="gold-spin-animation"
                        width={20}
                        src="/icons/gold.png"
                        alt="gold"
                      />
                      <div className="text-xl font-bold text-white tabular-nums">
                        {creditPreview}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 text-[11px] text-white/55">
                    * คำนวณจาก {diamondNumber.toLocaleString()} เพชร ÷{" "}
                    {state.gem_to_credit_rate}
                  </div>

                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-t from-black/25 via-transparent to-white/5 opacity-60" />
                </div>

                <div className="text-[11px] text-red-600/90">
                  ** อัตราแลกเปลี่ยน {state.gem_to_credit_rate} เพชรต่อ 1.00 เครดิต **
                </div>
              </div>
            </div>
          </CardBody>

          {/* ===== Footer ===== */}
          <CardFooter className="p-4 sm:p-5 pt-0">
            <Button
              type="submit"
              className="Btn2 w-full h-11 rounded-xl"
              isDisabled={!diamondNumber || diamondNumber <= 0}
            >
              แลกเปลี่ยน
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </div>
  );
};
