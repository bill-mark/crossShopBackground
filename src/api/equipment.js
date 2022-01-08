import request from "@/utils/request";

export const getList = (data) => {
  return request({
    url: "/client_v1/device",
    method: "POST",
    data: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    }
  })
}