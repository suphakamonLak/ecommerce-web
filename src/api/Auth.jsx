import axios from "axios"

// url, data, config
export const currentUser = async (token) => await axios.post('https://ecommerce-web-rqpp.vercel.app/api/current-user', {}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const currentAdmin = async (token) => await axios.post('https://ecommerce-web-rqpp.vercel.app/api/current-admin', {}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})