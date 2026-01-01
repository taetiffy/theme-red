"use client";
import React from "react";
import { MarqueeText } from "@/components/ui/MarqueeText";
import { RunningText } from "@/components/ui/RunningText";

export const RunningTextExamples = () => {
    return (
        <div className="space-y-8 p-6">
            <h2 className="text-2xl font-bold">Running Text Examples</h2>

            {/* Basic Example */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Basic Running Text</h3>
                <div className="bg-gray-100 p-4 rounded">
                    <RunningText
                        text="This is a simple running text example that scrolls from right to left"
                        className="text-blue-600"
                    />
                </div>
            </div>

            {/* Marquee with Emojis */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">News Ticker Style</h3>
                <div className="bg-red-600 text-white p-2 rounded">
                    <MarqueeText
                        text="🔥 Breaking News • 📈 Stock Market Update • 🌟 Special Promotion • 💰 Win Big Today"
                        speed="fast"
                        pauseOnHover={true}
                    />
                </div>
            </div>

            {/* Slow Moving Text */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Slow Moving Announcement</h3>
                <div className="bg-green-500 text-white p-3 rounded">
                    <MarqueeText
                        text="Welcome to our website! Enjoy special discounts and amazing offers."
                        speed="slow"
                        gradient={true}
                    />
                </div>
            </div>

            {/* Right Direction */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Right to Left Direction</h3>
                <div className="bg-purple-600 text-white p-3 rounded">
                    <MarqueeText
                        text="This text moves from left to right instead of the default direction"
                        direction="right"
                        speed="normal"
                    />
                </div>
            </div>

            {/* Multiple Messages */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Multiple Messages</h3>
                <div className="bg-orange-500 text-white p-3 rounded">
                    <MarqueeText
                        text={[
                            "Message 1: Welcome to our platform",
                            "Message 2: Check out our latest features",
                            "Message 3: Contact support for help"
                        ]}
                        speed="normal"
                        repeat={3}
                    />
                </div>
            </div>

            {/* Gaming Style */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Gaming Style Ticker</h3>
                <div className="bg-black text-yellow-400 p-3 rounded border-2 border-yellow-400">
                    <MarqueeText
                        text="🎮 Player123 won 1000 coins • 🏆 New high score achieved • 🎯 Daily mission completed • 💎 Rare item found"
                        speed="fast"
                        className="font-mono"
                    />
                </div>
            </div>

            {/* Custom Speed */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Custom Speed (5 seconds)</h3>
                <div className="bg-blue-500 text-white p-3 rounded">
                    <MarqueeText
                        text="This text completes one cycle in exactly 5 seconds"
                        speed={5}
                    />
                </div>
            </div>
        </div>
    );
};
