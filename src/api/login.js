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

export const user_info = (data) => {
    return request({
        url: "client_v1/user/info",
        method: "POST",
        data
    })
}

//boss修改密码
export const user_set_password = (data) => {
    return request({
        url: "/client_v1/user/set-password",
        method: "POST",
        data
    })
}

//成员修改密码
export const user_edit_password = (data) => {
    return request({
        url: "/client_v1/user/edit-password",
        method: "POST",
        data
    })
}