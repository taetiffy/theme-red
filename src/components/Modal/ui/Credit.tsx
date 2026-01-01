"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button, Card } from "@heroui/react";
import { useModal } from "../action/modal";
import { UseCustomDisclosureReturn } from "@/hooks/useCustomDisclosure";
import Image from 'next/image'

export default function CreditFreeModal({ disclosure }: { disclosure: UseCustomDisclosureReturn }) {
  const detailCommission = useModal();

  const handleOpenDetailCommissionModal = () => {
    detailCommission.openModal();
  }

  return (
    <>
    {/* <DetailCommissionModal isOpen={detailCommission.isOpen} onClose={detailCommission.closeModal} /> */}

     <Modal
      isOpen={disclosure.state.isOpen}
      onClose={disclosure.state.onClose}
      placement="center"
      className="dark text-white ModalBackground"
      size="lg"
    >
      <ModalContent>
        <ModalHeader>เครดิตฟรี</ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-2 gap-3">
            <Card className="flex flex-col  items-center border border-white/20 py-4 px-3 gap-3">
              <div className="flex flex-col items-center gap-3">
                <Image
                  src="https://play97.app/assets/cashback-casino-CgBPn1Yn.png"
                  width={480}
                  height={580}
                  className="h-auto w-full rounded-lg"
                  alt=""
                />
                <div className="flex flex-col">
                  <p>คาสิโน (คอมมิชชั่น 0.30 %)</p>
                  <span className="text-md font-bold">0.00</span>
                  <a onClick={handleOpenDetailCommissionModal} className="text-xs cursor-pointer text-yellow-500 underline">
                    รายละเอียด
                  </a>
                </div>
              </div>
              <Button className="Btn1 w-full">รับเพชร</Button>
            </Card>
            <Card className="flex flex-col  items-center border border-white/20 py-4 px-3 gap-3">
              <div className="flex flex-col items-center gap-3">
                <Image
                  src="https://play97.app/assets/cashback-casino-CgBPn1Yn.png"
                  width={480}
                  height={580}
                  className="h-auto w-full rounded-lg"
                  alt=""
                />
                <div className="flex flex-col">
                  <p>คาสิโน (คอมมิชชั่น 0.30 %)</p>
                  <span className="text-md font-bold">0.00</span>
                  <a onClick={handleOpenDetailCommissionModal} className="text-xs cursor-pointer text-yellow-500 underline">
                    รายละเอียด
                  </a>
                </div>
              </div>
              <Button className="Btn1 w-full">รับเพชร</Button>
            </Card>
          </div>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
    </>

  );
}
