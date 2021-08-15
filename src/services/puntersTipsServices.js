import { http } from './httpService';

export const getPuntersTips = () => {
    return http.get("/punters-tips")
}

export const createPuntersTips = (data) => {
    return http.post("/punters-tips/create", data)
}