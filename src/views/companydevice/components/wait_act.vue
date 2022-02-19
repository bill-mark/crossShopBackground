<template>
  <div class="wait_act_wrap">
    <div class="top_line">
      仅用于平台实名认证，平台不会泄露您的信息，请放心认证。
    </div>

    <div class="content">
      <div class="content_top">
        <a-steps :current="step_now">
          <a-step title="填写企业信息" />
          <a-step title="等待审核" />
          <a-step title="核对打款信息" />
          <a-step title="完成认证" />
        </a-steps>
      </div>

      <div class="cont_img"></div>

      <div class="cont_down">等待信息审核</div>
    </div>
  </div>
</template>
<script>


export default {
  data() {
    return {
      step_now: 1,
    };
  },
};
</script>
<style scoped lang="less">


.wait_act_wrap {
  .top_line {
    margin: 0 auto;
    margin-top: 29px;
    padding-left: 60px;

    width: 1304px;
    height: 44px;
    line-height: 44px;
    background: #fefbf1;

    color: #e7a848;
  }
  .content {
    margin: 0 auto;
    margin-top: 42px;
    width: 1304px;
    height: 1017px;
    background: #ffffff;
    box-shadow: 0px 0px 12px 1px rgba(193, 199, 203, 0.3);
    .content_top {
      margin: 0 auto;
      padding-top: 45px;
      width: 880px;
    }
    .cont_img{
         margin: 0 auto;
         margin-top: 120px;
         width: 80px;
         height: 80px;
         background-image: url("../../../assets/img/authcation/审核中@2x.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .cont_down{
         margin: 0 auto;
         margin-top: 35px;
        width: 98px;
height: 16px;
font-size: 16px;
font-family: Source Han Sans CN;
font-weight: 500;
color: #374567;
line-height: 88px;
    }
  }
}
</style>