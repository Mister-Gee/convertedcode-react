import { http } from './httpService';

export const convert = (id) => {
    return http.get(`/deductUnit/${id}`)
}