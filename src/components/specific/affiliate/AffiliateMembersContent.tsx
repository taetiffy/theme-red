import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@heroui/react";
import { columns } from "@/variables/affiliate";

import { getAffiliate } from "@/services/affiliate";
import { useFetchData } from "@/hooks/useFetchData";

import dayjs from "dayjs";
import "dayjs/locale/th";

dayjs.locale('th');

export default function App() {
    const { data, loading } = useFetchData(getAffiliate);

    return (
        <Table className="dark mt-5">
            <TableHeader columns={columns}>
                <TableColumn>ชื่อผู้ใช้</TableColumn>
                <TableColumn>วันที่สมัคร</TableColumn>
            </TableHeader>
            <TableBody items={data?.data || []} isLoading={loading}>
                {(item) => (
                    <TableRow key={item.createdAt}>
                        <TableCell>{item.username}</TableCell>
                        <TableCell>{dayjs(item.createdAt).format('DD MMM YYYY')}</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

