<template>
  <div class="security_panel">
    <div class="search_panel">
      <a-button :disabled="selectedRowKeys.length === 0" @click="changeLogin">批量变更登录控制</a-button>
       <a-input-search
          style="width: 400px"
          placeholder="请输入用户名、姓名"
          v-model="keywords"
          @search="fetchList"
          class="search_btn"
        />
    </div>
    <div class="list_container">
      <a-table
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
        }"
        :row-key="(record) => record.id"
        :columns="columns"
        :data-source="list"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        :scroll="{ x: 1200 }"
      >
        <div slot="cell_auth" slot-scope="text">
          {{ formate_auth(text) }}
        </div>
        <div slot="cell_login" slot-scope="text">
          {{ formate_login(text) }}
        </div>
        <template slot="operation" slot-scope="text, record">
          <a href="javascript:;" @click="batch_change(record)">变更登录限制</a>
        </template>
      </a-table>
    </div>

    <a-modal v-model="showDialog" title="成员登录授权" @ok="handleOk">
      <a-form-model :model="limitForm" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="授权方式">
          <a-radio-group v-model="limitForm.auth_method">
            <a-radio :style="radioStyle" :value="0">
              全部终端自动永久授权（针对离职可能性低的成员等）
            </a-radio>
            <a-radio :style="radioStyle" :value="1">
              首终端永久授权，后续终端需上级审批
            </a-radio>
            <a-radio :style="radioStyle" :value="2">
              每次登录新终端，都需上级审批
            </a-radio>
          </a-radio-group>
        </a-form-model-item>

        <a-form-model-item label="登录时间限制">
          <a-radio-group v-model="limitForm.login_time" >
            <a-radio :style="radioStyle" :value="0">
              24小时可登录
            </a-radio>
            <a-radio :style="radioStyle" :value="1">
              每日允许访问时间：
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-time-picker use12-hours v-modal="limitForm.begin_time" v-if="limitForm.login_time == '1' " />
        <a-time-picker  style="marginLeft: 10px" use12-hours v-modal="limitForm.end_time" v-if="limitForm.login_time == '1' " />
      </a-form-model>
    </a-modal>
  </div>
  
</template>
<script>
import { getList, security_change_login_more } from "@/api/member_secruity";

const columns = [
  {
    title: "用户名",
    dataIndex: "username",
  },
  {
    title: "姓名",
    dataIndex: "real_name",
  },
  {
    title: "角色",
    dataIndex: "role_title",
  },
  {
    title: "所在部门",
    dataIndex: "depart_title",
  },
  {
    title: "授权方式",
    dataIndex: "auth_method",
    scopedSlots: { customRender: "cell_auth" },
  },
  {
    title: "登录时间限制",
    dataIndex: "login_time",
    scopedSlots: { customRender: "cell_login" },
  },
  {
    title: "操作",
    fixed: "right",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  }
];
export default {
  name: 'member_security',
  data() {
    return {
      labelCol: { span: 5 },
      wrapperCol: { span:  16},
      is_enabled: true,
      loading: false,
      keywords: null,
      selectedRowKeys: [],
      pagination: {
        pageNum: 1, //当前页数
        pageSize: 10, //每页条数
        total: 0,
        showTotal: (total) => `共 ${total} 条`, // 显示总数
      },
      common: {
        version: "1.0.0",
        mask: "dev",
        platform: 1,
      },
      columns,
      list: [],
      limitForm: {
        auth_method: null,
        login_time: null,
        begin_time: null,
        end_time: null,
      },
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      },
      showDialog: false,
      showTime: true,
      record: {}
    }
  },
  mounted() {
    this.fetchList();
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
  },
  methods: {
    async fetchList() {
      this.loading = true;
      const { data } = await getList({
        keywords: this.keywords,
        pagesize: 10,
        page: this.pagination.pageNum,
      });

      if (data.code == 200) {
        this.pagination.total = data.data.total;
        this.loading = false;

        this.list = data.data.list;

        if (this.list.length == 0) {
          this.is_enabled = false;
        } else {
          this.is_enabled = true;
        }
      }
    },
    changeLogin: function() {
      this.showDialog = true;
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys.toString());
      this.selectedRowKeys = selectedRowKeys;
      this.limitForm.id = selectedRowKeys.toString()
    },
    formate_auth: function(text) {
      const authMap = {
        '0': '全部终端',
        '1': '后端', 
        '2': '新终端'
      };
      return authMap[text];
    },
    formate_login: function(text) {
      const loginMap = {
        '0': '不限制',
        '1': '限制'
      };
      return loginMap[text];
    },
    batch_change: function({id, auth_method, login_time, begin_time, end_time}) {
      // this.record = record;
      this.limitForm = {
        id,
        auth_method,
        login_time,
        begin_time,
        end_time
      }
      this.showDialog = true;
    },
    handleTableChange(pagination) {
      // console.log(pagination);
      this.pagination.pageNum = pagination.current;

      this.fetchList();
    },
    async handleOk() {
      console.log('this.limitForm', this.limitForm)
      let {data} = await security_change_login_more({...this.limitForm, ...this.common});
      if (data.code == 200) {
        this.fetchList();
        this.$message.success('操作成功!')
      }
      this.showDialog = false;
    },
    onTimeRadioChange: function() {
      console.log('time', this.limitForm.login_time)
      this.showTime = (this.limitForm.login_time.toString() === '1');
    }
  }
}
</script>
<style scoped lang="less">
.security_panel {
  .search_panel {
    margin-top: 25px;
    margin-left: 36px;
    .search_btn {
      margin-left: 20px;
    }
  }
  .list_container {
    margin-top: 18px;
    height: 100%;
  }
  .end_time {
    margin-left: 10px;
  }
}
</style>
