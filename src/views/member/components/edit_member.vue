<template>
  <a-modal
    v-model="isshow"
    :width="650"
    title="编辑成员"
    @cancel="handleCancel"
    @ok="ok_handle"
  >
    <div class="line_wrap" style="margin-top: 0px">
      <div class="line_left red_title">用户名:</div>
      <div class="line_right">
        <a-input placeholder="请输入用户名" v-model="username" />
      </div>
    </div>
    <div class="line_wrap">
      <div class="line_left red_title">姓名:</div>
      <div class="line_right">
        <a-input placeholder="请输入用姓名" v-model="real_name" />
      </div>
    </div>
    <div class="line_wrap">
      <div class="line_left">联系方式:</div>
      <div class="line_right">
        <a-input placeholder="请输入用联系方式" v-model="contact" />
      </div>
    </div>

    <div class="line_wrap">
      <div class="line_left">绑定登录手机号:</div>
      <div class="line_right">
        <a-input-group compact>
          <a-input style="width: 60px" v-model="code" />
          <a-input style="width: 370px" v-model="business_phone" />
        </a-input-group>
      </div>
    </div>

    <div class="line_wrap">
      <div class="line_left red_title">授权方式:</div>
      <div class="line_right">
        <a-radio-group name="radioGroup" v-model="auth_method">
          <a-radio :value="0" :style="radioStyle"> 全部终端 </a-radio>
          <a-radio :value="1" :style="radioStyle"> 后端 </a-radio>
          <a-radio :value="2" :style="radioStyle"> 新终端 </a-radio>
        </a-radio-group>
      </div>
    </div>

    <div class="line_wrap">
      <div class="line_left red_title">登录时间:</div>
      <div class="line_right">
        <a-radio-group name="radioGroup" v-model="login_time">
          <a-radio :value="0" :style="radioStyle"> 24小时可登录 </a-radio>
          <a-radio :value="1" :style="radioStyle">
            每日允许访问时间:
            <a-time-picker
              format="HH:mm"
              placeholder="访问开始时间"
              v-model="begin_time"
            />
            -
            <a-time-picker
              format="HH:mm"
              placeholder="访问结束时间"
              v-model="end_time"
            />
          </a-radio>
        </a-radio-group>
      </div>
    </div>

    <div class="line_wrap">
      <div class="line_left red_title">修改个人信息权限:</div>
      <div class="line_right">
        <a-radio-group name="radioGroup" v-model="edit_info">
          <a-radio :value="0" :style="radioStyle"> 允许 </a-radio>
          <a-radio :value="1" :style="radioStyle"> 禁止 </a-radio>
        </a-radio-group>
      </div>
    </div>

    <div class="line_wrap" style="margin-top: 0px">
      <div class="line_left red_title">部门:</div>
      <div class="line_right">
        <a-tree-select
          v-model="department_id"
          style="width: 100%"
          :tree-data="treeData"
          :replaceFields="replaceFields"
          tree-checkable
          :show-checked-strategy="SHOW_PARENT"
        />
      </div>
    </div>
  </a-modal>
</template>
<script>
import moment from 'moment';
import { user_listdepartment, user_updatemember } from "@/api/member.js";
import { TreeSelect } from 'ant-design-vue';
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
export default {
  props: {
    modalstatus: Boolean,
    modaldata: Object,
  },
  data() {
    return {
      isshow: false,
      username: "",
      real_name: "",
      contact: "",
      code: 86,
      business_phone: null,
      role_id: 2,
      auth_method: 0,
      login_time: 0,
      begin_time: null,
      end_time: null,
      edit_info: 0,
      department_id: [],
      id: '',

      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      },

      replaceFields: {
        children: "children",
        title: "title",
        value: "id",
        key: "id",
      },
      selectedKeys: [],
      treeData: [],
      SHOW_PARENT,
    };
  },
  mounted() {
    this.isshow = this.modalstatus;
    this.init_data()
    this.get_departlist()
  },
  methods: {
    moment,
    init_data() {
      this.id = this.modaldata.id
      this.username = this.modaldata.username
      this.real_name = this.modaldata.real_name
      this.contact = this.modaldata.contact
      this.code = this.modaldata.code

      this.business_phone = this.modaldata.business_phone
      this.role_id = this.modaldata.role_id
      this.auth_method = this.modaldata.auth_method
      this.login_time = this.modaldata.login_time

      this.begin_time = moment(this.modaldata.begin_time,'HH:mm')
      this.end_time = moment(this.modaldata.end_time,'HH:mm')

      this.edit_info = this.modaldata.edit_info
      this.department_id = this.modaldata.depart.map(item => item.id)
    },

    handleCancel() {
      this.isshow = false;
      this.$emit("cancel");
    },
    async get_departlist() {
      let { data } = await user_listdepartment({
      });
      if (data.code == 200) {

        this.treeData = data.data.list
      }
    },
    async ok_handle() {
      //console.log(this.begin_time.format('HH:mm'))
      //return

       if(this.department_id.length == 0){
        this.$message.error('部门必选')
        return
      }

      let { data } = await user_updatemember({
        id: this.id,
        username: this.username,
        real_name: this.real_name,
        contact: this.contact,
        code: this.code,
        business_phone: this.business_phone,
        role_id: this.role_id,
        auth_method: this.auth_method,
        login_time: this.login_time,
        begin_time: this.begin_time.format('HH:mm'),
        end_time: this.end_time.format('HH:mm'),
        edit_info: this.edit_info,
        department_id: this.department_id.toString(),
      });
      if (data.code == 200) {
        this.$message.success("编辑成功成功");
        this.isshow = false;
        this.$emit("success");
      }
    },
  },
};
</script>
<style scoped lang="less">
/deep/ .ant-modal-content {
  min-height: 300px;
}

.red_title::before {
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
  margin-top: 20px;
  .line_left {
    width: 140px;
    text-align: right;
    line-height: 32px;
  }
  .line_right {
    width: 430px;
    margin-left: 10px;
  }
}
</style>
