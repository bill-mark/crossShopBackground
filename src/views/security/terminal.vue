<template>
  <div class="security_panel">
    <div class="search_panel">
      <a-button @click="showTerminalModal">添加终端</a-button>
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
        :row-key="(record) => record.id"
        :columns="columns"
        :data-source="list"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        :scroll="{ x: 1200 }"
      >
        <template slot="operation" slot-scope="text, record">
          <a href=" " @click="updateAuth(record)">编辑</a>
          <a
            href="javascript:;"
            style="margin-left: 20px"
            @click="open_delet_pop(record)"
            >删除</a
          >
        </template>
      </a-table>
    </div>

    <a-modal v-model="show" title="添加终端" :rules="rules" @ok="handleOk">
      <a-form-model
        :model="terminalForm"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="终端白名单" ref="white_ip" prop="white_ip">
          <a-input v-model="terminalForm.white_ip" />
        </a-form-item>
        <a-form-model-item label="MAC地址:">
          <a-input v-model="terminalForm.mac" />
        </a-form-model-item>
        <a-form-model-item label="设备状态" v-if="isEdit">
          <a-radio-group v-model="terminalForm.status">
            <a-radio :style="radioStyle" :value="0">不启用</a-radio>
            <a-radio :style="radioStyle" :value="1">启用</a-radio>
          </a-radio-group>
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <a-modal
      v-model="delet_pop" title="删除"  @ok="deleteAuth"
    >
      确定删除吗?
    </a-modal>

  </div>
</template>
<script>
import { getList, addTerminal, updateAuth, deleteAuth } from "@/api/terminal_secruity";

const columns = [
  {
    title: "终端识别码",
    dataIndex: "white_ip",
  },
  {
    title: "mac地址",
    dataIndex: "mac",
  },
  {
    title: "添加时间",
    dataIndex: "create_at",
  },
  {
    title: "添加者",
    dataIndex: "user_id",
  },
  {
    title: "操作",
    fixed: "right",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  }
];

export default {
  name: 'terminal_security',
  data() {
    return {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      is_enabled: true,
      loading: false,
      selectedRowKeys: [],
      keywords: null,
      pagination: {
        pageNum: 1, //当前页数
        pageSize: 10, //每页条数
        total: 0,
      },
      common: {
        version: "1.0.0",
        mask: "dev",
        platform: 1,
      },
      columns,
      list: [],
      show: false,
      terminalForm: {
        id: null,
        white_ip: null,
        mac: null,
        status: null
      },
      rules: {
        white_ip: [
          { required: true, message: '请输入终端白名单', trigger: 'blur' },
        ],
      },
      isEdit: false,
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      },

      delet_pop:false,//删除弹窗
      be_deletid:'',//即将被删除id
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
    handleTableChange(pagination) {
      // console.log(pagination);
      this.pagination.pageNum = pagination.current;

      this.fetchList();
    },
    updateAuth: function (record) {
      this.terminalForm = {
        id: record.id,
        white_ip: record.white_ip,
        mac: record.mac,
        status: record.status
      };
      this.isEdit = true;
      this.show = true;
    },
    open_delet_pop(record){
     // console.log(record)
   
      this.be_deletid = record.id
       this.delet_pop = true
    },
    async deleteAuth() {
      let {data} = await deleteAuth({
        id:this.be_deletid
      })
      if (data.code == 200) {
        this.$message.success('删除成功');
         this.delet_pop = false
         this.fetchList();
      }
    },
    
    cancelAuthBatch: function () { },
    async handleOk() {
      console.log('this.limitForm', this.terminalForm)
      let data;
      if (this.isEdit) {
        data = await updateAuth(this.terminalForm);
      } else {
        delete this.terminalForm.id;
        delete this.terminalForm.status;
        data = await addTerminal(this.terminalForm);
      }
      console.log(data)
      if (data.data.code == 200 ) {
        this.$message.success('操作成功');
        this.fetchList();
      }
      this.show = false;
    },
    showTerminalModal: function () {
      this.isEdit = false;
      this.show = true;

    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys.toString());
      this.selectedRowKeys = selectedRowKeys;
      this.limitForm.id = selectedRowKeys.toString()
    },
  }

}
</script>
<style lang="less" scoped>
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
}
</style>