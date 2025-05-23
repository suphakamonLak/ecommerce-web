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
    <div className="relative overflow-x-auto pl-2">
      <h1 className='text-2xl text-gray-700 mt-4 mb-4'>Orders</h1>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-lg text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-2 py-3 rounded-s-lg">ลำดับ</th>
            <th scope="col" className="px-2 py-3">ผู้ใช้งาน</th>
            <th scope="col" className="px-2 py-3">วันที่</th>
            <th scope="col" className="px-2 py-3">ที่อยู่</th>
            <th scope="col" className="px-2 py-3">สินค้า</th>
            <th scope="col" className="px-2 py-3">รวม</th>
            <th scope="col" className="px-2 py-3">สถานะ</th>
            <th scope="col" className="px-2 py-3 rounded-e-lg">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {
            orders?.map((item, index) => {
              return (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 text-gray-900">
                  <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">{index+1}</th>
                  <td>{item.orderedBy.email}</td>
                  <td>
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
                  <td>{numberFormat(item.cartTotal)}</td>
                  <td>
                    <span 
                      className={`${changeColor(item.orderStatus)} px-1 py-1 rounded-full truncate`}
                    >
                      {item.orderStatus}
                    </span>
                  </td>
                  <td>
                    <select
                    className='select select-neutral bg-white border-none'
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
  )
}

