import React from 'react'
import { Outlet } from 'react-router-dom'

export default function LayoutUser() {
  return (
    <>
        <h1>User</h1>
        <hr />
        <Outlet/>
    </>
  )
}
