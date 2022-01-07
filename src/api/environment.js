import request from "@/utils/request";

export const analysis_save = (data) => {
    return request({
        url: " /analysis/analysis/save",
        method: "POST",
        data
    })
}
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