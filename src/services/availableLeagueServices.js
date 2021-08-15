import { http } from './httpService';

export const getAvailableLeagues = (page) => {
    if (page) {
        return http.get(`/available-leagues?page=${page}`)
    } else {
        return http.get("/available-leagues")
    }
}

export const getAvailableLeagueByID = (id) => {
    return http.get(`/available-leagues/${id}`)
}

export const getLatestAvailableLeague = () => {
    return http.get("/available-leagues/latest")
}

export const createAvailableLeague = (data) => {
    return http.post("/available-leagues/create", data)
}