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

      <a-spin :spinning="spinning">
      <a-table
        :columns="columns"
        :data-source="table_data"
        :row-key="(r, i) => i.toString()"
        class="down_table"
         :loading="table_loading"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <div slot="operaTitle" class="title_operate">
          <div class="title_operate_left">操作</div>
        </div>

        <div
          slot="cell_operate"
          slot-scope="text, record"
          class="content_operate"
        >
          <div class="cell_blue" @click="go_bind(record)">确定绑定</div>
        </div>
      </a-table>
       </a-spin>

      
    </a-modal>
  </div>
</template>
<script>
import { client_v1_device,environment_bind_device } from "@/api/environment.js";
export default {
  props: {
    isshow: Boolean,
    eventname: String,
    eventid: Number,
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
          title: '设备信息',
          dataIndex: 'device_ip',
        },
         {
          title: '设备归属地',
          dataIndex: 'device_area_title',
        },
        {
          title: '设备标签',
          dataIndex: 'tags',
        },
        {
          title: '已绑定环境',
          dataIndex: 'env_name',
        },
        {
          title: '过期时间',
          dataIndex: 'expired_at',
        }, {
          dataIndex: 'operation',
          width: 100,
          slots: { title: 'operaTitle' },
          scopedSlots: { customRender: "cell_operate" },
          show: true,
        },
      ],
      pagination: {
        pageNum: 1, //当前页数
        pageSize: 5, //每页条数
        total: 0,
        showTotal: (total) => `共 ${total} 条`, // 显示总数
      },
       spinning:false,
       table_loading:false,
    }
  },
  mounted() {
    this.show_state = this.isshow
    this.get_list()
  },
  methods: {
    test() {
      console.log(this.checked.toString())
    },
    onSearch(value) {
      this.search_key = value
    },
    async get_list() {
      this.table_loading = true
      let { data } = await client_v1_device({
        pagesize: 200,
        status:0,
        page: this.pagination.pageNum,
      })
      this.table_loading = false
      if (data.code == 200) {
        this.pagination.total = data.data.total;
        this.table_data = data.data.list
      }
    },
     //绑定设备
    async go_bind(record){
      this.spinning = true
      let {data} = await environment_bind_device({
            id:this.eventid,
            device_id:record.id
      })
      this.spinning = false
      if(data.code ==200){
         this.$message.success('绑定成功')
         this.show_state = false
          this.$emit('success')
      }
    },
    //表格 切换页码
    handleTableChange(pagination) {
      return
      console.log(pagination);
      this.pagination.pageNum = pagination.current ;
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
  width: 1000px;
  min-height: 530px;
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
   min-height: 200px;
  .cell_blue {
    cursor: pointer;
    color: #4c84ff;
  }
}

.down_wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 32px;
  margin-top: 10px;
  float: right;
  .down_w_left {
    margin-left: 20px;
    line-height: 32px;
  }
}


</style>
