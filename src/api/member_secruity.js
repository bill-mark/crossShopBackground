import request from "@/utils/request";

export const getList = (data) => {
  return request({
    url: "/client_v1/security/login-limit-list",
    method: "POST",
    data
  })
}