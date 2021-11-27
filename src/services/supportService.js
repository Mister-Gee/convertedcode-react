import { http } from './httpService';

export const getSupportMessage = (page) => {
    if(page){
        return http.get(`/support?page=${page}`)
    }
    return http.get("/support")
}

export const getSupportMessageByID = (id) => {
    return http.get(`/support/${id}`)
}

export const postSupportMessage = data => {
    return http.post("/support/create", data)
}

export const deleteSupportMessage = (id) => {
    return http.delete(`/support/delete/${id}` )
}