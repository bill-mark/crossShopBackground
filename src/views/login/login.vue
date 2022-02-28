<template>
  <div class="login_wrap">
    <div class="content">
      <div class="top">
        <div
          :class="[type == 1 ? 'top_left_checked' : 'top_left']"
          @click="change_type(1)"
        >
          验证码登录
        </div>
        <div
          :class="[type == 3 ? 'top_right_checked' : 'top_right']"
          @click="change_type(3)"
        >
          个人密码登录
        </div>
      </div>

      <div class="middle_line">
        <div class="middle_p_left">手机号：</div>
        <a-input-group compact>
          <!-- <a-select default-value="+86" v-model="register_code">
            <a-select-option value="+86"> 中国(+86) </a-select-option>
            <a-select-option value="+1"> 美国(+1) </a-select-option>
          </a-select> -->
          <a-input
            style="width: 200px"
            placeholder="输入手机号"
            v-model="phone"
          />
        </a-input-group>
      </div>

      <div class="middle_password_line" v-show="type == 3">
        <div class="middle_p_left">密码：</div>
        <a-input-password
          placeholder="输入密码"
          v-model="password"
          style="width: 200px"
        />
      </div>

      <div class="middle_password_line" v-show="type == 1">
        <div class="middle_p_left">验证码：</div>
        <a-input
          placeholder="请输入验证码"
          v-model="messagecode"
          style="width: 120px"
        />
        <a-button
          type="primary"
          :loading="get_messagecode_state"
          @click="get_messagecode"
          style="margin-left: 20px"
        >
          获取验证码
        </a-button>
      </div>

      <div class="middle_down">
        <a-checkbox
          v-show="type == 3"
          class="middle_d_left"
          :checked="checked"
          @change="rember_password"
        >
          记住密码
        </a-checkbox>

        <!-- <div class="middle_d_right" v-show="type == 3">找回密码</div> -->
      </div>

      <a-button type="primary" class="down_btn" @click="go_login">
        登录
      </a-button>

      <a-button class="com_btn" @click="go_company_login">
        切换到企业员工登录
      </a-button>

      <a-button type="primary" @click="go_register" style="margin-left:130px">
      跳转注册
    </a-button>

    </div>
  </div>
</template>
<script>
import { user_login, user_send_sms } from '@/api/login'
export default {
  data() {
    return {
      type: 1,
      phone: "",
      password: '',
      messagecode: null,
      get_messagecode_state: false,
      checked: true, //是否记住密码

      register_code: '+86',
    };
  },
  mounted() {
    if (localStorage.user_password) {
      this.password = localStorage.user_password
      this.phone = localStorage.user_phone
    }
  },
  methods: {
    test() {
      console.log('test 18210190263 1' + '17888889999')
      console.log(this.phone)
    },
    go_register(){
           this.$router.push({name:'login_register'})
        },
    go_company_login() {
      this.$router.push({ name: 'login_company' })
    },
    change_type(data) {
      this.type = data;
    },
    async get_messagecode() {
      if (this.get_messagecode_state) {
        return
      }

      this.get_messagecode_state = true
      let { data } = await user_send_sms({
        phone: this.phone,
      })

      if (data.code == 200) {
        this.$message.success('验证码已发出,60秒之后可再次点击获取')

        setTimeout(() => {
          this.get_messagecode_state = false
        }, 60000)

      }
    },
    rember_password(e) {
      this.checked = e.target.checked;
    },
    async go_login() {
      if (this.type == 3) {
        if (this.checked) {
          localStorage.user_password = this.password
          localStorage.user_phone = this.phone
        } else {
          localStorage.user_password = ''
        }
      }

      let { data } = await user_login({
        phone: this.phone,
        type: this.type,
        verify_code: this.messagecode,
        password: this.password,
        register_code: this.register_code,
      })
      console.log(data)
      if (data.code == 200) {
        localStorage.member = JSON.stringify(data.data.member)
        localStorage.user = JSON.stringify(data.data.user)
        localStorage.token = data.data.token
        this.$router.push({ name: 'manage_home' })
      }
    }
  },
};
</script>

<style scoped lang="less">
.login_wrap {
  background: white;
  margin-left: 40px;
  .content {
    width: 450px;
    height: 520px;
    margin: 0 auto;
    margin-top: 40px;
    border: 1px solid #e6e6e6;
    .top {
      display: flex;
      justify-content: center;
      margin-top: 60px;
      height: 50px;
      .top_left {
        font-size: 16px;
        line-height: 50px;
        cursor: pointer;
      }
      .top_left:hover {
        color: #4c84ff;
      }
      .top_left_checked {
        line-height: 50px;
        font-size: 24px;
        font-weight: bold;
      }
      .top_right {
        margin-left: 40px;
        font-size: 16px;
        line-height: 50px;
        cursor: pointer;
      }
      .top_right:hover {
        color: #4c84ff;
      }
      .top_right_checked {
        margin-left: 40px;
        line-height: 50px;
        font-size: 24px;
        font-weight: bold;
      }
    }
    .middle_line {
      display: flex;
      height: 30px;
      margin-top: 50px;
      .middle_p_left {
        line-height: 30px;
        width: 70px;
        flex: none;
        margin-left: 30px;
      }
    }
    .middle_password_line {
      display: flex;
      height: 40px;
      margin-top: 30px;
      .middle_p_left {
        line-height: 30px;
        width: 70px;
        flex: none;
        margin-left: 30px;
      }
    }
    .middle_down {
      display: flex;
      height: 40px;
      margin-top: 40px;
      justify-content: space-between;
      .middle_d_left {
        margin-left: 33px;
      }
      .middle_d_right {
        margin-right: 40px;
        color: #4c84ff;
        cursor: pointer;
      }
    }
    .down_btn {
      margin-left: 33px;
      margin-top: 20px;
      width: 380px;
    }
    .com_btn {
      margin-left: 33px;
      margin-top: 40px;
    }
  }
}
</style>