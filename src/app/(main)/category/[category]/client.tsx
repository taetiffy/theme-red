"use client";

import React, { useMemo, useState } from "react";
import { GameCategories } from "@/components/specific/game/GameCategories";
import { OnStartAnimate } from "@/components/OnStartAnimate";
import { useProviderCategory } from "@/hooks/game";
import { Card, CardBody, Image } from "@heroui/react";
import { useRouter } from "next/navigation";

type CategoryProvider = {
  product_id: string;
  product_name: string;
  img: string;
  view: number;
};

export default function Client({ params }: { params: { category: string } }) {
  const [search, setSearch] = useState<string>("");
  const { Provider: providers } = useProviderCategory(params.category);
  const router = useRouter();

  const handlePress = (productId: string) => {
    router.push(`/category/${params.category}/${productId}`);
  };

  const filteredProviders = useMemo(() => {
    const list = (providers ?? []) as unknown as CategoryProvider[];
    const q = (search ?? "").trim().toLowerCase();
    if (!q) return list;
    return list.filter((p) => (p.product_name ?? "").toLowerCase().includes(q));
  }, [providers, search]);

  return (
    <OnStartAnimate>
      <div className="dark min-h-screen bg-[#070707]">
        {/* BG glow */}
        <div className="pointer-events-none fixed inset-0">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[380px] w-[900px] rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute top-[220px] right-[-120px] h-[420px] w-[420px] rounded-full bg-pink-500/10 blur-3xl" />
          <div className="absolute bottom-[-140px] left-[-140px] h-[520px] w-[520px] rounded-full bg-purple-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-[1400px] px-3 sm:px-4 md:px-6 py-5 xl:mt-10">
          {/* ✅ 2-column frame (desktop fixed height) */}
          <div className="mt-4 grid gap-3 lg:gap-4 [grid-template-columns:88px_1fr] lg:[grid-template-columns:270px_1fr] min-h-0">
            {/* ✅ LEFT: sticky & not moving (desktop) */}
            <aside className="hidden lg:block sticky">
              <div className="rounded-3xl border border-white/10 bg-black/25 backdrop-blur-xl p-4 h-full">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-white font-semibold">หมวดหมู่</div>
                  <span className="text-[11px] text-white/50">เลือกประเภทเกม</span>
                </div>
                <div className="h-px w-full bg-white/10 mb-3" />
                <GameCategories activeByType={params.category} variant="desktop" />
              </div>
            </aside>

            {/* ✅ LEFT: mobile sidebar (scroll inside itself) */}
            <aside className="lg:hidden sticky top-2 self-start h-[calc(100vh-4rem)]">
              <div className="rounded-3xl border border-white/10 bg-black/25 backdrop-blur-xl p-2 h-full overflow-y-auto">
                <GameCategories activeByType={params.category} variant="mobileSidebar" />
              </div>
            </aside>

            {/* ✅ RIGHT: only this side scrolls */}
            <section className="min-w-0 flex flex-col min-h-0 lg:h-[calc(100vh-2.5rem)]">
              <div className="rounded-3xl border border-white/10 bg-black/25 backdrop-blur-xl p-3 sm:p-4 flex flex-col min-h-0 h-full">
                {/* header (not scrolling) */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs text-white/55 mt-1">เลือกค่ายเกม</div>
                  </div>

                  <span className="shrink-0 px-3 py-1 rounded-full text-[11px] text-white/70 bg-black/30 border border-white/10">
                    ทั้งหมด: {filteredProviders.length}
                  </span>
                </div>

                <div className="mt-3 h-px w-full bg-linear-to-r from-white/12 via-white/6 to-transparent" />

                {/* scroll area (only right side) */}
                <div className="mt-4 flex-1 min-h-0 overflow-y-auto pr-1">
                  <div className="pb-2">
                    {filteredProviders.length === 0 ? (
                      <div className="flex items-center justify-center min-h-[320px] rounded-3xl border border-white/10 bg-black/20">
                        <div className="text-center">
                          <p className="text-lg sm:text-xl text-white/60">ไม่มีค่ายเกม</p>
                          <p className="text-xs text-white/35 mt-1">
                            ลองเปลี่ยนหมวด หรือค้นหาด้วยคำอื่น
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                        {filteredProviders.map((p) => (
                          <Card
                            key={p.product_id}
                            isPressable
                            onPress={() => handlePress(p.product_id)}
                            className="
                              group relative overflow-hidden rounded-3xl
                              bg-black/10 backdrop-blur-xl
                              transition-all duration-300 shadow-xl
                              hover:-translate-y-1 hover:scale-[1.02]
                              hover:shadow-red-500/20
                            "
                          >
                            <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 h-24 w-56 rounded-full bg-red-500/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                            <CardBody className="p-0">
                              <div className="relative w-full overflow-hidden h-[170px] sm:h-[260px] md:h-[300px] lg:h-[270px]">
                                <Image
                                  src={p.img}
                                  alt={p.product_name}
                                  radius="none"
                                  removeWrapper
                                  className="absolute inset-0 w-full h-full object-cover"
                                />

                                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-black/10 to-transparent" />
                                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                  <div className="absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-white/10 blur-xl" />
                                </div>
                              </div>

                              <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
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
