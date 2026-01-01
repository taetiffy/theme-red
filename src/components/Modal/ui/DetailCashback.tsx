"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { NoDataModal } from "@/types/modal";
import { Button, Input, Card } from "@heroui/react";

export function DetailCashbackModal({ isOpen, onClose }: NoDataModal) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="center"
      className="dark text-white ModalBackground"
      size="lg"
    >
      <ModalContent>
        <ModalHeader>คืนยอดเสีย: คาสิโน</ModalHeader>
        <ModalBody>
          <div>
            <div className="flex justify-between">
              <p>อัพเดทล่าสุด : 25/08/2025 13:56</p>
              <Button className="Btn1">รีเฟรช</Button>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <Card className="flex flex-col  items-center border border-white/20 py-4 px-3 gap-3">
                <div className="flex flex-col text-center items-center gap-3">
                  <p>คืนยอดเสียทั้งหมด</p>
                  <h1 className="text-2xl font-bold text-yellow-500">0.00</h1>
                </div>

              </Card>
              <div>
              <div className="space-y-2">
                    <div className="flex justify-between items-center  border border-white/20 py-4 px-3 rounded-lg ">
                        <p className="text-xs">คืนยอดเสียรวมทั้งหมด</p>
                        <h1 className="text-2xl font-bold text-yellow-500">0.00</h1>
                    </div>
                    <div className="flex justify-between  items-center border border-white/20 py-4 px-3 rounded-lg ">
                        <p className="text-xs">คืนยอดเสียรวมทั้งหมด</p>
                        <h1 className="text-2xl font-bold text-yellow-500">0.00</h1>
                    </div>


                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
