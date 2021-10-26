import { http } from './httpService';

export const getLatestStat = () => {
    return http.get("latestStat")
}

export const postStat = data => {
    return http.post("/stats/create", data)
}