import { createState } from '@hookstate/core';

const store = createState({
    user: {},
    alertNotification: false,
    alertMessage: '',
    alertType: '',
    authDrawer: false,
    conversionUnit: 0,
    totalConversions: 0,
    conversionPlan: "None",

})

export default store;