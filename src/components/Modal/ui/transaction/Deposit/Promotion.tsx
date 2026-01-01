import React, { useState, useMemo } from "react";
import {
    Select,
    SelectItem,
    Image,
    CardHeader,
    Modal,
    ModalBody,
    ModalContent,
    Skeleton,
} from "@heroui/react";
import { Card, CardBody, CardFooter, Button } from "@heroui/react";
import { useFetchData } from "@/hooks/useFetchData";
import { fetchUserBonusService } from "@/services/bonus";
import { useRouter } from "next/navigation";
import { useMemberStore } from "@/stores/member";
import { div } from "framer-motion/client";
import { useModal } from "@/hooks/useModal";
import { useBonus } from "@/hooks/bonus";
import { usePathname } from "next/navigation";

type onClosestate = {
    onClose?: () => void;
    promotiondata?: {
        bonus_img: string;
        detail: string;
        name: string;
        status: boolean;
    };
};

export function PromotionSelect({ onClose }: onClosestate) {
    const { data, loading } = useFetchData(fetchUserBonusService);
    const { member, setMember } = useMemberStore();
    const [havePromotion, setHavePromotion] = useState<boolean>(member?.bonus_status ?? false);
    const router = useRouter();
    const { handlePatchBonus } = useBonus();
    const pathName = usePathname()

    console.log(data)

    const routingToPromotion = () => {
        if (!data?.status) {
            router.push("/promotion");
            onClose?.();
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <Select
                className="text-white"
                defaultSelectedKeys={member?.bonus_status ? ["promotion"] : ["nopromotion"]}
                label="โปรโมชั่น"
                labelPlacement="outside"
                isRequired
                name="promotion"
                disallowEmptySelection
                classNames={{
                    label: "!text-(--text-color)",
                }}
                onSelectionChange={(keys) => {
                    const value = Array.from(keys)[0];
                    if (value === "promotion") {
                        routingToPromotion();
                        setHavePromotion(true);
                        handlePatchBonus((d) => {
                            if (d) {
                                setMember({ bonus_status: d });
                            }
                        });
                    } else {
                        setHavePromotion(false);
                        handlePatchBonus((d) => {
                            if (!d) {
                                setMember({ bonus_status: d });
                            }
                        });
                    }
                }}
                errorMessage={({ validationDetails }) => {
                    if (validationDetails.valueMissing) {
                        return "โปรดเลือกโปรโมชั่น";
                    }
                }}
            >
                <SelectItem key="promotion" className="text-white">
                    รับโปรโมชัน
                </SelectItem>
                <SelectItem key="nopromotion" className="text-white">
                    ไม่รับโปรโมชัน
                </SelectItem>
            </Select>
            {havePromotion &&
                (loading ? (
                    <PromotionCardSkeleton />
                ) : data ? (
                    // <PromotionCard promotiondata={data} onClose={onClose} />
                    <></>
                ) : null)}
        </div>
    );
}

function PromotionCardSkeleton() {
    return (
        <Card>
            <CardBody className="flex flex-row gap-4">
                <Skeleton className="rounded-lg">
                    <div className="w-20 h-20"></div>
                </Skeleton>
                <div className="flex flex-col flex-grow gap-2">
                    <Skeleton className="rounded-lg">
                        <div className="h-8 w-3/4"></div>
                    </Skeleton>
                    <Skeleton className="rounded-lg">
                        <div className="h-4 w-full"></div>
                    </Skeleton>
                    <Skeleton className="rounded-lg">
                        <div className="h-4 w-5/6"></div>
                    </Skeleton>
                </div>
            </CardBody>
            <CardFooter className="flex justify-end">
                <Skeleton className="rounded-lg">
                    <div className="h-10 w-24"></div>
                </Skeleton>
            </CardFooter>
        </Card>
    );
}

function PromotionCard({ promotiondata, onClose }: any) {
    const router = useRouter();
    const { promotionDetail } = useModal();

    const openDetail = () => {
        promotionDetail.data.bonus_img = promotiondata?.bonus_img;
        promotionDetail.data.detail = promotiondata?.detail;
        promotionDetail.data.name = promotiondata?.name;
        promotionDetail.data.status = promotiondata?.status;
        if (promotionDetail.state.onOpen) {
            promotionDetail.state.onOpen();
        }
    };

    const detailHtml = useMemo(() => ({ __html: promotiondata?.detail }), [promotiondata?.detail]);

    return (
        <Card>
            <CardBody className="flex flex-row gap-4">
                <Image className="w-20 h-20 object-cover" src={promotiondata?.bonus_img} />
                <div className="flex flex-col flex-grow">
                    <div>
                        <span className="truncate text-2xl text-[var(--main-color)]">
                            {promotiondata?.name}
                        </span>
                    </div>
                    <div className="line-clamp-1" dangerouslySetInnerHTML={detailHtml}></div>
                </div>
            </CardBody>
            <CardFooter className="flex justify-end">
                <Button onPress={openDetail}>ดูเพิ่มเติม</Button>
            </CardFooter>
        </Card>
    );
}
