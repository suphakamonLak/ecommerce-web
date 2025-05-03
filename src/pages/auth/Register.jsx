import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleOnChange = (e) => {
    // console.log(e.target.value)
    setForm({
      ...form, 
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log("password:", form.password)

    if (form.password !== form.confirmPassword) {
      return alert('Confirm Password is not match')
    }
    
    // Send to Back
    try {
      const res = await axios.post('http://localhost:5000/api/register', form)

      toast.success(res.data)
    } catch (err) {
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
    }
  }

  return (
    <div>
      <p className='text-center font-bold my-5'>Register</p>
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

            <label name='confirmPassword' className='mx-4'>Confirm Password:</label>
            <input className='border'
              onChange={handleOnChange}
              name='confirmPassword'
              id='confirmPassword'
              type='text'
            />

          </div>
          <div className='flex justify-center my-5'>
            <button className='bg-blue-300 rounded-md p-2'>Register</button>
          </div>
        </div>
      </form>
    </div>
  )
}
