import request from "@/utils/request";

export const order_balance_log_list = (data) => {
  return request({
    url: "/client_v1/order/balance-log-list",
    method: "POST",
    data
  })
}

export const order_index = (data) => {
  return request({
    url: "/client_v1/order/index",
    method: "POST",
    data
  })
}

//邀请礼金列表
export const coupon_invite = (data) => {
  return request({
    url: "/client_v1/coupon/invite",
    method: "POST",
    data
  })
}



//充值下单接口
export const order_recharge = (data) => {
  return request({
    url: "/client_v1/order/recharge",
    method: "POST",
    data
  })
}

//优惠券列表
export const coupon_list = (data) => {
  return request({
    url: "/client_v1/coupon/list",
    method: "POST",
    data
  })
}

//支付方式
export const device_pay_channel = (data) => {
  return request({
    url: "/client_v1/device/pay-channel",
    method: "POST",
    data
  })
}

//key换微信支付宝支付接口
export const client_v1_pay = (data) => {
  return request({
    url: "/client_v1/pay",
    method: "POST",
    data
  })
}

//key换余额支付
export const client_v1_pay_balance = (data) => {
  return request({
    url: "/client_v1/pay/balance",
    method: "POST",
    data
  })
}

//订单状态
export const order_info = (data) => {
  return request({
    url: "/client_v1/order/order-info",
    method: "POST",
    data
  })
}