import { removeProduct } from '../../api/Product'
import { Link } from 'react-router-dom'
import { Pencil } from 'lucide-react'
import { Trash2 } from 'lucide-react'
import { numberFormat } from '../../utils/number'
import { dateFormat } from '../../utils/dateFormat'
import useEcomStore from '../../store/Ecom_store'
import { toast } from 'react-toastify'

export default function TableViewProducts({ products }) {
    const token = useEcomStore((state) => state.token)
    const getProduct = useEcomStore((state) => state.getProduct)

    const handleRemove = async (id) => {
        if(window.confirm('ต้องการลบสินค้าหรือไม่')) {
            try {
                const res = await removeProduct(token, id)
                toast.success('Deleted product success')
                getProduct()
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <div className="relative overflow-x-auto rounded-lg border mt-5">
            <table className='w-full text-left rtl:text-right'>
                <thead className='bg-cyan-800 text-white text-lg'>
                <tr>
                    <th className='px-2 py-3'>ลำดับ</th>
                    <th className='px-2 py-3'>ชื่อสินค้า</th>
                    <th className='px-2 py-3'>รูปภาพ</th>
                    <th className='px-2 py-3'>รายละเอียดสินค้า</th>
                    <th className='px-2 py-3'>ราคาสินค้า</th>
                    <th className='px-2 py-3'>จำนวนสินค้า</th>
                    <th className='px-2 py-3'>ขายแล้ว</th>
                    <th className='px-2 py-3'>วันที่อัปเดต</th>
                    <th className='px-2 py-3'>จัดการ</th>
                </tr>
                </thead>
                <tbody>
                    {
                        products.map((item, index) => {
                            return (
                                <tr key={index} className='border-b cursor-pointer transition'>
                                    <th className='px-2 py-3 text-center'>{index+1}</th>
                                    <td className='px-2 py-3'>{item.title}</td>
                                    <td className='p-2'>
                                        {
                                            item.images.length > 0
                                            ?   <img 
                                                    className='w-24 h-24 object-contain rounded-lg shadow-md'
                                                    src={item.images[0].url}
                                                />
                                            :   <div
                                                    className='w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center'
                                                >
                                                    No Image
                                                </div>
                                        }
                                    </td>
                                    <td className='px-2 py-3'>{item.description}</td>
                                    <td className='px-2 py-3'>{numberFormat(item.price)}</td>
                                    <td className='px-2 py-3 text-center'>{item.quantity}</td>
                                    <td className='px-2 py-3 text-center'>{item.sold}</td>
                                    <td className='px-2 py-3 text-center'>{dateFormat(item.updatedAt)}</td>
                                    <td>
                                        <div className='flex gap-2 justify-center items-center m-2'>
                                            <div>
                                                <p className='bg-yellow-200 p-2 rounded-md text-gray-800 hover:scale-105 hover:translate-x-1 hover:duration-200'><Link to={'/admin/product/' + item.id}><Pencil /></Link></p>
                                            </div>
                                            <div>
                                                <p 
                                                    className='bg-red-500 p-2 rounded-md text-gray-800 hover:scale-105 hover:translate-x-1 hover:duration-200'
                                                    onClick={() => handleRemove(item.id)}
                                                >
                                                    <Trash2 />
                                                </p>
                                            </div>
                                        </div>
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

