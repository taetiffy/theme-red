"use client";

import React, { useState } from "react";
import { GameCategories } from "@/components/specific/game/GameCategories";
import { SearchBar } from "@/components/specific/game/SearchBar";
import { GameTabs } from "@/components/specific/game/GameTabs";
import { OnStartAnimate } from "@/components/OnStartAnimate";
import { useHotGames } from "@/hooks/game";
import { FiInfo } from "react-icons/fi";
import { FaFire } from "react-icons/fa6";

function Client() {
  const [search, setSearch] = useState<string | null>(null);
  const { data: providers } = useHotGames(search);

  const [selectedCategory, setSelectedCategory] = useState("เกมฮิต");

  const toggleFavorite = (gameId: string) => {
    console.log("Toggle favorite for game:", gameId);
  };

  return (
    <OnStartAnimate>
      <div className="dark min-h-screen bg-[#070707]/50 backdrop-blur-md xl:mt-10">
        <div className="w-full mx-auto px-3 sm:px-4 md:px-6 py-5 rounded-2xl">
          <div className="mt-4 grid gap-3 lg:gap-4 [grid-template-columns:88px_1fr] lg:[grid-template-columns:320px_1fr]">
            <aside className="sticky top-16 lg:top-6 self-start h-[calc(100vh-4rem)] lg:h-fit">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-2 lg:p-4 h-full lg:h-auto overflow-y-auto lg:overflow-visible">
                <div className="hidden lg:flex items-center justify-between mb-3">
                  <div className="text-white font-semibold">หมวดหมู่</div>
                  <span className="text-[11px] text-white/50">เลือกประเภทเกม</span>
                </div>
                <div className="hidden lg:block h-px w-full bg-white/10 mb-3" />

                <div className="lg:hidden">
                  <GameCategories activeByType="egames" variant="mobileSidebar" />
                </div>

                <div className="hidden lg:block">
                  <GameCategories activeByType="egames" />
                </div>
              </div>
            </aside>

            <section className="min-w-0">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-3 sm:p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs text-white/50 mt-1">
                      เลือกหมวด แล้วกดเข้าเล่นได้ทันที
                    </div>
                  </div>

                  <span className="shrink-0 px-3 py-1 rounded-full text-[11px] text-white/70 bg-black/30 border border-white/10">
                    {selectedCategory}
                  </span>
                </div>

                <div className="mt-3 h-px w-full bg-linear-to-r from-white/10 via-white/5 to-transparent" />

                <div className="mt-3">
                  <SearchBar
                    searchTerm={search ? search : ""}
                    onSearchChange={setSearch}
                  />
                </div>

                <div className="mt-4">
                  <GameTabs
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    filteredGames={providers}
                    onToggleFavorite={toggleFavorite}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </OnStartAnimate>
  );
}

export default Client;
