"use client";

import React, { useState } from "react";
import { GameCategories } from "@/components/specific/game/GameCategories";
import { SearchBar } from "@/components/specific/game/SearchBar";
import { GameTabs } from "@/components/specific/game/GameTabs";
import { OnStartAnimate } from "@/components/OnStartAnimate";
import { useProviderCategory } from "@/hooks/game";
import { FiInfo } from "react-icons/fi";
import { FaFire } from "react-icons/fa6";
import { Card, CardBody, Image } from "@heroui/react";
import { useRouter } from "next/navigation";

type Xxx =
    | "news"
    | "jackpots"
    | "populars"
    | "egames"
    | "livecasino"
    | "sport"
    | "poker";

function Client({ params }: { params: { category: string } }) {
    const [search, setSearch] = useState<string | null>(null);
    // const { data: providers } = useHotGames(search);
    const { Provider: providers } = useProviderCategory(params.category);

    const router = useRouter();

    const handlePress = (productId: string) => {
        router.push(`/category/${params.category}/${productId}`);
    };

    const toggleFavorite = (gameId: string) => {
        console.log("Toggle favorite for game:", gameId);
    };

    return (
        <OnStartAnimate>
            <div className="dark min-h-screen bg-[#070707]/50 backdrop-blur-md xl:mt-10">
                <div className="w-full mx-auto px-3 sm:px-4 md:px-6 py-5 rounded-2xl">
                    {/* header แบบไฟล์เดิม (optional) */}
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/25">
                        <div className="absolute -inset-10 bg-linear-to-r from-white/8 via-white/3 to-transparent blur-2xl" />
                        <div className="relative p-4 sm:p-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#0B0B0B] border border-white/10 flex items-center justify-center">
                                    <FaFire className="text-white/80" />
                                </div>

                                <div className="leading-tight">
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-xl sm:text-2xl font-semibold text-white">
                                            หมวดหมู่เกม
                                        </h1>
                                        <FiInfo className="text-white/50" />
                                    </div>
                                    <p className="text-xs sm:text-sm text-white/60">
                                        เลือกหมวด แล้วกดเข้าเล่นได้ทันที
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 h-px w-full bg-linear-to-r from-white/10 via-white/5 to-transparent" />
                        </div>
                    </div>

                    <div className="mt-4 grid gap-3 lg:gap-4 [grid-template-columns:88px_1fr] lg:[grid-template-columns:320px_1fr]">
                        <aside className="sticky top-16 lg:top-6 self-start h-[calc(100vh-4rem)] lg:h-fit">
                            <div className="rounded-2xl border border-white/10 bg-black/20 p-2 lg:p-4 h-full lg:h-auto overflow-y-auto lg:overflow-visible">
                                <div className="hidden lg:flex items-center justify-between mb-3">
                                    <div className="text-white font-semibold">
                                        หมวดหมู่
                                    </div>
                                    <span className="text-[11px] text-white/50">
                                        เลือกประเภทเกม
                                    </span>
                                </div>
                                <div className="hidden lg:block h-px w-full bg-white/10 mb-3" />

                                <div className="lg:hidden">
                                    <GameCategories
                                        activeByType={params.category}
                                        variant="mobileSidebar"
                                    />
                                </div>

                                <div className="hidden lg:block">
                                    <GameCategories
                                        activeByType={params.category}
                                    />
                                </div>
                            </div>
                        </aside>

                        <section className="min-w-0">
                            <div className="rounded-2xl border border-white/10 bg-black/20 p-3 sm:p-4">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <div className="text-xs text-white/50 mt-1">
                                            เลือกหมวด
                                            {/*เลือกหมวด แล้วค้นหา
                                            แล้วกดเข้าเล่นได้ทันที*/}
                                        </div>
                                    </div>

                                    <span className="shrink-0 px-3 py-1 rounded-full text-[11px] text-white/70 bg-black/30 border border-white/10">
                                        {params.category}
                                    </span>
                                </div>

                                <div className="mt-3 h-px w-full bg-linear-to-r from-white/10 via-white/5 to-transparent" />

                                <div className="mt-3">
                                    {/*<SearchBar
                                        searchTerm={search ? search : ""}
                                        onSearchChange={setSearch}
                                    />*/}
                                </div>

                                <div className="mt-4">
                                    {/*{JSON.stringify(providers)}*/}
                                    {/*<GameTabs
                                        selectedCategory={selectedCategory}
                                        onCategoryChange={setSelectedCategory}
                                        filteredGames={providers}
                                        onToggleFavorite={toggleFavorite}
                                    />*/}
                                    <div className="w-full p-6">
                                        {providers.length === 0 ? (
                                            <div className="flex items-center justify-center min-h-[300px]">
                                                <p className="text-xl text-gray-500">
                                                    ไม่มีค่ายเกม
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-4 gap-4">
                                                {providers.map((product: CategoryProvider) => (
                                                    <Card
                                                        key={product.product_id}
                                                        isPressable
                                                        onPress={() =>
                                                            handlePress(
                                                                product.product_id,
                                                            )
                                                        }
                                                        className="hover:scale-105 transition-transform"
                                                    >
                                                        <CardBody className="p-0">
                                                            <Image
                                                                src={
                                                                    product.img
                                                                }
                                                                alt={
                                                                    product.product_name
                                                                }
                                                                className="w-full object-cover"
                                                                radius="lg"
                                                            />
                                                            <div className="p-4">
                                                                <h3 className="text-lg font-semibold">
                                                                    {
                                                                        product.product_name
                                                                    }
                                                                </h3>
                                                                <p className="text-sm text-gray-500">
                                                                    Views:{" "}
                                                                    {
                                                                        product.view
                                                                    }
                                                                </p>
                                                            </div>
                                                        </CardBody>
                                                    </Card>
                                                ))}
                                            </div>
                                        )}
                                    </div>
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
