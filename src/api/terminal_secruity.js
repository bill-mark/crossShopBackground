import request from "@/utils/request";

export const getList = (data) => {
  return request({
    url: "/client_v1/security/white-device-list",
    method: "POST",
    data
  })
}

export const addTerminal = (data) => {
  return request({
    url: "/client_v1/security/white-device-create",
    method: "POST",
    data
  })
}

export const updateAuth = (data) => {
  return request({
    url: "/client_v1/security/white-device-update",
    method: "POST",
    data
  })
}

export const deleteAuth = (data) => {
  return request({
    url: "/client_v1/security/white-device-delete",
    method: "POST",
    data
  })
}