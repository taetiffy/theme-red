"use client";

import { Button, Avatar, Chip } from "@heroui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules";
import WithdrawalCard from "@/components/WithdrawalCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { gameCategories } from "@/variables/MockGameData";
import { OnStartAnimate } from "@/components/OnStartAnimate";
import styles from "@/styles/home.module.css";
import { useProviderPopuplar } from "@/hooks/game";
import { ProviderCard, CategoryProviderCard, TopProviderCard } from "@/components/ProviderCard";
import { useRouter } from "next/navigation";
import { MainPageSkeleton } from "@/components/ui/MainPageSkeleton";
import { useState, useEffect, useMemo, useRef } from "react";
import { LiveCasinoIcon } from "@/components/icon/LiveCasinoIcon";
import { useShareStore } from "@/stores/share";
import { SlotIcon } from "@/components/icon/SlotIcon";
import { SportIcon } from "@/components/icon/SportIcon";
import { useMemberStore } from "@/stores/member";
import { GameCategories } from "@/components/specific/game/GameCategories";
import { bankLists } from "@/variables/BankSelect";
import { GameCamp } from "@/variables/game_camp";
import { isLightColor } from "@/utils/lightColor"
import { MoneyBar } from "@/containers/MoneyBar";
import { MobileControl } from '@/components/specific/MobileControl'
import { TopRanking } from '@/components/specific/TopRanking'
import Image from 'next/image'
import { BannerSlide } from "@/components/BannerSlide";
import MarqueeAnnouncement from "@/components/MarqueeAnnouncement";
import LeaderBoard from "@/components/specific/LeaderBoard";
import MinigameBoard from "@/components/specific/MinigameBoard";
import { FaTrophy } from "react-icons/fa6";
import { HiInformationCircle } from "react-icons/hi2";
import { MarqueeText } from "@/components/ui/MarqueeText";

const getLabelFromCategory = (category: string): string => {
    switch (category.toUpperCase()) {
        case "EGAMES":
            return "สล็อต";
        case "LIVECASINO":
            return "คาสิโน";
        case "SPORT":
            return "กีฬา";
        case "POKER":
            return "ป้อกเด้ง";
        default:
            return "ไม่พอ";
    }
};

const tag = ["เว็บตรง", "สล็อต", "บาคาร่า", "บอล", "หวย", "ยิงปลา", "เว็บคาสิโนออนไลน์"];

const generateRandomWithdrawals = (count: number = 20) => {
    const games = [
        "Sa Gaming", "Sexy Baccarat", "Pragmatic Play", "PG Soft",
        "Joker Gaming", "Spadegaming", "Jili", "Lalika Portal",
        "Win Win Neko", "Ambbo", "CQ9", "Red Tiger",
        "Evolution Gaming", "Dream Gaming", "WM Casino"
    ];

    const getRandomGame = () => games[Math.floor(Math.random() * games.length)];
    const getRandomAmount = () => Math.floor(Math.random() * 9900) + 100;
    const getRandomId = () => `*****${Math.floor(Math.random() * 900) + 100}`;

    const getRandomTimestamp = () => {
        const now = new Date();
        const randomDays = Math.floor(Math.random() * 3);
        const randomHours = Math.floor(Math.random() * 24);
        const randomMinutes = Math.floor(Math.random() * 60);

        const date = new Date(now);
        date.setDate(date.getDate() - randomDays);
        date.setHours(randomHours);
        date.setMinutes(randomMinutes);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}-${month}-${year} ${hours}:${minutes} น.`;
    };

    return Array.from({ length: count }, () => ({
        id: getRandomId(),
        amount: getRandomAmount(),
        timestamp: getRandomTimestamp(),
        game: getRandomGame(),
        status: "Withdraw" as const
    }));
};

function Client() {
    const router = useRouter();
    const { popularCategory, popularProvider } = useProviderPopuplar();
    const [isLoading, setIsLoading] = useState(true);
    const { state } = useShareStore();
    const { isAuthenticated } = useMemberStore();
    const { state: { announcement } } = useShareStore()
    const [color1, setColor1] = useState('');

    // สร้างข้อมูลสุ่มเมื่อ component mount
    const randomWithdrawals = useMemo(() => generateRandomWithdrawals(20), []);

    useEffect(() => {
        const navbarColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--navbar-color')
            .trim();
        setColor1(navbarColor);
    }, []);

    useEffect(() => {
        if (popularCategory.length > 0 || popularProvider.length > 0) {
            setIsLoading(false);
        }
    }, [popularCategory, popularProvider]);

    if (isLoading) {
        return (
            <OnStartAnimate>
                <MainPageSkeleton />
            </OnStartAnimate>
        );
    }

return (
  <OnStartAnimate>
    <div className={styles.page}>
      <BannerSlide />

      <div className="xl:grid xl:grid-cols-12 my-5">

        <div className="xl:hidden grid grid-cols-[100px_1fr] xl:grid-cols-10 gap-3 px-0">

          <aside className="sticky top-16 h-[calc(100vh-4rem)] self-start">
            <div className="h-full rounded-2xl bg-black/20 backdrop-blur-md border border-white/5 p-2 overflow-y-auto">
              <GameCategories activeByType="egames" variant="mobileSidebar" />
            </div>
          </aside>

          <section className="min-w-0">

            <MarqueeText
              text={announcement}
              speed="normal"
              direction="left"
              className="text-sm px-4 w-full mb-4"
              pauseOnHover={true}
            />

            {/* {isAuthenticated && <MobileControl />} */}

            <div className="mt-0">
              <div className="w-full px-3 py-2 rounded-t-md bg-linear-to-r from-[#0D0C0C]/60 to-transparent">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-500/5">
                  <FaTrophy className="text-yellow-300 text-xl" />
                  <span className="text-sm font-semibold text-white">
                    ค่ายเกมยอดนิยม
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-black/20 backdrop-blur-md p-3 rounded-b-md mt-0 mb-5">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={10}
                slidesPerView={7.5}
                autoplay={{ delay: 3000 }}
                preventClicks
                preventClicksPropagation
                touchRatio={1.5}
                threshold={10}
                touchStartPreventDefault={false}
                onClick={(swiper, event) => {
                  if (swiper.touches.diff > 5) {
                    event.stopPropagation();
                    event.preventDefault();
                  }
                }}
                breakpoints={{
                  320: { slidesPerView: 2.8 },
                  640: { slidesPerView: 3.5 },
                  768: { slidesPerView: 4.5 },
                  1024: { slidesPerView: 8.3 },
                }}
                className={styles.topGamesSwiper}
              >
                {popularProvider.map((game) => (
                  <SwiperSlide key={game.id}>
                    <TopProviderCard
                      amount={popularProvider.length}
                      game={game}
                      isTop
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {popularCategory
              .filter((items) => items.products.length > 0)
              .map((items) => (
                <div key={items.categorie} className={styles.block}>
                  <div className="w-full px-3 py-2 rounded-t-md bg-linear-to-r from-[#0D0C0C]/60 to-transparent">
                    <div className="flex items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-500/5">
                        {items.categorie === "LIVECASINO" ? (
                          <LiveCasinoIcon />
                        ) : items.categorie === "EGAMES" ? (
                          <SlotIcon />
                        ) : (
                          <SportIcon />
                        )}
                        <span className="text-sm font-semibold text-white">
                          {getLabelFromCategory(items.categorie)}ยอดนิยม
                        </span>
                      </div>

                      <Button
                        size="sm"
                        className="Btn3 xl:text-sm text-xs"
                        onPress={() =>
                          router.push(`/category/${items.categorie}`)
                        }
                      >
                        {/* {getLabelFromCategory(items.categorie)}ทั้งหมด */}
                        ดูเพิ่มเติม
                      </Button>
                    </div>
                  </div>

                  <div className={styles.blockSwiper}>
                    <Swiper
                      modules={[Autoplay, FreeMode]}
                      spaceBetween={8}
                      slidesPerView={7.5}
                      loop
                      freeMode
                      autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                      }}
                      speed={5000}
                      breakpoints={{
                        320: { slidesPerView: 3.2 },
                        640: { slidesPerView: 3.2 },
                        768: { slidesPerView: 3.5 },
                        1024: { slidesPerView: 8.3 },
                      }}
                      className={styles.topGamesSwiper}
                    >
                      {items.products.map((game) => (
                        <SwiperSlide key={game.product_id}>
                          <CategoryProviderCard
                            category={items.categorie}
                            game={game}
                            amount={popularProvider.length}
                            topGame={popularProvider.map((h) => h.product_id)}
                            isTop
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              ))}

            <div className={styles.block}>
              <div className={styles.blockHeader}>
                <div className={styles.blockTitleWrap}>
                  <span className="text-lg">
                    <i className="fa-solid fa-receipt text-2xl" />
                  </span>
                  <h2 className={styles.blockTitle}>สลิปการถอน</h2>
                </div>
              </div>

              <div className={styles.withdrawalSwiper}>
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={8}
                  slidesPerView={1.5}
                  autoplay={{ delay: 3000 }}
                  breakpoints={{
                    640: { slidesPerView: 1.5 },
                    768: { slidesPerView: 2.5 },
                    1024: { slidesPerView: 2.8 },
                  }}
                >
                  {randomWithdrawals.map((withdrawal, index) => (
                    <SwiperSlide key={index}>
                      <WithdrawalCard withdrawal={withdrawal} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            <div className="mb-4 flex w-full hidden">
              <TopRanking
                data={popularCategory
                  .filter((d) => d.products.length > 0)
                  .map((d) => d.categorie)}
              />
            </div>

          </section>
        </div>

        <div className="hidden sm:block col-span-9">
                        <MarqueeText
                            text={announcement}
                            speed="normal"
                            direction="left"
                            className="text-sm px-4 w-full"
                            pauseOnHover={true}
                        />
                        {/* {isAuthenticated && (
                            <MobileControl />
                        )} */}
                        <div className="mt-0">
                            <div className="w-full px-3 py-2 rounded-t-md bg-linear-to-r from-red-900/50 to-transparent">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/30">
                                    <FaTrophy className="text-yellow-300 text-xl" />
                                    <span className="text-sm font-semibold text-white">ค่ายเกมยอดนิยม</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-black/20 backdrop-blur-md p-3 rounded-b-md mt-0 mb-5">
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={10}
                                slidesPerView={7.5}
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 3000 }}
                                preventClicks={true}
                                preventClicksPropagation={true}
                                touchRatio={1.5}
                                threshold={10}
                                touchStartPreventDefault={false}
                                touchMoveStopPropagation={true}
                                onClick={(swiper, event) => {
                                    if (swiper.touches.diff > 5) {
                                        event.stopPropagation();
                                        event.preventDefault();
                                    }
                                }}
                                breakpoints={{
                                    320: { slidesPerView: 3.5 },
                                    640: { slidesPerView: 3.5 },
                                    768: { slidesPerView: 4.5 },
                                    1024: { slidesPerView: 8.3 },
                                }}
                                className={styles.topGamesSwiper}
                            >
                                {popularProvider.map((game, index) => (
                                    <SwiperSlide key={game.id}>
                                        <TopProviderCard amount={popularProvider.length} game={game} isTop />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        {popularCategory
                            .filter((items) => items.products.length > 0)
                            .map((items) => (
                                <div key={items.categorie} className={styles.block}>
                                    <div className="w-full px-3 py-2 rounded-t-md bg-linear-to-r from-red-900/50 to-transparent">
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/30">
                                                {items.categorie === "LIVECASINO" ? <LiveCasinoIcon /> : items.categorie === "EGAMES" ? <SlotIcon /> : <SportIcon />}
                                                <span className="text-sm font-semibold text-white">
                                                    {getLabelFromCategory(items.categorie)}ยอดนิยม
                                                </span>
                                            </div>

                                            <Button
                                                size="sm"
                                                className="Btn1"
                                                onPress={() => router.push(`/category/${items.categorie}`)}
                                            >
                                                {getLabelFromCategory(items.categorie)}ทั้งหมด
                                            </Button>
                                        </div>
                                    </div>

                                    <div className={styles.blockSwiper}>
                                        <Swiper
                                            modules={[Autoplay, FreeMode]}
                                            spaceBetween={8}
                                            slidesPerView={7.5}
                                            loop={true}
                                            freeMode={true}
                                            allowTouchMove={true}
                                            autoplay={{
                                                delay: 0,
                                                disableOnInteraction: false,
                                                pauseOnMouseEnter: false,
                                            }}
                                            speed={5000}
                                            breakpoints={{
                                                320: { slidesPerView: 3.2 },
                                                640: { slidesPerView: 3.2 },
                                                768: { slidesPerView: 3.5 },
                                                1024: { slidesPerView: 8.3 },
                                            }}
                                            threshold={10}
                                            touchStartPreventDefault={false}
                                            touchMoveStopPropagation={true}
                                            onClick={(swiper, event) => {
                                                if (swiper.touches.diff > 5) {
                                                    event.stopPropagation();
                                                    event.preventDefault();
                                                }
                                            }}
                                            className={styles.topGamesSwiper}
                                        >
                                            {items.products.map((game) => (
                                                <SwiperSlide key={game.product_id}>
                                                    <CategoryProviderCard
                                                        category={items.categorie}
                                                        game={game}
                                                        amount={popularProvider.length}
                                                        topGame={popularProvider.map((h) => h.product_id)}
                                                        isTop
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                </div>

                            ))}

                        <div className={styles.block}>
                            <div className={styles.blockHeader}>
                                <div className={styles.blockTitleWrap}>
                                    <span className="text-lg">
                                        <i className="fa-solid fa-receipt text-2xl"></i>
                                    </span>

                                    <h2 className={styles.blockTitle}>สลิปการถอน</h2>
                                </div>
                            </div>

                            <div className={styles.withdrawalSwiper}>
                                <Swiper
                                    modules={[Autoplay]}
                                    spaceBetween={8}
                                    slidesPerView={1.5}
                                    autoplay={{ delay: 3000 }}
                                    preventClicks={true}
                                    preventClicksPropagation={true}
                                    touchRatio={1.5}
                                    threshold={5}
                                    breakpoints={{
                                        640: { slidesPerView: 1.5, spaceBetween: 20 },
                                        768: { slidesPerView: 2.5, spaceBetween: 24 },
                                        1024: { slidesPerView: 2.8, spaceBetween: 24 },
                                        1280: { slidesPerView: 3, spaceBetween: 28 },
                                    }}
                                    className={styles.withdrawalSwiperInstance}
                                >
                                    {randomWithdrawals.map((withdrawal, index) => (
                                        <SwiperSlide key={index}>
                                            <WithdrawalCard withdrawal={withdrawal} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                        <div className={'mb-4 flex w-full hidden '}>
                            <TopRanking data={popularCategory.filter(d => d.products.length > 0).map(d => d.categorie)} />
                        </div>
        </div>

        <div className="col-span-3 hidden sm:block pl-4">
          <div className="xl:sticky top-20 flex flex-col gap-4">
            <MinigameBoard />
            <TopRanking
              data={popularCategory
                .filter((d) => d.products.length > 0)
                .map((d) => d.categorie)}
            />
          </div>
        </div>

      </div>
    </div>
  </OnStartAnimate>
);

}

export default Client;
