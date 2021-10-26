import { http } from './httpService';

export const getPuntersTips = (page) => {
    if (page) {
        return http.get(`/punters-tips?page=${page}`)
    }
    return http.get("/punters-tips")
}

export const createPuntersTips = (data) => {
    return http.post("/punters-tips/create", data)
}

export const searchPunter = (name) => {
    return http.get(`/punters-tips/search/${name}`)
}