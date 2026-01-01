"use client";

import React, { useCallback, useState } from "react";
import { Button, Card, CardBody, CardHeader, Image } from "@heroui/react";
import { useModal } from "@/hooks/useModal";
import { Mission } from "@/types/mission";
import { isMissionAlreadyClaim, isMissionComplete } from "@/components/Modal/ui/MissionDetail";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { FaTrophy } from "react-icons/fa6";
import { HiInformationCircle } from "react-icons/hi2";

dayjs.locale('th');

interface SidebarMissionInterFace {
    missions: Mission[];
    selectMission: (mission: Mission) => void;
    acceptQuest: (mission_id: string) => void
}

export function SideBarMission({ missions, selectMission, acceptQuest }: SidebarMissionInterFace) {
    return (
        <>
   <Card className="bg-[#0E0D0D] CardBackground overflow-hidden">
      <CardHeader className="p-0">
        <div className="w-full px-4 py-3 bg-linear-to-r from-red-900/70 via-red-700/25 to-transparent">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/35 border border-white/10 backdrop-blur">
            <FaTrophy className="text-yellow-300 text-sm" />
            <span className="text-sm font-semibold text-white tracking-wide">
              ภารกิจ
            </span>
            <HiInformationCircle className="text-white/70 text-lg" />
          </div>
        </div>
      </CardHeader>

      <CardBody className="flex flex-col gap-3 max-h-[560px] overflow-auto p-3">
        {missions.map((mission, i) => (
          <MissionCard
            key={i}
            mission={mission}
            onMissionSelect={() => selectMission(mission)}
            acceptquest={acceptQuest}
          />
        ))}
      </CardBody>
    </Card>
        </>
    );
}

interface MissonCardInterFace {
    mission: Mission;
    status: "finish" | "process" | "accept";
    onMissionSelect: () => void;
    acceptquest: (mission_id: string) => void
}


const MissionCard = ({ mission, status, onMissionSelect, acceptquest }: MissonCardInterFace) => {
    const title = mission?.name ?? "null";
    const desc = mission.detail;
    const image = mission.mission_img;

    const { missionDetail } = useModal();
    const [data, setData] = useState<string>("");

    const truncateText = (text: string, maxLength: number = 40) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    };

    const handleCardClick = () => {
        if (onMissionSelect) {
            onMissionSelect();
            setData(title);
        }
    };

    const handleOpenMissionDetail = () => {
        handleCardClick();
        missionDetail.setData({ missiondata: mission });
        if (missionDetail.closure.acceptQuest) {
            missionDetail.closure.acceptQuest();
        }
        missionDetail.state.onOpen?.();
    };

    return (
        <>
            {/* <MissionDetail
                isOpen={MissionModalController.isOpen}
                onClose={MissionModalController.closeModal}
                data={mission}
            /> */}
            <div onClick={handleCardClick}>
                <Card className="md:hover:scale-104 min-h-[125px] cursor-pointer select-none bg-[#0E0D0D] CardBackground">
                    <CardBody className="flex flex-row gap-2 relative">
                        <div className="">
                            <Image
                                className=" object-cover object-top"
                                src={image}
                                width={100}
                                height={100}
                            />
                        </div>
                        <div className=" flex flex-col h-[100px] justify-between">
                            <div className="flex flex-col">
                                <span className="text-base text-(--text-color)">{title}</span>
                                <span className="text-xs text-gray-500">{truncateText(desc)}</span>
                                <span className="text-xs text-gray-500">{dayjs(mission.startDate).format('DD MMM YYYY')} - {dayjs(mission.endDate).format('DD MMM YYYY')}</span>
                            </div>
                            <div className="flex items-end gap-2">
                                {isMissionAlreadyClaim(mission) ? (
                                    <Button
                                        className="text-white"
                                        color="success"
                                        size="sm"
                                        isDisabled
                                    >
                                        รับของรางวัลแล้ว
                                    </Button>
                                ) : isMissionComplete(mission) ? (
                                    <Button
                                        onPress={() => acceptquest(mission.id)}
                                        className="text-white"
                                        color="success"
                                        size="sm"
                                        variant='flat'
                                    >
                                        รับรางวัลจากภารกิจ
                                    </Button>
                                ) : (
                                    <Button
                                        className="text-white Btn1"
                                        isDisabled
                                        size="sm"
                                    >
                                        ยังไม่สำเร็จ
                                    </Button>
                                )}
                                <Button
                                    size="sm"
                                    className="md:hidden"
                                    color="warning"
                                    variant="flat"
                                    onPress={() => {
                                        handleOpenMissionDetail()
                                    }}
                                >
                                    เพิ่มเติม
                                </Button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    );
};
