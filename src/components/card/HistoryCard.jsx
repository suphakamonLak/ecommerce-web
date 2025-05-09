import React, { useEffect, useState } from "react";
import { useStore } from "zustand";
import useEcomStore from "../../store/Ecom_store";
import { getOrders } from "../../api/User";

export default function HistoryCard() {
  const [orders, setOrders] = useState([]); //เก็บข้อมูลที่ fetch มาจาก backend
  const token = useEcomStore((state) => state.token);

  useEffect(() => {
    handleGetOrders(token);
  }, []);

  const handleGetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        // console.log(res);
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                  <p className="text-ml">Order date</p>
                  <p className="font-bold">{item.updatedAt}</p>
                </div>
                <div>{item.orderStatus}</div>
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
                            console.log('product', product)
                            return (
                                <tr key={index}>
                                    <td>{product.product.title}</td>
                                    <td>{product.product.price}</td>
                                    <td>{product.count}</td>
                                    <td>{product.count * product.product.price}</td>
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
                  <p>{item.cartTotal}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
