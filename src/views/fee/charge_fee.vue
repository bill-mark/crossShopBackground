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
        <a-input-number
          class="fee_input"
          v-model="money_num"
          :min="1"
          placeholder="自定义金额"
          @change="input_moneyChange"
        />
        <span class="yuan">元</span>
      </div>
      <div class="overage ways">
        <div class="overage_title">支付方式:</div>
        <div
          :class="['way', check_payway_id == 2 ? 'way_act' : '']"
          @click="changePayWay(2)"
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
          :class="['way', 'expand', check_payway_id == 3 ? 'way_act' : '']"
          @click="changePayWay(3)"
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
          <a-button
            type="primary"
            class="charge_btn"
            :loading="order_paystate"
            @click="go_pay"
          >
            充值</a-button
          >
        </div>
        <div class="pay_infos">
          *充值金额不支持退款，请理性充值。企业内所有成员购买/续费设备时可共享账户余额。
        </div>
      </div>
    </div>

    <a-modal
      title="请用微信扫一扫支付"
      v-model="wechat_modal"
      @ok="wechat_pop_handle"
    >
      <template slot="footer">
        <a-button key="back" @click="wechat_modal = false"> 取消 </a-button>
        <a-button key="submit" type="primary" @click="wechat_pop_handle">
          我已付款
        </a-button>
      </template>

      <div
        class="modal_chart"
        id="chargefee_qrcode"
        ref="chargefee_qrcode"
      ></div>
    </a-modal>

    <a-modal title="付款结果" v-model="pay_result" @ok="ali_pop_handle">
      <template slot="footer">
        <a-button key="back" @click="pay_result = false"> 放弃付款 </a-button>
        <a-button key="submit" type="primary" @click="get_orderinfo">
          我已付款
        </a-button>
      </template>

      <dir>是否已经付款?</dir>
    </a-modal>
  </div>
</template>
<script>
import {
  order_recharge, device_pay_channel,
  client_v1_pay, order_info
} from '@/api/const_manage'
import { user_info } from '@/api/login'
import QRCode from 'qrcode2'
export default {
  name: 'charge_fee',
  data() {
    return {
      pay_num_index: 0,
      money_num: 500,


      balance: null,//余额
      order_paystate: false,//下单接口状态

      payway_list: [],
      check_payway_id: 2,

      order_id: '',//订单id
      order_paystate: false,//下单接口状态
      wechat_modal: false,//微信二维码弹窗

      alipay_tem: null,//支付宝支付表单
      ali_modal: false,//支付宝二维码弹窗

      pay_result: false,//付款状态弹窗
    }
  },
  mounted() {
    this.get_userinfo()
    this.get_payway()
  },
  methods: {
    async get_userinfo() {
      let { data } = await user_info({
        user_role: JSON.parse(localStorage.member).user_role
      })
      if (data.code == 200) {
        localStorage.member = JSON.stringify(data.data.member)
        this.balance = data.data.member.balance

      }
    },
    async get_payway() {
      let { data } = await device_pay_channel()
      if (data.code == 200) {
        this.payway_list = data.data.list.filter(item => {
          return item.title.indexOf('余额') < 0
        })
        // console.log( this.payway_list )
      }
    },




    feeClick(index, num) {
      this.pay_num_index = index
      this.money_num = num
    },
    input_moneyChange: function (e) {
      this.pay_num_index = 5
    },

    changePayWay: function (payid) {
      this.check_payway_id = payid
    },

    //下单
    async go_pay() {
      this.order_paystate = true
      let { data } = await order_recharge({
        money: this.money_num,
        pay_channel_id: this.check_payway_id,
      })
      this.order_paystate = false
      if (data.code == 200) {
        this.order_id = data.data.id
        this.ali_handle_pay(data.data.key, this.check_payway_id)
      }
    },
    //调用支付宝 微信
    async ali_handle_pay(key, type) {
      let { data } = await client_v1_pay({
        key: key,
      })
      if (data.code == 200) {
        //微信
        if (type == 3) {
          this.wechat_modal = true
          this.$nextTick(function () {
            this.creatQrCode(data.data.code_url)
          })
        }

        //支付宝
        if (type == 2) {
          this.alipay_tem = data.data.template

          let dwSafari
          dwSafari = window.open();
          dwSafari.document.open();
          let dataObj = data.data.template
          let html = dataObj.replace(/[^\u0000-\u00FF]/g, function ($0) { return escape($0).replace(/(%u)(\w{4})/gi, "&#x$2;") });
          dwSafari.document.write("<html><head><title></title><meta charset='utf-8'><body>" + dataObj + "</body></html>")
          dwSafari.document.forms[0].submit()
          dwSafari.document.close()

          this.pay_result = true

        }

      }
    },
    creatQrCode(urldata) {
      //console.log(urldata)
      this.$refs.chargefee_qrcode.innerHTML = '';
      new QRCode(this.$refs.chargefee_qrcode, {
        text: urldata, //页面地址 ,如果页面需要参数传递请注意哈希模式#
        width: 160,
        height: 160,
      })
    },
    wechat_pop_handle() {
      this.get_orderinfo()
    },
    //订单付款状态
    async get_orderinfo() {
      let { data } = await order_info({
        id: this.order_id,
      })
      if (data.code == 200) {
        if (data.data.status == 1) {
          this.$message.success('充值成功!')
          location.reload()
        }

        if (data.data.status == 0) {
          this.$message.warning('没有检测到付款,请稍后再试!')
        }

      }
    },
    ali_pop_handle() {
      this.ali_modal = false
      this.get_orderinfo()
    },



  }
}
</script>
<style scoped lang="less">
/deep/ .ant-modal-content {
  min-height: 300px;
}

.modal_chart {
  width: 160px;
  height: 160px;
  margin: 0 auto;
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
        margin-left: 85px;
        margin-top: 42px;
        width: 200px;
        flex: none;
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
        margin-left: 32px;
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