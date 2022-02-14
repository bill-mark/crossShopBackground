<template>
  <div class="charge_info">
    <div class="charge_header">
      <div class="overage">
        <div class="left">
          <div class="title">账户余额</div>
          <div class="count">
            <span class="info">{{ balance }}</span
            >元
          </div>
        </div>
        <div class="right"></div>
      </div>
      <div class="overage coupon" @click="show_discount">
        <div class="left">
          <div class="title">优惠券</div>
          <div class="count">
            <span class="info">{{ coupon_count }}</span
            >张
          </div>
        </div>
        <div class="right"></div>
      </div>
    </div>
    <div class="charge_content">
      <div class="title">
        <div class="i"></div>
        <div class="info">账户充值</div>
      </div>
      <div class="overage">
        <div class="overage_title">充值金额:</div>
        <div
          :class="['fee', pay_num_index == 0 ? 'fee_active' : '']"
          @click="feeClick(0, 500)"
        >
          500元
        </div>
        <div
          :class="['fee', pay_num_index == 1 ? 'fee_active' : '']"
          @click="feeClick(1, 1000)"
        >
          1000元
        </div>
        <div
          :class="['fee', pay_num_index == 2 ? 'fee_active' : '']"
          @click="feeClick(2, 2000)"
        >
          2000元
        </div>
        <div
          :class="['fee', pay_num_index == 3 ? 'fee_active' : '']"
          @click="feeClick(3, 5000)"
        >
          5000元
        </div>
        <div
          :class="['fee', pay_num_index == 4 ? 'fee_active' : '']"
          @click="feeClick(4, 10000)"
        >
          10000元
        </div>
        <a-input
          class="fee_input"
          v-model="money_num"
          placeholder="自定义金额"
          @change="input_moneyChange"
        /><span class="yuan">元</span>
      </div>
      <div class="overage ways">
        <div class="overage_title">支付方式:</div>
        <div
          :class="['way', payway_index == 0 ? 'way_act' : '']"
          @click="changePayWay(0)"
        >
          <div class="alipay">
            <div class="ali_left"></div>
            <div class="ali_right">
              <div class="ali_title">支付宝支付</div>
              <div class="ali_info">Alipay</div>
            </div>
          </div>
          <div class="wechat"></div>
          <div class="paypal"></div>
        </div>
        <div
          :class="['way', 'expand', payway_index == 1 ? 'way_act' : '']"
          @click="changePayWay(1)"
        >
          <div class="alipay">
            <div class="ali_left wechat_left"></div>
            <div class="ali_right">
              <div class="ali_title">微信支付</div>
              <div class="ali_info">Wechat Pay</div>
            </div>
          </div>
          <div class="wechat"></div>
          <div class="paypal"></div>
        </div>
      </div>
      <div class="btns">
        <div class="pay_btn">
          <a-button type="primary" class="charge_btn">充值</a-button>
        </div>
        <div class="pay_infos">
          *充值金额不支持退款，请理性充值。企业内所有成员购买/续费设备时可共享账户余额。
        </div>
      </div>
    </div>

    <a-modal v-model="discount_pop" :width="500" title="优惠券列表">
      dddd
    </a-modal>
  </div>
</template>
<script>
import { order_recharge, coupon_list } from '@/api/const_manage'
export default {
  name: 'charge_fee',
  data() {
    return {
      pay_num_index: 0,
      money_num: 500,
      payway_index: 0,

      discount_pop: true,
      coupon_count: null,//优惠劵
      balance: null,//余额
    }
  },
  mounted() {
    let c_1 = JSON.parse(localStorage.member)
    this.coupon_count = c_1.coupon_count
    this.balance = c_1.balance
  },
  methods: {
    show_discount() {
      this.discount_pop = true
      this.get_couponlist()
    },
    feeClick(index, num) {
      this.pay_num_index = index
      this.money_num = num
    },
    input_moneyChange: function (e) {
      this.pay_num_index = 5
    },

    changePayWay: function (payindex) {
      this.payway_index = payindex
    },

    async get_couponlist(){
        let { data } = await coupon_list({
           pagesize:200,
      })
      if (data.code == 200) {

      }
    },

    async go_pay() {
      let { data } =await order_recharge({
        money: this.money_num,
      })
      if (data.code == 200) {

      }
    },

  }
}
</script>
<style scoped lang="less">
/deep/ .ant-modal-content {
  min-height: 300px;
}

.charge_info {
  padding-top: 30px;
  padding-left: 194px;

  .charge_header {
    display: flex;
    flex-direction: row;
    // cursor: pointer;
    .overage {
      display: flex;
      flex-direction: row;
      width: 500px;
      height: 166px;
      background: #376af5;
      box-shadow: 0px 6px 8px 1px rgba(55, 106, 245, 0.24);
      border-radius: 15px;
      .left {
        display: flex;
        flex-direction: column;
        margin-left: 85px;
        margin-top: 42px;
        .title {
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #ffffff;
        }
        .count {
          margin-top: 36px;
          color: #ffffff;
          .info {
            font-size: 36px;
            font-family: Source Han Sans CN;
            font-weight: bold;
            margin-right: 6px;
          }
        }
      }
      .right {
        margin-left: 120px;
        margin-top: 30px;
        width: 158px;
        height: 117px;
        background: url("../../assets/img/fee/余额icon@2x.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    .coupon {
      display: flex;
      flex-direction: row;
      margin-left: 190px;
      width: 500px;
      height: 166px;
      background: #038ce7;
      box-shadow: 0px 6px 8px 1px rgba(55, 106, 245, 0.24);
      border-radius: 15px;
      cursor: pointer;
      .right {
        background: url("../../assets/img/fee/优惠券@2x.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .charge_content {
    margin-top: 85px;
    width: 1190px;
    height: 345px;
    background: #ffffff;
    box-shadow: 0px 0px 12px 1px rgba(193, 199, 203, 0.3);
    .title {
      padding-top: 21px;
      margin-left: 42px;
      display: flex;
      flex-direction: row;
      .i {
        margin-top: 3px;
        width: 4px;
        height: 14px;
        background: #4c84ff;
      }
      .info {
        margin-left: 6px;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #374567;
      }
    }
    .overage {
      display: flex;
      flex-direction: row;
      margin-top: 25px;
      margin-left: 42px;
      .overage_title {
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #374567;
        line-height: 40px;
      }
      .fee {
        margin-left: 26px;
        width: 106px;
        height: 40px;
        background: #f7f9fd;
        border: 1px solid #ecf1fc;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
      }
      .fee_active {
        background: #edf3ff;
        border: 1px solid #739afe;
      }
      .fee_input {
        margin-left: 26px;
        width: 200px;
        height: 40px;
      }
      .yuan {
        margin-left: 6px;
        line-height: 40px;
      }
    }
    .ways {
      .way {
        margin-left: 25px;
        .alipay {
          display: flex;
          flex-direction: row;
          width: 160px;
          height: 64px;
          background: #f7f9fd;
          border: 1px solid #ecf1fc;
          cursor: pointer;
          .ali_left {
            margin: 21px 13px 21px 26px;
            width: 22px;
            height: 22px;
            background: url("../../assets/img/fee/ali-lite@2x.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
          .wechat_left {
            background: url("../../assets/img/fee/wx-lite@2x.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
          .pay_left {
            background: url("../../assets/img/fee/paypal-lite@2x.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
          .ali_right {
            display: flex;
            flex-direction: column;
            margin-top: 13px;
            .ali_title {
              font-size: 14px;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #374567;
            }
            .ali_info {
              font-size: 12px;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #abb4c3;
            }
          }
        }
      }
      .way_act {
        background: #edf3ff;
        border: 1px solid #739afe;
      }
      .expand {
        margin-left: 30px;
      }
    }
    .btns {
      display: flex;
      flex-direction: column;
      margin-left: 131px;
      margin-top: 33px;
      .pay_btn {
        display: flex;
        flex-direction: row;
        .charge_btn {
          width: 128px;
          height: 40px;
          background: #4c84ff;
          border-radius: 2px;
          color: #ffffff;
        }
        .cancel_btn {
          width: 128px;
          height: 40px;
          border-radius: 2px;
          margin-left: 19px;
        }
      }
      .pay_infos {
        margin-top: 26px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #abb4c3;
      }
    }
  }
}
</style>