"use client";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { DataModal, WheelReward } from "@/types/modal";
import { Image, Button } from "@heroui/react";
import { UseCustomDisclosureReturn } from "@/hooks/useCustomDisclosure";

export default function RewardWheelModal({ disclosure }: { disclosure: UseCustomDisclosureReturn<{ reward: string }> }) {

    return (
        <Modal
            isOpen={disclosure.state.isOpen}
            onClose={disclosure.state.onClose}
            placement="center"
            hideCloseButton
            className="dark text-white ModalBackground"
        >
            <ModalContent>
                <ModalHeader>รางวัล</ModalHeader>
                <ModalBody className="flex">
                    <div className="flex flex-col items-center justify-center">
                        <div>
                            <Image width={200} src="icons/giftOpen.gif" />
                        </div>
                        <div className="flex flex-col gap-2 items-center">
                            <span className="text-2xl font-bold">ยินดีด้วยคุณได้รับ</span>
                            <span className="text-xl">{disclosure.data.reward}</span>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                  <Button variant="shadow" color="danger" onPress={disclosure.state.onClose} >ปิด</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
