"use client";
import React from "react";
import { Tabs, Tab } from "@heroui/react";
import { GameGrid } from "./GameGrid";
import styles from "@/styles/game.module.css";
import { GameProvider, top10Game } from "@/types/games";

interface Game {
    id: number;
    name: string;
    image: string;
    rating: number;
    isFavorite: boolean;
    isHot: boolean;
}

interface GameTabsProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    filteredGames: top10Game[];
    onToggleFavorite: (gameId: string) => void;
}

export function GameTabs({
    selectedCategory,
    onCategoryChange,
    filteredGames,
    onToggleFavorite,
}: GameTabsProps) {
    return (
        <div className={styles.gameTabsContainer}>
            <style jsx global>{`
                .game-tabs [data-selected="true"] {
                    color: #eab308 !important;
                }
                .game-tabs [data-selected="false"] {
                    color: #9ca3af !important;
                }
            `}</style>

            <GameGrid games={filteredGames} onToggleFavorite={onToggleFavorite} />
        </div>
    );
}
