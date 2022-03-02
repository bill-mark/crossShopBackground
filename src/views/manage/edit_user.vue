<template>
  <div class="adden_wrap">
    <div class="top_line">
      <a-button type="primary" class="top_l_btn" @click="go_back">
        <a-icon type="left" />返回
      </a-button>
      <div class="top_l_right">修改个人信息</div>
    </div>

    <div class="cell_title">
      <div class="cell_title_left"></div>
      <div class="cell_title_right">个人基本信息</div>
    </div>

    <div class="cell_line">
      <div class="line_left">登录手机号</div>
      <div class="line_middle">{{ business_phone }}</div>
      <div class="line_right"></div>
    </div>

    <div class="cell_line">
      <a-button @click="open_password">修改密码</a-button>
    </div>

    <section v-if="!user_role">
      <div class="cell_title">
        <div class="cell_title_left"></div>
        <div class="cell_title_right">企业基本信息</div>
      </div>

      <div class="cell_line">
        <div class="line_left">姓名</div>
        <div class="line_middle">{{ real_name }}</div>
        <div class="line_right"></div>
      </div>

      <div class="cell_line">
        <div class="line_left">用户名</div>
        <div class="line_middle">{{ username }}</div>
        <div class="line_right"></div>
      </div>

      <div class="cell_line">
        <div class="line_left">公司名称</div>
        <div class="line_middle">{{ business_name }}</div>
        <div class="line_right"></div>
      </div>

      <div class="cell_line">
        <a-button @click="open_comname">修改公司名称</a-button>
      </div>
    </section>

    <a-modal v-model="boss_isshow" :width="500" title="修改密码">
      <div class="middle_line">
        <div class="middle_p_left">手机号：</div>
        <a-input-group compact>
          <a-input
            style="width: 200px"
            placeholder="输入手机号"
            v-model="bos_phone"
          />
        </a-input-group>
      </div>

      <div class="middle_password_line">
        <div class="middle_p_left">验证码：</div>
        <a-input
          placeholder="请输入验证码"
          v-model="bos_messagecode"
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

      <div class="middle_password_line">
        <div class="middle_p_left">新密码：</div>
        <a-input-password
          placeholder="输入密码"
          v-model="bos_password"
          style="width: 200px"
        />
      </div>

      <a-button type="primary" class="pop_boss_btn" @click="boss_setpassword">
        确定
      </a-button>
    </a-modal>

    <a-modal v-model="staff_isshow" :width="500" title="修改密码">
      <div class="middle_password_line">
        <div class="middle_p_left">旧密码：</div>
        <a-input-password
          placeholder="输入旧密码"
          v-model="staff_old_password"
          style="width: 200px"
        />
      </div>

      <div class="middle_password_line">
        <div class="middle_p_left">新密码：</div>
        <a-input-password
          placeholder="输入旧密码"
          v-model="staff_new_password"
          style="width: 200px"
        />
      </div>

      <a-button type="primary" class="pop_boss_btn" @click="staff_setpassword">
        确定
      </a-button>
    </a-modal>

    <a-modal v-model="comname_isshow" :width="500" title="修改公司名">
      

      <div class="middle_password_line" style="margin-top:0px">
        <div class="middle_p_left" >新公司名：</div>
        <a-input
          placeholder="输入新公司名"
          v-model="new_comname"
          style="width: 200px"
        />
      </div>

      <a-button type="primary" class="pop_boss_btn" @click="set_comname">
        确定
      </a-button>
    </a-modal>


  </div>
</template>
<script>
import { user_info, user_send_sms, user_set_password, user_edit_password,user_edit_business_name } from '@/api/login'
export default {
  data() {
    return {
      user_role: null,
      business_phone: '',
      real_name: '',
      username: '',
      business_name: '',
      boss_isshow: false,//boss修改密码弹窗
      staff_isshow: false,
      comname_isshow:false,//修改公司名弹窗
      new_comname:'',

      bos_phone: null,
      bos_messagecode: null,
      bos_password: null,
      get_messagecode_state: false,

      staff_old_password: null,
      staff_new_password: null,
    };
  },
  mounted() {
    let c_1 = JSON.parse(localStorage.member)
    this.user_role = c_1.user_role



    this.get_info()
  },
  methods: {
    go_back() {
     this.$router.back(-1)
    },
    async get_info(type) {
      let { data } = await user_info({
        user_role: this.user_role
      })
      if (data.code == 200) {
        this.business_phone = data.data.member.business_phone
        this.real_name = data.data.member.real_name
        this.username = data.data.member.username
         this.business_name = data.data.member.business_name
        // if (data.data.user) {
        //   this.business_name = data.data.user.business_name
        // }

         localStorage.member = JSON.stringify(data.data.member);
        localStorage.user = JSON.stringify(data.data.user);

        if(type =='update'){
           location.reload();
        }

      }
    },
    open_password() {
      if (this.user_role == 0) {
        this.boss_isshow = true
      }
      if (this.user_role == 1) {
        this.staff_isshow = true
      }
    },

    async get_messagecode() {
      if (this.get_messagecode_state) {
        return
      }

      this.get_messagecode_state = true
      let { data } = await user_send_sms({
        phone: this.bos_phone,
      })
      if (data.code == 200) {

        this.$message.success('验证码已发出,60秒之后可再次点击获取')
         setTimeout(() => {
          this.get_messagecode_state = false
        }, 60000)
      }
    },
    async boss_setpassword() {
      let { data } = await user_set_password({
        password: this.bos_password,
        phone: this.bos_phone,
        verify_code: this.bos_messagecode
      })
      if (data.code == 200) {
        this.boss_isshow = false
        this.$message.success('密码修改成功')
      }
    },

    async staff_setpassword() {
      let { data } = await user_edit_password({
        new_password: this.staff_new_password,
        old_password: this.staff_old_password,
      })
      if (data.code == 200) {
        this.staff_isshow = false
        this.$message.success('密码修改成功')
      }
    },

    open_comname(){
     this.comname_isshow = true
    },
    async set_comname() {
      let { data } = await user_edit_business_name({
        business_name: this.new_comname,
      })
      if (data.code == 200) {
        this.comname_isshow = false
        this.$message.success('公司名称修改成功!')
         this.get_info('update')
        
      }
    },


  },
};
</script>
<style scoped lang="less">
/deep/ .ant-modal-footer {
  display: none;
}

/deep/ .ant-modal-content {
  min-height: 200px;
}

.middle_line {
  display: flex;
  height: 30px;
  .middle_p_left {
    line-height: 30px;
    width: 70px;
    flex: none;
    margin-left: 30px;
  }
}

.middle_password_line {
  display: flex;
  height: 30px;
  margin-top: 20px;
  .middle_p_left {
    line-height: 30px;
    width: 70px;
    flex: none;
    margin-left: 30px;
  }
}

.pop_boss_btn {
  margin-left: 200px;
  margin-top: 20px;
}

.adden_wrap {
  width: 1200px;
  background: white;
  margin: 0 auto;
  min-height: 700px;
  margin-top: 20px;
  .top_line {
    display: flex;
    .top_l_btn {
      margin-left: 20px;
      margin-top: 20px;
    }
    .top_l_right {
      margin-top: 22px;
      color: #28282a;
      font-size: 24px;
      font-weight: bold;
      line-height: 24px;
      margin-left: 20px;
    }
  }
  .cell_title {
    display: flex;
    height: 16px;
    margin-top: 20px;
    margin-left: 122px;
    .cell_title_left {
      border-left: 3px solid #3569fd;
    }
    .cell_title_right {
      font-size: 16px;
      line-height: 16px;
      color: #28282a;
      font-weight: bold;
      margin-left: 5px;
    }
  }
  .cell_line {
    display: flex;
    height: 32px;
    margin-top: 25px;
    margin-left: 122px;

    //border: 1px solid red;
    .line_left {
      width: 115px;
      line-height: 32px;
    }
    .line_middle {
      width: 330px;
      line-height: 32px;
    }
  }
}
</style>
