import React, { useEffect } from 'react'
import ProductCard from '../components/cart/ProductCard'
import useEcomStore from '../store/Ecom_store'
import SearchCard from '../components/cart/SearchCard'
import CartCard from '../components/cart/CartCard'

export default function Shop() {
  const getProduct = useEcomStore((state) => state.getProduct)
  const products = useEcomStore((state) => state.products)

  useEffect(() => {
    getProduct(6)
  }, [])

  return (
    <div className='flex'>
        {/* Searchbar */}
        <div className='w-1/4 border h-screen p-4'>
          <SearchCard/>
        </div>

        {/* Products */}
        <div className='w-1/2 border p-4 h-screen overflow-y-auto'>
          <p className='text-2xl font-bold mb-4'>สินค้าทั้งหมด</p>
          <div className='flex gap-6 flex-wrap justify-center'>
            {/* Products cart */}
            {
              products.map((item, index) => 
                <ProductCard key={index} item={item}/>
              )
            }
          </div>
        </div>

        {/* Cart */}
        <div className='w-1/4 border p-4 h-screen overflow-y-auto'>
          <CartCard/>
        </div>
    </div>
  )
}
