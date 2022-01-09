<template>
  <div class="logincompany_wrap">
    <div class="content">
      <div class="top">
        <div :class="[type == 5 ? 'top_left_checked' : 'top_left']">
          企业登录
        </div>
      </div>

      <div class="middle_line">
        <div class="middle_p_left">公司名：</div>

        <a-input
          style="width: 250px"
          placeholder="输入公司名"
          v-model="business_name"
        />
      </div>
      <div class="middle_line" style="margin-top:30px">
        <div class="middle_p_left">用户名：</div>

        <a-input
          style="width: 250px"
          placeholder="输入公司用户名"
          v-model="business_user"
        />
      </div>

      <div class="middle_password_line" v-show="type == 5">
        <div class="middle_p_left">密码：</div>
        <a-input-password
          placeholder="输入公司密码"
          v-model="business_password"
          style="width: 250px"
        />
      </div>

      <div class="middle_down">
        <a-checkbox
          v-show="type == 5"
          class="middle_d_left"
          :checked="checked"
          @change="rember_password"
        >
          记住密码
        </a-checkbox>

        <div class="middle_d_right" v-show="type == 3">找回密码</div>
      </div>

      <a-button type="primary" class="down_btn" @click="go_login">
        登录
      </a-button>

      <a-button class="com_btn" @click="go_company_login">
        切换到普通登录
      </a-button>
    </div>
  </div>
</template>
<script>
import { user_login } from "@/api/login";
export default {
  data() {
    return {
      type: 5,
      phone: "",
      password: "",
      messagecode: null,
      get_messagecode_state: false,
      checked: true, //是否记住密码

      business_name: "",
      business_user: "",
      business_password: "",
    };
  },
  mounted() {
    if (localStorage.user_password) {
      this.password = localStorage.user_password;
      this.phone = localStorage.user_phone;
    }
  },
  methods: {
    test() {
      console.log("test");
      console.log(this.phone);
    },
    go_company_login() {
      this.$router.push({ name: "login" });
    },
    change_type(data) {
      this.type = data;
    },
    rember_password(e) {
      this.checked = e.target.checked;
    },
    async go_login() {
      if (this.type == 5) {
        if (this.checked) {
          localStorage.business_name = this.business_name;
          localStorage.business_user = this.business_user;
          localStorage.business_password = this.business_password;
        } else {
          localStorage.business_name = "";
          localStorage.business_user = "";
          localStorage.business_password = "";
        }
      }

      let { data } = await user_login({
        type: 5,
        business_name:this.business_name,
        business_pwd:this.business_password,
        username:this.business_user
      });
      //console.log(data);
      if (data.code == 200) {
        localStorage.member = JSON.stringify(data.data.member);
        localStorage.user = JSON.stringify(data.data.user);
        localStorage.token = data.data.token;
        this.$router.push({ name: "manage_home" });
      }
    },
  },
};
</script>

<style scoped lang="less">
.logincompany_wrap {
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
      margin-top: 40px;
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