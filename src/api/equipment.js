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

//已绑定环境列表
export const device_bind_environment_list = (data) => {
  return request({
    url: "/client_v1/device/bind-environment-list",
    method: "POST",
    data
  })
}

//绑定历史记录
export const device_bind_history_record = (data) => {
  return request({
    url: "/client_v1/device/bind-history-record",
    method: "POST",
    data
  })
}

//设备操作日志
export const device_operate_log_list = (data) => {
  return request({
    url: "/client_v1/device/operate-log-list",
    method: "POST",
    data
  })
}

//设备归属列表
export const device_devicenetworkregionlist = (data) => {
  return request({
    url: "/client_v1/device/device-network-region-list",
    method: "POST",
    data
  })
}