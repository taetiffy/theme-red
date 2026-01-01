"use client";

import React, { useEffect, useState } from "react";
import { Button, Input } from "@heroui/react";
import styles from "@/styles/auth/register.module.css";

interface StepOneProps {
    onValue: (n: string) => void;
    RequestOtp: () => void;
    enableOtp: boolean;
}

export function PhoneNumber({ onValue, RequestOtp, enableOtp }: StepOneProps) {
    const [number, setNumber] = useState<string>("");
    useEffect(() => onValue(number), [number]);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <Input
                    type="tel"
                    isRequired
                    inputMode="numeric"
                    placeholder="เบอร์โทรศัพท์"
                    name="phoneNumber"
                    className={styles.RegisterInput}
                    classNames={{
                        input: styles.RegisterInputField,
                        inputWrapper: styles.RegisterInputWrapper,
                    }}
                    radius="lg"
                    size="lg"
                    maxLength={10}
                    minLength={10}
                    onInput={(e: any) => {
                        const clean = e.target.value.replace(/[^0-9]/g, "");
                        e.target.value = clean;
                        setNumber(clean);
                    }}
                    value={number}
                    pattern="^0[689]\d{8}$"
                    errorMessage={({ validationDetails }) => {
                        if (validationDetails.tooShort) {
                            return "โปรดใส่ให้ครบ 10 ตัว";
                        }
                        if (validationDetails.valueMissing) {
                            return "โปรดใส่เบอร์โทร";
                        }
                        if (validationDetails.patternMismatch) {
                            return "โปรดใส่เบอร์โทรศัพท์ให้ถูกต้อง";
                        }
                    }}
                />

                {enableOtp && (
                    <Button className="Btn2" onPress={RequestOtp}>
                        ขอ OTP
                    </Button>
                )}
            </div>

            {enableOtp && (
                <Input
                    isRequired
                    type="text"
                    minLength={6}
                    maxLength={6}
                    name="otp"
                    radius="lg"
                    size="lg"
                    className={styles.RegisterInput}
                    classNames={{
                        input: styles.RegisterInputField,
                        inputWrapper: styles.RegisterInputWrapper,
                    }}
                    errorMessage={({ validationDetails }) => {
                        if (validationDetails.tooShort) {
                            return "รหัสผ่านอย่างน้อย 6 ตัว";
                        }
                    }}
                    placeholder={`กรอก OTP`}
                    inputMode="numeric"
                />
            )}
        </div>
    );
}

export default PhoneNumber;
