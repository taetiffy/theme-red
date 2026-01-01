import { useMemo } from "react";
import { UseCustomDisclosureReturn } from "@/hooks/useCustomDisclosure";
import { Modal, ModalBody, ModalContent, ModalHeader, ModalFooter } from "@heroui/react";

import { Image } from "@heroui/react"
export default function PromotionDetail({ disclosure }: { disclosure: UseCustomDisclosureReturn<{ bonus_img: string; detail: string; name: string; status: boolean }> }) {
    const detailHtml = useMemo(() => ({ __html: disclosure.data?.detail }), [disclosure.data?.detail]);
    return (
        <Modal
            isOpen={disclosure.state.isOpen}
            onClose={disclosure.state.onClose}
            placement="center"
            className="text-(--text-color) ModalBackground"
        >
            <ModalContent>
                <ModalHeader>
                    <h2 className="text-lg font-bold">รายละเอียดโปรโมชัน</h2>
                </ModalHeader>
                <ModalBody className="flex flex-row gap-4">
                    <Image className="w-20 h-20 object-cover" src={disclosure.data?.bonus_img} />
                    <div className="flex flex-col flex-grow">
                        <div>
                            <span className=" text-2xl text-[var(--main-color)]">{disclosure.data?.name}</span>
                        </div>
                        <div dangerouslySetInnerHTML={detailHtml}></div>
                    </div>
                </ModalBody>
                <ModalFooter></ModalFooter>
            </ModalContent>
        </Modal>
    )
}
