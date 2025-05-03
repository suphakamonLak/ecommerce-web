import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function LoadingToRedirect() {
    const [count, setCount] = useState(3)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {// countdown every 1 sec
            setCount((currentCount) => {
                if (currentCount === 1) {
                    clearInterval(interval)// stop process
                    setRedirect(true)
                }
                return currentCount - 1
            })
        }, 1000)

        return () => clearInterval(interval)// clear ข้อมูลทั้งหมดก่อนจะเริ่มการทำงานใหม่
    }, [])

    if (redirect) {
        return <Navigate to={'/'}/>
    }
    
    return (
        <div>No Permission, Redirect in {count}</div>
    )
}

