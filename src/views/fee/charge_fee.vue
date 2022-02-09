<template>
  <div class="charge_info">
    <div class="charge_header">
      <div class="overage">
        <div class="left">
          <div class="title">账户余额</div>
          <div class="count"><span class="info">0.00</span>元</div>
        </div>
        <div class="right"></div>
      </div>
      <div class="overage coupon">
        <div class="left">
          <div class="title">优惠券</div>
          <div class="count"><span class="info">0</span>张</div>
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
        <div :class="['fee', Act.one ? 'fee_active' : '']" @click="feeClick('one')">500元</div>
        <div :class="['fee', Act.two ? 'fee_active' : '']" @click="feeClick('two')">1000元</div>
        <div :class="['fee', Act.three ? 'fee_active' : '']" @click="feeClick('three')">2000元</div>
        <div :class="['fee', Act.four ? 'fee_active' : '']" @click="feeClick('four')">5000元</div>
        <div :class="['fee', Act.five ? 'fee_active' : '']" @click="feeClick('five')">10000元</div>
        <a-input class="fee_input" v-model="inputMoney" placeholder="自定义金额" @change="moneyChange" /><span class="yuan">元</span>
      </div>
      <div class="overage ways">
        <div class="overage_title">支付方式:</div>
        <div :class="['way', way.isAli ? 'way_act' : '']" @click="changePayWay('isAli')">
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
        <div :class="['way', 'expand', way.isWeChat ? 'way_act' : '']" @click="changePayWay('isWeChat')">
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
          <a-button class="cancel_btn" @click="onCancel">取消</a-button>
        </div>
        <div class="pay_infos">*充值金额不支持退款，请理性充值。企业内所有成员购买/续费设备时可共享账户余额。</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'charge_fee',
  data() {
    return {
      Act: {
        one: true,
        two: false,
        three: false,
        four: false,
        five: false
      },
      btnMoney: '500',
      inputMoney: null,
      way: {
        isAli: true,
        isWeChat: false,
        isPal: false
      }
    }
  },
  watch: {
    inputMoney(val) {
      if (val !== '') {
        this.Act = {
          one: false,
          two: false,
          three: false,
          four: false,
          five: false
        }
      }
    }
  },
  methods: {
    feeClick: function(key) {
      const moneyMap = {
        'one': '500',
        'two': '1000',
        'three': '2000',
        'four': '5000',
        'five': '10000'
      };
      Object.keys(this.Act).forEach((item) => {
        if (item === key) {
          this.Act[item] = true;
          this.btnMoney = moneyMap[key];
          this.money = moneyMap[key];
        } else {
          this.Act[item] = false;
        }
      });
      this.inputMoney = null;
    },
    moneyChange: function(e) {
      // console.log(e)
      this.money = e.target.value;
    },
    changePayWay: function(pay) {
      Object.keys(this.way).forEach(item => {
        if (pay === item) {
          this.way[item] = true;
        } else {
          this.way[item] = false;
        }
      });
    },
    onCancel: function() {
      this.$confirm({
        title: '取消支付',
        content: '请确认是否需要取消支付',
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => console.log('Oops errors!'));
        },
        onCancel() {},
      });
    }
  }
}
</script>
<style scoped lang="less">
.charge_info {
  padding-top: 30px;
  padding-left: 194px;
  
  .charge_header {
    display: flex;
    flex-direction: row;
    cursor: pointer;
    .overage {
      display: flex;
      flex-direction: row;
      width: 500px;
      height: 166px;
      background: #376AF5;
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
          color: #FFFFFF;
        }
        .count {
          margin-top: 36px;
          color: #FFFFFF;
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
        background: url('../../assets/img/fee/余额icon@2x.png');
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
      background: #038CE7;
      box-shadow: 0px 6px 8px 1px rgba(55, 106, 245, 0.24);
      border-radius: 15px;
      .right {
        background: url('../../assets/img/fee/优惠券@2x.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .charge_content {
    margin-top: 85px;
    width: 1190px;
    height: 345px;
    background: #FFFFFF;
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
        background: #4C84FF;
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
        background: #F7F9FD;
        border: 1px solid #ECF1FC;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
      }
      .fee_active {
        background: #EDF3FF;
        border: 1px solid #739AFE;
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
          background: #F7F9FD;
          border: 1px solid #ECF1FC;  
          cursor: pointer;
          .ali_left {
            margin: 21px 13px 21px 26px;
            width: 22px;
            height: 22px;
            background: url('../../assets/img/fee/ali-lite@2x.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
          .wechat_left {
            background: url('../../assets/img/fee/wx-lite@2x.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
          .pay_left {
            background: url('../../assets/img/fee/paypal-lite@2x.png');
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
              color: #ABB4C3;
            }
          }
        }
      }
      .way_act {
        background: #EDF3FF;
        border: 1px solid #739AFE;
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
          background: #4C84FF;
          border-radius: 2px;
          color: #FFFFFF;
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
        color: #ABB4C3;
      }
    }
  }
}
</style>