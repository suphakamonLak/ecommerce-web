import React from 'react'
import { numberFormat } from '../../utils/number'
import { Box, Truck, Wallet } from 'lucide-react'

export default function DashboardCard({ totalOrders, totalRevenue, soldout }) {
  return (
    <div className='flex justify-between mx-2 gap-6'>
        <div className='w-full px-8 py-6 flex justify-between items-center border-2 border-gray-300 rounded-xl shadow-md shadow-sky-200'>
            <div className='text-lg'>
                <p className='text-sky-600'>คำสั่งซื้อทั้งหมด</p>
                <p className='font-medium'>{totalOrders}</p>
            </div>
            <div>
                <Truck size={40} className='text-gray-300' />
            </div>
        </div>
        <div className='w-full px-8 py-6 flex justify-between items-center border-2 border-gray-300 rounded-xl shadow-md shadow-pink-200'>
            <div className='text-lg'>
                <p className='text-pink-600'>ยอดขายทั้งหมด</p>
                <p className='font-medium'> {numberFormat(totalRevenue)} ฿</p>
            </div>
            <div>
                <Wallet size={40} className='text-gray-300' />
            </div>
        </div>
        <div className='w-full px-8 py-6 flex justify-between items-center border-2 border-gray-300 rounded-xl shadow-md shadow-purple-200'>
            <div className='text-lg'>
                <p className='text-purple-500'>สินค้าที่หมด stock</p>
                <p className='font-medium'>{soldout}</p>
            </div>
            <div>
                <Box size={40} className='text-gray-300'/>
            </div>
        </div>
    </div>
  )
}

