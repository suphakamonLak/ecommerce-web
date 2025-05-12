import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import axios from 'axios';

export default function ContentCarousel() {
    const [images, setImages] = useState([])

    useEffect(() => {
        hdlGetImage()
    }, [])

    const hdlGetImage = async () => {
        axios.get('https://picsum.photos/v2/list?page=1&limit=15')
        .then((res) => {
            setImages(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

    return (
        <div>
            <Swiper
                pagination={{ dynamicBullets: true }}
                modules={[Pagination, Autoplay]}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                className="mySwiper h-60 object-cover rounded-md mb-3"
            >
                {
                    images?.map((item, index) => 
                        <SwiperSlide key={index}>
                            <img src={item.download_url}/>
                        </SwiperSlide>
                    )
                }
            </Swiper>

            <Swiper
                slidesPerView={5}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Autoplay, Navigation]}
                className="mySwiper"
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
            >
                {
                    images?.map((item, index) => 
                        <SwiperSlide key={index}>
                            <img src={item.download_url} className='object-cover rounded-sm'/>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </div>
    )
}

