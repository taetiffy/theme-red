"use client";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Image,
    Form,
} from "@heroui/react";
import { NoDataModal } from "@/types/modal";
import { Button, Input } from "@heroui/react";
import { fetchRedeemGiftService } from "@/services/giftcode";
import { toast } from "sonner";
import { UseCustomDisclosureReturn } from "@/hooks/useCustomDisclosure";

export default function CouponModal({ disclosure }: { disclosure: UseCustomDisclosureReturn }) {
    const handleRedeem = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const formData = Object.fromEntries(data);

        const code = formData.code.toString();

        toast.promise(fetchRedeemGiftService(code), {
            loading: "กำลังดำเนินการ...",
            success: (data) => (data as unknown as { message?: string }).message ?? "ดำเนินการสำเร็จ",
            error: (data) => (data as unknown as { message?: string }).message ?? "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งในภายหลัง",
        });
    };

    return (
        <Modal isOpen={disclosure.state.isOpen} onClose={disclosure.state.onClose} placement="center" className="dark text-white ModalBackground">
            <ModalContent>
                <ModalHeader>
                <span className="text-(--text-color)">
                กรอกโค้ด
                </span></ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleRedeem} className="flex flex-col gap-2">
                        <div className="mx-auto table">
                            <Image src="/image/box.png" className="h-auto" alt="" />
                        </div>
                        <Input
                            name="code"
                            label="กรอกโค้ด"
                            labelPlacement="outside"
                            placeholder="โปรดกรอกโค้ดของท่าน"
                            type="text"
                            classNames={{
                                label: "!text-(--text-color)",
                            }}
                        />
                        <div className="flex justify-end w-full">
                            <Button type="submit" className="Btn1">
                                ยืนยัน
                            </Button>
                        </div>
                    </Form>
                </ModalBody>
                <ModalFooter></ModalFooter>
            </ModalContent>
        </Modal>
    );
}
