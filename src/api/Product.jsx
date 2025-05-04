import axios from "axios"

export const createProduct = async (token, form) => {
    // url, data, config
    return await axios.post('http://localhost:5000/api/product', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listProducts = async (token, count = 20) => {
    // url, data, config
    return await axios.get(`http://localhost:5000/api/products/${count}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const uploadFiles = async (token, form) => {
    return axios.post('http://localhost:5000/api/images', 
    {
        image: form
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeFiles = async (token, public_id) => {
    return axios.post('http://localhost:5000/api/removeimage', 
    {
        public_id
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}