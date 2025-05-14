import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/Ecom_store";
import { getOrders } from "../../api/User";
import { dateFormat } from "../../utils/dateFormat";
import { numberFormat } from "../../utils/number";
import { Hourglass } from "lucide-react";

export default function HistoryCard() {
  const [orders, setOrders] = useState([]); //เก็บข้อมูลที่ fetch มาจาก backend
  const token = useEcomStore((state) => state.token);

  useEffect(() => {
    handleGetOrders(token);
  }, []);

  const handleGetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeColorStatusOrder = (status) => {
    switch(status) {
      case 'Not Process': return 'bg-gray-300'
      case 'Processing': return 'bg-blue-300'
      case 'Completed': return 'bg-green-300'
      case 'Cancelled': return 'bg-red-300'
    }
  }

  return (
    <div className="space-y-6 mt-4">
      <h1 className="text-2xl">ประวัติการสั่งซื้อสินค้า</h1>
      {/* คลุม Card */}
      <div className="space-y-6">
        {/* Card (Loop orders)*/}
        {orders?.map((item, index) => {
          return (
            <div className="bg-gray-100 p-4 rounded-md shadow-md" key={index}>
              {/* Header (Loop products) */}
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-lg">{dateFormat(item.updatedAt)}</p>
                </div>
                <div>
                  <span className={`${changeColorStatusOrder(item.orderStatus)} flex items-center px-2 py-1 rounded-full`}>
                    <Hourglass size={18} /> {item.orderStatus}
                  </span>
                </div>
              </div>
              {/* Table */}
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-lg text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">สินค้า</th>
                      <th scope="col" className="px-6 py-3">ราคา</th>
                      <th scope="col" className="px-6 py-3">จำนวน</th>
                      <th scope="col" className="px-6 py-3">รวม</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        item.products?.map((product, index) => {
                            return (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 text-gray-900 font-medium">
                                    <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap dark:text-white">{product.product.title}</th>
                                    <td className="px-6 py-4">{numberFormat(product.product.price)}</td>
                                    <td className="px-6 py-4">{product.count}</td>
                                    <td className="px-6 py-4">{numberFormat(product.count * product.product.price)}</td>
                                </tr>
                            )
                        })
                    }
                  </tbody>
                </table>
              </div>
              {/* Total */}
              <div>
                <div className="text-right mt-4">
                  <p>ราคาสุทธิ</p>
                  <p className="font-bold">{numberFormat(item.cartTotal)} ฿</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
