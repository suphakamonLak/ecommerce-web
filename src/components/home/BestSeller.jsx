import React, { useEffect, useState } from 'react'
import { listProductBy } from '../../api/Product'
import ProductCard from '../card/ProductCard'
import { SwiperSlide } from 'swiper/react';
import SwiperShow from '../../utils/swiperShow';

export default function BestSeller({count}) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = () => {
        listProductBy("sold", "desc", count)
            .then((res) => {
                setProducts(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <SwiperShow>
            {
                products?.map((item, index) => 
                    <SwiperSlide key={index}>
                        <ProductCard item={item}/>
                    </SwiperSlide>
                )
            }
        </SwiperShow>
    )
}

