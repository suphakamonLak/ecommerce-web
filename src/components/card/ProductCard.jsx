import React from 'react'
import { ShoppingCart } from 'lucide-react'
import useEcomStore from '../../store/Ecom_store'
import { numberFormat } from '../../utils/number'
import { motion } from "motion/react"

export default function ProductCard({ item }) {
  const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className='border rounded-md p-5 shadow-md w-48 h-64 flex flex-col justify-between'>
        <div>
          {
            item.images && item.images.length
            ? <img 
              className='w-full h-24 object-contain rounded-md hover:scale-110 hover:duration-200'
              src={item.images[0].url} 
            />
            : <div className='w-full h-24 bg-gray-200 rounded-md text-center flex items-center justify-center shadow'>No Image</div>
          }
        </div>

        <div>
          <div>
            <p className='text-lg truncate'>{item.title}</p>
            <p className='text-sm text-gray-500 truncate'>{item.description}</p>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-sm font-bold'>{numberFormat(item.price)} ฿</span>
            <button 
              onClick={() => actionAddtoCart(item)}
              className='bg-pink-300 rounded-md p-1 hover:bg-pink-500 shadow-md'
              >
                <ShoppingCart />
            </button>
          </div>
        </div>
        
      </div>
    </motion.div>
  )
}

