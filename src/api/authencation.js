import request from "@/utils/request";

export const certify_latest_info_v2 = (data) => {
    return request({
        url: "/client_v1/certify/latest-info-v2",
        method: "POST",
        data
    })
}

//个人/法人实名认证
export const certify_person_certify = (data) => {
    return request({
        url: "/client_v1/certify/person-certify",
        method: "POST",
        data
    })
}


// 提交企业资料

export const certify_enterprise = (data) => {
    return request({
        url: "/client_v1/certify/enterprise",
        method: "POST",
        data
    })
}