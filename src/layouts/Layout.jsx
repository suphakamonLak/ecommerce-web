import React from 'react'
import { Outlet } from 'react-router-dom'
import MainNev from '../components/MainNev'

export default function Layout() {
  return (
    <>
        <MainNev/>

        <main className='h-full px-4 mt-2 mx-auto'>
          <Outlet /> 
        </main> 
    </>
  )
}
