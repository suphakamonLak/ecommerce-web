import React, { useEffect } from 'react'
import ProductCard from '../components/card/ProductCard'
import useEcomStore from '../store/Ecom_store'
import SearchCard from '../components/card/SearchCard'
import CartCard from '../components/card/CartCard'

export default function Shop() {
  const getProduct = useEcomStore((state) => state.getProduct)
  const products = useEcomStore((state) => state.products)

  useEffect(() => {
    getProduct(6)
  }, [])

  return (
    <div className='h-full grid grid-cols-6'>
        {/* Searchbar */}
        <div className='col-start-1 col-span-2 border h-screen p-4'>
          <SearchCard/>
        </div>

        {/* Products */}
          <div className='col-start-3 col-span-2 border p-4 h-screen overflow-y-auto'>
            <p className='text-2xl mb-4'>สินค้าทั้งหมด</p>
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
        <div className='col-end-7 col-span-2 border p-4 h-screen overflow-y-auto'>
          <h1 className='text-2xl mb-4'>ตะกร้าสินค้า</h1>
          <CartCard/>
        </div>
    </div>
  )
}
