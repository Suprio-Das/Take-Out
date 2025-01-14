import axios from 'axios'

const url = 'http://localhost:3000'

export async function createUser(user) {
    const response = await axios.post(`${url}/signup`, user)
    return response
}
export async function loginuser(user) {
    const response = await axios.post(`${url}/login`, user)
    return response
}