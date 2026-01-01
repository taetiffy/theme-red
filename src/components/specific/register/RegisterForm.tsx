import React, { useMemo, useState } from "react";
import { Input, Select, SelectItem, Avatar } from "@heroui/react";
import styles from "@/styles/auth/register.module.css";
import { bankLists } from "@/variables/BankSelect";
import Cookies from "js-cookie";
import { useShareStore } from "@/stores/share";

export function RegisterForm({ userPhone }: { userPhone: string }) {
    const [value, setValue] = useState("");
    const [number, setNumber] = useState<string>("");

    const affiliateCode = useMemo(() => Cookies.get("ref"),[])
    const { state } = useShareStore()

    console.log(state.user.userBankName)

    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value);
        if (e.target.value === "999") setNumber(userPhone);
        if (e.target.value !== "999" && number === userPhone) setNumber("");
    };

    return (
        <>
            <div className={styles.RegisterForm}>
                <div>
                    <label className={styles.RegisterLabel}>ธนาคาร</label>
                    <Select
                        aria-label="bank"
                        isRequired
                        placeholder="เลือกธนาคาร"
                        name="bankCode"
                        className={styles.RegisterInput}
                        errorMessage={() => "โปรดเลือกธนาคาร"}
                        items={bankLists}
                        classNames={{
                            trigger: styles.RegisterInputWrapper,
                            value: "text-white",
                            popoverContent: "bg-black border-gray-600",
                            listbox: "text-white",
                        }}
                        radius="lg"
                        size="lg"
                        selectedKeys={[value]}
                        onChange={handleSelectionChange}
                        renderValue={(items) => {
                            return items.map((item) => (
                                <div key={item.key} className="flex items-center gap-2">
                                    <Avatar
                                        alt={item.data?.code}
                                        className="shrink-0"
                                        size="sm"
                                        src={item.data?.image}
                                    />
                                    <div className="flex flex-col">
                                        <span>{item.data?.name}</span>
                                    </div>
                                </div>
                            ));
                        }}
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
                                {bank.name}
                            </SelectItem>
                        )}
                    </Select>
                </div>

                <div>
                    <label className={styles.RegisterLabel}>เลขบัญชีธนาคาร</label>
                    <Input
                        isRequired
                        type="text"
                        inputMode="numeric"
                        placeholder="เลขบัญชีธนาคาร"
                        name="bankAccount"
                        className={styles.RegisterInput}
                        minLength={8}
                        errorMessage={({ validationDetails }) => {
                            if (validationDetails.tooShort) {
                                return "เลขบัญชีธนาคารต้องมี 8 หลักขึ้นไป";
                            }
                        }}
                        onInput={(e: any) => {
                            const clean = e.target.value.replace(/[^0-9]/g, "");
                            e.target.value = clean;
                            setNumber(clean);
                        }}
                        value={number}
                        classNames={{
                            input: styles.RegisterInputField,
                            inputWrapper: styles.RegisterInputWrapper,
                        }}
                        radius="lg"
                        size="lg"
                        isDisabled={value === "999"}
                    />
                </div>
                {state.user.userBankName && (
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className={styles.RegisterLabel}>ชื่อ</label>
                          <Input
                              isRequired
                              type="text"
                              name="firstName"
                              placeholder="ชื่อ"
                              className={styles.RegisterInput}
                              classNames={{
                                  input: styles.RegisterInputField,
                                  inputWrapper: styles.RegisterInputWrapper,
                              }}
                              radius="lg"
                              size="lg"
                          />
                      </div>
                      <div>
                          <label className={styles.RegisterLabel}>นามสกุล</label>
                          <Input
                              isRequired
                              type="text"
                              placeholder="นามสกุล"
                              name="lastName"
                              className={styles.RegisterInput}
                              classNames={{
                                  input: styles.RegisterInputField,
                                  inputWrapper: styles.RegisterInputWrapper,
                              }}
                              radius="lg"
                              size="lg"
                          />
                      </div>
                  </div>
                )}

                {affiliateCode && (
                  <div>
                      <label className={styles.RegisterLabel}>รหัสแนะนำเพื่อน</label>
                      <Input
                          type="text"
                          inputMode="text"
                          placeholder="รหัสแนะนำเพื่อน"
                          name="affiliateCode"
                          className={styles.RegisterInput}
                          defaultValue={affiliateCode}
                          classNames={{
                              input: styles.RegisterInputField,
                              inputWrapper: styles.RegisterInputWrapper,
                          }}
                          radius="lg"
                          size="lg"
                      />
                  </div>
                )}
            </div>
        </>
    );
}
