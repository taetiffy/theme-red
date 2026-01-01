"use client";

import { OnStartAnimate } from "@/components/OnStartAnimate";
import { ProfileCard } from "@/components/specific/profile/profileCard";
import { BankCard } from "@/components/specific/profile/bankCard";
import { Money } from "@/components/specific/profile/Money";
import { ProfileTable } from "@/containers/ProfileTable";
import withAuth from "@/components/withAuth";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function Client() {
    const searchParams = useSearchParams();

    useEffect(() => {
        if (window.location.hash) {
            const id = window.location.hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [searchParams]);

    return (
        <>
            <OnStartAnimate>
                <div className="text-2xl mb-2 text-(--text-color)">โปรไฟล์</div>
                <div className={`w-full flex flex-col gap-4`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        <div className="">
                            <ProfileCard />
                        </div>
                        <div className="">
                            <BankCard />
                        </div>
                    </div>
                    <Money />
                    <div className=" md:-translate-y-20" id="history">
                        <ProfileTable />
                    </div>
                </div>
            </OnStartAnimate>
        </>
    );
}

export default withAuth(Client);
