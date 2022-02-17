<template>
  <div class="not_ac_wrap">
    <div class="top">
      <div class="top_ico"></div>
      <div>
        为规范互联网信息服务活动，保护您的账户安全，结合相关法律及国家工信部规定，请完成实名认证
      </div>
    </div>
    <div class="down">
      <div class="down_left"></div>
      <div class="down_right">
        <div class="line_1">待认证</div>
        <div class="line_2">完成认证后将享受以下权益：</div>
        <div class="line_3">无须每30天进行boss账号手机号验证</div>
        <div class="line_3">设备购买数量不受限制</div>

        <a-button type="primary" class="line_btn" @click="go_ac"> 立即认证 </a-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
      go_ac(){
          this.$emit("go_authcation")
      }
  }
}
</script>
<style scoped lang="less">
.not_ac_wrap {
  .top {
    width: 1510px;
    height: 42px;
    margin: 0 auto;
    margin-top: 23px;
    line-height: 42px;
    background: #fff0f0;
    border: 1px solid #f8d0d6;
    text-align: center;

    font-size: 14px;

    color: #374567;
    display: flex;
    justify-content: center;
    .top_ico {
      margin-top: 13px;
      width: 16px;
      height: 16px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
      background-image: url("../../../assets/img/authcation/形状 1@2x.png");
    }
  }
  .down {
    width: 750px;
    height: 370px;
    margin: 0 auto;
    margin-top: 128px;
    background: #ffffff;
    box-shadow: 0px 0px 12px 1px rgba(193, 199, 203, 0.3);
    display: flex;
    .down_left {
      margin-left: 133px;
      margin-top: 86px;
      width: 146px;
      height: 174px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
      background-image: url("../../../assets/img/authcation/待认证@2x.png");
    }
    .down_right {
      margin-left: 133px;
      // border: 1px solid red;
      .line_1 {
        width: 73px;
        height: 23px;
        font-size: 24px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #374567;
        line-height: 24px;
        margin-top: 82px;
      }
      .line_2 {
        margin-top: 21px;
        height: 15px;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #374567;
        line-height: 14px;
      }
      .line_3 {
        margin-top: 17px;
        height: 15px;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #606c80;
        line-height: 14px;
      }
      .line_btn {
        margin-top: 34px;
        width: 128px;
      }
    }
  }
}
</style>