import request from "@/utils/request";



export const user_login = (data) => {
    return request({
        url: "/client_v1/user/login",
        method: "POST",
        data
    })
}

export const user_send_sms = (data) => {
    return request({
        url: "/client_v1/verify/send-sms",
        method: "POST",
        data
    })
}