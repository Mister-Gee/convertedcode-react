import { http } from './httpService';

export const getUserPlan = (id) => {
    return http.get(`/userDashboard/${id}`)
}