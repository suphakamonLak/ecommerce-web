import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/Ecom_store";
import { getOrders } from "../../api/User";
import { dateFormat } from "../../utils/dateFormat";
import { numberFormat } from "../../utils/number";

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
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">ประวัติการสั่งซื้อสินค้า</h1>
      {/* คลุม Card */}
      <div className="space-y-4">
        {/* Card (Loop orders)*/}
        {orders?.map((item, index) => {
          return (
            <div className="bg-gray-100 p-4 rounded-md shadow-md" key={index}>
              {/* Header (Loop products) */}
              <div className="flex justify-between mb-2">
                <div>
                  <p className="text-lg">วันที่สั่งสินค้า</p>
                  <p className="font-bold">{dateFormat(item.updatedAt)}</p>
                </div>
                <div>
                  <span className={`${changeColorStatusOrder(item.orderStatus)} p-1 rounded-full`}>{item.orderStatus}</span>
                </div>
              </div>
              {/* Table */}
              <div>
                <table className="border w-full">
                  <thead className="bg-gray-200 p-1">
                    <tr>
                      <th>สินค้า</th>
                      <th>ราคา</th>
                      <th>จำนวน</th>
                      <th>รวม</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        item.products?.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td >{product.product.title}</td>
                                    <td className="text-center">{numberFormat(product.product.price)}</td>
                                    <td className="text-center">{product.count}</td>
                                    <td className="text-center">{numberFormat(product.count * product.product.price)}</td>
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
