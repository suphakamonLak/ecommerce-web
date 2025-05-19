import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/Ecom_store'
import { changeUserRole, getListAllUsers } from '../../api/Admin'
import { dateFormat } from '../../utils/dateFormat'
import { changeUserStatus } from '../../api/Admin'
import { toast } from 'react-toastify'

export default function TableUsers() {
    const token = useEcomStore((state) => state.token)
    const [users, setUsers] = useState([])

    useEffect(() => {
        handleGetAllUsers(token)
    }, [])

    const handleGetAllUsers = (token) => {
        getListAllUsers(token)
        .then((res) => {
            setUsers(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const changeColorEnabledUser = (enable) => {
        if (enable) return 'bg-green-300'
        else return 'bg-red-300'
    }

    const handleChangeUserStatus = (userId, userStatus) => {
        const value = {
            id: userId,
            enabled: !userStatus
        }
        changeUserStatus(token, value)
            .then((res) => {
                toast.success('อัปเดตสถานะผู้ใช้สำเร็จ')
                handleGetAllUsers(token)// update status user
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChangeUserRole = (userId, userRole) => {
        console.log(userId, userRole)
        const value = {
            id: userId,
            role: userRole
        }
        changeUserRole(token, value)
            .then((res) => {
                console.log(res)
                toast.success('อัปเดตสิทธิ์ผู้ใช้สำเร็จ')
                handleGetAllUsers(token)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="relative overflow-x-auto pl-2">
            <h1 className='text-2xl text-gray-700 mt-4 mb-4'>Manage Users</h1>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-lg uppercase text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 rounded-s-lg">
                            ลำดับ
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            วันที่แก้ล่าสุด
                        </th>
                        <th scope="col" className="px-6 py-3">
                            สิทธิ์
                        </th>
                        <th scope="col" className="px-6 py-3">
                            สถานะ
                        </th>
                        <th scope="col" className="px-6 py-3 rounded-e-lg">
                            จัดการ
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((item, index) => {
                            return (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 text-gray-900">
                                    <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap dark:text-white">
                                        {index+1}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {dateFormat(item.updatedAt)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <select 
                                            className="select select-neutral bg-white border-none"
                                            onChange={(e) => handleChangeUserRole(item.id, e.target.value)}
                                            value={item.role}
                                        >
                                            <option disabled >เลือกสิทธิ์</option>
                                            <option>user</option>
                                            <option>admin</option>
                                        </select>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`${changeColorEnabledUser(item.enable)} px-2 py-1.5  rounded-full`}>{item.enable? 'Active' : 'Inactive'}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <label className="inline-flex items-center me-5 cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                className="sr-only peer" 
                                                checked={item.enable}
                                                onChange={() => handleChangeUserStatus(item.id, item.enable)}
                                            />
                                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600 dark:peer-checked:bg-teal-600"></div>
                                        </label>
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

