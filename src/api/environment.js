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


export const environment_device_ip_list = (data) => {
    return request({
        url: "/client_v1/environment/device-ip-list",
        method: "POST",
        data
    })
}

export const environment_device_name_list = (data) => {
    return request({
        url: "/client_v1/environment/device-name-list",
        method: "POST",
        data
    })
}

export const environment_device_network_type_list = (data) => {
    return request({
        url: "/client_v1/environment/device-network-type-list",
        method: "POST",
        data
    })
}

export const environment_business_short_list = (data) => {
    return request({
        url: "/client_v1/environment/business-short-list",
        method: "POST",
        data
    })
}

export const environment_username_list = (data) => {
    return request({
        url: "/client_v1/environment/username-list",
        method: "POST",
        data
    })
}


//环境详情
export const environment_info = (data) => {
    return request({
        url: "/client_v1/environment/info",
        method: "POST",
        data
    })
}

//编辑环境
export const environment_update = (data) => {
    return request({
        url: "/client_v1/environment/update",
        method: "POST",
        data
    })
}

//解绑设备
export const environment_unbind_device = (data) => {
    return request({
        url: "/client_v1/environment/unbind-device",
        method: "POST",
        data
    })
}

//批量清空授权
export const environment_clear_auth_more = (data) => {
    return request({
        url: "/client_v1/environment/clear-auth-more",
        method: "POST",
        data
    })
}

//批量清空环境标签
export const environment_clearenvironmenttagmore = (data) => {
    return request({
        url: "/client_v1/environment/clear-environment-tag-more",
        method: "POST",
        data
    })
}

//批量批量解绑设备
export const environment_unbinddevicemore = (data) => {
    return request({
        url: "/client_v1/environment/unbind-device-more",
        method: "POST",
        data
    })
}

//批量设为常用环境/取消常用环境
export const environment_commonmore = (data) => {
    return request({
        url: "/client_v1/environment/common-more",
        method: "POST",
        data
    })
}

//批量删除环境标签
export const environment_deleteenvironmenttagmore = (data) => {
    return request({
        url: "/client_v1/environment/delete-environment-tag-more",
        method: "POST",
        data
    })
}


//批量删除环境
export const environment_delete_more = (data) => {
    return request({
        url: "/client_v1/environment/delete-more",
        method: "POST",
        data
    })
}

