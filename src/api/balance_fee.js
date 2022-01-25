import request from "@/utils/request";

export const getList = (data) => {
  return request({
    url: "/client_v1/order/balance-log-list",
    method: "POST",
    data
  })
}