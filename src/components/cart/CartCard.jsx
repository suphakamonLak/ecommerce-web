import React from 'react'
import { Trash2 } from 'lucide-react'
import useEcomStore from '../../store/Ecom_store'

export default function CartCard() {
    const carts = useEcomStore((state) => state.carts)
    const actionUpdateQuantity = useEcomStore((state) => state.actionUpdateQuantity)
    const actionRemoveProduct = useEcomStore((state) => state.actionRemoveProduct)
    const actionGetTotalPrice = useEcomStore((state) => state.actionGetTotalPrice)
    console.log(carts)

    return (
        <div>
            <h1 className='text-2xl font-bold'>ตะกร้าสินค้า</h1>
            {/* Border */}
            <div className='border p-2'>
                {/* Card */}
                {
                    carts.map((item, index) => 
                        <div key={index} className='bg-white p-2 mb-2'>
                            {/* Row 1 */}
                            <div className='flex justify-between mb-2'>
                                {/* Left */}
                                <div className='flex gap-2 items-center'>
                                    {
                                        item.images && item.images[0].url
                                        ?  <img 
                                                className='w-16 h-16 object-cover'
                                                src={item.images[0].url}
                                            />
                                        : <div className='w-16 h-16 bg-gray-200 rounded-md flex text-center items-center'>No Image</div>
                                    }
                                    
                                    <p className='text-md font-bold'>{item.title}</p>
                                    <p className='text-sm'>{item.description}</p>
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
                            <div className='flex justify-between'>
                                {/* Left */}
                                <div className='border rounded-sm px-2 py-1'>
                                    <button 
                                        onClick={() => actionUpdateQuantity(item.id, item.count-1)}
                                        className='px-2 py-1 bg-gray-100 rounded-md hover:bg-red-400'
                                    >
                                        -
                                    </button>
                                    <span className='px-4 py-1'>{item.count}</span>
                                    <button    
                                        onClick={() => actionUpdateQuantity(item.id, item.count+1)}
                                        className='px-2 py-1 bg-gray-100 rounded-md hover:bg-gray-500'
                                    >
                                        +
                                    </button>
                                </div>
                                {/* Right */}
                                <div className='font-bold text-gray-800'>
                                    {item.price}
                                </div>
                            </div>
                        </div>
                    )
                }
                
                {/* Total */}
                <div className='flex justify-between px-2'>
                    <span>รวม</span>
                    <span>{actionGetTotalPrice()}</span>
                </div>

                {/* Button */}
                <button 
                    className='mt-4 bg-green-600 hover:bg-green-300 hover:text-black text-white w-full py-2 rounded-md shadow-md p-1'>ดำเนินการชำระเงิน</button>
            </div>
        </div>
    )
}
