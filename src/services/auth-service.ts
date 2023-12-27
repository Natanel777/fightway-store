import axios from "axios"

const baseUrl = 'http://localhost:8080/api/v1/auth'

export const register = (username: string, email: string, password: string) => {

    return axios.post(`${baseUrl}/signup`, { username, email, password })
    .then((res) => {
        const token = res.data.jwt 

        if (token) {
            localStorage.setItem("user", JSON.stringify({ token, username }))
        }

        return res.data;
    })
}

export const login = (username: string, password: string) => {
    return axios.post(`${baseUrl}/signin`, { username, password })
        .then((res) => {
            const token = res.data.jwt

            if (token) {
                localStorage.setItem("user", JSON.stringify({ token, username }))
            }

            return res.data;
        })
}

export const logout = () => {
    //forget the user
    localStorage.removeItem("user");
}

const authService = { register, login, logout }

export default authService;