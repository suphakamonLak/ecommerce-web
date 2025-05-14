import { NavLink, useNavigate } from 'react-router-dom'
import { Truck } from 'lucide-react'
import { Box, LayoutDashboard, LayoutList, SquareChartGantt, LogOut  } from 'lucide-react'
import useEcomStore from '../../store/Ecom_store'

export default function SidebarAdmin() {
    const logout = useEcomStore((state) => state.logout)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }
    return (
        <div className='bg-white border rounded-xl p-3 space-y-2'>
            <p className='font-semibold text-2xl mt-1'>Menu</p>
            <nav className='flex-1 px-4 py-4 space-y-2'>
                <NavLink 
                    to={'/admin'}
                    end
                    className={({ isActive }) => `hover:text-white
                        ${ isActive 
                        ? 'bg-gray-900 rounded-md px-4 py-2 text-white hover:bg-gray-700 flex items-center' 
                        : 'px-4 py-2 hover:bg-gray-700 hover:tetx-white rounded flex items-center'}`
                    }
                >
                    <LayoutDashboard className='mr-2'/>
                    <p>Dashboard</p>
                </NavLink>

                <NavLink 
                    to={'manage'}
                    className={({ isActive }) => `hover:text-white
                        ${ isActive 
                            ? 'bg-gray-900 rounded-md text-white px-4 py-2 hover:bg-gray-700 flex items-center' 
                            : 'px-4 py-2 hover:bg-gray-700 hover:tetx-white rounded flex items-center'}`
                    }
                >
                    <SquareChartGantt className='mr-2'/>
                    <p>Manage</p>
                </NavLink>

                <NavLink 
                    to={'category'}
                    className={({ isActive }) => `hover:text-white
                        ${ isActive 
                            ? 'bg-gray-900 rounded-md text-white px-4 py-2 hover:bg-gray-700 flex items-center' 
                            : 'px-4 py-2 hover:bg-gray-700 hover:tetx-white rounded flex items-center'}`
                    }
                >
                    <LayoutList className='mr-2'/>
                    <p>Category</p>
                </NavLink>

                <NavLink 
                    to={'product'}
                    className={({ isActive }) => ` hover:text-white
                        ${ isActive 
                        ? 'bg-gray-900 rounded-md text-white px-4 py-2 hover:bg-gray-700 flex items-center' 
                        : 'px-4 py-2 hover:bg-gray-700 hover:tetx-white rounded flex items-center'}`
                    }
                >
                    <Box className='mr-2'/>
                    <p>Product</p>
                </NavLink>

                <NavLink 
                    to={'orders'}
                    className={({ isActive }) => `hover:text-white
                        ${ isActive 
                            ? 'bg-gray-900 rounded-md text-white px-4 py-2 hover:bg-gray-700 flex items-center' 
                            : 'px-4 py-2 hover:bg-gray-700 hover:tetx-white rounded flex items-center'}`
                    }
                >
                    <Truck className='mr-2' />
                    <p>Orders</p>
                </NavLink>
            </nav>

            <div className='py-4 px-4'>
                <button
                    onClick={handleLogout}
                    className='flex gap-1 items-center px-4 py-2'
                >
                    <LogOut className='mr-2'/>
                    <p>Logout</p>
                </button>
            </div>
        </div>
    )
}
