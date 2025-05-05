import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/Ecom_store'
import { toast } from 'react-toastify'
import { createProduct, readProduct, updateProduct } from '../../api/Product'
import Uploadfile from './Uploadfile'
import { useParams, useNavigate } from 'react-router-dom'

const initialState = {
    "title": "",
    "description": "",
    "price": 0,
    "quantity": 0,
    "categoryId": '',
    "images": []
}

export default function FormEditProduct() {
    const token = useEcomStore((state) => state.token)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)
    const [form, setForm] = useState(initialState)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getCategory(token)
        fetchProduct(token, id, form)
    }, [])

    const fetchProduct = async(token, id, form) => {
        try {
            const res = await readProduct(token, id, form)
            setForm(res.data)
        } catch (err) {
            toast.error(err)
        }
    }
    
    const handleOnChange = (e) => {// เหลือ validate form
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await updateProduct(token, id, form)
            toast.success(`Update product ${res.data.title} successful`)
            navigate('/admin/product')// Redirect
        } catch (err) {
            toast.error(err)
        }
    }

    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <form onSubmit={handleSubmit}> 
                <h1>แก้ไขข้อมูลสินค้า</h1>
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
                            แก้ไขสินค้า
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}