import { http } from './httpService';

export const getAvailableOptions = (page) => {
    if (page) {
        return http.get(`/available-options?page=${page}`)
    } else {
        return http.get("/available-options")
    }
}

export const getAvailableOptionByID = (id) => {
    return http.get(`/available-options/${id}`)
}

export const getLatestAvailableOptions = () => {
    return http.get("/available-options/latest")
}

export const createAvailableOption = (data) => {
    return http.post("/available-options/create", data)
}