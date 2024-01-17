import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { CustomJwtPayload } from "utils/types"

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

export const isAdmin = () => {
    const userString = localStorage.getItem("user");

    if (!userString) {
        return false;
    }

    const user = JSON.parse(userString);
    const decodedToken = jwtDecode<CustomJwtPayload>(user.token);

    // Check if the user has the "ROLE_ADMIN" role inside his JWT props
    return decodedToken && decodedToken.roles && decodedToken.roles.includes("ROLE_ADMIN");
};

const authService = { register, login, logout, isAdmin }

export default authService;