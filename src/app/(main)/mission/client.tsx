"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SideBarMission } from "@/components/specific/mission/sidebar";
import { ShowCard } from "@/components/specific/mission/showCard";
import { LoadingSkeleton } from "@/components/loading_ui/Missionloading";
import { useFetchData } from "@/hooks/useFetchData";
import { fetchMissionClaimService, fetchMissionService } from "@/services/mission";
import { Mission } from "@/types/mission";
import withAuth from "@/components/withAuth";
import { toast } from "sonner";

function Client() {
    const { data, loading, error, refresh } = useFetchData(fetchMissionService);

    const [missions, setMissions] = useState<Mission[]>([]);
    const [mission, setMission] = useState<Mission | null>(null);

    const handleMissionSelect = (mission: Mission) => {
        setMission(mission);
    };

    useEffect(() => {
        if (!data) return;

        setMissions(data);
        setMission(data[0]);
    }, [data]);

    const handleClaim = useCallback(
        async (mission_id: string) => {
            if (!mission) return;

            toast.promise(fetchMissionClaimService(mission_id), {
                loading: "กำลังดำเนินการ...",
                success: () => {
                    refresh();

                    return "ดำเนินการสำเร็จ";
                },
                error: "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งในภายหลัง",
            });
        },
        [mission],
    );

    if (loading) {
        return <LoadingSkeleton />;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <p className="text-red-500 mb-2">Failed to load missions</p>
                    <p className="text-gray-600 text-sm">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2 h-auto overflow-auto">
            <div className=" flex gap-4">
                <motion.div
                    initial={{ y: -40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className=" hidden md:flex flex-4"
                >
                    <ShowCard mission={mission} acceptQuest={handleClaim} />
                </motion.div>
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="flex-3 xl:flex-2"
                >
                    <SideBarMission
                        selectMission={handleMissionSelect}
                        missions={missions}
                        acceptQuest={handleClaim}
                    />
                </motion.div>
            </div>
        </div>
    );
}

export default withAuth(Client);
