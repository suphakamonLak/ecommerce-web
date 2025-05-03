import React, { useState, useEffect } from 'react'
import { createCategory, listCategory, removeCategory} from '../../api/Category'
import useEcomStore from '../../store/Ecom_store'
import { toast } from 'react-toastify'

export default function FormCategory() {
    const [name, setName] = useState('')
    const [categorys, setCategorys] = useState([])
    const token = useEcomStore((state) => state.token)

    useEffect(() => {
        getcategory(token)
    }, [])

    const getcategory = async (token) => {
        try {
            const res = await listCategory(token)
            
            console.log(res)
            setCategorys(res.data)
            // console.log(res)
        } catch (err) {
            toast.error(err)
        }
    }

    const handleRemove = async (id) => {
        try {
            const res = await removeCategory(token, id)
            toast.success(`Deleted ${res.data.name} success `)
            getcategory(token)
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
            getcategory(token)
        } catch (err) {
            toast.error(err)
        }
    }

    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <h1>Category Management</h1>
            <form className='my-4' onSubmit={handleSubmit}>
                <input 
                    onChange={(e) => setName(e.target.value)}
                    className='border'
                    type="text" 
                />

                <button className='bg-sky-800 p-1 rounded-xl text-white mx-4'>Add category</button>
            </form>

            <hr />
            <ul className='list-none'>
                {
                    categorys.map((item, index) =>
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
