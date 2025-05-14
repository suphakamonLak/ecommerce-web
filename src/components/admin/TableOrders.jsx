import React, { useEffect, useState } from 'react'
import { getOrdersAdmin, changeOrderAdmin } from '../../api/Admin'
import useEcomStore from '../../store/Ecom_store'
import { toast } from 'react-toastify'
import { numberFormat } from '../../utils/number'
import { dateFormat } from '../../utils/dateFormat'

export default function TableOrders() {
  const token = useEcomStore((state) => state.token)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    handleGetOrder(token)
  }, [])

  const handleGetOrder = (token) => {
    getOrdersAdmin(token)
      .then((res) => {
        setOrders(res.data.orders)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleChangeOrderStatus = (token, orderId, orderStatus) => {
    changeOrderAdmin(token, orderId, orderStatus)
        .then((res) => {
          toast.success('อัพเดตสถานะเรียบร้อย')
          handleGetOrder(token)
        })
        .catch((err) => {
          console.log(err)
        })
  }

  const changeColor = (status) => {
    switch(status) {
      case 'Not Process': return 'bg-gray-300'
      case 'Processing': return 'bg-blue-300'
      case 'Completed': return 'bg-green-300'
      case 'Cancelled': return 'bg-red-300'
    }
  }
  
  return (
    // <div className='container mx-auto p-4 bg-white shadow-md'>
    <div>
      <div className='relative overflow-x-auto rounded-lg border'>
        <table className='w-full text-left rtl:text-right'>
          <thead className='bg-cyan-800 text-white text-lg'>
            <tr>
              <th className='px-4 py-3'>ลำดับ</th>
              <th className='px-4 py-3'>ผู้ใช้งาน</th>
              <th className='px-4 py-3'>วันที่</th>
              <th className='px-4 py-3'>ที่อยู่</th>
              <th className='px-4 py-3'>สินค้า</th>
              <th className='px-4 py-3'>รวม</th>
              <th className='px-4 py-3'>สถานะ</th>
              <th className='px-4 py-3'>จัดการ</th>
              {/* <th>อัพเดตสถานะ</th> */}
            </tr>
          </thead>
          <tbody>
            {
              orders?.map((item, index) => {
                return (
                  <tr key={index} className='border-b cursor-pointer transition'>
                    <td className='px-6 py-3'>{index+1}</td>
                    <td>{item.orderedBy.email}</td>
                    <td className='px-6 py-3'>
                      {dateFormat(item.createdAt)}
                    </td>
                    <td>{item.orderedBy.address}</td>
                    <td> 
                        {
                          item.products?.map((product, index) => 
                            <div key={index}className='flex'>
                              <li className='mr-2'>{product.product.title}</li>
                              <span>{product.count} x {numberFormat(product.product.price)}</span>
                            </div>
                          )
                        }
                    </td>
                    <td className='font-bold text-center'>{numberFormat(item.cartTotal)}</td>
                    <td className='text-center p-2'>
                      <span 
                        className={`${changeColor(item.orderStatus)} p-1 rounded-full`}
                      >
                        {item.orderStatus}
                      </span>
                    </td>
                    <td className='px-6 py-3'>
                      <select
                      className='select select-neutral bg-white'
                        value={item.orderStatus}
                        onChange={(e) => handleChangeOrderStatus(token, item.id, e.target.value)}
                      >
                        <option>Not Process</option>
                        <option>Processing</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                      </select>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

