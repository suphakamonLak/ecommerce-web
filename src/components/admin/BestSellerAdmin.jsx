import React, { useEffect, useState } from 'react'
import { listProductBy } from '../../api/Product'
import { numberFormat } from '../../utils/number'
import { Award, Sparkle, Sparkles } from 'lucide-react'

export default function BestSellerAdmin() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        loadProducts()    
    }, [])

    const loadProducts = () => {
        listProductBy("sold", "desc", 5)
        .then((res) => {
            console.log(res.data)
            setProducts(res.data)
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className='w-3/4 border-2 border-gray-200 rounded-xl shadow-md p-6'>
            <div className='flex items-center gap-2 ml-4 mb-2'>
                <h1 className='text-lg text-gray-700'>5 อันดับสินค้าขายดี</h1>
                <Sparkles size={20} className='text-yellow-600'/>
            </div>
            {
                products?.map((item, index) => 
                    <div key={index} className='flex justify-between border-b-2 py-2'>
                        <div className='flex ml-4 items-center gap-4'>
                            <div>
                                <p>{index+1}</p>
                            </div>
                            <div>
                                {
                                    item.images.length > 0 && item.images
                                    ?<img 
                                        src={item.images[0].url}
                                        className='w-20 h-20 object-contain border-2 rounded-md hover:scale-110 hover:duration-200'
                                    />
                                    : <div className='w-full h-24 bg-gray-200 rounded-md text-center flex items-center justify-center shadow'></div>
                                }
                            </div>
                            <div>
                                <p>{item.title}</p>
                            </div>
                        </div>
                        <div className='flex gap-6 items-center'>
                            <p>{numberFormat(item.price)} ฿</p>
                            <p>ขายได้ {item.sold} ชิ้น</p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

