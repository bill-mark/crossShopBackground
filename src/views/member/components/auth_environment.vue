<template>
  <a-modal
    v-model="isshow"
    :width="600"
    title="授权环境"
    @cancel="handleCancel"
    @ok="ok_handle"
  >
    <div class="top_wrap">
      <div>成员: {{ modaldata.username }}</div>
      &nbsp | &nbsp
      <div>{{ modaldata.real_name }}</div>
      &nbsp | &nbsp
      <div>
        {{ modaldata.role_title }} 
      </div>
    </div>

     <a-input-search placeholder="搜索环境" style="width: 200px;margin-bottom:20px"
      @search="go_onSearch" />

    <a-table
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :loading="table_loading"
      :columns="base_columns"
      :data-source="table_data"
      :row-key="(r, i) => i.toString()"
      :scroll="{ y: 300 }"
      :pagination="pagination"
    >
    </a-table>
  </a-modal>
</template>
<script>
import {
  user_authenvironmentlist,
  user_authenvironment,
} from "@/api/member";
export default {
  props: {
    modalstatus: Boolean,
    modaldata: Object,
  },
  data() {
    return {
      isshow: false,
      selectedRowKeys: [], //表格选中单元序号
      selectedRows:[],//表格选中单元
      pagination: {
        pageNum: 1, //当前页数
        pageSize: 20, //每页条数
        total: 0,
        showTotal: (total) => `共 ${total} 条`, // 显示总数
      },

      table_data: [],
      base_columns: [],
      table_loading: false,
    };
  },
  mounted() {
    console.log(this.modaldata);
    this.isshow = this.modalstatus;
    this.get_list();
  },
  methods: {
    handleCancel() {
      this.isshow = false;
      this.$emit("cancel");
    },
    go_onSearch(value){
       this.get_list(value)
    },
    //成员授权环境列表
    async get_list(env_name = null) {
      this.table_loading = true;
      let { data } = await user_authenvironmentlist({
        pagesize: 300,
        page: 1,
        env_name:env_name,
        id: this.modaldata.id,
      });
      this.table_loading = false;
      if (data.code == 200) {
        this.table_data = data.data.list;
        this.pagination.total = data.data.total;

        this.base_columns = [
          {
            title: "环境名",
            dataIndex: "env_name",
          },

          {
            title: "平台站点",
            dataIndex: "site",
          },
          {
            title: "企业简称",
            dataIndex: "business_short",
          },
        ];
      }
    },
    //表格行选中
    onSelectChange(selectedRowKeys,selectedRows) {
      this.selectedRows = selectedRows
      this.selectedRowKeys = selectedRowKeys;
    },
    async ok_handle() {
      let c_1 = [];
      this.selectedRowKeys.forEach((item) => {
        c_1.push(this.table_data[item].id);
      });

      let { data } = await user_authenvironment({
        environment_id: c_1.toString(),
        device_id: this.modaldata.id,
      });
      if (data.code == 200) {
        this.$message.success("授权成功");
        this.isshow = false;
         this.$emit("success");
      }
    },

    //格式化状态
    formate_status(data) {
      if (data == 0) {
        return "正常";
      }
      if (data == 1) {
        return "过期";
      }
      if (data == 2) {
        return "待分配";
      }
      if (data == 3) {
        return "故障";
      }
      if (data == 4) {
        return "已删除";
      }
    },
  },
};
</script>
<style scoped lang="less">
/deep/ .ant-modal-content {
  height: 650px;
}

/deep/ .ant-modal-body{
    padding-left: 24px;
    padding-right: 24px;
    padding-top: 10px;
}

.top_wrap {
  display: flex;
  margin-bottom: 10px;
}
</style>
