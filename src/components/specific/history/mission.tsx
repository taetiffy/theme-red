"use client"
import React, { useState, useEffect, useMemo } from 'react'
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
import { Pagination } from '@heroui/react';
import { Select, SelectItem } from '@heroui/react';
import { missionsHistroy } from '@/services/transaction';
import { MissionsHistroy } from '@/types/transaction';
import { formatDateTimeShortThai } from '@/utils/format.utils';

export function MissionHistory() {
    const TableDataColumn = [
        {
            key:"index",
            name:"#"
        },
        {
            key:"missionName",
            name:"ชื่อภารกิจ"
        },
        {
            key:"status",
            name:"สถานะ"
        },
        {
            key:"date",
            name: "วันที่รับภารกิจ"
        },
    ]
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

    const [data, setData] = useState<Array<MissionsHistroy>>([]);
    const [date, setDate] = useState<"all" | "1" | "7" | "30">("30");
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const fetchData = async () => {
            const data = await missionsHistroy(date);
            setData(data);
            setPage(1);
        }
    
        useEffect(() => {
            fetchData();
        }, [date])


    const totalPages = useMemo(() => {
        return Math.ceil(data.length / rowsPerPage);
    }, [data.length, rowsPerPage]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return data.slice(start, start + rowsPerPage);
    }, [data, page, rowsPerPage]);

    return (
        <div className={`${styles.panelPad} bg-[#0E0D0D]`}>
            <Card>
            <CardBody>
                <Table
                    removeWrapper 
                    isStriped
                    topContent={
                        <div className='flex flex-col sm:flex-row justify-end gap-2'>
                            <div className='min-w-50' >
                                <Select 
                                    items={PeriodSelect}
                                    selectedKeys={[date]}
                                    disallowEmptySelection
                                    onChange={(e) => setDate(e.target.value as any)}
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
                    <TableHeader columns={TableDataColumn}>
                        {(item) => <TableColumn key={item.key}>{item.name}</TableColumn>}
                    </TableHeader>
                    <TableBody>
                        {
                            paginatedData.map((item, i: number)=>{
                                return(
                                    <TableRow key={item.id}>
                                        <TableCell className="sm:text-sm text-xs whitespace-nowrap">{i + 1}</TableCell>
										<TableCell className="sm:text-sm text-xs whitespace-nowrap">{item.name}</TableCell>
                                        <TableCell className="p-3 text-sm font-semibold text-green-600">สำเร็จ</TableCell>
                                        <TableCell>{formatDateTimeShortThai(item.createdAt)}</TableCell>
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