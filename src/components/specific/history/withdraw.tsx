"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { Card, CardBody } from "@heroui/card";
import styles from "@/styles/profile.module.css";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@heroui/table";
import { Chip, Pagination, Tooltip } from '@heroui/react';
import { Select, SelectItem } from '@heroui/react';
import { transactionHistoryService } from '@/services/transaction';
import { TransactionHistory } from '@/types/transaction';
import { formatDateTimeShortThai, formatWithOutCurrency } from '@/utils/format.utils';
import { bankLists } from '@/variables/BankSelect';

export function WithdrawDepositHistory() {

    const [data, setData] = useState<Array<TransactionHistory>>([]);
    const [date, setDate] = useState<"all" | "1" | "7" | "30">("30");
    const [status, setStatus] = useState<"all" | "success" | "pending" | "manual" | "revoke" | "fail">("all");
    const [type, setType] = useState<"all" | "withdraw" | "deposit">("all");

    // pagination state
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const fetchData = async () => {
        const data = await transactionHistoryService(date, type, status);
        console.log(type)
        setData(data);
        setPage(1);
    }

    useEffect(() => {
        fetchData();
    }, [date, status, type])

    const PeriodSelect = [
        {
            key: "all",
            name: 'ช่วงเวลาทั้งหมด'
        },
        {
            key: "1",
            name: '24 ชั่วโมงล่าสุด'
        },
        {
            key: "7",
            name: '7 วันล่าสุด'
        },
        {
            key: "30",
            name: '30 วันล่าสุด'
        },
    ]

    const StatusSelect = [
        {
            key: "all",
            name: 'สถานะทั้งหมด'
        },
        {
            key: "success",
            name: 'สำเร็จ'
        },
        {
            key: "pending",
            name: 'รอดำเนินการ'
        },
        {
            key: "manual",
            name: 'รออนุมัติ'
        },
        {
            key: "revoke",
            name: 'รายการคืนเครดิต'
        },
        {
            key: "fail",
            name: 'รายการถูกปฏิเสธ'
        },
    ]
    const TypeSelect = [
        {
            key: "all",
            name: 'ประเภททั้งหมด'
        },
        {
            key: "withdraw",
            name: 'ถอนเงิน'
        },
        {
            key: "deposit",
            name: 'ฝากเงิน'
        }
    ]

    // ใช้ useMemo สำหรับ pagination
    const totalPages = useMemo(() => {
        return Math.ceil(data.length / rowsPerPage);
    }, [data.length, rowsPerPage]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return data.slice(start, start + rowsPerPage);
    }, [data, page, rowsPerPage]);

    return (
        <div className={`${styles.panelPad}`}>
            <Card>
                <CardBody>
                    <Table
                        removeWrapper
                        isStriped
                        topContent={
                            <div className='flex flex-col sm:flex-row justify-end gap-2'>
                                <div className='min-w-50' >
                                    <Select
                                        selectedKeys={[date]}
                                        disallowEmptySelection
                                        items={PeriodSelect}
                                        onChange={(e) => setDate(e.target.value as any)}
                                    >
                                        {(item) => <SelectItem className='text-white' key={item.key}>{item.name}</SelectItem>}
                                    </Select>
                                </div>
                                <div className='min-w-50'>
                                    <Select
                                        selectedKeys={[status]}
                                        disallowEmptySelection
                                        items={StatusSelect}
                                        onChange={(e) => setStatus(e.target.value as any)}
                                    >
                                        {(item) => <SelectItem className='text-white' key={item.key}>{item.name}</SelectItem>}
                                    </Select>
                                </div>
                                <div className='min-w-50'>
                                    <Select
                                        selectedKeys={[type]}
                                        disallowEmptySelection
                                        items={TypeSelect}
                                        onChange={(e) => setType(e.target.value as any)}
                                    >
                                        {(item) => <SelectItem className='text-white' key={item.key}>{item.name}</SelectItem>}
                                    </Select>
                                </div>
                            </div>
                        }
                        bottomContent={
                            <div className='flex justify-center'>
                                <Pagination
                                    showControls
                                    page={page}
                                    onChange={setPage}
                                    classNames={{ cursor: 'bg-[var(--main-color)]' }}
                                    total={totalPages}
                                />
                            </div>
                        }
                    >
                        <TableHeader>
                            <TableColumn className="p-3 font-semibold text-sm">วันที่</TableColumn>
                            <TableColumn align='center' className="p-3 font-semibold text-sm">ธนาคาร</TableColumn>
                            <TableColumn align='center' className="p-3 font-semibold text-sm">กระเป๋าเครดิต</TableColumn>
                            <TableColumn align='center' className="p-3 font-semibold text-sm">ประเภท</TableColumn>
                            <TableColumn align='center' className="p-3 font-semibold text-sm">จำนวนเงิน</TableColumn>
                            <TableColumn align='center' className="p-3 font-semibold text-sm">ก่อน</TableColumn>
                            <TableColumn align='center' className="p-3 font-semibold text-sm">หลัง</TableColumn>
                            <TableColumn align='center' className="p-3 font-semibold text-sm">สถานะ</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {
                                paginatedData.map((item) => {
                                    return (
                                        <TableRow key={item.id}>
                                            <TableCell className="p-3 text-sm">{formatDateTimeShortThai(item.createdAt)}</TableCell>
                                            <TableCell className="p-3 text-sm">
                                                <div>{typeof item.memberBank !== "undefined" && item.memberBank !== null ? bankLists.find((bankItem) => item.memberBank && item.memberBank.bank_code === bankItem.code)?.name : "-"}</div>
                                                <div>{typeof item.memberBank !== "undefined" && item.memberBank !== null ? item.memberBank.bank_name : '-'} / {typeof item.memberBank !== "undefined" && item.memberBank !== null ? item.memberBank.bank_number : '-'}</div>
                                            </TableCell>
                                            <TableCell className="p-3 text-sm cursor-pointer">
                                                <Tooltip className='text-white' content={item.promotion ? item.promotion.bonusadmin.name : "รายการจากกระเป๋าปกติ"} showArrow={true}>
                                                    {<Chip size="sm" color="default" variant="bordered" radius="sm">{item.promotion ? "โปรโมชั่น" : "ปกติ"}</Chip>}
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell className="p-3 text-sm">
                                                <Chip size="sm" color={item.type === "DEPOSIT" ? "danger" : "success"} variant="bordered" radius="sm">{item.type === "DEPOSIT" ? "ฝาก" : "ถอน"}</Chip>
                                            </TableCell>
                                            <TableCell className="p-3 text-sm">
                                                ฿{formatWithOutCurrency(item.amount)}
                                            </TableCell>
                                            <TableCell className="p-3 text-sm">
                                                {item.promotion ? "โปรโมชั่น" : "฿" + formatWithOutCurrency(item.beforeBalance)}
                                            </TableCell>
                                            <TableCell className="p-3 text-sm">
                                                {item.promotion ? "฿0.00" : "฿" + formatWithOutCurrency(item.afterBalance)}
                                            </TableCell>
                                            <TableCell
                                                className={`p-3 text-sm font-semibold ${item.status === "SUCCESS"
                                                    ? "text-green-600"
                                                    : item.status === "FAIL"
                                                        ? "text-red-600"
                                                        : "text-yellow-600"}`}
                                            >
                                                {
                                                    item.status === "SUCCESS" ? "สำเร็จ" :
                                                        item.status === "PENDING" ? "กำลังดำเนินการ" :
                                                            item.status === "MANUAL" ? "รออนุมัติ" :
                                                                item.status === "REVOKE" ? "คืนเครดิต" : "ถูกปฎิเสธ"
                                                }
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    )
}
