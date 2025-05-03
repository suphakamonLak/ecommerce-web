import React from 'react'
import { AppRoutes } from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify'
 
export default function App() {
  return (
    <>
      <ToastContainer/>
      <AppRoutes/>
    </>
  )
}
