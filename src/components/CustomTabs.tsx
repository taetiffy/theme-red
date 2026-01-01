"use client"

import { useState } from "react";
import { Button } from "@heroui/react";
import { CustomTabsProps } from "@/types/CustomTabs";
export function CustomTabs({ 
    tabs, 
    defaultTab, 
    className = "",
    tabButtonClass = "",
    activeTabClass = "bg-yellow-500 text-black border-yellow-500",
    inactiveTabClass = "bg-transparent text-gray-400 border-gray-600"
}: CustomTabsProps) {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || "");

    const activeTabData = tabs.find(tab => tab.id === activeTab);

    return (
        <div className={className}>
            <div className="flex gap-0 mb-6 border-b border-gray-700">
                {tabs.map((tab) => (
                    <Button
                        key={tab.id}
                        onPress={() => setActiveTab(tab.id)}
                        className={`
                            px-6 py-3 border-b-2 transition-all duration-300 rounded-none
                            ${activeTab === tab.id ? activeTabClass : inactiveTabClass}
                            ${tabButtonClass}
                        `}
                        variant="light"
                    >
                        {tab.label}
                    </Button>
                ))}
            </div>

            <div className="tab-content">
                {activeTabData?.content}
            </div>
        </div>
    );
}