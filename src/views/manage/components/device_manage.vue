<template>
  <div class="tag_wrap">
    <a-modal v-model="show_state" title="绑定设备" @cancel="handleCancel">
      <div class="top_txt">环境名称:{{ eventname }}</div>
      <a-input-search
        placeholder="搜索设备"
        class="top_search"
        enter-button
        @search="onSearch"
      />

      <a-table
        :columns="columns"
        :data-source="table_data"
        :row-key="(r, i) => i.toString()"
        class="down_table"
        :pagination="pagination"
        @change="handleTableChange"
      >
      </a-table>

      <div class="down_wrap">
         <a-button type="primary" class="btn_delet" > 确定绑定 </a-button>
       </div>
    </a-modal>
  </div>
</template>
<script>
import { client_v1_device} from "@/api/environment.js";
export default {
  props: {
    isshow: Boolean,
    eventname: String,
    eventid: String,
  },
  data() {
    return {
      show_state: false,
      table_data: [],
      search_key: '',
      columns: [
        {
          title: '设备名称',
          dataIndex: 'device_name',
        },
        {
          title: '设备信息id',
          dataIndex: 'device_info_id',
        },
        {
          title: '设备标签',
          dataIndex: 'tags',
        },
        {
          title: '已绑定环境',
          dataIndex: 'env_nametags',
        },
        {
          title: '过期时间',
          dataIndex: 'expired_at',
        }
      ],
      pagination: {
        pageNum: 0, //当前页数
        pageSize: 10, //每页条数
        total: 0,
      },
    }
  },
  mounted() {
    this.show_state = this.isshow
    //this.get_list()
  },
  methods: {
    test() {
      console.log(this.checked.toString())
    },
    onSearch(value) {
      this.search_key = value
    },
    async get_list() {
      let { data } = await client_v1_device({
        pagesize: 20,
        page: this.pagination.pageNum,
      })
      if (data.code == 200) {
        this.pagination.total = data.data.total;
        this.table_data = data.data.list
      }
    },
    //表格 切换页码
    handleTableChange(pagination) {
      console.log(pagination);
      this.pagination.pageNum = pagination.current - 1;
      this.onSearch();
    },

    handleCancel() {
      this.show_state = false
      this.$emit('cancel')
    },
  }
}
</script>
<style scoped lang="less">
/deep/ .ant-modal-footer {
  display: none;
}

/deep/ .ant-modal-content {
  width: 840px;
  height: 530px;
}

/deep/ .ant-modal-body {
  padding-top: 10px;
}

.top_txt {
  font-size: 16px;
}

.top_search {
  margin-top: 10px;
  width: 284px;
}

.down_table {
  margin-top: 10px;
}

.btn_delet {
  margin-top: 10px;
  float: right;
}
</style>
