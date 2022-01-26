import request from "@/utils/request";

//成员列表
export const user_member_list = (data) => {
    return request({
        url: "/client_v1/user/user-member-list",
        method: "POST",
        data
    })
}

//角色列表
export const user_rolelist = (data) => {
    return request({
        url: "/client_v1/user/role-list",
        method: "POST",
        data
    })
}

//部门列表
export const user_listdepartment = (data) => {
    return request({
        url: "/client_v1/user/list-department",
        method: "POST",
        data
    })
}

//创建成员
export const user_createmember = (data) => {
    return request({
        url: "/client_v1/user/create-member",
        method: "POST",
        data
    })
}