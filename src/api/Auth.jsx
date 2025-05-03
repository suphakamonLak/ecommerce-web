import axios from "axios"

// url, data, config
export const currentUser = async (token) => await axios.post('http://localhost:5000/api/current-user', {}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const currentAdmin = async (token) => await axios.post('http://localhost:5000/api/current-admin', {}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})