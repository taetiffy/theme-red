"use client";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { NoDataModal } from "@/types/modal";
import { Button, Input, Card, Chip, Pagination } from "@heroui/react";
import { UseCustomDisclosureReturn } from "@/hooks/useCustomDisclosure";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { formatDateTimeShortThai, formatWithOutCurrency } from "@/utils/format.utils";
import { useEffect, useState } from "react";
import { fetchShopTransactionsService } from "@/services/shop";
import { ShopTransactins } from "@/types/shop";

export default function ShopHistory({ disclosure }: { disclosure: UseCustomDisclosureReturn }) {
    const [data, setData] = useState<ShopTransactins | null>(null);
    const [page, setPage] = useState<number>(1);

    const fetchData = async (p: number) => {
        const res = await fetchShopTransactionsService(p, 10);
        setData(res);
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

    return (
        <>
            <Modal
                isOpen={disclosure.state.isOpen}
                onClose={disclosure.state.onClose}
                placement="center"
                className="dark text-white ModalBackground"
                size="4xl"
            >
                <ModalContent>
                    <ModalHeader>
                        <span className="text-(--text-color)">ประวัติการแลก</span>
                    </ModalHeader>
                    <ModalBody>
                        <Table
                            removeWrapper
                            isStriped
                            bottomContent={
                                <div className="flex w-full justify-center">
                                    <Pagination
                                        isCompact
                                        showControls
                                        showShadow
                                        color="primary"
                                        page={page}
                                        total={data?.page_total || 0}
                                        onChange={(page) => setPage(page)}
                                    />
                                </div>
                            }
                        >
                            <TableHeader>
                                <TableColumn className="p-3 font-semibold text-sm">
                                    วันที่ทำรายการ
                                </TableColumn>
                                <TableColumn className="p-3 font-semibold text-sm text-center">
                                    ประเภท
                                </TableColumn>
                                <TableColumn className="p-3 font-semibold text-sm text-center">
                                    ชื่อสินค้า
                                </TableColumn>
                                <TableColumn className="p-3 font-semibold text-sm text-center">
                                    ราคา
                                </TableColumn>
                                <TableColumn className="p-3 font-semibold text-sm text-center">
                                    จำนวนที่ได้
                                </TableColumn>
                                <TableColumn className="p-3 font-semibold text-sm text-center">
                                    อัตราการแลกเปลี่ยน
                                </TableColumn>
                            </TableHeader>
                            <TableBody emptyContent={"ไม่พบข้อมูล"}>
                                {(data?.data ?? []).map((item, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell className="p-3 text-sm">
                                                {formatDateTimeShortThai(item.createdAt)}
                                            </TableCell>
                                            <TableCell className="p-3 text-sm text-center">
                                                {item.type === "BUY" ? "ซื้อของ" : "แลกเครดิต"}
                                            </TableCell>
                                            <TableCell className="p-3 text-sm text-center">
                                                {item.name}
                                            </TableCell>
                                            <TableCell className="p-3 text-sm text-center">
                                                {item.priceType === "CREDIT" ? (
                                                    <Chip
                                                        size="sm"
                                                        color="warning"
                                                        variant="flat"
                                                        radius="sm"
                                                    >
                                                        {formatWithOutCurrency(item.price)} เครดิต
                                                    </Chip>
                                                ) : (
                                                    <Chip
                                                        size="sm"
                                                        color="primary"
                                                        variant="flat"
                                                        radius="sm"
                                                    >
                                                        {formatWithOutCurrency(item.price, {
                                                            minimumFractionDigits: 0,
                                                            maximumFractionDigits: 0,
                                                        })}{" "}
                                                        เพชร
                                                    </Chip>
                                                )}
                                            </TableCell>
                                            <TableCell className="p-3 text-sm text-center">
                                                {item.type === "BUY"
                                                    ? `${item.quantity} ชิ้น`
                                                    : `฿${formatWithOutCurrency(item.price / item.rate)}`}
                                            </TableCell>
                                            <TableCell className="p-3 text-sm text-center">
                                                {item.type === "BUY"
                                                    ? "-"
                                                    : `${formatWithOutCurrency(item.rate, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} เพชร / 1 เครดิต`}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
