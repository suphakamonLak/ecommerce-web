import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Layout from '../layouts/Layout'
import LayoutAdmin from '../layouts/LayoutAdmin'
import Dashboard from '../pages/admin/Dashboard'
import Category from '../pages/admin/Category'
import Product from '../pages/admin/Product'
import Manage from '../pages/admin/Manage'
import Home from '../pages/home'
import HomeUser from '../pages/user/HomeUser'
import LayoutUser from '../layouts/LayoutUser'
import ProtectRouteUser from '../routes/ProtectRoteUser'
import ProtectRoteAdmin from './ProtectRoteAdmin'
import EditProduct from '../pages/admin/EditProduct'
import Payment from '../pages/user/Payment'
import History from '../pages/user/History'
import ManageOrders from '../pages/admin/ManageOrders'

// display page for user (ยังไม่ล็อกอินหรือไม่มีบัญชี)
const router = createBrowserRouter([
  { 
    path: '/', 
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'shop', element: <Shop /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ] 
  },
  {
    path: '/admin',
    element: <ProtectRoteAdmin element={<LayoutAdmin/>} />,
    children: [
      { index: true, element: <Dashboard/> },
      { path: 'category', element: <Category/> },
      { path: 'product', element: <Product/> },
      { path: 'product/:id', element: <EditProduct/> },
      { path: 'manage', element: <Manage/> },
      { path: 'orders', element:  <ManageOrders/>},
    ]
  },
  {
    path: '/user',
    element: <ProtectRouteUser element={<LayoutUser/>} />,
    children: [
      { index: true, element: <HomeUser/> },
      { path: 'payment', element: <Payment/> },
      { path: 'history', element:  <History/>},
    ]
  },
])

export const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
