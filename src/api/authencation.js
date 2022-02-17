import request from "@/utils/request";

export const certify_latest_info_v2 = (data) => {
    return request({
        url: "/client_v1/certify/latest-info-v2",
        method: "POST",
        data
    })
}