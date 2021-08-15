import axios from 'axios';
import { getTokenFromLocalStorage } from '../utils/Functions';

const { REACT_APP_CONVERTEDCODE_API_URL } = process.env;
const token = getTokenFromLocalStorage();

export const http = axios.create({
    baseURL: REACT_APP_CONVERTEDCODE_API_URL,
    timeout: 100000,
    headers: {
        'Accept': 'apllication/json',
        'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
    }
})