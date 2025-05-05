import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/Ecom_store'
import { toast } from 'react-toastify'
import { createProduct } from '../../api/Product'
import Uploadfile from './Uploadfile'

const initialState = {
    "title": "Core i 7",
    "description": "des",
    "price": 200,
    "quantity": 9,
    "categoryId": '',
    "images": []
}

export default function FormProduct() {
    const token = useEcomStore((state) => state.token)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)
    const getProduct = useEcomStore((state) => state.getProduct)
    const products = useEcomStore((state) => state.products)
    const [form, setForm] = useState(initialState)

    useEffect(() => {
        getCategory(token)
        getProduct(token, 7)
    }, [])

    
    const handleOnChange = (e) => {// เหลือ validate form
        console.log(e.target.name, e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await createProduct(token, form)
            toast.success(`Add product ${res.data.title} successful`)
        } catch (err) {
            toast.error(err)
        }
    }

    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <form onSubmit={handleSubmit}> 
                <h1>เพิ่มข้อมูลสินค้า</h1>
                <div className='flex flex-col gap-3'>
                    <div>
                        <label name='title'>ชื่อสินค้า: </label>
                        <input className='border mt-5 p-2 rounded-md'
                            value={form.title}
                            onChange={handleOnChange}
                            name='title'
                            placeholder='Title'
                            id='title'
                        />
                    </div>

                    <div>
                        <label name='description'>รายละเอียดสินค้า: </label>
                        <input className='border p-2 rounded-md'
                            value={form.description}
                            onChange={handleOnChange}
                            name='description'
                            placeholder='Desscription'
                            id='description'
                        />
                    </div>

                    <div>
                        <label name='price'>ราคาสินค้า: </label>
                        <input className='border p-2 rounded-md'
                            value={form.price}
                            onChange={handleOnChange}
                            name='price'
                            placeholder='Price'
                            id='price'
                            type='number'
                            min={0}
                        />
                    </div>

                    <div>
                        <label name='quantity'>จำนวนสินค้า: </label>
                        <input className='border p-2 rounded-md'
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
                        <select
                            className='border'
                            name='categoryId'
                            onChange={handleOnChange}
                            value={form.categoryId}
                            required
                        >
                            <option value="" disabled>ประเภทสินค้า</option>
                            {
                                categories.map((item, index) => 
                                    <option key={index} value={item.id}>{item.name}</option>
                                )
                            }
                            
                        </select>

                        <hr />
                        {/* upload file */}
                        <Uploadfile form={form} setForm={setForm} />

                        <button
                            className='bg-sky-300 p-1 rounded-xl ml-2'
                        >
                            เพิ่มสินค้า
                        </button>
                    </div>
                </div>
            </form>
            <div className="overflow-x-auto mt-5">
                <table className="table table-zebra">
                    <thead>
                    <tr className='border'>
                        <th>ลำดับ</th>
                        <th className='border text-center p-5'>ชื่อสินค้า</th>
                        <th className='border text-center p-5'>รายละเอียดสินค้า</th>
                        <th className='border text-center p-5'>ราคาสินค้า</th>
                        <th className='border text-center p-5'>จำนวนสินค้า</th>
                        <th className='border text-center p-5'>ขายแล้ว</th>
                        <th className='border text-center p-5'>วันที่อัปเดต</th>
                        <th className='border text-center p-5'>จัดการ</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((item, index) => {
                                return (
                                    <tr key={index} className='border'>
                                        <th className='text-center p-5'>{index+1}</th>
                                        <td className='text-center p-5'>{item.title}</td>
                                        <td className='text-center p-5'>{item.description}</td>
                                        <td className='text-center p-5'>{item.price}</td>
                                        <td className='text-center p-5'>{item.quantity}</td>
                                        <td className='text-center p-5'>{item.sold}</td>
                                        <td className='text-center p-5'>{item.updatedAt}</td>
                                        <td className='flex gap-2 justify-center m-2'>
                                            <button className='bg-yellow-200 p-2 rounded-md text-gray-800'>แก้ไข</button>
                                            <button className='bg-red-500 p-2 rounded-md text-gray-800'>ลบ</button>
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

