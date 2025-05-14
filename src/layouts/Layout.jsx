import React from 'react'
import { Outlet } from 'react-router-dom'
import MainNev from '../components/MainNev'
import Footer from '../components/Footer'

export default function Layout() {
  return (
    <div className='bg-white text-black font-kanit'>
        <MainNev/>

        <main className='h-full px-4 mt-2 mx-auto'>
          <Outlet /> 
        </main> 
        
        <Footer/>
    </div>
  )
}
