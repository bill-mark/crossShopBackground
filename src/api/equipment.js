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

//取消/开启自动续费
export const device_cancelrenewstatus = (data) => {
  return request({
    url: "/client_v1/device/cancel-renew-status",
    method: "POST",
    data
  })
}

//编辑设备名称
export const device_updatedevicename = (data) => {
  return request({
    url: "/client_v1/device/update-device-name",
    method: "POST",
    data
  })
}

//设备绑定环境
export const device_bindenvironment = (data) => {
  return request({
    url: "/client_v1/device/bind-environment",
    method: "POST",
    data
  })
}

//设备解绑环境
export const device_unbindenvironment = (data) => {
  return request({
    url: "/client_v1/device/unbind-environment",
    method: "POST",
    data
  })
}

//批量删除设备(软删除)
export const device_deletedevicemore = (data) => {
  return request({
    url: "/client_v1/device/delete-device-more",
    method: "POST",
    data
  })
}

//设备未绑定环境列表
export const device_bindnoenvironmentlist = (data) => {
  return request({
    url: "/client_v1/device/bind-no-environment-list",
    method: "POST",
    data
  })
}


//设备标签列表
export const device_devicetaglist = (data) => {
  return request({
    url: "/client_v1/device/device-tag-list",
    method: "POST",
    data
  })
}

//添加设备标签
export const device_createdevicetag = (data) => {
  return request({
    url: "/client_v1/device/create-device-tag",
    method: "POST",
    data
  })
}

//批量删除设备标签
export const device_deletedevicetagmore = (data) => {
  return request({
    url: "/client_v1/device/delete-device-tag-more",
    method: "POST",
    data
  })
}

//编辑设备标签
export const device_updatedevicetag = (data) => {
  return request({
    url: "/client_v1/device/update-device-tag",
    method: "POST",
    data
  })
}

//编辑设备绑定标签
export const device_devicebindtag = (data) => {
  return request({
    url: "/client_v1/device/device-bind-tag",
    method: "POST",
    data
  })
}