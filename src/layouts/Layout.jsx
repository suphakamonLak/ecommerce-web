import React from 'react'
import { Outlet } from 'react-router-dom'
import MainNev from '../components/MainNev'

export default function Layout() {
  return (
    <>
        <MainNev/>

        <main>
          <Outlet /> 
        </main> 
    </>
  )
}
