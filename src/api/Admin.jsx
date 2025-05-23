import axios from "axios";

export const getOrdersAdmin = async (token) => {// 
    return await axios.get('https://ecommerce-web-rqpp.vercel.app/api/admin/orders', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const changeOrderAdmin = async (token, orderId, orderStatus) => {// 
    return await axios.put('https://ecommerce-web-rqpp.vercel.app/api/admin/order-status', 
    {
        orderId,
        orderStatus
    }, 
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getListAllUsers = async (token) => {
    return await axios.get('https://ecommerce-web-rqpp.vercel.app/api/users', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const changeUserStatus = async (token, value) => {
    return await axios.post('https://ecommerce-web-rqpp.vercel.app/api/change-status', 
        value,
        {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const changeUserRole = async (token, value) => {
    return await axios.post('https://ecommerce-web-rqpp.vercel.app/api/change-role', 
        value,
        {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getDashboard = async (token) => {
    return await axios.get('https://ecommerce-web-rqpp.vercel.app/api/admin/dashboard', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}