import React, { useState, useEffect } from 'react'
import { createCategory, listCategory, removeCategory} from '../../api/Category'
import useEcomStore from '../../store/Ecom_store'
import { toast } from 'react-toastify'
import { Save } from 'lucide-react'
import openModal from '../../utils/openModal'
import ConfirmModal from './ConfirmDelCategoryModal'

export default function FormCategory() {
    const [name, setName] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null)// เก็บข้อมูลที่เลือก
    const token = useEcomStore((state) => state.token)
    const categories = useEcomStore((state) => state.categories)
    const getCategory = useEcomStore((state) => state.getCategory)

    useEffect(() => {
        getCategory()
    }, [])

    const handleRemove = (category) => {
        setSelectedCategory(category)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!name) return toast.warning('กรุณากรอกประเภทสินค้า')

        try {
            const res = await createCategory(token, {name})
            toast.success(`เพิ่มประเภท ${res.data.name}  สำเร็จ`)
            setName('')
            getCategory()
        } catch (err) {
            toast.error(err)
        }
    }

    useEffect(() => {
        if (selectedCategory) {
            // หน่วงให้ modal mount ก่อน แล้วค่อยเปิด
            const timeout = setTimeout(() => {
                openModal({ modalId: 'confirm-category-modal' })
            }, 0)
            return () => clearTimeout(timeout)
        }
    }, [selectedCategory])

    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <h1 className='text-2xl font-bold text-gray-700'>ประเภทสินค้า</h1>
            <form className='flex items-center gap-2 my-4' onSubmit={handleSubmit}>
                <input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='bg-gray-200 border-none  p-2 rounded-md w-2/5 mt-1 mb-1 focus:outline-none focus:ring-2
                            focus:ring-blue-400 focus:border-transparent text-gray-500'
                    type="text" 
                    placeholder='--ประเภทสินค้า--'
                />
                <div>
                    <button
                        type='submit'
                        className='flex gap-2 items-center text-white bg-cyan-800 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-500 rounded-lg p-2 font-medium focus:outline-none'
                    >
                        <Save />
                        <p>บันทึก</p>
                    </button>
                </div>
            </form>
            <hr />
            <ul className='list-none'>
                {
                    categories.map((item, index) =>
                        <li className='flex justify-between py-2' key={index}>
                            {item.name}
                            <button 
                                onClick={() => handleRemove(item)}
                                className='bg-red-400 rounded-xl px-2 py-1'
                            >
                                Delete
                            </button>
                        </li>
                    )
                }
            </ul>
            {/* Modal ถูก mount ตลอดเวลา พร้อมรับ prop */}
            {
                selectedCategory && (
                    <ConfirmModal
                        categoryId={selectedCategory.id}
                        categoryName={selectedCategory.name}
                        onConfirmed={() => {
                            getCategory()
                            setSelectedCategory(null)// clear state after remove
                        }}
                    />
                )
            }
        </div>
    )
}
