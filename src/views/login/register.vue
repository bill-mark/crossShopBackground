<template>
  <div class="register_wrap">
    <div class="content">
      <div class="content_left"></div>
      <div class="content_right">
        <div class="top_txt">注册洋淘账号</div>
        <div class="line_title" style="margin-top: 28px">手机号</div>

        <a-input-group compact class="phone_line">
          <a-select default-value="+86" v-model="register_code">
            <a-select-option value="+86"> 中国(+86) </a-select-option>
            <a-select-option value="+1"> 美国(+1) </a-select-option>
          </a-select>
          <a-input
            style="width: 370px; height: 50px"
            placeholder="输入手机号"
            v-model="phone"
          />
        </a-input-group>

        <div class="line_title">验证码</div>

        <div class="middle_password_line">
          <a-input-number
            placeholder="请输入验证码"
            v-model="messagecode"
            style="width: 356px; height: 50px; line-height: 50px"
          />
          <a-button
            type="primary"
            :loading="get_messagecode_state"
            @click="get_messagecode"
            style="margin-left: 10px; height: 50px"
          >
            获取验证码
          </a-button>
        </div>

        <div class="line_title">推荐码</div>

        <a-input
          placeholder="推荐码 (选填)"
          class="invite_line"
          v-model="invite_code"
        />

        <a-checkbox v-model="is_agreen" class="agreen_line">
          我已阅读并同意洋淘浏览器
          <a href="/client_v1/article/user-agreement" target="view_window"><<用户协议>></a> 
          和
           <a href="/client_v1/article/privacy" target="view_window"><<隐私政策>></a> 
         
          
        </a-checkbox>

        <a-button type="primary" class="down_btn" @click="go_register">
          确定
        </a-button>

        <div class="down_line" @click="go_login">我有账号，直接登录 》</div>
      </div>
    </div>
  </div>
</template>
<script>
import { user_send_sms, user_register } from '@/api/login'
export default {
  data() {
    return {
      invite_code: '',
      register_code: '+86',
      phone: '',
      messagecode: null,
      get_messagecode_state: false,

      is_agreen: false,
    }
  },
  mounted() {
    this.invite_code = this.$route.query.invite
    console.log(this.invite_code)
  },
  methods: {
    async get_messagecode() {
      this.get_messagecode_state = true
      let { data } = await user_send_sms({
        phone: this.phone,
      })
      this.get_messagecode_state = false
      if (data.code == 200) {

        this.$message.success('验证码已发出')
      }
    },
    go_login() {
      this.$router.push({ name: 'login_login' })
    },
    go_out(link) {
      window.open(link)
    },
    async go_register() {
      if (!this.is_agreen) {
        this.$message.error('用户协议没有勾选!')
        return
      }

      let { data } = await user_register({
        phone: this.phone,
        verify_code: this.messagecode,
        invited_code: this.invite_code,
        register_code: this.register_code,
      })
      if (data.code == 200) {

        this.$message.success('注册成功')
      }
    }
  }
}
</script>

<style scoped lang="less">
.register_wrap {
  background: white;
  margin-left: 40px;
  .content {
    width: 920px;
    height: 540px;
    margin: 0 auto;
    margin-top: 50px;
    display: flex;
    .content_left {
      width: 342px;
      height: 540px;
      background-image: url("../../assets/img/login/left.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .content_right {
      flex: 1;
      border: 1px solid #e5e5e5;
      .top_txt {
        width: 146px;
        margin-left: 43px;
        margin-top: 44px;
        height: 24px;
        font-size: 24px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #374567;
        line-height: 24px;
      }
      .line_title {
        width: 42px;
        margin-left: 45px;
        margin-top: 14px;
        height: 14px;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #374567;
        line-height: 14px;
      }
      .phone_line {
        margin-left: 45px;
        margin-top: 12px;
        height: 50px;

        /deep/ .ant-select-selection {
          height: 50px;
        }
        /deep/ .ant-select-selection__rendered {
          line-height: 50px;
        }
      }

      .middle_password_line {
        display: flex;
        height: 50px;
        margin-top: 12px;
        margin-left: 45px;
      }
      .invite_line {
        margin-top: 12px;
        margin-left: 45px;
        height: 50px;
        width: 469px;
      }
      .agreen_line {
        margin-top: 12px;
        margin-left: 45px;
        .content_link {
          cursor: pointer;
          color: #3860f4;
        }
      }

      .down_btn {
        margin-top: 29px;
        margin-left: 45px;
        width: 496px;
        height: 50px;
        border-radius: 2px;
        font-size: 16px;
      }
      .down_line {
        text-align: center;
        margin-top: 35px;
        cursor: pointer;
        height: 14px;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #3860f4;
      }
    }
  }
}
</style>
