import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/Ecom_store'
import { toast } from 'react-toastify'
import { createProduct, removeProduct } from '../../api/Product'
import Uploadfile from './Uploadfile'
import { Link } from 'react-router-dom'
import { Pencil } from 'lucide-react'
import { Trash2 } from 'lucide-react'
import { numberFormat } from '../../utils/number'
import { dateFormat } from '../../utils/dateFormat'
import ToolBar from '../admin/ToolBar'

const initialState = {
    "title": "",
    "description": "",
    "price": 0,
    "quantity": 0,
    "categoryId": '',
    "images": []
}

export default function FormProduct() {
    const token = useEcomStore((state) => state.token)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)
    const getProduct = useEcomStore((state) => state.getProduct)
    const products = useEcomStore((state) => state.products)
    const [form, setForm] = useState({
        "title": "",
        "description": "",
        "price": 0,
        "quantity": 0,
        "categoryId": '',
        "images": []
    })

    useEffect(() => {
        getCategory()
        getProduct(100)
    }, [])

    
    const handleOnChange = (e) => {// เหลือ validate form
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await createProduct(token, form)
            setForm(initialState)
            getProduct()
            toast.success(`Add product ${res.data.title} successful`)
        } catch (err) {
            toast.error(err)
        }
    }

    const handleRemove = async (id) => {
        if(window.confirm('ต้องการลบสินค้าหรือไม่')) {
            try {
                const res = await removeProduct(token, id)
                toast.success('Deleted product success')
                getProduct()
            } catch (err) {
                toast.error(err)
            }
        }
    }

    return (
        <div className='container mx-auto p-4 bg-white shadow-lg rounded-lg'>
            <form onSubmit={handleSubmit}> 
                <h1 className='text-3xl font-bold my-5'>เพิ่มข้อมูลสินค้า</h1>
                <ToolBar title='เพิ่มสินค้า' />
                <div className='space-y-3 mt-5'>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label name='title' className='text-xl text-gray-900'><p>ชื่อสินค้า</p></label>
                            <input className='bg-gray-200 border p-2 rounded-md w-full mt-1 mb-1 focus:outline-none focus:ring-2
                            focus:ring-blue-400 focus:border-transparent text-gray-500'
                                value={form.title}
                                onChange={handleOnChange}
                                name='title'
                                placeholder='--ชื่อสินค้า--'
                                id='title'
                            />
                        </div>
                        <div>
                            <label name='price' className='text-xl text-gray-900'>ราคาสินค้า</label>
                            <input className='bg-gray-200 border-none p-2 rounded-md w-full mt-1 mb-1 focus:outline-none focus:ring-2
                            focus:ring-blue-400 focus:border-transparent text-gray-500'
                                value={form.price}
                                onChange={handleOnChange}
                                name='price'
                                placeholder='Price'
                                id='price'
                                type='number'
                                min={0}
                            />
                        </div>
                    </div>
                    <div>
                        <label name='description' className='text-xl text-gray-900'>รายละเอียดสินค้า</label>
                        <textarea className='bg-gray-200 border-none  p-2 rounded-md w-full mt-1 mb-1 focus:outline-none focus:ring-2
                        focus:ring-blue-400 focus:border-transparent text-gray-500'
                            value={form.description}
                            onChange={handleOnChange}
                            name='description'
                            placeholder='--รายละอียดสินค้า--'
                            id='description'
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                        <div>
                            <label name='quantity' className='text-xl text-gray-900'>จำนวนสินค้า</label>
                            <input className='bg-gray-200 border-none  p-2 rounded-md w-full mt-1 mb-1 focus:outline-none focus:ring-2
                        focus:ring-blue-400 focus:border-transparent text-gray-500'
                                value={form.quantity}
                                onChange={handleOnChange}
                                name='quantity'
                                placeholder='quantity'
                                id='quantity'
                                type='number'
                                min={0}
                            />
                        </div>
                        <div>
                            <label className='text-xl text-gray-900'>ประเภทสินค้า</label>
                            <select
                                className='bg-gray-200 border-none  p-2 rounded-md w-full mt-1 mb-1 focus:outline-none focus:ring-2
                        focus:ring-blue-400 focus:border-transparent text-gray-500'
                                name='categoryId'
                                onChange={handleOnChange}
                                value={form.categoryId}
                                required
                            >
                                <option value="" disabled>--ประเภทสินค้า--</option>
                                {
                                    categories.map((item, index) => 
                                        <option key={index} value={item.id}>{item.name}</option>
                                    )
                                }
                                
                            </select>
                        </div>
                    </div>
                    <div>
                        {/* upload file */}
                        <Uploadfile form={form} setForm={setForm} />
                    </div>
                </div>
            </form>
            <div className="relative overflow-x-auto rounded-lg border mt-5">
                <table className='w-full text-left rtl:text-right'>
                    <thead className='bg-cyan-800 text-white text-lg'>
                    <tr>
                        <th className='px-2 py-3'>ลำดับ</th>
                        <th className='px-2 py-3'>ชื่อสินค้า</th>
                        <th className='px-2 py-3'>รูปภาพ</th>
                        <th className='px-2 py-3'>รายละเอียดสินค้า</th>
                        <th className='px-2 py-3'>ราคาสินค้า</th>
                        <th className='px-2 py-3'>จำนวนสินค้า</th>
                        <th className='px-2 py-3'>ขายแล้ว</th>
                        <th className='px-2 py-3'>วันที่อัปเดต</th>
                        <th className='px-2 py-3'>จัดการ</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((item, index) => {
                                return (
                                    <tr key={index} className='border-b cursor-pointer transition'>
                                        <th className='px-2 py-3 text-center'>{index+1}</th>
                                        <td className='px-2 py-3'>{item.title}</td>
                                        <td className='p-2'>
                                            {
                                                item.images.length > 0
                                                ?   <img 
                                                        className='w-24 h-24 object-contain rounded-lg shadow-md'
                                                        src={item.images[0].url}
                                                    />
                                                :   <div
                                                        className='w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center'
                                                    >
                                                        No Image
                                                    </div>
                                            }
                                        </td>
                                        <td className='px-2 py-3'>{item.description}</td>
                                        <td className='px-2 py-3'>{numberFormat(item.price)}</td>
                                        <td className='px-2 py-3 text-center'>{item.quantity}</td>
                                        <td className='px-2 py-3 text-center'>{item.sold}</td>
                                        <td className='px-2 py-3 text-center'>{dateFormat(item.updatedAt)}</td>
                                        <td>
                                            <div className='flex gap-2 justify-center items-center m-2'>
                                                <div>
                                                    <p className='bg-yellow-200 p-2 rounded-md text-gray-800 hover:scale-105 hover:translate-x-1 hover:duration-200'><Link to={'/admin/product/' + item.id}><Pencil /></Link></p>
                                                </div>
                                                <div>
                                                    <p 
                                                        className='bg-red-500 p-2 rounded-md text-gray-800 hover:scale-105 hover:translate-x-1 hover:duration-200'
                                                        onClick={() => handleRemove(item.id)}
                                                    >
                                                        <Trash2 />
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                </div>
        </div>
    )
}

