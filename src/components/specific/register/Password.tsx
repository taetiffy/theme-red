"use client";

import React, { useState } from "react";
import { PasswordInput } from "@/components/PasswordInput";

export function InputPassword() {
    return (
        <div className="flex flex-col gap-2 justify-center w-full">
            <PasswordInput />
            <PasswordInput title="ยืนยันรหัสผ่าน" name="ConfirmPassword" />
        </div>
    );
}
