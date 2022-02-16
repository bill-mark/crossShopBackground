import request from "@/utils/request";

export const getList = (data) => {
  return request({
    url: "/client_v1/security/login-limit-list",
    method: "POST",
    data
  })
}

export const security_change_login_more = (data) => {
  return request({
    url: "/client_v1/security/change-login-more",
    method: "POST",
    data
  })
}