<template>
  <div class="balance_content">
    <a-table
      class="balance_table"
      :row-key="(r, i) => i.toString()"
      :columns="columns"
      :data-source="list"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      :scroll="{ x: 1200 }"
    >
  </a-table>
  </div>
</template>
<script>
import { order_balance_log_list } from "@/api/const_manage";

const columns = [
  {
    title: "交易单号",
    dataIndex: "trade_no",
  },{
    title: "交易时间",
    dataIndex: "create_at",
  },{
    title: "用户名",
    dataIndex: "username",
  },{
    title: "公司名称",
    dataIndex: "business_name",
  },{
    title: "金额",
    dataIndex: "money",
  },{
    title: "余额",
    dataIndex: "after",
  },{
    title: "备注",
    dataIndex: "remarks",
  }
]
export default {
  name: 'balance_fee',
  data() {
    return {
      columns,
      list: [],
      loading: false,
      pagination: {
        pageNum: 1, //当前页数
        pageSize: 10, //每页条数
        total: 0,
      },
    }
  },
  mounted() {
    this.fetchList();
  },
  methods: {
    async fetchList() {
      this.loading = true;
      const { data } = await order_balance_log_list({
        pagesize: 10,
        page: this.pagination.pageNum,
      });

      if (data.code == 200) {
        this.pagination.total = data.data.total;
        this.loading = false;

        this.list = data.data.list;
      }
    },
    handleTableChange(pagination) {
      // console.log(pagination);
      this.pagination.pageNum = pagination.current;

      this.fetchList();
    },
  }
}
</script>
<style scoped lang="less">
.balance_content {
  .balance_table {
    margin-top: 20px;
    margin-left: 15px;
  }
}
</style>