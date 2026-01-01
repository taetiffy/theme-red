"use client";
import React from "react";
import { PromotionCard } from "@/components/specific/promotion/PromotionCard";
import { BonusAdmin } from "@/types/bonus";

interface PromotionContentProps {
    bonus: BonusAdmin[];
}

export function PromotionContent({ bonus }: PromotionContentProps) {
    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {bonus.map((items) => (
                <PromotionCard key={items.id} bonus={items} />
            ))}
        </div>
    );
}
