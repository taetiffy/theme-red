"use client";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@heroui/modal";
import { UseCustomDisclosureReturn } from "@/hooks/useCustomDisclosure";
import { FaTrophy, FaArrowCircleUp, FaGift } from "react-icons/fa";
import { useModal } from "@/hooks/useModal";

// mockup data
// [
//     { type: "RANK_UP", name: "TEST_NAME_RANK", level: 109 },
//     { type: "LEVEL_UP", level: 999 },
//     { type: "ITEM", name: "TEST_NAME_ITEM", image: "https://d1h28837i689xj.cloudfront.net/item/5f3gvwffqv6.webp" },
// ]

export default function RealtimeAlert({ disclosure }: { disclosure: UseCustomDisclosureReturn<Array<{ type: "RANK_UP", name: string, level: number } | { type: "LEVEL_UP", level: number } | { type: "ITEM", name: string, image: string }>> }) {
    const { backpack } = useModal()
    return (
        <Modal
            isOpen={disclosure.state.isOpen}
            onClose={disclosure.state.onClose}
            placement="center"
            className="dark text-white w-full max-w-[90vw] sm:max-w-md md:max-w-lg ModalBackground"
            size="lg"
        >
            <ModalContent className="bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl border border-gray-700">
                <ModalHeader className="text-xl sm:text-2xl font-bold text-center bg-gray-900/50 py-3 sm:py-4">
                    <span className="flex items-center justify-center gap-2">
                        <FaTrophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                        ได้รับรางวัล!
                    </span>
                </ModalHeader>
                <ModalBody className="p-4 sm:p-6">
                    <div className="grid gap-3 sm:gap-4">
                        {disclosure.data?.map((reward, index) => (
                            <div
                                onClick={() => {
                                    if(reward.type === "ITEM"){
                                        backpack.state.onOpen?.()
                                    }
                                }}
                                key={index}
                                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:bg-gray-800/70 transition-colors duration-200"
                            >
                                {reward.type === "ITEM" && (
                                    <img
                                        src={reward.image}
                                        alt={reward.name}
                                        className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-md"

                                    />
                                )}
                                {reward.type === "RANK_UP" && (
                                    <FaTrophy className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" />
                                )}
                                {reward.type === "LEVEL_UP" && (
                                    <FaArrowCircleUp className="w-10 h-10 sm:w-12 sm:h-12 LevelUp" />
                                )}
                                <div className="flex-1">
                                    <h3 className="font-semibold text-base sm:text-lg">
                                        {reward.type === "RANK_UP" && `เลื่อนขั้น ${reward.name}`}
                                        {reward.type === "LEVEL_UP" && `เลเวลอัพ!`}
                                        {reward.type === "ITEM" && `ได้รับ ${reward.name}`}
                                    </h3>
                                    <p className="text-gray-400 text-sm sm:text-base">
                                        {reward.type === "RANK_UP" && `ถึงระดับ ${reward.level}`}
                                        {reward.type === "LEVEL_UP" && `เลเวล ${reward.level}`}
                                        {reward.type === "ITEM" && "ไอเทมใหม่ในคลัง คลิกเพื่อดู"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ModalBody>
                <ModalFooter className="py-3 sm:py-4">
                    <button
                        onClick={disclosure.state.onClose}
                        className="w-full py-2 px-4 Btn1 rounded-lg text-white font-medium text-sm sm:text-base transition-colors duration-200"
                    >
                        ปิด
                    </button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
