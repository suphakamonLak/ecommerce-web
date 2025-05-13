import React from 'react'
import ContentCarousel from '../components/home/ContentCarousel'
import BestSeller from '../components/home/BestSeller'
import NewProduct from '../components/home/NewProduct'

export default function Home() {
  return (
    <div className='h-full font-mono'>
      <ContentCarousel/>
      <p className='text-2xl my-4 text-center font-bold'>สินค้าขายดี</p>
      <BestSeller/>
      <p className='text-2xl my-4 text-center font-bold'>สินค้ามาใหม่</p>
      <NewProduct/>
    </div>
  )
}
