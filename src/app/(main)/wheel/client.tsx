"use client";
import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { Button, Image, Tooltip } from "@heroui/react";
import { useModal } from "@/hooks/useModal";
import { InventoryType, useMemberStore } from "@/stores/member";
import { fetchWithToken } from "@/utils/fetchUtils";
import { getClientBaseUrl } from "@/utils/url/client";
import { WheelConfig, SpinConfig } from "@/types/wheel"
import { toast } from "sonner";
import withAuth from "@/components/withAuth";

const Wheel = dynamic(
    () => import("react-custom-roulette").then((mod) => ({ default: mod.Wheel })),
    { ssr: false },
);


const dataDummy = [
    { option: "N/A", style: { backgroundColor: "#FBEECE", textColor: "#824f42" } },
    { option: "N/A", style: { backgroundColor: "white", textColor: "#824f42" } },
    { option: "N/A", style: { backgroundColor: "#FBEECE", textColor: "#824f42" } },
    { option: "N/A", style: { backgroundColor: "white", textColor: "#824f42" } },
    { option: "N/A", style: { backgroundColor: "#FBEECE", textColor: "#824f42" } },
    { option: "N/A", style: { backgroundColor: "white", textColor: "#824f42" } },
    { option: "N/A", style: { backgroundColor: "#FBEECE", textColor: "#824f42" } },
];

function Client() {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [mainColor, setMainColor] = useState("#3e3e3e");
    const [NavColor, setNavColor] = useState("#3e3e3e");
    const [currentData, setCurrentData] = useState<InventoryType | undefined>();
    const [rewardList, setRewardList] = useState<WheelConfig[]>([]);
    const { inventory } = useMemberStore();
    const scrollContainerHorizontalRef = useRef<HTMLDivElement>(null);
    const scrollContainerVerticelRef = useRef<HTMLDivElement>(null);

    // const [configWheel, setConfigWheel] = useState<SpinConfig>({
    //     id: "",
    //     name: "",
    //     color1: "",
    //     color2: "",
    //     banner_img: "",
    //     start_img: "",
    //     createdAt: "",
    //     updatedAt: "",
    // });

    const scrollLeft = () => {
        if (scrollContainerHorizontalRef.current) {
            scrollContainerHorizontalRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerHorizontalRef.current) {
            scrollContainerHorizontalRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };
    const scrollUp = () => {
        if (scrollContainerVerticelRef.current) {
            scrollContainerVerticelRef.current.scrollBy({ top: -200, behavior: 'smooth' });
        }
    };

    const scrollDown = () => {
        if (scrollContainerVerticelRef.current) {
            scrollContainerVerticelRef.current.scrollBy({ top: 200, behavior: 'smooth' });
        }
    };

    const { rewardWheelAlert } = useModal();

    const [isDone, setIsDone] = useState(true);
    const [isHovering, setIsHovering] = useState(false);

    const filteredInventory = useMemo(() => {
        const inventories = inventory.filter((item) => item?.info?.type == "COUPON_SPIN");
        return [...inventories, ...Array(36 - inventories.length).fill(null)] as InventoryType[] | null[];
    }, [inventory]);

    const playSound = (soundRef: React.RefObject<HTMLAudioElement | null>) => {
        if (soundRef.current) {
            soundRef.current.currentTime = 0;
            soundRef.current.play().catch(() => console.log('Sound failed to play'));
        }
    };

    // Audio refs
    const clickSoundRef = useRef<HTMLAudioElement | null>(null);
    const errorSoundRef = useRef<HTMLAudioElement | null>(null);
    const shakeSoundRef = useRef<HTMLAudioElement | null>(null);
    const hoverSoundRef = useRef<HTMLAudioElement | null>(null);

    const fetchDataSpin = useCallback(async (id: string) => {
        try {
            if (id) {
                const response = await fetchWithToken(
                    getClientBaseUrl(),
                    `/minigame/spin/${id}`,
                    {
                        method: "GET",
                    },
                    { noStore: true },
                );
                if (!response.ok) {
                    const test = await response.json();

                    throw new Error(test["message"]);
                }

                const test = await response.json();

                setRewardList(test.data);
                // setConfigWheel(test.spin);
            }
        } catch (err: any) {
            toast.error(err.message);
        }
    }, []);

    const [pointer, setPointer] = useState<number>(0);

    useEffect(() => {
        const rootStyles = getComputedStyle(document.documentElement);
        const color1 = rootStyles.getPropertyValue("--main-color").trim();
        const color2 = rootStyles.getPropertyValue("--navbar-color").trim();
        if (color1) {
            setMainColor(color1);
        }
        if (color2) {
            setNavColor(color2);
        }
    }, []);

    const handleSpinClick = async () => {

        if (!isDone) {
            return;
        }

        playSound(clickSoundRef);

        if (typeof window !== "undefined" && !mustSpin) {
            const id = currentData?.items?.[pointer];

            if (typeof id === "undefined" || !id) {
                playSound(errorSoundRef);
                return toast.error("กรุณาเลือกกงล้อก่อน");
            }

            try {
                setIsDone(false);
                const response = await fetchWithToken(
                    getClientBaseUrl(),
                    `/minigame/spin/${id}`,
                    {
                        method: "POST",
                    }
                );

                if (!response.ok) {
                    const errordataSpin = await response.json();
                    throw new Error(errordataSpin.message);
                }

                const resultdataSpin = await response.json();
                const prize = resultdataSpin.result;
                // set prize ก่อน
                setPrizeNumber(prize);

                // แล้วรอ 1 frame ก่อนจะเริ่มหมุนจริง
                requestAnimationFrame(() => {
                    setMustSpin(true);
                });
            } catch (error: any) {
                toast.error(error?.message || 'An error occurred');
                playSound(errorSoundRef);
                // อนุญาตให้กด spin ได้อีกครั้ง
                setIsDone(true);
            } finally {
                setPointer((prev) => prev + 1);
            }
        }
    };

    const handleStopSpinning = () => {
        setMustSpin(false);

        const msx: WheelConfig = rewardList[prizeNumber];
        rewardWheelAlert.setData({ reward: msx.option });
        if (rewardWheelAlert.state.onOpen) {
            rewardWheelAlert.state.onOpen()
        }

        // อนุญาตให้กด spin ได้อีกครั้ง
        setIsDone(true);

    };

    const handleMouseEnter = () => {
        if (!isHovering) {
            setIsHovering(true);
            playSound(hoverSoundRef);
        }
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    const wheelData = useMemo(
        () => (rewardList.length > 0 ? rewardList : dataDummy),
        [currentData]
    );

    const handleBoxSelect = async (box: InventoryType) => {
        playSound(clickSoundRef);
        if (!mustSpin) {
            const initPointer = 0;
            await fetchDataSpin(box.items[initPointer])
            setCurrentData(box);
            setPointer(initPointer);
            setPrizeNumber(0);
        };
    };

    return (
        <>

            <div className="flex items-center sm:items-start md:items-center justify-center w-full relative h-[calc(100vh-7.5rem)] md:h-[calc(100vh-5rem)]">
                <div className=" absolute w-full h-full z-1">
                    <img src="/image/backgroundRandom.jpg" className="w-full h-full object-cover" alt="" />
                </div>
                <div className="z-10 flex flex-col sm:mt-10 md:mt-0">
                    <div className="text-lg text-center font-semibold mb-4">
                        <span className="bg-black/50 rounded-full px-6 py-2">
                            {
                                currentData ? currentData.info.name : "กรุณาเลือกกงล้อ"
                            }
                        </span>
                    </div>
                    <Wheel
                        spinDuration={0.25}
                        mustStartSpinning={mustSpin}
                        prizeNumber={prizeNumber}
                        data={wheelData}
                        backgroundColors={[mainColor, "#858585"]}
                        fontFamily={"Kanit"}
                        fontSize={24}
                        fontWeight={700}
                        outerBorderColor={NavColor}
                        outerBorderWidth={8}
                        innerBorderColor={"#000000"}
                        innerBorderWidth={20}
                        radiusLineColor={NavColor}
                        radiusLineWidth={4}
                        textDistance={70}
                        onStopSpinning={handleStopSpinning}
                        disableInitialAnimation={true}
                        startingOptionIndex={prizeNumber}
                    />
                    <div className="flex justify-center">
                        <Button
                            className="Btn2 w-32 md:w-40"
                            onPress={handleSpinClick}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            disabled={!isDone}
                        >
                            {mustSpin ? "กำลังหมุน..." : "หมุน"}
                        </Button>
                    </div>
                </div>
                <div className="absolute sm:hidden lg:flex lg:bottom-0 lg:top-auto top-0 h-24 w-full flex justify-center items-center z-10">
                    <div className="w-full lg:w-[80%] flex flex-col py-2 justify-center h-full rounded-b-xl lg:rounded-t-xl lg:rounded-b-none bg-[var(--navbar-color)] relative">
                        <span className="text-center flex-1 text-(--text-color)">ไอเทมกงล้อ</span>
                        <div className="flex-grow w-full relative flex items-center">
                            <Button
                                isIconOnly
                                variant="flat"
                                className="absolute left-2 z-30 h-8 w-8 min-w-8 bg-gray-800/80 hover:bg-gray-700"
                                onPress={scrollLeft}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                disabled={mustSpin}
                                size="sm"
                            >
                                <i className="fa-solid fa-chevron-left"></i>
                            </Button>
                            <div
                                ref={scrollContainerHorizontalRef}
                                className="flex overflow-x-auto scrollbar-hide gap-2 px-12 py-1"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {filteredInventory.map((inventoryItem, index) => (
                                    <div key={index} className="flex-shrink-0 flex justify-center items-center relative">
                                        <Tooltip content={<span className="text-white">{inventoryItem ? inventoryItem?.info?.name : "ไปที่ร้านค้าเพื่อซื้อไอเทม"}</span>} >
                                            <Button
                                                isIconOnly
                                                variant={(currentData !== undefined && inventoryItem !== null && currentData.itemId === inventoryItem?.itemId) ? "solid" : "flat"}
                                                className={`h-12 w-12 p-1 ${(currentData !== undefined && inventoryItem !== null && currentData.itemId === inventoryItem?.itemId) ? "bg-[var(--main-color)] text-white" : ""}`}
                                                onPress={() => inventoryItem && handleBoxSelect(inventoryItem)}
                                                disabled={mustSpin}
                                                size="sm"
                                            >
                                                {
                                                    inventoryItem ? <Image src={inventoryItem.info?.item_img} alt={`Item ${index}`} /> : <i className="fa-solid fa-plus"></i>
                                                }

                                            </Button>
                                        </Tooltip>
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 text-xs bg-red-500 px-2 rounded-full">
                                            {inventoryItem?.amount}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button
                                isIconOnly
                                variant="flat"
                                className="absolute right-2 z-30 h-8 w-8 min-w-8 bg-gray-800/80 hover:bg-gray-700"
                                onPress={scrollRight}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                disabled={mustSpin}
                                size="sm"
                            >
                                <i className="fa-solid fa-chevron-right"></i>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="absolute sm:flex lg:hidden top-0 left-0 h-full w-24 hidden justify-center items-center z-10">
                    <div className="w-full h-[64%] flex flex-col py-2 justify-center rounded-r-xl lg:rounded-b-none bg-black relative">
                        <span className="text-center">ไอเทม</span>
                        <div className="w-full h-full relative flex flex-col py-2 gap-2 items-center justify-between">
                            <Button
                                isIconOnly
                                variant="flat"
                                className=" z-30 h-8 w-8 min-w-8 bg-gray-800/80 hover:bg-gray-700"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onPress={scrollUp}
                                disabled={mustSpin}
                                size="sm"
                            >
                                <i className="fa-solid fa-chevron-up"></i>
                            </Button>
                            <div className="h-[80%] overflow-hidden">
                                <div
                                    ref={scrollContainerVerticelRef}
                                    className="flex flex-col overflow-y-auto h-full gap-2"
                                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                >
                                    {filteredInventory.map((inventoryItem, index) => (
                                        <div key={index} className="flex-shrink-0 flex justify-center items-center relative">
                                            <Tooltip content={<span className="text-white">{inventoryItem ? inventoryItem?.info?.name : "ไปที่ร้านค้าเพื่อซื้อไอเทม"}</span>} >
                                                <Button
                                                    isIconOnly
                                                    variant={(currentData !== undefined && inventoryItem !== null && currentData.itemId === inventoryItem?.itemId) ? "solid" : "flat"}
                                                    className={`h-12 w-12 p-1 ${(currentData !== undefined && inventoryItem !== null && currentData.itemId === inventoryItem?.itemId) ? "bg-[var(--main-color)] text-white" : ""}`}
                                                    onPress={() => inventoryItem && handleBoxSelect(inventoryItem)}
                                                    onMouseEnter={handleMouseEnter}
                                                    onMouseLeave={handleMouseLeave}
                                                    disabled={mustSpin}
                                                    size="sm"
                                                >
                                                    {
                                                        inventoryItem ? <Image src={inventoryItem.info?.item_img} alt={`Item ${index}`} /> : <i className="fa-solid fa-plus"></i>
                                                    }

                                                </Button>
                                            </Tooltip>
                                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 text-xs bg-red-500 px-2 rounded-full">
                                                {inventoryItem?.amount}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Button
                                isIconOnly
                                variant="flat"
                                className="z-30 h-8 w-8 min-w-8 bg-gray-800/80 hover:bg-gray-700"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onPress={scrollDown}
                                disabled={mustSpin}
                                size="sm"
                            >
                                <i className="fa-solid fa-chevron-down"></i>
                            </Button>
                        </div>
                    </div>
                </div>
                {/* {rewardList.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-center"
                    >
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-10 px-4 border border-gray-300"
                        >
                            {item.option}
                        </Button>
                    </div>
                ))} */}
            </div>
            {/* Audio Elements */}
            <audio ref={clickSoundRef} src="/mini/mixkit-select-click-1109.wav" />
            <audio ref={errorSoundRef} src="/mini/mixkit-click-error-1110.wav" />
            <audio ref={shakeSoundRef} src="/mini/mixkit-completion-of-a-level-2063.wav" />
            <audio ref={hoverSoundRef} src="/mini/mixkit-modern-technology-select-3124.wav" />
        </>
    );
}

export default withAuth(Client);
