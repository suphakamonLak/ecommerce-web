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
            slidesPerView: 2,
            spaceBetween: 120,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 80,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 50,
          },
        }}
    >
        { children }
    </Swiper>
  )
}

