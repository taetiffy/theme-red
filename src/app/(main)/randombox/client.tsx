"use client";
import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Button, Image, Tooltip } from "@heroui/react";
import { InventoryType, useMemberStore } from "@/stores/member";
import { fetchWithToken } from "@/utils/fetchUtils";
import { getClientBaseUrl } from "@/utils/url/client";
import { toast } from "sonner";
import withAuth from "@/components/withAuth";
import { animate, createScope, Scope } from 'animejs';
import { formatWithOutCurrency } from "@/utils/format.utils";

const formatAmount = (type: "TURN" | "ITEM" | "LEVEL_PERCENT" | "CREDIT" | undefined, amount: number = 0) => {
    switch (type) {
        case "CREDIT":
            return formatWithOutCurrency(amount);
        default:
            return amount;
    }
}

const formatType = (type: "TURN" | "ITEM" | "LEVEL_PERCENT" | "CREDIT" | undefined) => {
    switch (type) {
        case "CREDIT": return "Credit";
        case "ITEM": return "Item";
        case "TURN": return "EXP";
        default: return type;
    }
}

function Client() {

    const { inventory } = useMemberStore();

    const scrollContainerHorizontalRef = useRef<HTMLDivElement>(null);
    const scrollContainerVerticelRef = useRef<HTMLDivElement>(null);

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

    const [currentData, setCurrentData] = useState<InventoryType | undefined>();

    const [isDone, setIsDone] = useState(true);
    const [isBoxOpen, setIsBoxOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [rewardImage, setRewardImage] = useState("");
    const [rewardMessage, setRewardMessage] = useState<{ type: "TURN" | "ITEM" | "LEVEL_PERCENT" | "CREDIT", amount: number } | undefined>();

    const filteredInventory = useMemo(() => {
        const inventories = inventory.filter((item) => item?.info?.type == "COUPON_RANDOM_BOX");
        return [...inventories, ...Array(36 - inventories.length).fill(null)] as InventoryType[] | null[];
    }, [inventory]);

    const rootRef = useRef(null);
    const scopeRef = useRef<Scope | null>(null);
    const boxClosedRef = useRef(null);
    const boxOpenRef = useRef(null);

    // Audio refs
    const clickSoundRef = useRef<HTMLAudioElement | null>(null);
    const errorSoundRef = useRef<HTMLAudioElement | null>(null);
    const shakeSoundRef = useRef<HTMLAudioElement | null>(null);
    const hoverSoundRef = useRef<HTMLAudioElement | null>(null);

    // Initialize animations with new anime.js API
    useEffect(() => {
        if (rootRef.current) {
            scopeRef.current = createScope({ root: rootRef.current }).add(self => {
                // Wave animation loop for closed box
                self.add('waveAnimation', () => {
                    animate('.box-closed', {
                        translateY: [
                            { to: -10, duration: 1000 },
                            { to: 10, duration: 1000 },
                            { to: 0, duration: 1000 }
                        ],
                        ease: 'inOut(2)',
                        loop: true
                    });
                });

                // Start wave animation initially
                self.methods.waveAnimation();

                // Register animation methods
                self.add('shakeBox', () => {
                    animate('.box-closed', {
                        rotate: [
                            { to: 5, duration: 100 },
                            { to: -5, duration: 100 },
                            { to: 5, duration: 100 },
                            { to: -5, duration: 100 },
                            { to: 0, duration: 100 }
                        ],
                        scale: [
                            { to: 1.1, duration: 100 },
                            { to: 0.9, duration: 100 },
                            { to: 1, duration: 100 }
                        ],
                        ease: 'inOut(2)'
                    });
                });

                self.add('intensiveEarthquake', () => {
                    animate('.box-closed', {
                        translateX: [
                            // Phase 1: เริ่มต้นสั่นเบาๆ
                            { to: -2, duration: 150 },
                            { to: 2, duration: 150 },
                            { to: -3, duration: 100 },
                            { to: 3, duration: 100 },
                            // Phase 2: สั่นแรงขึ้น แต่ระยะทางสั้น
                            { to: -5, duration: 80 },
                            { to: 5, duration: 80 },
                            { to: -7, duration: 60 },
                            { to: 7, duration: 60 },
                            { to: -6, duration: 50 },
                            { to: 6, duration: 50 },
                            // Phase 3: สั่นแรงมากขึ้น (ช่วงกลาง) - สั่นเร็วมาก
                            { to: -8, duration: 40 },
                            { to: 8, duration: 40 },
                            { to: -10, duration: 35 },
                            { to: 10, duration: 35 },
                            { to: -9, duration: 30 },
                            { to: 9, duration: 30 },
                            { to: -11, duration: 25 },
                            { to: 11, duration: 25 },
                            { to: -8, duration: 30 },
                            { to: 8, duration: 30 },
                            // Phase 4: สั่นแรงที่สุด - สั่นเร็วสุด
                            { to: -12, duration: 20 },
                            { to: 12, duration: 20 },
                            { to: -10, duration: 20 },
                            { to: 10, duration: 20 },
                            { to: -15, duration: 15 },
                            { to: 15, duration: 15 },
                            { to: -12, duration: 15 },
                            { to: 12, duration: 15 },
                            { to: -8, duration: 20 },
                            { to: 8, duration: 20 },
                            // Phase 5: ค่อยๆ ช้าลง
                            { to: -6, duration: 40 },
                            { to: 6, duration: 40 },
                            { to: -4, duration: 60 },
                            { to: 4, duration: 60 },
                            { to: -2, duration: 100 },
                            { to: 2, duration: 100 },
                            { to: 0, duration: 150 }
                        ],
                        translateY: [
                            // เพิ่มการสั่นขึ้นลงที่แรง แต่ระยะสั้น
                            { to: -1, duration: 200 },
                            { to: 1, duration: 150 },
                            { to: -3, duration: 100 },
                            { to: 3, duration: 100 },
                            { to: -4, duration: 80 },
                            { to: 4, duration: 80 },
                            { to: -5, duration: 60 },
                            { to: 5, duration: 60 },
                            { to: -6, duration: 40 },
                            { to: 6, duration: 40 },
                            { to: -7, duration: 30 },
                            { to: 7, duration: 30 },
                            { to: -8, duration: 20 },
                            { to: 8, duration: 20 },
                            { to: -6, duration: 30 },
                            { to: 6, duration: 30 },
                            { to: -4, duration: 50 },
                            { to: 4, duration: 50 },
                            { to: -2, duration: 80 },
                            { to: 2, duration: 80 },
                            { to: 0, duration: 120 }
                        ],
                        scale: [
                            // เพิ่มการเปลี่ยนขนาดที่รวดเร็วขึ้น
                            { to: 1.05, duration: 200 },
                            { to: 0.98, duration: 150 },
                            { to: 1.08, duration: 100 },
                            { to: 0.95, duration: 100 },
                            { to: 1.12, duration: 80 },
                            { to: 0.92, duration: 80 },
                            { to: 1.15, duration: 60 },
                            { to: 0.90, duration: 60 },
                            { to: 1.18, duration: 40 },
                            { to: 0.88, duration: 40 },
                            { to: 1.10, duration: 60 },
                            { to: 0.95, duration: 80 },
                            { to: 1.05, duration: 100 },
                            { to: 1.0, duration: 200 }
                        ],
                        rotate: [
                            // เพิ่มการหมุนเล็กน้อยให้ดูเหมือนจริง
                            { to: 1, duration: 200 },
                            { to: -1, duration: 150 },
                            { to: 2, duration: 100 },
                            { to: -2, duration: 100 },
                            { to: 3, duration: 60 },
                            { to: -3, duration: 60 },
                            { to: 4, duration: 40 },
                            { to: -4, duration: 40 },
                            { to: 2, duration: 80 },
                            { to: -2, duration: 80 },
                            { to: 1, duration: 120 },
                            { to: 0, duration: 200 }
                        ],
                        duration: 1000, // ลดเวลาลงเล็กน้อยให้รู้สึกเร็วขึ้น
                        ease: 'linear',
                        loop: false
                    });
                });

                self.add('hideClosedBox', () => {
                    animate('.box-closed', {
                        opacity: 0,
                        duration: 0
                    });
                });

                self.add('showOpenBox', () => {
                    animate('.box-open', {
                        opacity: 1,
                        scale: [0.1, 1],
                        duration: 500,
                        ease: 'out(4)'
                    });
                });

                self.add('resetBoxes', () => {
                    animate('.box-closed', {
                        opacity: 1,
                        duration: 500,
                        rotate: 0,
                        translateY: 0, // Reset translateY to avoid conflicts
                        ease: 'inOut(2)'
                    });
                    animate('.box-open', {
                        opacity: 0,
                        duration: 500,
                        rotate: 0,
                        ease: 'inOut(2)'
                    });
                    // Reapply wave animation after reset
                    setTimeout(() => {
                        self.methods.waveAnimation();
                    }, 500); // Wait for reset animation to complete
                });
            });
        }

        return () => {
            if (scopeRef.current) {
                scopeRef.current.revert();
            }
        };
    }, [currentData]);

    const playSound = (soundRef: React.RefObject<HTMLAudioElement | null>) => {
        if (soundRef.current) {
            soundRef.current.currentTime = 0;
            soundRef.current.play().catch(() => console.log('Sound failed to play'));
        }
    };

    const [pointer, setPointer] = useState<number>(0);

    const handleBoxClick = async () => {

        if (!isDone) {
            return;
        }

        playSound(clickSoundRef);

        const shake = () => {
            if (scopeRef.current?.methods) {
                // Shake animation
                scopeRef.current.methods.shakeBox();
            }
        }

        if (!currentData) {
            shake();
            playSound(errorSoundRef);
            return;
        }

        if (isBoxOpen) {
            // Reset box state using scoped methods
            if (scopeRef.current?.methods) {
                scopeRef.current.methods.resetBoxes();
            }
            setIsBoxOpen(false);
        } else {
            shake();
            setIsDone(false);
            // บันทึกเวลาเริ่มต้น
            const startTime = Date.now();
            // คำนวณเวลาที่ใช้
            const elapsedTime = Date.now() - startTime;
            try {
                // เริ่ม loading animation
                if (scopeRef.current?.methods) {
                    setTimeout(() => {
                        if (scopeRef.current?.methods) {
                            scopeRef.current.methods.intensiveEarthquake();
                        }
                    }, 500);
                }
                const response = await fetchWithToken(
                    getClientBaseUrl(),
                    `/minigame/open-box/${currentData.items[pointer]}`,
                    {
                        method: "POST",
                    }
                );
                // ถ้า fetch เสร็จในเวลา < 800ms ให้รอเพิ่มให้ครบ 1200ms
                if (elapsedTime < 800) {
                    await new Promise((resolve) => setTimeout(resolve, 1200 - elapsedTime));
                }
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message)
                };
                setRewardMessage(data);
                // setRewardImage();
            } catch (error) {
                // ถ้า fetch เสร็จในเวลา < 800ms ให้รอเพิ่มให้ครบ 1200ms
                if (elapsedTime < 800) {
                    await new Promise((resolve) => setTimeout(resolve, 1200 - elapsedTime));
                }
                console.error('Error fetching:', error);
                playSound(errorSoundRef);
                toast.error((error as any).message);
                // ป้องกันการกดซ้ำ
                // Reset box state using scoped methods
                if (scopeRef.current?.methods) {
                    scopeRef.current.methods.resetBoxes();
                }
                setTimeout(() => {
                    setIsDone(true);
                }, 1500); // Wait for shake animation to complete
                return;
            } finally {
                setPointer((prev) => prev + 1);
            }

            // Play shake sound and animate
            playSound(shakeSoundRef);

            if (scopeRef.current?.methods) {

                // Switch to open box after shake completes
                setTimeout(() => {
                    if (scopeRef.current && scopeRef.current.methods) {
                        scopeRef.current.methods.hideClosedBox();
                        scopeRef.current.methods.showOpenBox();
                    }
                    setIsBoxOpen(true);
                }, 500); // Wait for shake animation to complete
            }

            // ป้องกันการกดซ้ำ
            setTimeout(() => {
                setIsDone(true);
            }, 1500); // Wait for shake animation to complete
        }
    };

    useEffect(() => {
        if (currentData && !currentData.items.hasOwnProperty(pointer)) {
            setCurrentData(undefined);
        }
    }, [pointer]);

    const handleMouseEnter = () => {
        if (!isHovering) {
            setIsHovering(true);
            playSound(hoverSoundRef);
        }
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    const handleBoxSelect = (box: InventoryType) => {
        playSound(clickSoundRef);
        setCurrentData(box);
        setPointer(0);
        setIsBoxOpen(false);
    }

    return (
        <>
            {/* Main Content */}
            <div className="flex-1 flex flex-col relative overflow-hidden" ref={rootRef}>

                {/* Content Area */}
                <div className="flex items-center sm:items-start md:items-center justify-center w-full relative h-[calc(100vh-7.5rem)] md:h-[calc(100vh-5rem)]">
                    {/* Background Video */}
                    <video
                        className="absolute top-0 left-0 w-full h-full object-cover z-1"
                        autoPlay
                        loop
                        muted
                    >
                        <source src="/mini/background.webm" type="video/webm" />
                        Your browser does not support the video tag.
                    </video>
                    {/* Box Container */}
                    <div className="relative w-[250px] md:w-[300px] h-[350px] md:h-[400px] z-2 flex flex-col items-center">
                        {/* ข้อความ "กรุณาเลือกกล่องสุ่ม" */}
                        <div className="text-lg text-center font-semibold mb-4">
                            <span className="bg-black/50 rounded-full px-6 py-2">
                                {
                                    currentData ? currentData.info.name : "กรุณาเลือกกล่องสุ่ม"
                                }
                            </span>
                        </div>

                        {/* Container สำหรับกล่อง */}
                        <div className="relative w-full h-[250px] md:h-[300px]">
                            {/* กล่องปิด */}
                            {
                                currentData && <img
                                    ref={boxClosedRef}
                                    src={currentData.info.RandomBox?.box}
                                    className="box-closed absolute top-0 left-0 w-full h-full cursor-pointer z-2"
                                    alt="Closed Box"
                                    onClick={handleBoxClick}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                />
                            }
                            {/* ข้อความรางวัลเมื่อเปิดกล่อง */}
                            <div
                                className="box-open absolute top-0 left-0 w-full h-full opacity-0 z-1 flex flex-col justify-center items-center nahee"
                            >
                                <span className="text-2xl md:text-3xl capitalize text-center">
                                    คุณได้รับ {formatType(rewardMessage?.type)}
                                </span>
                                <p ref={boxOpenRef} className="text-4xl md:text-5xl text-center mt-2">
                                    {formatAmount(rewardMessage?.type, rewardMessage?.amount)}
                                </p>
                            </div>
                            {/* กล่องเปิด */}
                            {/* <img
                                ref={boxOpenRef}
                                src={rewardImage}
                                className="box-open absolute top-0 left-0 w-full h-full opacity-0 z-1"
                                alt="Open Box"
                            /> */}
                        </div>

                        {/* ปุ่ม "เปิดกล่อง" */}
                        <div className="mt-12 flex justify-center z-1">
                            {
                                (isDone && currentData) && <Button
                                    className="Btn2 w-32 md:w-40"
                                    onPress={handleBoxClick}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    เปิดกล่อง
                                </Button>
                            }
                        </div>
                    </div>

                    <div className="absolute sm:hidden lg:flex lg:bottom-0 lg:top-auto top-0 h-24 w-full flex justify-center items-center z-10">
                        <div className="w-full lg:w-[80%] flex flex-col py-2 justify-center h-full rounded-b-xl lg:rounded-t-xl lg:rounded-b-none bg-black relative">
                            <span className="text-center flex-1">ไอเทมกล่องสุ่ม</span>
                            <div className="flex-grow w-full relative flex items-center">
                                <Button
                                    isIconOnly
                                    variant="flat"
                                    className="absolute left-2 z-30 h-8 w-8 min-w-8 bg-gray-800/80 hover:bg-gray-700"
                                    onPress={scrollLeft}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    disabled={!isDone}
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
                                                    disabled={!isDone}
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
                                    disabled={!isDone}
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
                                    onPress={scrollUp}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    disabled={!isDone}
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
                                                <Tooltip placement="right" content={<span className="text-white">{inventoryItem?.info?.name}</span>} >
                                                    <Button
                                                        isIconOnly
                                                        variant={(currentData !== undefined && inventoryItem !== null && currentData.itemId === inventoryItem?.itemId) ? "solid" : "flat"}
                                                        className={`h-12 w-12 p-1 ${(currentData !== undefined && inventoryItem !== null && currentData.itemId === inventoryItem?.itemId) ? "bg-[var(--main-color)] text-white" : ""}`}
                                                        onPress={() => inventoryItem && handleBoxSelect(inventoryItem)}
                                                        onMouseEnter={handleMouseEnter}
                                                        onMouseLeave={handleMouseLeave}
                                                        disabled={!isDone}
                                                        size="sm"
                                                    >
                                                        <Image src={inventoryItem?.info?.item_img} alt={`Item ${index}`} />
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
                                    onPress={scrollDown}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    disabled={!isDone}
                                    size="sm"
                                >
                                    <i className="fa-solid fa-chevron-down"></i>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Audio Elements */}
                    <audio ref={clickSoundRef} src="/mini/mixkit-select-click-1109.wav" />
                    <audio ref={errorSoundRef} src="/mini/mixkit-click-error-1110.wav" />
                    <audio ref={shakeSoundRef} src="/mini/mixkit-completion-of-a-level-2063.wav" />
                    <audio ref={hoverSoundRef} src="/mini/mixkit-modern-technology-select-3124.wav" />
                </div>
            </div>
        </>
    );
}

export default withAuth(Client);