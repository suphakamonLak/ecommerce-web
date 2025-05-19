import React from 'react'
import ContentCarousel from '../components/home/ContentCarousel'
import BestSeller from '../components/home/BestSeller'
import NewProduct from '../components/home/NewProduct'
import { ArrowRightLeft } from 'lucide-react'

export default function Home() {
  return (
    <div className='h-full space-y-6'>
      <ContentCarousel/>
      <div className='flex justify-between'>
        <p className='text-2xl text-gray-700'>สินค้าขายดี</p>
        <ArrowRightLeft/>
      </div>
      <BestSeller count={12}/>

      <div className='flex justify-between'>
        <p className='text-2xl text-gray-700'>สินค้ามาใหม่</p>
        <ArrowRightLeft/>
      </div>
      <NewProduct/>
    </div>
  )
}
