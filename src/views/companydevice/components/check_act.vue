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

      <div class="con_txt">
        <div class="con_txt_1">
          洋淘已于 {{pay_time}} 向贵公司的对公账户发起打款，
        </div>
        <div class="con_txt_1">
          请您于有效期{{expired_at}}前输入准确的金额完成验证。
        </div>
        <div class="con_txt_1">
          超过有效期系统将自动驳回，实名认证失败。请勿向任何人泄露您收到的验证信息。洋淘
        </div>
      </div>

       <div class="line_wrap" >
        <div class="line_left red_title">打款金额</div>
        <div class="line_right">
          <a-input class="right_input" v-model="payment_amount" />
        </div>
      </div>

      <div class="last">
        <a-button type="primary" @click="go_next"> 下一步 </a-button>
      </div>


    </div>
  </div>
</template>
<script>
import { certify_enterprise_confirm_bank,certify_latest_info_v2 } from "@/api/authencation";

export default {
  data() {
    return {
      step_now: 2,
      payment_amount:null,

      pay_time:'',//企业对公打款时间
      expired_at:'',//企业对公打款过期时间
    };
  },
  mounted(){
     this.auth_info()
  },
  methods:{
       async go_next(){
         let {data} = await certify_enterprise_confirm_bank({
             payment_amount:this.payment_amount
         })
         if(data.code ==200){
            this.$router.push({name:'company_faren_home'})
         }
       },
         async auth_info(){
         let {data} = await certify_latest_info_v2({
             type:1
         })
         if(data.code ==200){
           this.pay_time = data.data.pay_time
            this.expired_at = data.data.expired_at
           
         }
       },
  }
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
    .con_txt {
      margin: 0 auto;
      margin-top: 80px;
      width: 685px;
      height: 102px;
      padding-left: 63px;
      padding-top: 15px;
      background: #f1f4fc;
      border-radius: 2px;

      .con_txt_1{
          
color: #374567;
line-height: 24px;
      }
    }

    .red_title::after {
      display: inline-block;
      margin-right: 4px;
      color: #f5222d;
      font-size: 14px;
      font-family: SimSun, sans-serif;
      line-height: 1;
      content: "*";
    }
    .line_wrap {
      display: flex;
      margin-top: 50px;
      .line_left {
        width: 222px;
        text-align: right;
        line-height: 44px;
        margin-left: 160px;
      }
      .line_right {
        width: 430px;
        margin-left: 20px;
        .right_input {
          margin-left: 20px;
          width:  600px;
          height: 44px;
          border-radius: 2px;
        }
        .right_1 {
          line-height: 44px;
        }
      }
    }

      .last {
      margin-left: 423px;
      margin-top: 63px;
    }
  }
}
</style>