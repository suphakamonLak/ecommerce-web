import React from 'react'
import { Mail } from 'lucide-react'
import { CircleFadingPlus } from 'lucide-react'
import { MessageCircleMore } from 'lucide-react'

export default function Footer() {
    return (
        <div className='h-20 w-full bg-gray-100 shadow-lg rounded-md flex items-center justify-center'>
            <div className='w-2/5 flex justify-center gap-2'>
                <button className='border-2 border-gray-500 p-1 rounded-full'><Mail/></button>
                <button className='border-2 border-gray-500 p-1 rounded-full'><CircleFadingPlus /></button>
                <button className='border-2 border-gray-500 p-1 rounded-full'><MessageCircleMore /></button>
            </div>
            <div className='w-2/5 h-50 flex justify-center'>
                <img className='w-16 h-16 object-contain' src="../../../assets/images/Logo.png"/>
            </div>
            <div className='w-2/5 text-center'>
                <p className='font-bold'>Suphakamon L.</p>
            </div>
        </div>
    )
}

