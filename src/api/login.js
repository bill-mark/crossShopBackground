import request from "@/utils/request";



export const user_login = (data) => {
    return request({
        url: "/client_v1/user/login",
        method: "POST",
        data
    })
}