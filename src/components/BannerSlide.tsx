import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export const BannerSlide = () => (
    <>
      <Swiper
        spaceBetween={15}
        slidesPerView={1.5}
        grabCursor={true}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 30 },
          640: { slidesPerView: 1.5, spaceBetween: 30 },
          768: { slidesPerView: 1.5, spaceBetween: 30 },
          1024: { slidesPerView: 2.7, spaceBetween: 40 },
        }}
        loop={true}
      >
        <SwiperSlide>
          <img src="https://cdn.zabbet.com/KPFM/imageslides/1762876136409-d5a70f89-a0b9-4299-96bd-f565d74c6ebb.png" className='rounded-md' alt="banner-1" />
        </SwiperSlide>

        <SwiperSlide>
          <img src="https://cdn.zabbet.com/KPFM/imageslides/1762362212412-a0f4bf5c-07cf-4cc0-aa1f-d29da9ed9a29.jpg" className='rounded-md' alt="banner-2" />
        </SwiperSlide>

        <SwiperSlide>
          <img src="https://cdn.zabbet.com/KPFM/imageslides/1762876136409-d5a70f89-a0b9-4299-96bd-f565d74c6ebb.png" className='rounded-md' alt="banner-3" />
        </SwiperSlide>
         <SwiperSlide>
          <img src="https://cdn.zabbet.com/KPFM/imageslides/1762876136409-d5a70f89-a0b9-4299-96bd-f565d74c6ebb.png" className='rounded-md' alt="banner-1" />
        </SwiperSlide>
      </Swiper>
    </>
)