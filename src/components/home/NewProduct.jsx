import React, { useEffect, useState } from 'react'
import { listProductBy } from '../../api/Product'
import ProductCard from '../card/ProductCard'
import SwiperShow from '../../utils/swiperShow'
import { SwiperSlide } from 'swiper/react'

export default function NewProduct() {
    const [products, setProducts] = useState([])
  
    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = () => {
        listProductBy("updatedAt", "desc", 12)
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
                    <SwiperSlide>
                        <ProductCard key={index} item={item}/>
                    </SwiperSlide>
                )
            }
        </SwiperShow>
    )
}

