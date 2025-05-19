import axios from 'axios'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import zxcvbn from 'zxcvbn'
import { zodResolver } from '@hookform/resolvers/zod'
import { NavLink } from 'react-router-dom'

const registerSchema = z.object({// Validate fild data
  email: z.string().email({message: "รูปแบบอีเมล์ไม่ถูกต้อง"}),
  password: z.string().min(8, {message: "รหัสผ่านต้องมากกว่า 8 ตัวอักษร"}),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, 
  {message: "รหัสผ่านไม่ตรงกัน", path:["confirmPassword"]}, 
)

export default function Register() {
  const [passwordScore, setPasswordScore] = useState(0)
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(registerSchema)
  })

  const validatePassword = () => {
    let password = watch().password
    return zxcvbn(password? password: '').score
  }

  useEffect(() => {
    setPasswordScore(validatePassword())
  }, [watch().password])

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:5000/api/register', data)
      toast.success(res.data)
      reset()
    } catch (err) {
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
    }
  }

  return (
    <div className='h-svh flex justify-center'>
      <div className='bg-white w-3/5 h-3/4 shadow-md rounded-md border-2 border-gray-200'>
        <p className='text-3xl text-center font-bold mt-2'>Register</p>
        <div className='flex justify-center p-1'>
          <form className='my-5 flex justify-center' onSubmit={handleSubmit(onSubmit)}>
            <div className='w-1/2'>
              <div className='flex h-50 flex-col gap-2 p-2'>
                <div>
                  <label name='email'>
                    Email:
                  </label>
                  <input {...register("email")} 
                    className={`bg-gray-200 border-none text-gray-500 p-1 rounded-md w-full mt-1 mb-1 focus:outline-none focus:ring-2 
                      focus:ring-blue-400 focus:border-transparent
                      ${errors.email && 'border-red-500'}
                    `}
                    placeholder='Email' 
                  />
                  {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
                </div>
                <div>
                  <label name='password'>Password:</label>
                  <input {...register("password")} 
                    className={`bg-gray-200 border-none text-gray-500 p-1 rounded-md w-full mt-1 mb-1 focus:outline-none focus:ring-2 
                      focus:ring-blue-400 focus:border-transparent
                      ${errors.password && 'border-red-500'}
                    `}
                    placeholder='Password' 
                  />
                  {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
                  
                  {
                    watch().password?.length > 0 && <div className='flex mt-2'>
                      {// create array 5 item
                        Array.from(Array(5).keys()).map((item, index) =>
                          <span className='w-1/5 px-1' key={index}>
                            <div 
                              className={`h-2 ${passwordScore <= 2
                                ? 'bg-red-300'
                                : passwordScore < 4 
                                ? 'bg-yellow-300'
                                :'bg-green-300'} rounded-sm`}
                            >
                            </div>
                          </span>
                        )
                      }
                    </div>
                  }
                </div>
                <div>
                  <label name='confirmPassword'>Confirm Password:</label>
                  <input {...register("confirmPassword")} 
                    className={`bg-gray-200 border-none text-gray-500 p-1 rounded-md w-full mt-1 mb-1 focus:outline-none focus:ring-2 
                      focus:ring-blue-400 focus:border-transparent
                      ${errors.confirmPassword && 'border-red-500'}
                    `}
                    type='password'
                    placeholder='Confirm Password'
                  />
                  {errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword.message}</p>}
                </div>
                <div>
                  <button className='bg-blue-400 rounded-md p-2 w-full'>Register</button>
                </div>
                <div>
                  <p className='text-start'>Already have an account? <NavLink to="/login" className='text-blue-700 font-bold'>Sing in</NavLink></p>
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
