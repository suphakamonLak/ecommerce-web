import axios from "axios";

export const createCategory = async (token, form) => {
    // url, data, config
    return await axios.post('https://ecommerce-api-pink.vercel.app/api/category', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCategory = async () => {
    return await axios.get('https://ecommerce-api-pink.vercel.app/api/category')
}

export const removeCategory = async (token, id) => {
    // url, data, config
    return await axios.delete(`https://ecommerce-api-pink.vercel.app/api/category/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
