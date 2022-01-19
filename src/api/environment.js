import request from "@/utils/request";


export const deleteTree = params => {
    return request({
        url:'/analysis/userGroup/tree/delete',
        method:'GET',
        params
    })
}

export const environment_platform_list = (data) => {
    return request({
        url: "/client_v1/environment/platform-list",
        method: "POST",
        data
    })
}

export const client_v1_device = (data) => {
    return request({
        url: "/client_v1/device",
        method: "POST",
        data
    })
}

export const environment_tag_list = (data) => {
    return request({
        url: "/client_v1/environment/environment-tag-list",
        method: "POST",
        data
    })
}

export const environment_create = (data) => {
    return request({
        url: "/client_v1/environment/create",
        method: "POST",
        data
    })
}

export const update_environment_tag = (data) => {
    return request({
        url: "/client_v1/environment/update-environment-tag",
        method: "POST",
        data
    })
}

export const create_environment_tag = (data) => {
    return request({
        url: "/client_v1/environment/create-environment-tag",
        method: "POST",
        data
    })
}

export const delete_environment_tag = (data) => {
    return request({
        url: "/client_v1/environment/delete-environment-tag",
        method: "POST",
        data
    })
}


export const environment_bind_device = (data) => {
    return request({
        url: "/client_v1/environment/bind-device",
        method: "POST",
        data
    })
}


