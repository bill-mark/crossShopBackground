import request from "@/utils/request";

export const fetchTagList = (data) => {
    return request({
        url: "/client_v1/device/device-tag-list",
        method: "GET",
        data
    })
}