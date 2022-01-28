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

//添加部门
export const user_createdepartment = (data) => {
    return request({
        url: "/client_v1/user/create-department",
        method: "POST",
        data
    })
}

//编辑部门
export const user_updatedepartment = (data) => {
    return request({
        url: "/client_v1/user/update-department",
        method: "POST",
        data
    })
}

//转移成员
export const user_usermove = (data) => {
    return request({
        url: "/client_v1/user/user-move",
        method: "POST",
        data
    })
}

//删除部门(递归删除)
export const user_deletedepartment = (data) => {
    return request({
        url: "/client_v1/user/delete-department",
        method: "POST",
        data
    })
}

//编辑成员
export const user_updatemember = (data) => {
    return request({
        url: "/client_v1/user/update-member",
        method: "POST",
        data
    })
}

//成员授权环境列表
export const user_authenvironmentlist = (data) => {
    return request({
        url: "/client_v1/user/auth-environment-list",
        method: "POST",
        data
    })
}

//成员批量授权环境
export const user_authenvironmentmore = (data) => {
    return request({
        url: "/client_v1/user/auth-environment-more",
        method: "POST",
        data
    })
}

//批量删除成员
export const user_deletemembermore = (data) => {
    return request({
        url: "/client_v1/user/delete-member-more",
        method: "POST",
        data
    })
}

//批量禁用成员
export const user_banmembermore = (data) => {
    return request({
        url: "/client_v1/user/ban-member-more",
        method: "POST",
        data
    })
}

//批量启用成员
export const user_enablemembermore = (data) => {
    return request({
        url: "/client_v1/user/enable-member-more",
        method: "POST",
        data
    })
}