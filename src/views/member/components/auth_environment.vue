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
      :row-selection="rowSelection"
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
  user_authenvironmentmore,
} from "@/api/member";
export default {
  props: {
    modalstatus: Boolean,
    modaldata: Object,
  },
  data() {
    return {
      isshow: false,
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
  computed: {
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRows = selectedRows
        },
        getCheckboxProps: record => ({
          props: {
            defaultChecked:this.check_have(record),
            name: record.username,
          },
        }),
      };
    },
  },
  methods: {
    check_have(record){
      let c_1 = this.modaldata.auth_environment.findIndex(item => item.id ==record.id)
      
      if(c_1 >-1){
          this.selectedRows.push( this.table_data[c_1] )
          return true
      }else{
          return false
      }
    },
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
    async ok_handle() {
        // console.log( this.selectedRows)
        // return

      let c_1 = [];
      this.selectedRows.forEach((item) => {
       c_1.push(item.id)
      });

      let { data } = await user_authenvironmentmore({
        env_id: c_1.toString(),
        id: this.modaldata.id,
      });
      if (data.code == 200) {
        this.$message.success("授权成功");
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

/deep/ .ant-modal-body{
    padding-left: 24px;
    padding-right: 24px;
    padding-top: 10px;
}

.top_wrap {
  display: flex;
  margin-bottom: 10px;
}

/deep/ .tab_envment_wrap{
  display: flex;
  height: 58px;
  width: 100%;
  .tab_envment_line{
     padding: 10px;
     width: 100px;
 }
}


</style>
