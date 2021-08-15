import { createState } from '@hookstate/core';

const store = createState({
    user: {},
    alertNotification: false,
    alertMessage: '',
    alertType: '',
    authDrawer: false
})

export default store;