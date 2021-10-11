import { http } from './httpService';

export const convert = (id) => {
    return http.get(`/deductUnit/${id}`)
}

export const credit = (data) => {
    return http.post("/creditUnit", data)
}