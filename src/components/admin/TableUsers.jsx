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
                console.log(res.data)
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
        console.log(userId, userStatus)
        const value = {
            id: userId,
            enabled: !userStatus
        }
        changeUserStatus(token, value)
            .then((res) => {
                console.log(res)
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
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <div>
                <table className='border w-full'>
                    <thead className='bg-gray-200'>
                        <tr className='border'>
                        <th className='border p-2'>ลำดับ</th>
                        <th className='border p-2'>Email</th>
                        <th className='border p-2'>วันที่แก้ไขล่าสุด</th>
                        <th className='border p-2'>สิทธิ์</th>
                        <th className='border p-2'>สถานะ</th>
                        <th className='border p-2'>จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((item, index) => {
                                return (
                                    <tr key={index} className='border'>
                                        <td className='text-center'>{index+1}</td>
                                        <td>{item.email}</td>
                                        <td className='text-center'>{dateFormat(item.updateedAt)}</td>
                                        <td className='text-center'>
                                            <select 
                                                onChange={(e) => handleChangeUserRole(item.id, e.target.value)}
                                                value={item.role}
                                            >
                                                <option>user</option>
                                                <option>admin</option>
                                            </select>
                                        </td>
                                        <td className='text-center p-2'>
                                            <span className={`${changeColorEnabledUser(item.enable)} p-1 rounded-full`}>{item.enable? 'Active' : 'Inactive'}</span>
                                        </td>
                                        <td className='text-center'>
                                            {/* toggle */}
                                            {/* <input
                                                type="checkbox"
                                                checked="checked"
                                                className="toggle border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
                                            /> */}
                                            <button
                                                onClick={() => handleChangeUserStatus(item.id, item.enable)}
                                                className='bg-gray-200 p-1 rounded-full'
                                            >
                                                {item.enable? 'Disable': 'Enable'}
                                            </button>
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

