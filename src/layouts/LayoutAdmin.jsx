import { Outlet } from 'react-router-dom'
import SidebarAdmin from '../components/admin/SidebarAdmin'
import HeaderAdmin from '../components/admin/HeaderAdmin'

export default function LayoutAdmin() {
  return (
    <div className='bg-white text-black font-kanit'>
      <HeaderAdmin/>
      <div className='grid grid-cols-1 md:grid-cols-8 gap-3'>
        {/* Sizebar */}
        <div className='md:col-span-2'>
          <SidebarAdmin/>
        </div>

        {/* Detail */}
        <div className='md:col-span-6 p-3 rounded-xl drop-shadow border bg-white '> 
          <Outlet />
        </div>
      </div>
    </div>
  )
}
