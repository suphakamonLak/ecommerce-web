import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard } from 'lucide-react'
import { FolderKanban } from 'lucide-react'
import { ChartColumnStacked } from 'lucide-react'
import { ShoppingBasket } from 'lucide-react'
import { LogOut } from 'lucide-react'

export default function SidebarAdmin() {
  return (
    <div className='bg-sky-950 w-64 text-gray-100 flex flex-col h-screen'>
        <div className='h-24 bg-gray-900 flex items-center justify-center text-2xl font-bold'>
            Admin Panel
        </div>

        <nav className='flex-1 px-4 py-4 space-y-2 '>
            <NavLink 
                to={'/admin'}
                end
                className={({ isActive }) => 
                    isActive 
                        ? 'bg-gray-900 rounded-md text-white px-4 py-2 hover:bg-gray-700 flex items-center' 
                        : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:tetx-white rounded flex items-center'
                }
            >
                <LayoutDashboard className='mr-2'/>
                <p>Dashboard</p>
            </NavLink>

            <NavLink 
                to={'manage'}
                className={({ isActive }) => 
                    isActive 
                        ? 'bg-gray-900 rounded-md text-white px-4 py-2 hover:bg-gray-700 flex items-center' 
                        : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:tetx-white rounded flex items-center'
                }
            >
                <FolderKanban className='mr-2'/>
                <p>Manage</p>
            </NavLink>

            <NavLink 
                to={'category'}
                className={({ isActive }) => 
                    isActive 
                        ? 'bg-gray-900 rounded-md text-white px-4 py-2 hover:bg-gray-700 flex items-center' 
                        : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:tetx-white rounded flex items-center'
                }
            >
                <ChartColumnStacked className='mr-2'/>
                <p>Category</p>
            </NavLink>

            <NavLink 
                to={'product'}
                className={({ isActive }) => 
                    isActive 
                        ? 'bg-gray-900 rounded-md text-white px-4 py-2 hover:bg-gray-700 flex items-center' 
                        : 'text-gray-300 px-4 py- hover:bg-gray-700 hover:tetx-white rounded flex items-center'
                }
            >
                <ShoppingBasket className='mr-2'/>
                <p>Product</p>
            </NavLink>

            <NavLink 
                to={'orders'}
                className={({ isActive }) => 
                    isActive 
                        ? 'bg-gray-900 rounded-md text-white px-4 py-2 hover:bg-gray-700 flex items-center' 
                        : 'text-gray-300 px-4 py- hover:bg-gray-700 hover:tetx-white rounded flex items-center'
                }
            >
                <ShoppingBasket className='mr-2'/>
                <p>Orders</p>
            </NavLink>
        </nav>

        <div className='py-4 px-4'>
            <NavLink 
                
                className={({ isActive }) => 
                    isActive 
                        ? 'bg-gray-900 rounded-md text-white px-4 py-2 hover:bg-gray-700 flex items-center' 
                        : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:tetx-white rounded flex items-center'
                }
            >
                <LogOut className='mr-2'/>
                <p>Logout</p>
            </NavLink>
        </div>
    </div>
  )
}
