import axios from "axios"

// url, data, config
export const payment = async (token) => 
    await axios.post('https://ecommerce-api-pink.vercel.app/api/user/create-payment-intent', {}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})