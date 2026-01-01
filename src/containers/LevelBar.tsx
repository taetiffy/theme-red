"use client";

import React, { useEffect, useState } from "react";
import { CircularProgress, Progress } from "@heroui/react";
import { useDisclosure } from "@heroui/react";
import { Image } from "@heroui/react";
import { useMemberStore } from "@/stores/member";
import { useShareStore } from "@/stores/share";
import { useModal } from "@/hooks/useModal";

interface LevelBarInterFace {
    isDrawer?: boolean;
    position: "Circle" | "Sidebar" | "Drawer" | "Play" | "Line";
    isOpen?: boolean;
}

interface LevelProps {
    Exp: number;
    maxExp: number;
    level: number;
    rank: rankType;
    isDrawer?: boolean;
    isOpen?: boolean;
}

interface rankType {
    img: string;
    name: string;
    start: number;
    end: number;
}

export function LevelBar({ isDrawer = false, position, isOpen = false }: LevelBarInterFace) {
    const { member: user, rank, isAuthenticated } = useMemberStore();
    const {
        state: { rank: rankList },
    } = useShareStore();

    const [ranking, setRank] = useState<rankType>({
        name: "MEMBER",
        img: "/img/ranks/1.png",
        start: 0,
        end: 25,
    });

    useEffect(() => {
        if (!user) return;

        if (isAuthenticated && rank.level !== undefined) {
            const findRank: any = rankList.find(
                (item: rankType) =>
                    item.start <= rank.level && item.end >= rank.level,
            );
            if (typeof findRank !== "undefined" && findRank !== undefined) {
                setRank(findRank);
            }
        }
    }, [user, isAuthenticated, rankList]);

    if (!user) return;

    if (position === "Circle") {
        return (
            <LevelBarCircle
                isDrawer={isDrawer}
                Exp={rank.exp}
                maxExp={rank.total}
                level={rank.level}
                rank={ranking}
            />
        );
    } else if (position === "Sidebar") {
        return (
            <LevelBarSideBar
                Exp={rank.exp}
                maxExp={rank.total}
                level={rank.level}
                isOpen={isOpen}
                rank={ranking}
            />
        );
    } else if (position === "Line") {
        return (
            <LevelBarLine
                isDrawer={isDrawer}
                Exp={rank.exp}
                maxExp={rank.total}
                level={rank.level}
                rank={ranking}
            />
        );
    } else if (position === "Play") {
        return (
            <LevelBarPlay
                Exp={rank.exp}
                maxExp={rank.total}
                level={rank.level}
                rank={ranking}
            />
        )
    }
    else {
        return (
            <LevelBarDrawer
                Exp={rank.exp}
                maxExp={rank.total}
                level={rank.level}
                isOpen={isOpen}
                rank={ranking}
            />
        );
    }
}
function LevelBarLine({ isDrawer, Exp, maxExp }: LevelProps){
  return(
    <>
    <span className={'text-center flex justify-center text-xs font-bold'}> EXP</span>
    <div className={'relative'}>
      <span className=" absolute left-1/2 top-1/2 -translate-1/2 text-xs z-10">{Exp.toFixed(2)}/{maxExp}</span>
      <Progress
  value={(Exp / maxExp) * 100}
  size="lg"
  classNames={{
    track: "bg-red-900/25",
    indicator:
      "bg-gradient-to-r from-red-300 via-red-500 to-red-500",
  }}
/>

    </div>
    </>
  )
}

function LevelBarCircle({ isDrawer, Exp, maxExp }: LevelProps) {

    const { drawerMenu } = useModal();
    const handleOpen = () => {
        if (drawerMenu.state.onOpen) drawerMenu.state.onOpen();
    }

    return (
        <>
            <CircularProgress
                onClick={handleOpen}
                value={Math.round((Exp / maxExp) * 100)}
                valueLabel={
                    <div className="flex flex-col items-center leading-[6px]">
                        <span>{Math.round(Exp)}</span>
                        <span>exp</span>
                    </div>
                }
                showValueLabel
                className="cursor-pointer select-none lg:hidden block"
                classNames={{ indicator: " text-red-500" }}
            />
            <CircularProgress
                value={Math.round((Exp / maxExp) * 100)}
                valueLabel={
                    <div className="flex flex-col items-center leading-[6px]">
                        <span>{Math.round(Exp)}</span>
                        <span>exp</span>
                    </div>
                }
                showValueLabel
                className="cursor-pointer select-none lg:block hidden"
                classNames={{ indicator: " text-red-500" }}
            />
        </>
    );
}

function LevelBarPlay({ Exp, maxExp,level, rank }: LevelProps) {
    return (
        <>
            <div className="relative">
                <Progress
  value={(Exp / maxExp) * 100}
  className="select-none h-3 rounded-full overflow-hidden bg-black/30"
  classNames={{
    indicator:
      "bg-linear-to-r from-red-700 via-red-400 to-red-900/70 shadow-[0_0_10px_rgba(239,68,68,0.6)]",
  }}
/>

                <div className=" absolute text-xs -top-1 left-1/2 -translate-x-1/2">
                    Exp. {Math.round(Exp)} / {maxExp}
                </div>
            </div>
        </>
    );
}

function LevelBarSideBar({ Exp, maxExp, level, rank, isOpen }: LevelProps) {
    return (
        <>
            <div className="w-full flex items-center flex-col justify-center py-2 gap-2">
                <div className="bg-red-400/5 rounded-full p-5 border-2 border-red-800/10">
                    <Image
                        className={`${isOpen ? "w-20" : "w-10"}`}
                        src={rank.img}
                    />
                </div>
                <div className={`${isOpen ? "flex" : "hidden"} flex flex-col text-center`}>
                    <div className="flex gap-2">
                        <span>{rank.name}</span>
                        <span>LV.{level}</span>
                    </div>
                    <div>
                        {Math.round(Exp)}/{maxExp}
                    </div>
                </div>
                <div className={`${isOpen ? "flex" : "hidden"} w-full px-4`}>
                    <Progress
                        value={(Exp / maxExp) * 100}
                        className="select-none"
                        classNames={{ indicator: "bg-red-800" }}
                    />
                </div>
            </div>
        </>
    );
}

function LevelBarDrawer({ Exp, maxExp, level, rank }: LevelProps) {
    return (
        <>
            <div className="w-full flex  py-2 gap-2">
                <div>
                    <Image
                        className={`w-30`}
                        src={rank.img}
                    />
                </div>
                <div className="flex gap-2 w-full flex-col justify-between">
                    <div className="flex gap-2 text-xl">
                        <span>{rank.name}</span>
                        <span>LV.{level}</span>
                    </div>
                    <div className="">
                        <div>
                            {Math.round(Exp)}/{maxExp}
                        </div>
                        <Progress
                            value={(Exp / maxExp) * 100}
                            className="select-none"
                            classNames={{ indicator: "bg-red-800" }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
