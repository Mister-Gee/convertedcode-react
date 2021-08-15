import { http } from './httpService';

export const paymentInit = (userId) => {
    return http.get(`/getPaymentData/${userId}`)
}

export const confirmPayment = (ref) => {
    return http.get(`/payment/callback?trxref=${ref}`)
}