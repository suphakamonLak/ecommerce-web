import React, { useState, useEffect } from 'react'
import { createCategory, listCategory, removeCategory} from '../../api/Category'
import useEcomStore from '../../store/Ecom_store'
import { toast } from 'react-toastify'
import ToolBar from './ToolBar'

export default function FormCategory() {
    const [name, setName] = useState('')
    const token = useEcomStore((state) => state.token)
    const categories = useEcomStore((state) => state.categories)
    const getCategory = useEcomStore((state) => state.getCategory)

    useEffect(() => {
        getCategory(token)
    }, [])

    const handleRemove = async (id) => {
        try {
            const res = await removeCategory(token, id)
            toast.success(`Deleted ${res.data.name} success `)
            getCategory(token)
        } catch (err) {
            toast.error(err)
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!name) return toast.warning('Please fill data')

        try {
            const res = await createCategory(token, {name})
            // console.log(res)
            toast.success(`Add category ${res.data.name}  success`)
            getCategory(token)
        } catch (err) {
            toast.error(err)
        }
    }

    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <h1 className='text-2xl font-bold'>ประเภทสินค้า</h1>
            <form className='flex gap-2 my-4' onSubmit={handleSubmit}>
                <input 
                    onChange={(e) => setName(e.target.value)}
                    className='bg-gray-200 border p-2 rounded-md w-2/5 mt-1 mb-1 focus:outline-none focus:ring-2
                            focus:ring-blue-400 focus:border-transparent text-gray-500'
                    type="text" 
                    placeholder='--ประเภทสินค้า--'
                />
                <ToolBar title='บันทึก' />
            </form>

            <hr />
            <ul className='list-none'>
                {
                    categories.map((item, index) =>
                        <li className='flex justify-between py-2' key={index}>
                            {item.name}
                            <button 
                                onClick={() => handleRemove(item.id)}
                                className='bg-red-400 rounded-xl p-1'
                            >
                                Delete
                            </button>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}
