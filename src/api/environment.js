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