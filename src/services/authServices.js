import { http } from './httpService';

export const login = (data) => {
    return http.post("/login", data)
}

export const register = (data) => {
    return http.post("/register", data)
}

export const forgotPassword = (data) => {
    return http.post("/forgot-password", data)
}

export const logout = () => {
    return http.post("/logout")
}