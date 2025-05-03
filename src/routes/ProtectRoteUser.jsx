import { useEffect, useState } from 'react'
import useEcomStore from '../store/Ecom_store'
import { currentUser } from '../api/Auth'
import LoadingToRedirect from './LoadingToRedirect'

export default function ProtectRoteUser({ element }) {
  const [ok, setOk] = useState(false)
  const user = useEcomStore((state) => state.user)
  const token = useEcomStore((state) => state.token)

  useEffect(() => {
    if (user && token) {
      // Send to Back
      currentUser(token)
      .then((res) => setOk(true) )
      .catch((err) => setOk(false))
    }
  }, [])
  
  return ok ? element : <LoadingToRedirect/>
}
