import { http } from './httpService';

export const getBetTerms = (page) => {
    if (page) {
        return http.get(`/bet-terms?page=${page}`)
    } else {
        return http.get("/bet-terms")
    }
}

export const getBetTermByID = (id) => {
    return http.get(`/bet-terms/${id}`)
}

export const createBetTerm = (data) => {
    return http.post("/bet-terms/create", data)
}