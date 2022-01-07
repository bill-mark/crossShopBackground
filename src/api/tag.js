import request from "@/utils/request";

export const fetchTagList = (data) => {
  return request({
    url: "/client_v1/device/device-tag-list",
    method: "POST",
    data
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

export const delTag = (data) => {
  return request({
    url: "/client_v1/device/delete-device-tag",
    method: "POST",
    data: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    }
  })
}

export const BatchTag = (type, data) => {
  const urlMap = {
    'add': '/client_v1/device/create-device-tag-more',
    'del': '/client_v1/device/clear-device-tag-more',
    'rep': '/client_v1/device/replace-device-tag-more'
  };
  return request({
    url: urlMap[type],
    method: "POST",
    data: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    }
  })
}
