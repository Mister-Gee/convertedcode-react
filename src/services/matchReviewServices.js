import { http } from './httpService';

export const getLatestMatchReviews = () => {
    return http.get("/latest-match-reviews")
}

export const getMatchReviews = (page) => {
    if (page) {
        return http.get(`/match-review?page=${page}`)
    } else {
        return http.get("/match-review")
    }
}

export const getMatchReviewByID = (id) => {
    return http.get(`/match-review/${id}`)
}

export const postMatchReview = (data) => {
    return http.post("/match-review/create", data)
}