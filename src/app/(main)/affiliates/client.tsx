"use client";

import React, { useState } from "react";
import { FiInfo } from "react-icons/fi";
import { AffiliateHeader } from "@/components/specific/affiliate/affiliateHeader";
import { AffiliateMainTabs } from "@/components/specific/affiliate/AffiliateMainTabs";
import styles from "@/styles/affiliate.module.css";
import { OnStartAnimate } from "@/components/OnStartAnimate";
import withAuth from "@/components/withAuth";
import { useShareStore } from "@/stores/share";
import { Image } from "@heroui/react";

//@ts-ignore
import "swiper/css";
//@ts-ignore
import "swiper/css/navigation";
//@ts-ignore
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

function Client() {
  const [selectedTab, setSelectedTab] = useState("summary");
  const [selectedMainTab, setSelectedMainTab] = useState("members");
  const { state } = useShareStore();

  return (
    <OnStartAnimate>
      <div className={`${styles.container} dark`}>
        <div className="w-full mx-auto px-3 sm:px-4 md:px-6 pb-10">
          <div className="relative mt-4">
            <div className="absolute -inset-3 rounded-2xl bg-linear-to-r from-red-900/35 via-red-600/10 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={1}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation
              >
                {state?.affiliateBanner?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full aspect-16/5 sm:aspect-16/4 md:aspect-16/4">
                      <Image
                        src={item}
                        alt={`affiliate-banner-${index}`}
                        removeWrapper
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-r from-black/55 via-black/20 to-transparent" />
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="absolute left-4 right-4 bottom-4">
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-black/40 border border-white/10 backdrop-blur">
                  <span className="text-sm sm:text-base font-semibold text-white">
                    แนะนำเพื่อน
                  </span>
                  <FiInfo className="text-white/70" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4">
            <div className="">
              <div className="rounded-2xl border border-white/10 bg-black/20 overflow-hidden">
                <div className="w-full px-4 py-3 bg-linear-to-r from-red-900/70 via-red-700/25 to-transparent">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/35 border border-white/10 backdrop-blur">
                    <span className="text-sm font-semibold text-white tracking-wide">
                      สรุป / ลิงก์ชวนเพื่อน
                    </span>
                    <FiInfo className="text-white/70" />
                  </div>
                </div>

                <div className="p-4">
                  <AffiliateHeader />
                </div>
              </div>
            </div>

            <div className="">
              <div className="rounded-2xl border border-white/10 bg-black/20 overflow-hidden">
                <div className="w-full px-4 py-3 bg-linear-to-r from-red-900/70 via-red-700/25 to-transparent">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/35 border border-white/10 backdrop-blur">
                    <span className="text-sm font-semibold text-white tracking-wide">
                      จัดการเครือข่าย / รายงาน
                    </span>
                    <FiInfo className="text-white/70" />
                  </div>
                </div>

                <div className="p-4">
                  <AffiliateMainTabs
                    selectedMainTab={selectedMainTab}
                    onMainTabChange={setSelectedMainTab}
                    selectedTab={selectedTab}
                    onTabChange={setSelectedTab}
                  />
                </div>
              </div>
            </div>
          </div>

          <h1 className="sr-only">{styles.pageTitle}</h1>
        </div>
      </div>
    </OnStartAnimate>
  );
}

export default withAuth(Client);
