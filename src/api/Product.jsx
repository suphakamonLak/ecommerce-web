import axios from "axios"

export const createProduct = async (token, form) => {
    // url, data, config
    return await axios.post('https://ecommerce-web-rqpp.vercel.app/api/product', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listProducts = async (count = 100) => {
    // url, data, config
    return await axios.get(`https://ecommerce-web-rqpp.vercel.app/api/products/${count}`)
}

export const readProduct = async (token, id) => {// 
    return await axios.get(`https://ecommerce-web-rqpp.vercel.app/api/product/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateProduct = async (token, id, form) => {
    return await axios.put(`https://ecommerce-web-rqpp.vercel.app/api/product/${id}`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeProduct = async (token, id) => {
    return await axios.delete(`https://ecommerce-web-rqpp.vercel.app/api/product/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const uploadFiles = async (token, form) => {
    return axios.post('https://ecommerce-web-rqpp.vercel.app/api/images', 
    {
        image: form
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeFiles = async (token, public_id) => {
    return axios.post('https://ecommerce-web-rqpp.vercel.app/api/removeimage', 
    {
        public_id
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const searchFilters = async (arg) => {
    return await axios.post('https://ecommerce-web-rqpp.vercel.app/api/search/filters', arg)
}

export const listProductBy = async (sort, order, limit) => {
    return await axios.post('https://ecommerce-web-rqpp.vercel.app/api/productby', {
        sort,
        order,
        limit
    })
}