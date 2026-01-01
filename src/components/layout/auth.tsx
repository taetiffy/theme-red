import { fetchMeService } from "@/services/auth";
import { useMemberStore } from "@/stores/member";
import { getTokenFromCookie, removeTokenFromCookie } from "@/utils/cookieUtils";
import { useCallback, useEffect } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { setMember, setBalance, setRank, setInventory } = useMemberStore();

    const handleFetchMe = useCallback(async () => {
        try {
            const user = await fetchMeService();
            const { member } = user;

            if (!member) return;

            setMember({
                affiliateCode: user.member.affiliateCode,
                bonus_status: user.member.bonus_status,
                full_name: user.member.full_name,
                phone: user.member.phone,
                text_password: user.text_password,
                username: user.username
            });
            setBalance({
                credit: user.accountBalance,
                gem: user.accountGems,
                bonus: user.member.bonus_data ? user.member.bonus_data.accountBalance : 0,
                returnLost: user.returnLost,
                untoan_amount: user.member.bonus_data ? user.member.bonus_data.bonusadmin.untoan_amount : 0,
                returnCommission: user.returnCommission,
                comToDay: (user.returnCommissionSlot + user.returnCommissionCalculate),
                lossToDay: (user.returnLostCalculate + user.returnLostSlot)
            });
            setRank({
                level: Number(member.level),
                exp: Number(member.exp),
                progress: Number(member.exp_progress),
                total: member.exp_total,
            });
            setInventory([...user.inventories, ...Array(36 - user.inventories.length).fill(null)]);
        } catch {
            removeTokenFromCookie();
            setMember(null);
        }
    }, [setMember]);

    useEffect(() => {
        if (typeof window !== "undefined" && getTokenFromCookie() !== null) {
            handleFetchMe();
        }
    }, [handleFetchMe]);

    return children;
};
