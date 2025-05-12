import React, { useState } from 'react'
import { toast } from 'react-toastify'
import useEcomStore from '../../store/Ecom_store'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()// using redirect
  const actionLogin = useEcomStore((state) => state.actionLogin)// เขียน callback เพื่อรับค่าเฉพาะมา
  const user = useEcomStore((state) => state.user)
  const token = useEcomStore((state) => state.token)

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const handleOnChange = (e) => {
    setForm({
      ...form, 
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await actionLogin(form)
      const role = res.data.payload.role
      
      // Check role user
      roleRedirect(role)
      toast.success('Welcome Back')
    } catch (err) {
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
    }
  }

  const roleRedirect = ((role) => {
    if (role == 'admin') {
      navigate('/admin')
    } else {
      navigate(-1)// หลัง login ให้ user กลับไปยังหน้าก่อนหน้านั้น
    }
  })

  return (
    <div className='h-svh flex justify-center'>
      <div className='bg-white w-3/5 h-3/4 shadow-md rounded-md border-2 border-gray-200'> 
        <p className='text-3xl text-center font-bold mt-2'>Login</p>
        <div className='flex justify-center p-1'>
          <form className='my-5 flex justify-center' onSubmit={handleSubmit}>
            <div className='w-1/2 '>
              <div className='flex h-50 flex-col gap-2 p-2'>
                <div>
                  <label name='email'>Email:</label>
                  <input 
                    className='border p-1 rounded-md w-full mt-1 mb-1 focus:outline-none focus:ring-2
                    focus:ring-blue-400 focus:border-transparent'
                    onChange={handleOnChange}
                    name='email'
                    id='email'
                    type='email'
                    placeholder='Email'
                  />
                </div>
                <div>
                  <label name='password'>Password:</label>
                  <input 
                    className='border p-1 rounded-md w-full mt-1 mb-1 focus:outline-none focus:ring-2
                    focus:ring-blue-400 focus:border-transparent'
                    onChange={handleOnChange}
                    name='password'
                    id='password'
                    type='password'
                    placeholder='Password'
                  />
                </div>
                <div>
                  <button className='bg-blue-400 rounded-md p-2 mr-3 w-full'>Login</button>
                </div>
              </div>
            </div>
            <div className='w-1/2 h-50 flex'>
              <img 
                className='object-contain'
                src="../assets/images/login.jpg"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
