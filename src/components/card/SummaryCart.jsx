import React, { useEffect, useState } from 'react'
import { listUserCart, saveAddress } from '../../api/User'
import useEcomStore from '../../store/Ecom_store'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { numberFormat } from '../../utils/number'

export default function SummaryCart() {
    const token = useEcomStore((state) => state.token)
    const [products, setProducts] = useState([])
    const [cartTotal, setCartTotal] = useState(0)
    const [address, setAddress] = useState('')
    const [addressSaved, setAddressSaved] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        handleGetUserCart(token)
    }, [])

    const handleGetUserCart = (token) => {
        listUserCart(token)
        .then((res) => {
            setProducts(res.data.products)
            setCartTotal(res.data.cartTotal)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleSaveAddress = () => {
        if (!address) {
            return toast.warning('กรุณากรอกที่อยู่')
        }
        
        saveAddress(token, address)
        .then((res) => {
            toast.success('บันทึกที่อยู่เรียบร้อย')
            setAddressSaved(true)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleGotoPayment = () => {
        if (!addressSaved) {
            return toast.warning('กรุณากรอกที่อยู่')
        }
        navigate('/user/payment')
    }

    return (
        <div className='mx-auto'>
            <div className='flex gap-4'>
                {/* Lifte */}
                <div className='w-2/4'>
                    <div className='bg-gray-100 p-4 rounded-md border shadow-md space-y-2'>
                        <h1 className='text-lg'>ที่อยู่ในการจัดส่ง</h1>
                        <textarea 
                            onChange={(e) => setAddress(e.target.value)}
                            className='w-full px-2 border-none rounded-lg bg-white text-gray-500' 
                            placeholder='กรุณากรอกที่อยู่...'
                            required
                        />
                        <button
                            onClick={handleSaveAddress}
                            className='bg-sky-900 text-white px-4 py-2 rounded-md shadow-md hover:bg-sky-200 hover:text-black hover:scale-105 hover:translate-y-1 hover:duration-200'
                        >
                            บันทึกที่อยู่
                        </button>
                    </div>
                </div>

                {/* Right */}
                <div className='w-2/4'>
                    <div className='bg-gray-100 p-4 rounded-md border shadow-md space-y-4'>
                        <h1 className='text-lg'>คำสั่งซื้อของคุญ</h1>
                        {/* Item list */}
                        {
                            products?.map((item, index) => 
                                <div key={index}>
                                    <div className='flex justify-between items-end'>
                                        <div>
                                            <p>{item.product.title}</p>
                                            <p>จำนวน: {item.count} x {numberFormat(item.price)}</p>
                                        </div>
                                        <div>
                                            <p>{ numberFormat(item.price * item.count)} ฿</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {/* Discount */}
                        <div>
                            <div className='flex justify-between'> 
                                <p>ค่าจัดส่ง:</p>
                                <p>0.00 ฿</p>
                            </div>
                            <div className='flex justify-between'> 
                                <p>ส่วนลด:</p>
                                <p>0.00 ฿</p>
                            </div>
                        </div>

                        <div>
                            <div className='flex justify-between'>
                                <p className='font-bold text-md'>ยอดรวมสุทธิ:</p>
                                <p className='text-red-500 font-bold text-md'>{numberFormat(cartTotal)} ฿</p>
                            </div>
                            <button 
                                onClick={handleGotoPayment}
                                className='w-full bg-green-600 text-white rounded-md p-2 mt-2 shadow-md hover:bg-green-400 hover:text-black hover:'
                            >
                                ดำเนินการชำระเงิน
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
