"use client";
import React from "react";

interface MarqueeTextProps {
    text: string | string[];
    speed?: "slow" | "normal" | "fast" | number;
    direction?: "left" | "right";
    className?: string;
    pauseOnHover?: boolean;
    gradient?: boolean;
    repeat?: number;
}

const Chip = ({ children, className = "", size = "sm" }: any) => (
    <span className={`inline-flex items-center px-3 py-1 rounded-full bg-blue-500 text-white text-${size} ${className}`}>
        {children}
    </span>
);

export const MarqueeText: React.FC<MarqueeTextProps> = ({
    text,
    speed = "normal",
    direction = "left",
    className = "",
    pauseOnHover = true,
    gradient = false,
    repeat = 2,
}) => {
    const getSpeed = () => {
        if (typeof speed === "number") return `${speed}s`;
        switch (speed) {
            case "slow": return "30s";
            case "fast": return "10s";
            default: return "20s";
        }
    };

    const textContent = Array.isArray(text) ? text.join(" • ") : text;
    const repeatedText = Array(repeat).fill(textContent).join(" • ");

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <style>{`
                @keyframes marquee-left {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes marquee-right {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0%); }
                }
            `}</style>

            {gradient && (
                <>
                    <div className="absolute left-0 top-0 z-10 h-full w-20 bg-linear-to-r from-white to-transparent pointer-events-none" />
                    <div className="absolute right-0 top-0 z-10 h-full w-20 bg-linear-to-l from-white to-transparent pointer-events-none" />
                </>
            )}

            <div
                className={`inline-flex whitespace-nowrap ${
                    pauseOnHover ? "hover:[animation-play-state:paused]" : ""
                }`}
                style={{
                    animation: `marquee-${direction} ${getSpeed()} linear infinite`,
                }}
            >
                <div className="flex items-center">
                    <Chip className="mr-2 Btn2 text-xs" size="sm">ประกาศ :</Chip>
                    <span className="text-sm mr-8 text-xs">{repeatedText}</span>
                </div>
                <div className="flex items-center">
                    <Chip className="mr-2  Btn2 text-xs" size="sm">ประกาศ :</Chip>
                    <span className="text-sm mr-8 text-xs">{repeatedText}</span>
                </div>
            </div>
        </div>
    );
};
