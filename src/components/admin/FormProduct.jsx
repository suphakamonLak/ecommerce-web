import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/Ecom_store'
import { toast } from 'react-toastify'
import Uploadfile from './Uploadfile'
import ToolBar from '../admin/ToolBar'
import { createProduct, removeProduct } from '../../api/Product'
import TableViewProducts from './TableViewProducts'
import { numberFormat } from '../../utils/number'
import { dateFormat } from '../../utils/dateFormat'
import { Link } from 'react-router-dom'

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
    const [showTableProducts, setShowTableProducts] = useState(false)

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

    const addProduct = async () => {
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
        try {
            const res = await removeProduct(token, id)
            getProduct()
            toast.success('deleted success')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        // <div className='container mx-auto p-4 bg-white shadow-lg rounded-lg'>
        //     <div> 
        //         <h1 className='text-3xl font-bold my-5 text-gray-700'>เพิ่มข้อมูลสินค้า</h1>
        //         <ToolBar title='เพิ่มสินค้า' addProduct={addProduct} titleView='ดูสินค้า' onViewProduct={() => setShowTableProducts(true)} />
        //         <div className='space-y-3 mt-5'>
        //             <div className="grid grid-cols-2 gap-3">
        //                 <div>
        //                     <label name='title' className='text-xl text-gray-900'><p>ชื่อสินค้า</p></label>
        //                     <input className='bg-gray-200 border-none p-2 rounded-md w-full mt-1 mb-1 focus:outline-none focus:ring-2
        //                     focus:ring-blue-400 focus:border-transparent text-gray-500'
        //                         value={form.title}
        //                         onChange={handleOnChange}
        //                         name='title'
        //                         placeholder='--ชื่อสินค้า--'
        //                         id='title'
        //                     />
        //                 </div>
        //                 <div>
        //                     <label name='price' className='text-xl text-gray-900'>ราคาสินค้า</label>
        //                     <input className='bg-gray-200 border-none p-2 rounded-md w-full mt-1 mb-1 focus:outline-none focus:ring-2
        //                     focus:ring-blue-400 focus:border-transparent text-gray-500'
        //                         value={form.price}
        //                         onChange={handleOnChange}
        //                         name='price'
        //                         placeholder='Price'
        //                         id='price'
        //                         type='number'
        //                         min={0}
        //                     />
        //                 </div>
        //             </div>
        //             <div>
        //                 <label name='description' className='text-xl text-gray-900'>รายละเอียดสินค้า</label>
        //                 <textarea className='bg-gray-200 border-none  p-2 rounded-md w-full mt-1 mb-1 focus:outline-none focus:ring-2
        //                 focus:ring-blue-400 focus:border-transparent text-gray-500'
        //                     value={form.description}
        //                     onChange={handleOnChange}
        //                     name='description'
        //                     placeholder='--รายละอียดสินค้า--'
        //                     id='description'
        //                 />
        //             </div>
        //             <div className='grid grid-cols-2 gap-3'>
        //                 <div>
        //                     <label name='quantity' className='text-xl text-gray-900'>จำนวนสินค้า</label>
        //                     <input className='bg-gray-200 border-none  p-2 rounded-md w-full mt-1 mb-1 focus:outline-none focus:ring-2
        //                 focus:ring-blue-400 focus:border-transparent text-gray-500'
        //                         value={form.quantity}
        //                         onChange={handleOnChange}
        //                         name='quantity'
        //                         placeholder='quantity'
        //                         id='quantity'
        //                         type='number'
        //                         min={0}
        //                     />
        //                 </div>
        //                 <div>
        //                     <label className='text-xl text-gray-900'>ประเภทสินค้า</label>
        //                     <select
        //                         className='bg-gray-200 border-none  p-2 rounded-md w-full mt-1 mb-1 focus:outline-none focus:ring-2
        //                 focus:ring-blue-400 focus:border-transparent text-gray-500'
        //                         name='categoryId'
        //                         onChange={handleOnChange}
        //                         value={form.categoryId}
        //                     >
        //                         <option value="" disabled>--ประเภทสินค้า--</option>
        //                         {
        //                             categories.map((item, index) => 
        //                                 <option key={index} value={item.id}>{item.name}</option>
        //                             )
        //                         }
                                
        //                     </select>
        //                 </div>
        //             </div>
        //             <div>
        //                 {/* upload file */}
        //                 <Uploadfile form={form} setForm={setForm} />
        //             </div>
        //         </div>
                
        //         <div>
        //             <table className='border'>
        //                 <thead>
        //                     <tr>
        //                         <th>ลำดับ</th>
        //                         <th>ชื่อสินค้า</th>
        //                         <th>รูปภาพ</th>
        //                         <th>รายละเอียดสินค้า</th>
        //                         <th>ราคาสินค้า</th>
        //                         <th>จำนวนสินค้า</th>
        //                         <th>ขายแล้ว</th>
        //                         <th>วันที่อัปเดต</th>
        //                         <th>จัดการ</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     {
        //                         products?.map((item, index) => {
        //                             return (
        //                                 <tr key={index}>
        //                                     <td>{index+1}</td>
        //                                     <td>item.title</td>
        //                                     <td>
        //                                         {
        //                                             item.images.length > 0
        //                                             ? <img src={item.images[0].url} className='w-8 h-8 object-contain' />
        //                                             : <div>
        //                                                 No Image
        //                                             </div>
        //                                         }
        //                                     </td>
        //                                     <td>{item.description}</td>
        //                                     <td>{numberFormat(item.price)}</td>
        //                                     <td>{item.quantity}</td>
        //                                     <td>{item.sold}</td>
        //                                     <td>{dateFormat(item.updatedAt)}</td>
        //                                     <td>
        //                                         <div>
        //                                             <p><Link to={'/admin/product/' + item.id}>Edit</Link></p>
        //                                             <button
        //                                                 type='button'
        //                                                 onClick={() => handleRemove(item.id)}
        //                                             >
        //                                                 Delete
        //                                             </button>
        //                                         </div>
        //                                     </td>
        //                                 </tr>
        //                             )
        //                         })
        //                     }
        //                 </tbody>
        //             </table>
        //         </div>
        //     </div>
        // </div>
        <div className='container mx-auto p-4 bg-white shadow-lg rounded-lg'>
            {
                showTableProducts
                ?   <TableViewProducts products={products} />
                :   <div> 
                        <h1 className='text-3xl font-bold my-5 text-gray-700'>เพิ่มข้อมูลสินค้า</h1>
                        <ToolBar title='เพิ่มสินค้า' addProduct={addProduct} titleView='ดูสินค้า' onViewProduct={() => setShowTableProducts(true)} />
                        <div className='space-y-3 mt-5'>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label name='title' className='text-xl text-gray-900'><p>ชื่อสินค้า</p></label>
                                    <input className='bg-gray-200 border-none p-2 rounded-md w-full mt-1 mb-1 focus:outline-none focus:ring-2
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
                    </div>
            }
        </div>
    )
}

