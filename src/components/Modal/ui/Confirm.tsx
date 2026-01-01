"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button, Card } from "@heroui/react";
import { useModal } from "@/hooks/useModal";
import { UseCustomDisclosureReturn } from "@/hooks/useCustomDisclosure";
import Image from 'next/image'

export default function ConfirmPOP({ disclosure }: { disclosure: UseCustomDisclosureReturn<{name:string}, {confirm:() => void}>}) {
  const { detailCommission } = useModal();

  const handleClick = () => {
      disclosure.closure.confirm();
      disclosure.state.onClose?.()
  }
  return (
    <>
      <Modal
        isOpen={disclosure.state.isOpen}
        onClose={disclosure.state.onClose}
        placement="center"
        className="dark text-white ModalBackground"
        size="lg"
      >
        <ModalContent>
            <ModalHeader>ยืนยันการ{disclosure.data.name}</ModalHeader>
          <ModalBody>
            <div>คุณต้องการยื่นยันการ{disclosure.data.name}ใช่ไหม?</div>
            <span className={`text-xs text-text-color`}>โปรดทราบว่า ยอดเงินคงเหลือทั้งหมดจะถูกลบถาวรและไม่สามารถกู้คืนได้</span>
          </ModalBody>
          <ModalFooter className={` flex gap-2`}>
              <Button variant="shadow" color="danger" onPress={() => disclosure.state.onClose?.()}>ยกเลิก</Button>
              <Button variant="shadow" className={`Btn1`} onPress={handleClick}>ยืนยัน</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>

  );
}
