import React from 'react'
import { Trash2, Plus, Minus } from 'lucide-react'
import useEcomStore from '../../store/Ecom_store'
import { Link } from 'react-router-dom'
import { numberFormat } from '../../utils/number'

export default function CartCard() {
    const carts = useEcomStore((state) => state.carts)
    const actionUpdateQuantity = useEcomStore((state) => state.actionUpdateQuantity)
    const actionRemoveProduct = useEcomStore((state) => state.actionRemoveProduct)
    const actionGetTotalPrice = useEcomStore((state) => state.actionGetTotalPrice)

    return (
        <div>
            {/* Border */}
            <div className='border p-2 rounded-md'>
                {/* Card */}
                {
                    carts.map((item, index) => 
                        <div key={index} className='bg-white p-2 mb-2'>
                            {/* Row 1 */}
                            <div className='flex justify-between mb-2'>
                                {/* Left */}
                                <div className='flex gap-2 items-center md:flex flex-col'>
                                    {
                                        item.images && item.images.length > 0
                                        ?  <img 
                                                className='w-16 h-16 object-contain rounded-md'
                                                src={item.images[0].url}
                                            />
                                        : <div className='w-16 h-16 bg-gray-200 rounded-md flex text-center items-center'>No Image</div>
                                    }
                                    <div>
                                        <p className='text-md'>{item.title}</p>
                                        <p className='text-sm'>{item.description}</p>
                                    </div>
                                </div>
                                {/* Right */}
                                <div
                                    onClick={() => actionRemoveProduct(item.id)} 
                                    className='flex items-center text-red-800'
                                >
                                    <Trash2 />
                                </div>
                            </div>
                            {/* Row 2 */}
                            <div className='flex justify-between items-center'>
                                {/* Left */}
                                <div className='border rounded-sm px-2 py-1 flex items-center'>
                                    <div
                                        onClick={() => actionUpdateQuantity(item.id, item.count-1)}    
                                    >
                                        <Minus size={14} />
                                    </div>
                                    <span className='px-4 py-1'>{item.count}</span>
                                    <div
                                        onClick={() => actionUpdateQuantity(item.id, item.count+1)}
                                    >
                                        <Plus size={14} />
                                    </div>
                                </div>
                                {/* Right */}
                                <div className='font-bold text-gray-800'>
                                    {numberFormat(item.price * item.count)}
                                </div>
                            </div>
                        </div>
                    )
                }
                
                {/* Total */}
                <div className='flex justify-between px-2'>
                    <span>รวม</span>
                    <span>{numberFormat(actionGetTotalPrice())}</span>
                </div>

                {/* Button */}
                <Link to={'/cart'}>
                    <button 
                        className='mt-4 bg-green-600 hover:bg-green-300 hover:text-black text-white w-full py-2 rounded-md shadow-md p-1'
                    >
                        ดำเนินการชำระเงิน
                    </button>
                </Link>
            </div>
        </div>
    )
}
