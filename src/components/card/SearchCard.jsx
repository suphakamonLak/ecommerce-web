import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/Ecom_store'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { numberFormat } from '../../utils/number'

export default function SearchCard() {
    const getProduct = useEcomStore((state) => state.getProduct)
    const products = useEcomStore((state) => state.products)
    const actionSearchFilters = useEcomStore((state) => state.actionSearchFilters)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)

    const [text, setText] = useState('')
    const [categorySelected, setCategorySelected] = useState([])
    const [price, setPrice] = useState([1000, 5000])
    const [ok, setOk] = useState(false)
    
    useEffect(() => {
        getCategory()
    }, [])

    // Step 1 Search text
    useEffect(() => {
        const delay = setTimeout(() => {
            if (text) {
                actionSearchFilters({query: text})
            } else {
                getProduct()
            }
        }, 300)

        return () => clearTimeout(delay)
    }, [text])// ถ้า text มีการเปลี่ยนแปลง useEffect จะทำงาน

    // Step 2 Search by category
    const handleCheck = (e) => {
        const inCheck = e.target.value// ค่าที่เราเลือกใน checkbox
        const inState = [...categorySelected]// []
        const findCheck = inState.indexOf(inCheck)// ค้นหา index ใน inCheck หรือ checkbox ที่เราเลือก

        if(findCheck === -1) {// กรณีไม่เจอ index
            inState.push(inCheck)
        } else {
            inState.splice(findCheck, 1)// ค่าที่จะลบ, จำนวนที่ต้องการลบ
        }
        setCategorySelected(inState)

        if (inState.length > 0) {
            actionSearchFilters({ category: inState })// send to Backend
        } else {
            getProduct()
        }
    }

    // Step 3 Search by price
    useEffect(() => {
        actionSearchFilters({ price })
    }, [ok])
    const handlePrice = (value) => {
        setPrice(value)
        setTimeout(() => {
            setOk(!ok)
        }, 300)
    }

    return (
        <div className='space-y-2'>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input 
                    onChange={(e) => setText(e.target.value)}
                    type="search" 
                    id="default-search" 
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Search Product..."
                />
            </div>
            
            <div className='overflow-auto'>
                <h1 className='text-md my-2'>หมวดหมู่สินค้า</h1>
                <div>
                    {
                        categories.map((item, index) => 
                            <div key={index} className='flex gap-2'>
                                <input
                                    type='checkbox'
                                    value={item.id}
                                    onChange={handleCheck}
                                />
                                <label>{item.name}</label>
                            </div>
                        )
                    }
                </div>
            </div>
            <hr />

            <div className='mt-2'>
                <h1 className='text-md my-2'>ค้นหาราคา</h1>
                <div>
                    <div className='flex justify-between'>
                        <span>ต่ำสุด: {numberFormat(price[0])}</span>
                        <span>สูงสุด: {numberFormat(price[1])}</span>
                    </div>
                    <Slider 
                        onChange={handlePrice}
                        range
                        min={0}
                        max={60000}
                        defaultValue={[1000, 5000]}
                    />
                </div>
            </div>
           
        </div>
    )
}
