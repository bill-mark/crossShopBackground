import request from "@/utils/request";


export const user_member_list = (data) => {
    return request({
        url: "/client_v1/user/user-member-list",
        method: "POST",
        data
    })
}