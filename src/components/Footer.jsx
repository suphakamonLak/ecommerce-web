import { Mail } from 'lucide-react'
import { CircleFadingPlus } from 'lucide-react'
import { MessageCircleMore } from 'lucide-react'

export default function Footer() {
    return (
        <div className='h-20 w-full mt-8 bg-gray-100 shadow-lg rounded-md flex justify-between items-center text-black font-kanit'>
            <div className='w-2/5 flex gap-2 ml-4'>
                <button className='border-2 border-gray-500 p-1 rounded-full'><Mail/></button>
                <button className='border-2 border-gray-500 p-1 rounded-full'><CircleFadingPlus /></button>
                <button className='border-2 border-gray-500 p-1 rounded-full'><MessageCircleMore /></button>
            </div>
            <div className='w-2/5 text-base'>
                <p className='font-medium text-end mr-4'>Suphakamon L.</p>
            </div>
        </div>
    )
}

