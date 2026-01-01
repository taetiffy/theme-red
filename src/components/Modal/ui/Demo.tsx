"use client";
import { UseCustomDisclosureReturn } from "@/hooks/useCustomDisclosure";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";

export default function DemoModal({ disclosure }: { disclosure: UseCustomDisclosureReturn<{ message: string }> }) {

    return (
        <Modal
            isOpen={disclosure.state.isOpen}
            onClose={disclosure.state.onClose}
            placement="center"
            className="dark text-white">
            <ModalContent>
                <ModalHeader>Demo Model</ModalHeader>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <p className="text-red-600 text-4xl">{disclosure.data.message}</p>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
                <ModalFooter></ModalFooter>
            </ModalContent>
        </Modal>
    );
}
