import { http } from './httpService';

export const getUserPlan = (id) => {
    return http.get(`/userDashboard/${id}`)
}

export const getDailyConversionData = (id) => {
    return http.get(`/dailyConversions/${id}`)
}

export const getWeekOfDayConversionData = (id) => {
    return http.get(`/dayOfTheWeekConversions/${id}`)
}