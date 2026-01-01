'use client'
import { useState, useRef } from "react";
import { OneCardBank, TwoCardBank } from "./CardBank";
import { Card, CardBody } from "@heroui/card";
import { bankLists } from "@/variables/BankSelect"
import { Input } from "@heroui/input"
import Image from "next/image"
import { NumberInput } from "@heroui/react";
import { BankApiResponse } from "@/types/bankLists";
import { useBank } from "@/hooks/bank";

interface FilterDataInterFace {
    id: string;
    createAt: string;
    bank_code: string;
    bank_name: string;
    bank_number: string;
    memberId: string;
}

export function SlipCard({ filterData }: { filterData: BankApiResponse[] }) {
    const {
        bankSetting
    } = useBank();

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (!selectedFile) {
            setPreviewUrl(null);
            setFile(null);
            return;
        }

        if (!selectedFile.type.startsWith('image/')) {
            alert('กรุณาเลือกไฟล์รูปภาพเท่านั้น (PNG, JPG, JPEG)');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);

        setFile(selectedFile);
    };

    const handleRemove = () => {
        setPreviewUrl(null);
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="mt-4 flex flex-col gap-2">
            {/* <div onChange={(e)=>handleBankChange(e)}>
                <OneCardBank label="เลือกบัญชีที่จะฝาก" bankList={filterData} />
            </div> */}

            <OneCardBank label="เลือกบัญชีที่จะฝาก" bankList={filterData} />

            <Card className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-100 dark:border-blue-900">
                <CardBody className="flex flex-row justify-between items-center p-6">
                    {
                        bankSetting !== null ?
                            <>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-semibold text-blue-900 dark:text-blue-100">
                                        {bankLists.filter((item) => item.code === bankSetting[0].code)[0].name || '-'}
                                    </span>
                                    <span className="text-gray-200 text-xl">
                                        เลขบัญชี: <span className="font-mono font-medium">{bankSetting[0]?.number || '-'}</span>
                                    </span>
                                    <span className="text-gray-600 dark:text-gray-400 text-sm pt-2">
                                        ชื่อบัญชี: <span className="font-medium">{bankSetting[0]?.name || '-'}</span>
                                    </span>
                                </div>
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-gray-800 shadow-md p-2">
                                    <Image src={bankLists.filter((item) => item.code === bankSetting[0].code)[0].image} alt="bankImage" width={50} height={50} className="object-contain" />
                                </div>
                                <input
                                    name="myBank"
                                    className="hidden"
                                    defaultValue={bankSetting.length > 0 ? bankSetting[0].id : ""}
                                />

                            </> : <div>ไม่พบบัญชี</div>
                    }
                </CardBody>
            </Card>

            <div className="flex flex-col gap-2 mt-2">
                <div className="relative">
                    <label className="block text-sm font-medium mb-2">
                        แนบสลิป <span className="text-red-500">*</span>
                    </label>

                    {!previewUrl ? (
                        <label
                            className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">คลิกเพื่ออัปโหลด</span> หรือลากไฟล์มาวาง
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, JPEG</p>
                            </div>
                            <input
                                ref={fileInputRef}
                                id="file"
                                type="file"
                                name="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </label>
                    ) : (
                        <div className="relative w-full rounded-lg overflow-hidden border-2 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                            <img
                                src={previewUrl}
                                alt="Slip preview"
                                className="w-full h-64 object-contain bg-white"
                            />
                            <div className="absolute top-2 right-2 flex gap-2">
                                <button
                                    onClick={handleRemove}
                                    className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                                >
                                    ลบ
                                </button>
                            </div>
                        </div>
                    )}

                    {/* แสดงชื่อไฟล์ที่เลือก (ถ้าต้องการ) */}
                    {file && (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            ไฟล์ที่เลือก: <span className="font-medium">{file.name}</span> ({(file.size / 1024).toFixed(0)} KB)
                        </p>
                    )}
                </div>
                <NumberInput name="money" className="w-full" label={<p className="text-base inline">จำนวนเงินที่โอนมา</p>} variant="faded" isRequired minValue={1} />
            </div>
        </div>
    )
}
