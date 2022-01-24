<template>
  <a-modal
    v-model="isshow"
    :width="925"
    title="解绑环境"
    @cancel="handleCancel"
    @ok="go_unbind"
  >
    <div class="top_wrap">
      <div>{{ modaldata.created_at }}</div>
      &nbsp | &nbsp
      <div>{{ modaldata.device_ip }}</div>
      &nbsp | &nbsp
      <div>
        {{ modaldata.device_region_title }} {{ modaldata.device_area_title }}
      </div>
      &nbsp | &nbsp
      <div>过期时间:{{ modaldata.expired_at }}</div>
      &nbsp | &nbsp
      <div>已绑定 {{ modaldata.env_name.length }}个平台</div>
    </div>

    <a-table
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :loading="table_loading"
      :columns="base_columns"
      :data-source="table_data"
      :row-key="(r, i) => i.toString()"
      :scroll="{ y: 400 }"
      :pagination="pagination"
    >
    </a-table>
  </a-modal>
</template>
<script>
import {
  device_bind_environment_list,
  device_unbindenvironment,
} from "@/api/equipment";
export default {
  props: {
    modalstatus: Boolean,
    modaldata: Object,
  },
  data() {
    return {
      isshow: false,
      selectedRowKeys: [], //表格 选中单元
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
    this.get_has_bindlist();
  },
  methods: {
    handleCancel() {
      this.isshow = false;
      this.$emit("cancel");
    },
    //已绑定环境
    async get_has_bindlist() {
      this.table_loading = true;
      let { data } = await device_bind_environment_list({
        pagesize: 300,
        page: 1,
        device_id: this.modaldata.id,
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
            title: "最后登陆者",
            dataIndex: "last_username",
          },
        ];
      }
    },
    //表格行选中
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    async go_unbind() {
      let c_1 = [];
      this.selectedRowKeys.forEach((item) => {
        c_1.push(this.table_data[item].id);
      });

      let { data } = await device_unbindenvironment({
        environment_id: c_1.toString(),
        device_id: this.modaldata.id,
      });
      if (data.code == 200) {
        this.$message.success("解绑成功");
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
  min-height: 300px;
}

.top_wrap {
  display: flex;
  margin-bottom: 20px;
}
</style>
