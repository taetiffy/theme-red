"use client";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button, Card } from "@heroui/react";
import { useDailyGems } from "@/hooks/gems";
import { UseCustomDisclosureReturn } from "@/hooks/useCustomDisclosure";
import CommonLoading from "@/components/common/CommonLoading";

export default function RewardModal({ disclosure }: { disclosure: UseCustomDisclosureReturn }) {

    const { data, getGems } = useDailyGems();

    if (!data) return <CommonLoading />;

    return (
        <Modal isOpen={disclosure.state.isOpen} onClose={disclosure.state.onClose} placement="center" className="ModalBackground dark text-white">
            <ModalContent>
                <ModalHeader>
                <span className="text-(--text-color)">รับเพชรฟรี</span></ModalHeader>
                <ModalBody>
                    <div className="flex flex-col gap-3">
                        <Card className="flex flex-row justify-between items-center border border-white/10 py-4 px-3 gap-3 bg-black/25">
                            <div className="flex flex-row items-center gap-3">
                                <img src="/icons/diamond.gif" className="h-auto w-16" alt="" />
                                <div className="flex flex-col">
                                    <p className="text-(--text-color)">{data ? data.value : "กำลังโหลด"} เพชร</p>
                                    <span className="text-xs text-(--text-color)">คุณต้องการรับเพชรฟรี ใช่หรือไม่?</span>
                                    <span className="text-xs text-white/60">
                                        TIPS: คุณสามารถใช้เพชรเพื่อซื้อไอเทมหรือแลกเป็นเงินสดได้
                                    </span>
                                    {/* <span className="text-xs">เติมเงินครบ 100,000 บาท</span>
                                    <span className="text-xs text-white/60">
                                        ใช้งานก่อน: 17/09/2568
                                    </span> */}
                                </div>
                            </div>
                            <Button className="Btn1" onPress={getGems}>
                                รับเพชร
                            </Button>
                        </Card>
                    </div>
                </ModalBody>
                <ModalFooter></ModalFooter>
            </ModalContent>
        </Modal>
    );
}
