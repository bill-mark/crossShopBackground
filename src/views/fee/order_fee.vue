<template>
  <div class="balance_content">
    <a-table
      class="balance_table"
      :row-key="(record) => record.id"
      :columns="columns"
      :data-source="list"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      :scroll="{ x: 1200 }"
    >
    <div slot="cell_type" slot-scope="text">
      {{ formate_type(text) }}
    </div>
    <div slot="cell_status" slot-scope="text">
      {{ formate_status(text) }}
    </div>
    <div slot="cell_total" slot-scope="text">
      {{ formate_count(text) }}
    </div>
    <div slot="cell_discount" slot-scope="text">
      {{ formate_count(text) }}
    </div>
    <div slot="cell_pay" slot-scope="text">
      {{ formate_count(text) }}
    </div>
  </a-table>
  </div>
</template>
<script>
import { getList } from "@/api/order_fee";

const columns = [
  {
    title: "订单号",
    dataIndex: "trade_no",
  },{
    title: "订单类型",
    dataIndex: "type",
    scopedSlots: { customRender: "cell_type" },
  },{
    title: "订单状态",
    dataIndex: "status",
    scopedSlots: { customRender: "cell_status" },
  },{
    title: "数量",
    dataIndex: "purchase_num",
  },{
    title: "订单金额",
    dataIndex: "total_amount",
    scopedSlots: { customRender: "cell_total" },
  },{
    title: "优惠金额",
    dataIndex: "discount_amount",
    scopedSlots: { customRender: "cell_discount" },
  },{
    title: "实付金额",
    dataIndex: "pay_amount",
    scopedSlots: { customRender: "cell_pay" },
  },{
    title: "订单创建用户",
    dataIndex: "username",
  },{
    title: "付款时间",
    dataIndex: "payment_at",
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
      const { data } = await getList({
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
    formate_type: function(text) {
      const typeMap = {
        '1': '设备订单',
        '2': 'VPS订单', 
        '3': '云号码订单',
        '4': '云验证码订单',
        '5': '云RPA订单'
      };
      return typeMap[text];
    },
    formate_status: function(text) {
      const statusMap = {
        '0': '未支付',
        '1': '已支付', 
      };
      return statusMap[text];
    },
    formate_count: function(text) {
      return `¥ ${text}`
    }
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