import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useEcomStore from '../store/Ecom_store'
import { Cat, ChevronDown } from 'lucide-react'

export default function MainNev() {
    const carts = useEcomStore((state) => state.carts)
    const user = useEcomStore((state) => state.user)// using check 
    const logout = useEcomStore((state) => state.logout)// using clear state
    const [isOpen, setIsOpen] = useState(false)
    
    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    } 

    return (
        <nav className='bg-white text-black font-kanit'>
            <div className='mx-auto px-4'>
                <div className='flex justify-between h-16'>
                    <div className='flex items-center gap-6'>
                        <NavLink to={'/'} >
                            <div className='flex items-center'>
                                <h1 className='text-base text-gray-700 font-medium mr-1'>LucyShop</h1>
                                <Cat/>
                            </div>
                        </NavLink>
                        <NavLink 
                            className={({isActive}) =>
                                isActive? 'bg-gray-200 px-3 py-2 rounded-md font-medium': 'px-3 py-2 rounded-md font-medium'
                            }
                            to={'/'}
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            className={({isActive}) =>
                                isActive? 'bg-gray-200 px-3 py-2 rounded-md font-medium': 'px-3 py-2 rounded-md font-medium'
                            }
                            to={'/shop'}
                        >
                            Shop
                        </NavLink>
                        {/* badge (when use UI component) */}
                        <NavLink 
                            to={'/cart'} 
                            className={({isActive}) =>
                                isActive? 'bg-gray-200 px-3 py-2 rounded-md font-medium': 'px-3 py-2 rounded-md font-medium'
                            }
                        >
                            Cart
                            {
                                carts.length > 0 && <span className='absolute top-0 bg-gray-400 rounded-full px-2 mt-1'>{carts.length}</span>
                            }
                        </NavLink>
                    </div>
                {
                    user
                    ?   <div className='flex items-center gap-4'>
                            <button 
                                onClick={toggleDropdown}
                                className='flex gap-2 items-center'
                            >
                                <img 
                                    className='w-8'
                                    src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
                                />
                                <ChevronDown className='hover:bg-gray-300 w-5 h-5 rounded-sm' size={18} />
                            </button>

                            {
                                isOpen && 
                                <div
                                    className='absolute mt-2 top-12 bg-white shadow-md z-50'
                                >
                                    <Link className='block px-2 py-2 hover:bg-gray-100' to={'/user/history'}>History</Link>
                                    <button className='block px-2 py-2 hover:bg-gray-100' onClick={() => logout()}> Logout</button>
                                </div>
                            }
                            
                        </div>
                    :   <div className='flex items-center gap-4'>
                            <NavLink 
                                className={({isActive}) =>
                                    isActive? 'bg-gray-200 px-3 py-2 rounded-md text-sm font-medium': 'px-3 py-2 rounded-md text-sm font-medium'
                                }
                                to={'/register'}
                            >
                                Register
                            </NavLink>
                            <NavLink 
                                className={({isActive}) =>
                                    isActive? 'bg-gray-200 px-3 py-2 rounded-md text-sm font-medium': 'px-3 py-2 rounded-md text-sm font-medium'
                                }
                                to={'/login'}
                            >
                                Login
                            </NavLink>
                        </div>
                }
                </div>
            </div>
        </nav>
    )
}
