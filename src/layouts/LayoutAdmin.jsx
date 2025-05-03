import React from 'react'
import { Outlet } from 'react-router-dom'

export default function LayoutAdmin() {
  return (
    <>
        <h1>Sidebar</h1>
        <h1>Header</h1>
        <hr />
        <Outlet />
    </>
  )
}
