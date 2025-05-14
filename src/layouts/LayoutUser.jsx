import React from 'react'
import { Outlet } from 'react-router-dom'
import MainNev from '../components/MainNev'
import Footer from '../components/Footer'

export default function LayoutUser() {
  return (
    <div className='bg-white text-black font-kanit'>
        <MainNev/>
        <main className='h-full px-4 mt-2 mx-auto font-kanit'>
          <Outlet /> 
        </main> 
        <Footer/>
    </div>
  )
}
