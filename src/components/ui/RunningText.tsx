"use client";
import React from "react";

interface RunningTextProps {
    text: string;
    speed?: number; // Duration in seconds for one complete cycle
    className?: string;
    direction?: "left" | "right";
    pauseOnHover?: boolean;
}

export const RunningText: React.FC<RunningTextProps> = ({
    text,
    speed = 20,
    className = "",
    direction = "left",
    pauseOnHover = true,
}) => {
    const animationDirection = direction === "left" ? "scroll-left" : "scroll-right";
    
    return (
        <div className={`overflow-hidden whitespace-nowrap ${className}`}>
            <div
                className={`inline-block animate-${animationDirection} ${
                    pauseOnHover ? "hover:pause" : ""
                }`}
                style={{
                    animationDuration: `${speed}s`,
                    animationTimingFunction: "linear",
                    animationIterationCount: "infinite",
                }}
            >
                {text}
            </div>
            <style jsx>{`
                @keyframes scroll-left {
                    0% {
                        transform: translateX(100%);
                    }
                    100% {
                        transform: translateX(-100%);
                    }
                }
                
                @keyframes scroll-right {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                
                .animate-scroll-left {
                    animation-name: scroll-left;
                }
                
                .animate-scroll-right {
                    animation-name: scroll-right;
                }
                
                .hover\\:pause:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
};