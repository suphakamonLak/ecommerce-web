import React from 'react'
import { LayoutList } from 'lucide-react'
import useEcomStore from '../../store/Ecom_store'
import { Link, useNavigate } from 'react-router-dom'
import { createUserCart } from '../../api/User'
import { toast } from 'react-toastify'

export default function ListCart() {
    const cart = useEcomStore((state) => state.carts)
    const actionGetTotalPrice = useEcomStore((state) => state.actionGetTotalPrice)
    const user = useEcomStore((state) => state.user)
    const token = useEcomStore((state) => state.token)
    const navigate = useNavigate()

    const handleSaveCart = async () => {
        await createUserCart(token, {cart})
        .then((res) => {
            toast.success('เพิ่มลงตะกร้าเรียบร้อย')
            navigate('/checkout')
        })
        .catch((err) => {
            console.log(err)
            toast.warn(err.response.data.message)
        })
    }

    return (
        <div className='bg-gray-100 rounded-md p-4'>
            {/* Header */}
            <div className='flex gap-4'>
                <LayoutList />
                <h1 className='text-xl font-bold'>รายการสินค้า {cart.length} รายการ</h1>
            </div>
            
            {/* List */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {/* Left */}
                <div className='col-span-2'>
                {
                    cart.map((item, index) => 
                        <div key={index} className='bg-white p-2 mb-2 mt-4 shadow-md'>
                            {/* Row 1 */}
                            <div className='flex justify-between items-center mb-2'>
                                {/* Left */}
                                <div className='flex gap-2 items-center'>
                                    {
                                        item.images && item.images.length > 0
                                        ?  <img 
                                                className='w-16 h-16 object-cover rounded-md'
                                                src={item.images[0].url}
                                            />
                                        : <div className='w-16 h-16 bg-gray-200 rounded-md flex text-center items-center'>No Image</div>
                                    }
                                    
                                    <div>
                                        <p className='text-md font-bold'>{item.title}</p>
                                        <p className='text-sm'>{item.price} x {item.count}</p>
                                    </div>
                                </div>
                                {/* Right */}
                                <div className='font-bold text-gray-800'>
                                    {item.price * item.count}
                                </div>
                            </div>
                        </div>
                    )
                }
                </div>
                {/* Right */}
                <div className='bg-white rounded-md shadow-md space-y-4 p-4 mt-4'>
                    <p className='text-xl font-bold'>ยอดรวม</p>
                    <div className='flex justify-between'>
                        <span>รวมสุทธิ</span>
                        <span className='text-xl font-bold text-gray-800'>{actionGetTotalPrice()} ฿</span>
                    </div>
                    <div className='flex flex-col gap-2'>
                        {
                            user
                            ?   <Link>
                                    <button 
                                        onClick={() => handleSaveCart()}
                                        className='bg-red-500 w-full rounded-md text-white py-2 shadow-md hover:bg-red-400 hover:text-black'
                                    >
                                        สั่งซื้อ
                                    </button>
                                </Link>
                            :   <Link to={'/login'}>
                                    <button className='bg-green-500 w-full rounded-md text-white py-2 shadow-md hover:bg-green-400 hover:text-black'>Login</button>
                                </Link>
                        }
                        <Link to={'/shop'}> 
                            <button className='bg-gray-600 w-full rounded-md text-white py-2 shadow-md hover:bg-gray-300 hover:text-black'>แก้ไรายการ</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

