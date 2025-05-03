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

      console.log('res', res)
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
      navigate('/user')
    }
  })

  return (
    <div>
      <p className='text-center font-bold my-5'>Login</p>
      <form className='my-5' onSubmit={handleSubmit}>
        <div>
          <div>
            <label name='email' className='mx-4'>Email:</label>
            <input className='border'
              onChange={handleOnChange}
              name='email'
              id='email'
              type='email'
            />
            
            <label name='password' className='mx-4'>Password:</label>
            <input className='border'
              onChange={handleOnChange}
              name='password'
              id='password'
              type='text'
            />

          </div>
          <div className='flex justify-center my-5'>
            <button className='bg-blue-300 rounded-md p-2'>Login</button>
          </div>
        </div>
      </form>
    </div>
  )
}
