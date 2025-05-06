import axios from "axios";

export const createCategory = async (token, form) => {
    // url, data, config
    return await axios.post('http://localhost:5000/api/category', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCategory = async () => {
    return await axios.get('http://localhost:5000/api/category')
}

export const removeCategory = async (token, id) => {
    // url, data, config
    return await axios.delete(`http://localhost:5000/api/category/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
