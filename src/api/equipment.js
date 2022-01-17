import request from "@/utils/request";

export const getList = (data) => {
  return request({
    url: "/client_v1/device",
    method: "POST",
    data
  })
}


export const purchase_device_list = (data) => {
  return request({
    url: "/client_v1/device/purchase-device-list",
    method: "POST",
    data
  })
}