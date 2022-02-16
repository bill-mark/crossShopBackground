import request from "@/utils/request";

export const certify_latest_info = (data) => {
    return request({
        url: "/client_v1/certify/latest-info",
        method: "POST",
        data
    })
}