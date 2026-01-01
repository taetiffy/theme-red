"use client";
import React from "react";
import { Tabs, Tab } from "@heroui/react";
import { FiTrendingDown, FiUsers, FiGift } from "react-icons/fi";
import { AffiliateTabs } from "./affiliateTabs";
import AffiliateMembersContent from "./AffiliateMembersContent";
import AffiliateCreditsContent from "./AffiliateCreditsContent";
import styles from "@/styles/affiliate.module.css";
import { OnStartAnimate } from "@/components/OnStartAnimate";
interface AffiliateMainTabsProps {
    selectedMainTab: string;
    onMainTabChange: (tab: string) => void;
    selectedTab: string;
    onTabChange: (tab: string) => void;
}

export function AffiliateMainTabs({
    selectedMainTab, 
    onMainTabChange, 
    selectedTab, 
    onTabChange 
}: AffiliateMainTabsProps) {
    return (
        <div className={styles.tabsMainContainer}>
            <Tabs
                selectedKey={selectedMainTab}
                onSelectionChange={(key) => onMainTabChange(key as string)}
                className=" w-full md:w-md"
                classNames={{
                    tabList: styles.mainTabList,
                    cursor: styles.mainTabCursor,
                    tab: styles.mainTab,
                    tabContent: styles.tabContent
                }}
            >

                <Tab
                    key="members"
                    title={
                        <div className={styles.tabTitle}>
                            <FiUsers className="text-white"/>
                            <span>สมาชิกแนะนำ</span>
                        </div>
                    }
                >
                    <OnStartAnimate>
                        <AffiliateMembersContent />
                    </OnStartAnimate>
                    
                </Tab>
                {/* <Tab
                    key="loss"
                    title={
                        <div className={styles.tabTitle}>
                            <FiTrendingDown className="text-white" />
                            <span>ยอดเสีย</span>
                        </div>
                    }
                >
                    <OnStartAnimate>
                        <AffiliateTabs 
                            selectedTab={selectedTab}
                            onTabChange={onTabChange}
                        />
                    </OnStartAnimate>
                </Tab> */}
                {/* <Tab
                    key="credits"
                    title={
                        <div className={styles.tabTitle}>
                            <FiGift className="text-white" />
                            <span>รับเครดิต</span>
                        </div>
                    }
                >
                    <OnStartAnimate>
                        <AffiliateCreditsContent />
                    </OnStartAnimate>
                </Tab> */}
            </Tabs>
        </div>
    );
}