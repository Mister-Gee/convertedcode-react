import { http } from './httpService';

export const saveConversion = (data) => {
    return http.post("/saveCurrentConversion", data)
}