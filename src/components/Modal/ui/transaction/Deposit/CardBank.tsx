import React, { useState } from "react";
import { Avatar } from "@heroui/react";
import { Select, SelectItem } from "@heroui/select";
import { bankLists } from "@/variables/BankSelect";
import { useBank } from "@/hooks/bank";
import { BankApiResponse, BankSettingApiResponse } from "@/types/bankLists";
import { CardBankSelect } from "../CardBankSelect";

function ImageCheck(str: string): string {
    const data = bankLists.find((item) => item.code === str);
    return data?.image || "";


}

export function OneCardBank({
    bankList,
    label = "เลือกบัญชีธนาคารฝากของคุณ",
}: {
    bankList: BankApiResponse[];
    label?: string;
}) {
    const [selected, setSelected] = useState<string | undefined>(
        bankList[0]?.id
    );

    return (
        <div className="overflow-y-auto h-[230px]">
            <CardBankSelect
                label={label}
                bankList={bankList}
                value={selected}
                onChange={(id) => setSelected(id)}
            />
            {/* HARD INPUT VALUE EXTRACT WITH FORM */}
            <input type="text" name="yourBank" value={selected} />
        </div>
    );
}

export function TwoCardBank({ bankList }: { bankList: BankSettingApiResponse[] }) {
    return (
        <Select
            isRequired
            errorMessage={({ validationDetails }) => {
                if (validationDetails.valueMissing) {
                    return "เลือกบัญชีธนาคารที่ฝากเงินเข้า";
                }
            }}
            label={
                <div className="flex w-full justify-between text-(--text-color)">
                    <span>เลือกบัญชีธนาคารที่ฝากเงินเข้า</span>
                    <span>บัญชี : {bankList.length}</span>
                </div>
            }
            classNames={{
                label: "w-full flex justify-between",
            }}
            size="lg"
            labelPlacement="outside"
            placeholder="โปรดเลือกบัญชีธนาคาร"
            disallowEmptySelection
            name="myBank"
            defaultSelectedKeys={bankList.length > 0 ? new Set([bankList[0].id]) : []}
            items={bankList}
            renderValue={(items) => {
                return items.map((item) => (
                    <div key={item.key} className="flex items-center gap-2">
                        <Avatar
                            alt={item.data?.name}
                            className="shrink-0"
                            size="sm"
                            src={item.data?.code ? ImageCheck(item.data.code) : ""}
                        />
                        <div className="flex flex-col">
                            <span>{item.data?.name}</span>
                            <span className="text-default-500 text-tiny">
                                บัญชี : {item.data?.number}
                            </span>
                        </div>
                    </div>
                ));
            }}
        >
            {(item) => (
                <SelectItem className="text-white" key={item.id}>
                    <div className="flex gap-2">
                        <div>
                            <Avatar size="md" src={ImageCheck(item.code)} />
                        </div>
                        <div className="flex flex-col h-full justify-between">
                            <span>{item.name}</span>
                            <span>{item.number}</span>
                        </div>
                    </div>
                </SelectItem>
            )}
        </Select>
    );
}
