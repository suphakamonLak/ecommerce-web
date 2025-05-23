import { useEffect, useState } from 'react'
import useEcomStore from '../store/Ecom_store'
import { currentAdmin } from '../api/Auth'
import LoadingToRedirect from './LoadingToRedirect'

export default function ProtectRoteAdmin({ element }) {
  const [ok, setOk] = useState(false)
  const user = useEcomStore((state) => state.user)
  const token = useEcomStore((state) => state.token)

  useEffect(() => {
    if (user && token) {
      // Send to Back
      currentAdmin(token)
      .then((res) => {
        console.log('res admin', res)
        setOk(true) 
      })
      .catch((err) => {
        console.log('err admin', err)
        setOk(false)
      })
    }
  }, [])
  
  return ok ? element : <LoadingToRedirect/>
}
