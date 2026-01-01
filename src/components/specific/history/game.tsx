'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { Card, CardBody } from "@heroui/card";
import styles from "@/styles/profile.module.css";
import { Chip, Pagination } from '@heroui/react'
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@heroui/table";
import { betTransactionHistoryService } from '@/services/transaction';
import { BetTransactionHistory } from '@/types/transaction';
import { formatDateTimeShortThai, formatWithOutCurrency } from '@/utils/format.utils';


export function GameHistory() {

    const [data, setData] = useState<Array<BetTransactionHistory>>([]);
    const [date, setDate] = useState<"all" | "1" | "7" | "30">("30");

    // pagination state
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const fetchData = async () => {
        const data = await betTransactionHistoryService(date);
        setData(data);
        setPage(1);
    }

    useEffect(() => {
        fetchData();
    }, [date])

    // ใช้ useMemo สำหรับ pagination
    const totalPages = useMemo(() => {
        return Math.ceil(data.length / rowsPerPage);
    }, [data.length, rowsPerPage]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return data.slice(start, start + rowsPerPage);
    }, [data, page, rowsPerPage]);

    return (
        <div className={styles.panelPad}>
            <Card>
                <CardBody>
                    <Table
                        removeWrapper
                        isStriped
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
                            <TableColumn align='center' className="p-3 font-semibold text-sm">ค่ายเกม</TableColumn>
                            <TableColumn align='center' className="p-3 font-semibold text-sm">เกม</TableColumn>
                            <TableColumn align='center' className="p-3 font-semibold text-sm">กระเป๋าเครดิต</TableColumn>
                            <TableColumn align='center' className="p-3 font-semibold text-sm">ยอดเดิมพัน</TableColumn>
                            <TableColumn align='center' className="p-3 font-semibold text-sm">ยอดได้เสีย</TableColumn>
                            <TableColumn align='center' className="p-3 font-semibold text-sm">ก่อนเดิมพัน</TableColumn>
                            <TableColumn align='center' className="p-3 font-semibold text-sm">หลังเดิมพัน</TableColumn>
                            <TableColumn align='center' className="p-3 font-semibold text-sm">ฟรีเกม</TableColumn>
                            <TableColumn align='center' className="p-3 font-semibold text-sm">การซื้อฟรีเกม</TableColumn>
                            <TableColumn align='center' className="p-3 font-semibold text-sm">สถานะ</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {
                                paginatedData.map((item) => {
                                    const cal = item.afterBet - item.beforeBet;
                                    return (
                                        <TableRow key={item._id}>
                                            <TableCell className="p-3 text-sm">{formatDateTimeShortThai(item.createdAt)}</TableCell>
                                            <TableCell className="p-3 text-sm text-center">{(item.productId.toUpperCase() === "PGHARD" || item.productId.toUpperCase() === "PGASW") ? "PGSOFT" : item.productId.toUpperCase()}</TableCell>
                                            <TableCell className="p-3 text-sm text-center">{item.gameCode}</TableCell>
                                            <TableCell className="p-3 text-sm text-center">{<Chip size="sm" color="default" variant="bordered" radius="sm">{item.username.includes('b0nus') ? "โปรโมชั่น" : "ปกติ"}</Chip>}</TableCell>
                                            <TableCell className="p-3 text-sm text-center">{formatWithOutCurrency(item.betAmount)}</TableCell>
                                            <TableCell className={`p-3 text-sm text-center ${cal > 0 ? "text-green-500" : "text-red-500"}`}>{cal.toFixed(2).toLocaleString()}</TableCell>
                                            <TableCell className="p-3 text-sm text-center">{formatWithOutCurrency(item.beforeBet)}</TableCell>
                                            <TableCell className="p-3 text-sm text-center">{formatWithOutCurrency(item.afterBet)}</TableCell>
                                            <TableCell className="p-3 text-sm text-center">{item.isFeature || Number(item.betAmount) === 0 ? <Chip size="sm" color="success" variant="bordered" radius="sm">Yes</Chip> : <Chip size="sm" color="danger" variant="bordered" radius="sm">No</Chip>}</TableCell>
                                            <TableCell className="p-3 text-sm text-center">{item.isFeatureBuy ? <Chip size="sm" color="success" variant="bordered" radius="sm">Yes</Chip> : <Chip size="sm" color="danger" variant="bordered" radius="sm">No</Chip>}</TableCell>
                                            <TableCell className="p-3 text-sm text-center">{item.status}</TableCell>
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