import request from "@/utils/request";

export const fetchTagList = (data) => {
  return request({
    url: "/client_v1/device/device-tag-list",
    method: "GET",
    params: {...data}
  })
}

export const addTag = (data) => {
  return request({
    url: "/client_v1/device/create-device-tag",
    method: "POST",
    data: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    }
  })
}

export const updateTag = (data) => {
  return request({
    url: "/client_v1/device/update-device-tag",
    method: "POST",
    data: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    }
  })
}