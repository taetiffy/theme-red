"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Image,
  Button,
  Avatar,
  Divider,
  Chip,
} from "@heroui/react";
import { NoDataModal } from "@/types/modal";
import { Mission } from "@/types/mission";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { ProgressBar } from "@/components/specific/mission/ProgressBar";
import { UseCustomDisclosureReturn } from "@/hooks/useCustomDisclosure";

import { HiInformationCircle } from "react-icons/hi2";
import { FaTrophy } from "react-icons/fa6";
import { MdOutlineCardGiftcard } from "react-icons/md";

dayjs.locale("th");

interface MissionDetailProps extends NoDataModal {
  missiondata: Mission;
  acceptquest?: () => void;
}

export function isMissionComplete(mission: Mission): boolean {
  return mission.isComplete;
}

export function isMissionAlreadyClaim(mission: Mission) {
  return mission.claimMission.length > 0;
}

export default function MissionDetail({
  disclosure,
}: {
  disclosure: UseCustomDisclosureReturn<MissionDetailProps>;
}) {
  const MissionData = disclosure.data.missiondata;

  const dateText = `${dayjs(MissionData.startDate).format("DD MMM YYYY")} - ${dayjs(
    MissionData.endDate
  ).format("DD MMM YYYY")}`;

  const status = isMissionAlreadyClaim(MissionData)
    ? "claimed"
    : isMissionComplete(MissionData)
    ? "complete"
    : "incomplete";

  return (
    <Modal
      isOpen={disclosure.state.isOpen}
      onClose={disclosure.state.onClose}
      size="2xl"
      placement="center"
      className="*:text-white ModalBackground"
    >
      <ModalContent className="max-h-[84vh] overflow-hidden">
        {/* ===== HEADER (สวยขึ้นแบบโปรไฟล์สมาชิก) ===== */}
        <ModalHeader className="p-0">
          <div className="w-full px-4 py-3 bg-linear-to-r from-red-900/70 via-red-700/25 to-transparent">
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/35 border border-white/10 backdrop-blur">
                <FaTrophy className="text-yellow-300 text-sm" />
                <span className="text-sm font-semibold text-white tracking-wide">
                  รายละเอียดภารกิจ
                </span>
                <HiInformationCircle className="text-white/70 text-lg" />
              </div>

              <Chip
                size="sm"
                className={`border border-white/10 ${
                  status === "claimed"
                    ? "bg-emerald-500/20 text-emerald-200"
                    : status === "complete"
                    ? "bg-green-500/20 text-green-200"
                    : "bg-white/10 text-white/80"
                }`}
              >
                {status === "claimed"
                  ? "รับแล้ว"
                  : status === "complete"
                  ? "สำเร็จแล้ว"
                  : "ยังไม่สำเร็จ"}
              </Chip>
            </div>
          </div>
        </ModalHeader>

        {/* ===== BODY (scroll เฉพาะ content) ===== */}
        <ModalBody className="p-4 sm:p-5 overflow-auto">
          {/* TOP CARD */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20">
            <div className="absolute inset-0 bg-linear-to-r from-black/55 via-transparent to-black/10" />
            <div className="pointer-events-none absolute -right-10 -top-10 w-40 h-40 rounded-full bg-red-600/10 blur-2xl" />
            <div className="pointer-events-none absolute right-4 top-4 hidden md:block">
              <div className="w-28 h-20 opacity-30 bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:10px_10px]" />
            </div>

            <div className="relative p-4 sm:p-5 flex flex-col md:flex-row gap-4 md:gap-5">
              {/* img */}
              <div className="w-full md:w-[190px]">
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/20">
                  <div className="aspect-[16/10] w-full">
                    <Image
                      src={MissionData.mission_img}
                      className="object-cover w-full h-full"
                      alt="mission"
                      removeWrapper
                    />
                  </div>
                </div>
              </div>

              {/* info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-xl sm:text-2xl font-semibold text-white truncate">
                      {MissionData.name}
                    </div>
                    <div className="mt-1 text-[11px] text-white/70">{dateText}</div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <Chip size="sm" className="bg-black/30 border border-white/10 text-white/85">
                      ภารกิจ
                    </Chip>
                    <Chip size="sm" className="bg-black/30 border border-white/10 text-white/85">
                      จำกัดเวลา
                    </Chip>
                  </div>
                </div>

                <Divider className="my-3 bg-white/10" />

                <div className="text-[12px] text-white/70">รายละเอียด</div>
                <div className="mt-1 text-sm text-white/85 leading-relaxed">
                  {MissionData.detail}
                </div>
              </div>
            </div>
          </div>

          {/* GRID */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* LEFT: progress + action */}
            <div className="rounded-2xl border border-white/10 bg-black/20 overflow-hidden">
              <div className="px-4 py-3 bg-linear-to-r from-white/5 to-transparent border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white/90">ข้อมูลเพิ่มเติมภารกิจ</span>
                  <span className="text-[11px] text-white/60">ความคืบหน้า / เงื่อนไข</span>
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div className="rounded-xl border border-white/10 bg-black/15 p-4">
                  <ProgressBar data={MissionData} />
                </div>

                {isMissionAlreadyClaim(MissionData) ? (
                  <Button className="w-full text-white" color="success" isDisabled>
                    รับของรางวัลแล้ว
                  </Button>
                ) : isMissionComplete(MissionData) ? (
                  <Button
                    onPress={disclosure.data.acceptquest}
                    className="w-full text-white"
                    color="success"
                    variant="flat"
                  >
                    รับรางวัลจากภารกิจ
                  </Button>
                ) : (
                  <Button className="w-full text-white Btn1" isDisabled>
                    ยังไม่สำเร็จ
                  </Button>
                )}
              </div>
            </div>

            {/* RIGHT: rewards */}
            <div className="rounded-2xl border border-white/10 bg-black/20 overflow-hidden">
              <div className="px-4 py-3 bg-linear-to-r from-white/5 to-transparent border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2">
                    <MdOutlineCardGiftcard className="text-yellow-300 text-lg" />
                    <span className="text-sm font-semibold text-white/90">รางวัลที่จะได้รับ</span>
                  </div>
                  <Chip size="sm" className="bg-black/30 border border-white/10 text-white/80">
                    {MissionData.rewards?.length ?? 0} รายการ
                  </Chip>
                </div>
              </div>

              <div className="p-4 max-h-[320px] overflow-auto">
                <div className="grid grid-cols-2 gap-3">
                  {MissionData.rewards?.map((v: any, i: any) => {
                    const icon =
                      v.type === "CREDIT"
                        ? "/icons/gold.png"
                        : v.type === "GEMS"
                        ? "/icons/diamond.gif"
                        : v.type === "LEVEL_PERCENT"
                        ? "/icons/Fire.gif"
                        : "";

                    const label =
                      v.type === "ITEM"
                        ? v.name
                        : v.type === "CREDIT"
                        ? `${v.value} เครดิต`
                        : v.type === "GEMS"
                        ? `${v.value} เพชร`
                        : v.type === "LEVEL_PERCENT"
                        ? `${v.value} exp`
                        : "";

                    return (
                      <div
                        key={i}
                        className="rounded-xl border border-white/10 bg-black/15 p-3 flex flex-col items-center gap-2 hover:bg-black/20 transition-colors"
                      >
                        <Avatar
                          size="lg"
                          className="p-2 bg-transparent border-1 border-white/20"
                          src={icon}
                          name={v.type}
                        />
                        <div className="text-center text-xs text-white/90 px-1 leading-snug">
                          {label}
                        </div>
                        <div className="h-2 w-full rounded bg-[#212121] overflow-hidden">
                          <div className="h-full w-2/3 bg-red-800" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
