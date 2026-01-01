"use client";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Image,
    Checkbox
} from "@heroui/react";
import { Button } from "@heroui/react";
import { UseCustomDisclosureReturn } from "@/hooks/useCustomDisclosure";
import { ChangeEvent, useState } from "react";
import { useMemberStore } from "@/stores/member";
import { useModal } from "@/hooks/useModal";

export default function NotificationModal({ disclosure }: { disclosure: UseCustomDisclosureReturn<{ value: Array<{ id: string; img: string; innerHtml: { __html: string | TrustedHTML; }}> }> }) {
    const { setNotification, notification } = useMemberStore();
    const { notification: callNoti } = useModal();
    const [NotShow, setNotShow] = useState<boolean>(false);
    const onClose = async()=>{
        if(disclosure.data.value.length > 1){
            const nowData = disclosure.data.value[0]
            if(NotShow) {
                setNotification([...notification, nowData.id]);
            }
            const newPopup = disclosure.data.value.filter((item) => item.id === nowData.id);
            if(newPopup.length > 0){
                callNoti.setData({
                    value: newPopup
                })
                if (callNoti.state.onOpen){
                    callNoti.state.onOpen();
                }
            }
        }else{
            if (disclosure.state.onClose) {
                disclosure.state.onClose();
            }
        }

	}

    return (
        <Modal isOpen={disclosure.state.isOpen} onClose={disclosure.state.onClose} placement="center" className="dark text-white ModalBackground">
            <ModalContent>
                <ModalHeader>
                    <span className="text-(--text-color)">
                        แจ้งเตือน
                    </span>
                </ModalHeader>
                <ModalBody>
                    <div className="mx-auto table">
                        <Image src={disclosure.data.value[0].img || ""} className="h-auto w-52" alt="" />
                    </div>
                    <div>
                        <div dangerouslySetInnerHTML={disclosure.data.value[0].innerHtml} />
                        <div className="pt-3">
                            <Checkbox onChange={(e: ChangeEvent<HTMLInputElement>)=> setNotShow(e.target.checked)} ><span className="text-white">ไม่ต้องแสดงอีก</span></Checkbox>
                        </div>
                    </div>
                    <div className="flex justify-end w-full">
                        <Button className="Btn1" onPress={onClose}>ปิด</Button>
                    </div>
                </ModalBody>
                <ModalFooter></ModalFooter>
            </ModalContent>
        </Modal>
    );
}
