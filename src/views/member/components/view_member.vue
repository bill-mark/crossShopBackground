<template>
  <a-modal
    v-model="isshow"
    :width="900"
    title="成员详情"
    @cancel="handleCancel"
  >
    <div class="top_wrap">
      <div class="line_left">
        <div class="line_l_title">用户名:</div>
        <div class="line_l_txt">{{ modaldata.username }}</div>
      </div>
      <div class="line_right">
        <div class="line_r_title">联系方式:</div>
        <div class="line_r_txt">{{ modaldata.contact }}</div>
      </div>
    </div>

    <div class="top_wrap">
      <div class="line_left">
        <div class="line_l_title">姓名:</div>
        <div class="line_l_txt">{{ modaldata.real_name }}</div>
      </div>
      <div class="line_right">
        <div class="line_r_title">绑定登录手机号:</div>
        <div class="line_r_txt">{{ modaldata.business_phone }}</div>
      </div>
    </div>

    <div class="top_wrap">
      <div class="line_left">
        <div class="line_l_title">角色:</div>
        <div class="line_l_txt">{{ modaldata.role_title }}</div>
      </div>
      <div class="line_right">
        <div class="line_r_title">登录限制:</div>
        <div class="line_r_txt">
          {{ format_logintime(modaldata.login_time) }}
        </div>
      </div>
    </div>

    <div class="top_wrap">
      <div class="line_left">
        <div class="line_l_title">部门:</div>
        <div class="line_l_txt">{{ formate_depart(modaldata.depart) }}</div>
      </div>
    </div>

    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="授权环境">
        <div class="tab_envment_wrap">
          <div
            class="tab_envment_line"
            v-for="item in modaldata.auth_environment"
            :key="item.id"
          >
            {{ item.env_name }}
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="登录日志" force-render>
        Content of Tab Pane 2
      </a-tab-pane>
      <a-tab-pane key="3" tab="操作日志" force-render>
        Content of Tab Pane 3
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>
<script>
import { user_listdepartment } from "@/api/member.js";
export default {
  props: {
    modalstatus: Boolean,
    modaldata: Object,
  },
  data() {
    return {
      isshow: false,

    };
  },
  mounted() {
    this.isshow = this.modalstatus;
    console.log(this.modaldata)
    // this.get_departlist()
  },
  methods: {

    handleCancel() {
      this.isshow = false;
      this.$emit("cancel");
    },
    format_logintime(data) {
      if (data == 0) {
        return '不限制'
      }
      if (data == 1) {
        return '限制'
      }
    },
    //格式化部门
    formate_depart(data) {
      let c_1 = []
      if (data.length == 0) {
        return
      }
      data.forEach(item => {
        c_1.push(item.title)
      })
      return c_1.toString()
    },
  },
};
</script>
<style scoped lang="less">
/deep/ .ant-modal-footer {
  display: none;
}

/deep/ .ant-modal-body {
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 0px;
}

/deep/ .ant-modal-content {
  min-height: 300px;
}

.top_wrap {
  display: flex;
  font-size: 14px;
  color: rgb(135, 135, 139);
  margin-top: 20px;
  //justify-content: space-around;
  .line_left {
    display: flex;
    .line_l_title {
      width: 60px;
    }
    .line_l_txt {
      width: 150px;
    }
  }
  .line_right {
    display: flex;
    margin-left: 150px;
    .line_r_title {
      width: 130px;
    }
    .line_r_txt {
      width: 150px;
    }
  }
}
</style>
