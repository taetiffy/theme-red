import { useBonus } from "@/hooks/bonus";
import { fetchBonusDetails } from "@/services/bonus";
import { useMemberStore } from "@/stores/member";
import { Select, SelectItem } from "@heroui/react";
import { ChangeEvent, useEffect, useState } from "react";

export default function ModeSelection({ toggle }: { toggle: (result: { mode: "CREDIT" | "PROMOTION", data: { message: string, status: boolean, balanceWithdraw: number } }) => void }) {

    const [data, setData] = useState<"CREDIT" | "PROMOTION">("CREDIT");
    const { balance, member, setMember } = useMemberStore();
    const { handlePatchBonus } = useBonus();

    const handleSelectionChange = async (_: ChangeEvent<HTMLSelectElement>) => {
        const data = await handlePatchBonus();
        setMember({ bonus_status: data.bonus_status })
        if (data.bonus_status) {
            setData("PROMOTION");
            const data = await fetchBonusDetails(balance.bonus);
            if (data !== undefined) {
                toggle({
                    mode: "PROMOTION",
                    data: {
                        message: data.message,
                        status: data.status,
                        balanceWithdraw: data.balancewithdraw
                    }
                })
            }
        } else {
            setData("CREDIT");
            toggle({
                mode: "CREDIT",
                data: {
                    message: "",
                    status: false,
                    balanceWithdraw: 0
                }
            })
        }
    };

    // for init mode
    useEffect(() => {
        const fetcher = async () => {
            if (member && member.bonus_status) {
                setData("PROMOTION");
                const data = await fetchBonusDetails(balance.bonus);
                if (data !== undefined) {
                    toggle({
                        mode: "PROMOTION",
                        data: {
                            message: data.message,
                            status: data.status,
                            balanceWithdraw: data.balancewithdraw
                        }
                    })
                }
            } else {
                setData("CREDIT");
                toggle({
                    mode: "CREDIT",
                    data: {
                        message: "",
                        status: false,
                        balanceWithdraw: 0
                    }
                })
            }
        }
        fetcher();
    }, [member])

    return (
        <Select
            radius="md"
            size="lg"
            labelPlacement="outside"
            label="กระเป๋าที่จะถอน"
            variant="faded"
            selectedKeys={[data]}
            onChange={handleSelectionChange}
            classNames={{
                label: "!text-(--text-color)"
            }}
        >
            <SelectItem key="CREDIT" className="text-white">กระเป๋าเครดิต</SelectItem>
            <SelectItem key="PROMOTION" className="text-white">กระเป๋าโปรโมชั่น</SelectItem>
        </Select>
    );
}
