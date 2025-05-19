import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

export default function SwiperShow({ children }) {
  return (
    <Swiper
        slidesPerView={5}
        spaceBetween={20}
        // pagination={{
        //     clickable: true,

        // }}
        navigation={true}
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper"
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 3,
            spaceBetween: 100
          },
          420: {
            slidesPerView: 3,
            spaceBetween: 100
          },
          500: {
            slidesPerView: 3,
            spaceBetween: 80
          },
          600: {
            slidesPerView: 4,
            spaceBetween: 160,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 80,
          },
          900: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 5,
          },
        }}
    >
        { children }
    </Swiper>
  )
}

