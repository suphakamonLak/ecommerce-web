import { useState } from 'react'
import { toast } from 'react-toastify'
import useEcomStore from '../../store/Ecom_store'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()// using redirect
  const actionLogin = useEcomStore((state) => state.actionLogin)// เขียน callback เพื่อรับค่าเฉพาะมา

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
      setForm('')
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
    <div className='flex justify-center items-center'>
      <div className='bg-white shadow-md rounded-md border-2 border-gray-200'> 
        <p className='text-3xl text-center mt-3'>Login</p>
        <div className='flex justify-center px-6'>
          <form className='my-5 flex justify-center' onSubmit={handleSubmit}>
            <div>
              <div className='flex h-50 flex-col gap-1 pr-1'>
                <div>
                  <label name='email'>Email:</label>
                  <input 
                    className='bg-gray-200 border-none text-gray-500 p-2 rounded-md w-full mt-1 mb-1 focus:outline-none focus:ring-2
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
                    className='bg-gray-200 border-none text-gray-500 p-2 rounded-md w-full mt-1 mb-1 focus:outline-none focus:ring-2
                    focus:ring-blue-400 focus:border-transparent'
                    onChange={handleOnChange}
                    name='password'
                    id='password'
                    type='password'
                    placeholder='Password'
                  />
                </div>
                <div className='mt-2'>
                  <button className='bg-blue-400 rounded-md p-2 mr-3 w-full'>Login</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
