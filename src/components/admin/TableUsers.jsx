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
        <div className='relative overflow-x-auto rounded-lg border'>
            <table className='w-full text-left rtl:text-right'>
                <thead className='bg-cyan-800 text-white text-lg'>
                    <tr>
                        <th className='px-6 py-3'>ลำดับ</th>
                        <th className='px-6 py-3'>Email</th>
                        <th className='px-6 py-3'>วันที่แก้ไขล่าสุด</th>
                        <th className='px-6 py-3'>สิทธิ์</th>
                        <th className='px-6 py-3'>สถานะ</th>
                        <th className='px-6 py-3'>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((item, index) => {
                            return (
                                <tr key={index} className='border-b cursor-pointer transition'>
                                    <td className='px-6 py-3'>{index+1}</td>
                                    <td>{item.email}</td>
                                    <td className='px-6 py-3'>{dateFormat(item.updateedAt)}</td>
                                    <td className='px-6 py-3'>
                                        <select 
                                            className="select select-neutral bg-white"
                                            onChange={(e) => handleChangeUserRole(item.id, e.target.value)}
                                            value={item.role}
                                        >
                                            <option disabled >เลือกสิทธิ์</option>
                                            <option>user</option>
                                            <option>admin</option>
                                        </select>
                                    </td>
                                    <td className='text-center p-2'>
                                        <span className={`${changeColorEnabledUser(item.enable)} p-1 rounded-full`}>{item.enable? 'Active' : 'Inactive'}</span>
                                    </td>
                                    <td className='px-6 py-3'>
                                        <input 
                                            type="checkbox"
                                            className="toggle toggle-success toggle-lg border border-gray-400"
                                            // className={`toggle ${item.enable ? 'toggle-success' : 'toggle-error'}`} 
                                            checked={item.enable}
                                            onChange={() => handleChangeUserStatus(item.id, item.enable)}
                                        />
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

