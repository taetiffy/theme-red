"use client";
import { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Image,
    Button,
    Form,
} from "@heroui/react";
import { PasswordInput } from "@/components/PasswordInput";
import { toast } from "sonner";
import { changePasswordService } from "@/services/auth";
import { UseCustomDisclosureReturn } from "@/hooks/useCustomDisclosure";
import { useMemberStore } from "@/stores/member";

export default function ResetPassModal({ disclosure }: { disclosure: UseCustomDisclosureReturn }) {

    const { setMember } = useMemberStore();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const formData = Object.fromEntries(data);

        const oldPassword = formData.old_password;
        const newPassword = formData.new_password;
        const confirmNewPassword = formData.confirm_new_password;

        if (oldPassword != confirmNewPassword) {
            toast.error("รหัสผ่านใหม่ไม่ตรงกัน");
        }

        toast.promise(async () => {
            const result = await changePasswordService({
                oldPassword: oldPassword.toString(),
                newPassword: newPassword.toString(),
                confirmNewPassword: confirmNewPassword.toString(),
            });
            return result;
        }, {
            loading: "กำลังดำเนินการ...",
            success: (data) => {
                setMember({ text_password: confirmNewPassword.toString() });
                if (disclosure.state.onClose) {
                    disclosure.state.onClose();
                }
                return (data as unknown as { message?: string }).message ?? "ดำเนินการสำเร็จ"
            },
            error: (data) => (data as unknown as { message?: string }).message ?? "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งในภายหลัง",
        });
    };
    return (
        <Modal isOpen={disclosure.state.isOpen} onClose={disclosure.state.onClose} placement="center" className="*:text-(--text-color) ModalBackground">
            <Form onSubmit={handleSubmit} className="w-full">
                <ModalContent>
                    <ModalHeader className="flex justify-center items-center ">
                        เปลี่ยนรหัสผ่าน
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-4">
                            <PasswordInput title="รหัสผ่านเดิม" name="old_password" />
                            <PasswordInput title="รหัสผ่านใหม่" name="new_password" />
                            <PasswordInput title="ยืนยันรหัสผ่านใหม่" name="confirm_new_password" />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onPress={disclosure.state.onClose} className="Btn1">
                            ยกเลิก
                        </Button>
                        <Button type="submit" className="Btn2">
                            ยืนยัน
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Form>
        </Modal>
    );
}
