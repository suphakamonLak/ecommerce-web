import React, { useState } from 'react'
import useEcomStore from '../../store/Ecom_store'
import { ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { div, p } from 'motion/react-client'

export default function HeaderAdmin() {
  const [isOpen, setIsOpen] = useState(false)
  const logout = useEcomStore((state) => state.logout)
  const user = useEcomStore((state) => state.user)
  const navigate = useNavigate()

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white text-black">
        <div className="mx-auto px-4">
          {
            user && 
            <div className='flex justify-between items-center h-16'>
              <div>
                <p className='text-xl'>Admin Panel</p>
              </div>
              <div className="items-center gap-4">
                <button
                  onClick={toggleDropdown}
                  className='flex gap-2 items-center'
                >
                  <img className='w-8' src="https://cdn-icons-png.flaticon.com/128/149/149071.png"/>
                  <ChevronDown className='hover:bg-gray-300 w-5 h-5 rounded-sm' size={18} />
                </button>
                {
                  isOpen &&
                  <div
                    className='absolute mt-2 top-12 bg-white shadow-md z-50'
                  >
                    <button 
                      className='block px-2 py-2 hover:bg-gray-100'
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                }
              </div>
            </div>
          }
        </div>
    </nav>
  )
}
