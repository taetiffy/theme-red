"use client";
import React, { lazy, Suspense, useEffect, useState } from "react";
//heroui
import { Input, Button, Spinner } from "@heroui/react";
import { Image } from "@heroui/react";
//icon
import { CiDiscount1 } from "react-icons/ci";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdMoneyOff } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { Tooltip } from "@heroui/tooltip";
import { MoneyBarInterFace } from "@/types/moneybar";
import { useModal } from "@/hooks/useModal";
import { useMemberStore } from "@/stores/member";
import { getRevenueShareService } from "@/services/affiliate";
import { formatWithOutCurrency } from "@/utils/format.utils";
import { isLightColor } from "@/utils/lightColor";

import { useAffiliate } from "@/hooks/affiliate";

export function MoneyBar({
    cols = 4,
    gold = false,
    goldValue,
    diamond = false,
    diamondValue,
    commission = false,
    commissionValue,
    lost = false,
    lostValue,
    invite = false,
    inviteValue,
    play = false,
    topContent = false
}: MoneyBarInterFace) {
    const { balance, member } = useMemberStore();
    const { deposit, gemReward } = useModal();

    const [revenueShare, setRevenueShare] = useState<number>(0);

    const { handleClaimAffiliate, handleClaimReturnLoss, handleClainCommission } = useAffiliate();
    const [color1, setColor1] = useState('');

    useEffect(() => {
        const navbarColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--navbar-color')
            .trim();
        setColor1(navbarColor);
    }, []);

    useEffect(() => {
        const fetchRevenue = async () => {
            const data = await getRevenueShareService();

            setRevenueShare(data.commission);
        };

        fetchRevenue();
    }, []);

    const [openLose, setOpenLose] = useState(false);
    const [openCommission, setOpenCommission] = useState(false);
    const [openInvite, setOpenInvite] = useState(false);

    const toggleLose = () => setOpenLose(!openLose);
    const toggleCommission = () => setOpenCommission(!openCommission);
    const toggleInvite = () => setOpenInvite(!openInvite);

    return (
       <>
        <div
            className={` grid ${cols === 1 ? `grid-cols-1` : cols === 2 ? "grid-cols-2" : cols === 3 ? "grid-cols-3" : "grid-cols-4"} gap-2`}
        >
            {gold && (
                <div className="dark ">
                    <Input
                        size={play || topContent ? "sm" : "md"}
                        startContent={
                            <Image
                                className={` ${member?.bonus_status ? ` grayscale` : ``} ${play ? "w-6" : "w-12"} gold-spin-animation`}
                                src={`/icons/gold.png`}
                            />
                        }
                        endContent={
                            !play ? (
                                <Button
                                    size={play || topContent ? "sm" : "md"}
                                    onPress={deposit.state.onOpen}
                                    className="Btn2 w-30 text-xs h-6 "
                                    isIconOnly
                                    radius="full"
                                >
                                    ฝากเงิน
                                </Button>
                            ) : (
                                ""
                            )
                        }
                        classNames={{
                            input: "text-center text-sm md:text-lg",
                            inputWrapper: `${isLightColor(color1) ? 'mini_navbar_bgColor_light':'bg-black'}`,
                        }}
                        variant="faded"
                        className="dark max-w-none md:max-w-50 w-full text-(--text-color) !border-0"
                        readOnly
                        value={formatWithOutCurrency(
                            member ? (member.bonus_status ? balance.bonus : balance.credit) : 0,
                        )}
                    />
                </div>
            )}
            {diamond && (
                <div className="">
                    <Input
                        size={play || topContent ? "sm" : "md"}
                        startContent={
                            <Image className={play ? "w-8" : "w-10"} src={`/icons/diamond.gif`} />
                        }
                        endContent={
                            !play ? (
                                <Button
                                    size={play || topContent ? "sm" : "md"}
                                    onPress={gemReward.state.onOpen}
                                    className="Btn2 !min-w-0 w-10 h-6"
                                    radius="full"
                                    isIconOnly
                                >
                                    <FaPlus size={15} />
                                </Button>
                            ) : (
                                ""
                            )
                        }
                        classNames={{
                            input: "text-center text-sm md:text-lg",
                            inputWrapper: `${isLightColor(color1) ? 'mini_navbar_bgColor_light':'bg-black'}`
                        }}
                        variant="faded"
                        className="dark max-w-none md:max-w-50 w-full text-(--text-color) !border-0"
                        readOnly
                        // defaultValue={balance.gem.toString()}
                        value={balance.gem.toString()}
                    />
                </div>
            )}
            {lost && (
                <div className="dark">
                    <Tooltip
                        content="คืนยอดเสีย"
                        className="dark text-white px-8 py-4 text-sm md:text-lg"
                        showArrow={false}
                        placement="bottom"
                        size={'sm'}
                        offset={15}
                        isOpen={openLose}
                        onOpenChange={toggleLose}
                    >
                        <Input
                            size={topContent ? "sm" : "md"}
                            onClick={toggleLose}
                            startContent={
                                <Image
                                    alt="commision"
                                    className="w-10 text-white"
                                    src={`/icons/MoneyBar/return.svg`}
                                />
                            }
                            endContent={
                                <Button
                                    onPress={handleClaimReturnLoss}
                                    isDisabled={!(balance.returnLost > 0)}
                                    size={'sm'}
                                    className="Btn1 w-20 h-6"
                                    radius="full"
                                    isIconOnly
                                >
                                    ถอน
                                </Button>
                            }
                            classNames={{ input: "text-center text-lg" }}
                            readOnly
                            // defaultValue={formatWithOutCurrency(balance.lossToDay)}
                            value={formatWithOutCurrency(balance.returnLost)}
                        />
                    </Tooltip>
                </div>
            )}
            {commission && (
                <div className="dark">
                    <Tooltip
                        content="คอมมิชชั่น"
                        className="dark text-white px-8 py-4 text-sm md:text-lg"
                        showArrow={false}
                        placement="bottom"
                        offset={15}
                        isOpen={openCommission}
                        onOpenChange={toggleCommission}
                    >
                        <Input
                            size={topContent ? "sm" : "md"}
                            onClick={toggleCommission}
                            // startContent={<CiDiscount1 className="text-white" size={40} />}
                            startContent={
                                <Image
                                    alt="commision"
                                    className="w-10 text-white"
                                    src={`/icons/MoneyBar/commission.svg`}
                                />
                            }
                            endContent={
                                <Button
                                    size="sm"
                                    onPress={handleClainCommission}
                                    isDisabled={!(balance.returnCommission > 0)}
                                    className="Btn1 w-20 h-6"
                                    radius="full"
                                    isIconOnly
                                >
                                    ถอน
                                </Button>
                            }
                            classNames={{ input: "text-center text-lg" }}
                            readOnly
                            // defaultValue={formatWithOutCurrency(balance.comToDay)}
                            value={formatWithOutCurrency(balance.returnCommission)}
                        />
                    </Tooltip>
                </div>
            )}
            {invite && (
                <div className="dark">
                    <Tooltip
                        size={topContent ? "sm" : "md"}
                        content="แนะนำเพื่อน"
                        className="dark text-white px-8 py-4 text-sm md:text-lg"
                        showArrow={false}
                        placement="bottom"
                        offset={15}
                        isOpen={openInvite}
                        onOpenChange={toggleInvite}
                    >
                        <Input
                            size={topContent ? "sm" : "md"}
                            onClick={toggleInvite}
                            startContent={<BsFillPeopleFill className="text-white" size={40} />}
                            endContent={
                                <Button
                                    size="sm"
                                    onPress={handleClaimAffiliate}
                                    isDisabled={!(revenueShare > 0)}
                                    className="Btn1 w-20 h-6"
                                    radius="full"
                                    isIconOnly
                                >
                                    ถอน
                                </Button>
                            }
                            classNames={{ input: "text-center text-lg" }}
                            readOnly
                            // defaultValue={revenueShare.toString()}
                            value={formatWithOutCurrency(revenueShare)}
                        />
                    </Tooltip>
                </div>
            )}
        </div>
       </>
    );
}
