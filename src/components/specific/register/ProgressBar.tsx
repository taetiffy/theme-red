"use client";

import React, { useMemo } from "react";
import { Progress } from "@heroui/react";

export function ProgressBar({ step }: { step: number }) {
  const pct = useMemo(() => (step <= 1 ? 12 : step === 2 ? 50 : 88), [step]);

  const StepDot = ({
    active,
    done,
    pos,
    icon,
    label,
  }: {
    active: boolean;
    done: boolean;
    pos: "left" | "center" | "right";
    icon: string;
    label: string;
  }) => {
    const basePos =
      pos === "left"
        ? "left-0"
        : pos === "center"
        ? "left-1/2 -translate-x-1/2"
        : "right-0";

    return (
      <div className={["absolute -top-6  px-5", basePos].join(" ")}>
        <div
          className={[
            "w-12 h-12 rounded-2xl",
            "flex items-center justify-center",
            "border",
            "transition-all duration-300",
            done || active
              ? "bg-red-500/5 border-red-500/20 shadow-[0_0_18px_rgba(239,68,68,0.45)]"
              : "bg-red-500/5 border-none",
          ].join(" ")}
        >
          <div
            className={[
              "w-10 h-10 rounded-xl flex items-center justify-center",
              done || active ? "bg-red-500/5" : "bg-black/30",
            ].join(" ")}
          >
            <i
              className={[
                icon,
                "text-lg",
                done || active ? "text-red-600" : "text-white/45",
              ].join(" ")}
            />
          </div>
        </div>

        <div className="mt-2 text-[11px] text-center">
          <span className={done || active ? "text-white/85" : "text-white/35"}>
            {label}
          </span>
        </div>
      </div>
    );
  };

  return (
<div className="w-[250px] mx-auto mb-10">
  <div className="relative pt-6">

    <div className="absolute inset-0 z-10">
      <StepDot
        pos="left"
        icon="fa-solid fa-house"
        label="ข้อมูล"
        active={step === 1}
        done={step > 1}
      />
      <StepDot
        pos="center"
        icon="fa-solid fa-lock-keyhole"
        label="บัญชี"
        active={step === 2}
        done={step > 2}
      />
      <StepDot
        pos="right"
        icon="fa-solid fa-shield-check"
        label="ยืนยัน"
        active={step === 3}
        done={step > 3}
      />
    </div>

  </div>
</div>

  );
}

export default ProgressBar;
