"use client";

import React, { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useGamesProviders } from "@/hooks/game";
import { BasicObjectEncoder } from "@/utils/crypto";
import { useShareStore } from "@/stores/share";

import { GameCategories } from "@/components/specific/game/GameCategories";
import { SearchBar } from "@/components/Searchbar";

import { GamesGridSkeleton } from "@/components/ui/skeleton";
import { OnStartAnimate } from "@/components/OnStartAnimate";

const Client = ({ params = "egames", game }: { params?: string; game: string }) => {
  const router = useRouter();
  const { state } = useShareStore();

  const [debouncedGameName, setDebouncedGameName] = useState<string>("");

  // ✅ IMPORTANT: params เป็น string (เช่น "egames") และ game ต้องเป็น string (เช่น "slot" หรือ "casino")
  const { Provider = [], total, loading } = useGamesProviders(params, game);

  const filteredGames = useMemo(() => {
    if (!debouncedGameName.trim()) return Provider;
    const searchTerm = debouncedGameName.toLowerCase();
    return Provider.filter((item: any) => (item?.name ?? "").toLowerCase().includes(searchTerm));
  }, [Provider, debouncedGameName]);

  const handlerClick = useCallback(
    (to: string) => {
      router.push(to);
    },
    [router]
  );

  const handleSearch = useCallback((searchTerm: string) => {
    setDebouncedGameName(searchTerm);
  }, []);

  const showGameNames = state?.gameStat?.game_name;

  if (!game) {
    return (
      <OnStartAnimate>
        <div className="dark min-h-screen bg-[#070707]/50 backdrop-blur-md xl:mt-10">
          <div className="w-full mx-auto max-w-[1400px] px-3 sm:px-4 md:px-6 py-10">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-center">
              <div className="text-white text-lg">game ยังไม่ถูกส่งเข้ามา</div>
              <div className="text-white/60 text-sm mt-2">
                ตรวจว่าคุณส่ง prop <span className="text-white/80">game</span> มาหรือยัง
              </div>
            </div>
          </div>
        </div>
      </OnStartAnimate>
    );
  }

  if (loading) return <GamesGridSkeleton count={18} />;

  return (
    <OnStartAnimate>
      <div className="dark min-h-screen bg-[#070707]/50 backdrop-blur-md xl:mt-10">
        <div className="w-full mx-auto max-w-[1400px] px-3 sm:px-4 md:px-6 py-6">
          <div className="mt-4 grid gap-3 lg:gap-4 [grid-template-columns:88px_1fr] lg:[grid-template-columns:270px_1fr]">
            <aside className="sticky top-0 lg:top-6 self-start h-[calc(100vh-4rem)] lg:h-fit">
              <div className="rounded-3xl border border-white/10 bg-black/25 backdrop-blur-xl p-2 lg:p-4 h-full lg:h-auto overflow-y-auto lg:overflow-visible">
                <div className="hidden lg:flex items-center justify-between mb-3">
                  <div className="text-white font-semibold">หมวดหมู่</div>
                  <span className="text-[11px] text-white/50">เลือกประเภทเกม</span>
                </div>
                <div className="hidden lg:block h-px w-full bg-white/10 mb-3" />

                <div className="lg:hidden">
                  <GameCategories activeByType={params} variant="mobileSidebar" />
                </div>

                <div className="hidden lg:block">
                  <GameCategories activeByType={params} />
                </div>
              </div>
            </aside>

            <section className="min-w-0">
              <div className="rounded-3xl border border-white/10 bg-black/25 backdrop-blur-xl p-3 sm:p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs text-white/50 mt-1">
                      เลือกหมวด แล้วกดเข้าเล่น
                    </div>
                  </div>

                  <span className="shrink-0 px-3 py-1 rounded-full text-[11px] text-white/70 bg-black/30 border border-white/10">
                    {params}
                  </span>
                </div>

                <div className="mt-3 h-px w-full bg-linear-to-r from-white/10 via-white/5 to-transparent" />

                <div className="mt-3">
                  <SearchBar onSearch={handleSearch} placeholder="ค้นหาเกม..." />
                </div>

                <div className="mt-4">
                  {filteredGames.length === 0 ? (
                    <div className="text-center py-14 rounded-2xl border border-white/10 bg-[#0B0B0B]">
                      <div className="text-white text-lg">ไม่พบเกมที่คุณค้นหา</div>
                      {debouncedGameName && (
                        <div className="text-white/60 text-sm mt-2">ลองค้นหาด้วยคำอื่น</div>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 mt-5">
                      {filteredGames.map((items: any, index: number) => {
                        const encodedUrl = `/play/${BasicObjectEncoder.encodeBase64ForUrl({
                          productId: items.provider.product_id,
                          gameCode: items.code,
                          name: items.name,
                        })}`;

                        const imgSrc = items.img_new !== null ? items.img_new : items.img_old;

                        return (
                          <button
                            type="button"
                            key={items.id}
                            onClick={() => handlerClick(encodedUrl)}
                            className="group relative text-left rounded-2xl border border-white/10 bg-[#0B0B0B] overflow-hidden
                                       transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.99]
                                       focus:outline-none focus:ring-2 focus:ring-red-500/60"
                          >
                            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/6 via-transparent to-black/60" />
                            <div className="pointer-events-none absolute -inset-10 bg-linear-to-tr from-red-500/10 via-transparent to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative w-full aspect-3/4">
                              <Image
                                src={imgSrc}
                                alt={items.name}
                                fill
                                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 16vw"
                                className="object-cover"
                                priority={index < 12}
                              />

                              <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/90 to-transparent" />

                              <div className="absolute top-2 left-2 z-10 rounded-full bg-black/60 border border-white/10 px-2 py-1">
                                <span className="text-[10px] text-white/80">
                                  {items.provider?.product_id ?? ""}
                                </span>
                              </div>
                            </div>

                            {showGameNames && (
                              <div className="relative p-3">
                                <div className="text-[12px] sm:text-[13px] font-semibold text-white line-clamp-2 leading-snug">
                                  {items.name}
                                </div>
                                <div className="mt-1 text-[10px] text-white/60 flex items-center justify-between">
                                  <span className="truncate max-w-[70%]">{items.code ?? ""}</span>
                                  <span className="text-white/70 group-hover:text-white/90 transition">
                                    เล่นเลย
                                  </span>
                                </div>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </OnStartAnimate>
  );
};

export default Client;
