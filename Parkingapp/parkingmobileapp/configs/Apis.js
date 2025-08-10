import axios from "axios"

const BASE_URL = "https://fair-drum-smooth.ngrok-free.app/"

export const endpoints = {
    token: 'o/token/',

    parkingLogs: 'parking-logs/',
    countToday: 'parking-logs/count-today/',

    countParking: 'stats/parking-logs/count/',
    totalTimeParking: 'stats/parking-logs/total-time/',

    users: "users/",
    currentUser: 'users/current-user/',

    wallet: 'users/current-user/wallet/',
    walletTransaction: 'walletTransactions/',

    deposit: 'users/current-user/wallet/deposit/',
    withdraw: 'users/current-user/wallet/withdraw/',

    vehicles: "vehicles/",
    vehiclesDeltail: (id) => `vehicles/${id}/`,
    vehicleStats: "vehicles/stats/",

    totalPayment: 'users/current-user/total-payment/',

    feeRole: 'fee-role/',
    feeRoleDetail: (id) => `fee-role/${id}/`,

    totalCustomer: 'stats/total-customer/',
    revenue: 'stats/revenue/',
    revenueByUser: 'stats/revenue/by-user/',
    occupancy: 'parking-logs/occupancy/',
    compareMonthly: 'stats/revenue/compare-monthly/',
}

export const authApis = (token) => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export default axios.create({
    baseURL: BASE_URL
})