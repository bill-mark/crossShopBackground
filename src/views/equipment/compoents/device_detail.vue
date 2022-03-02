<template>
  <a-modal
    v-model="isshow"
    :width="925"
    title="设备详情"
    @cancel="handleCancel"
  >
    <div class="detail_line">
      <div class="line_cell">设备名称： {{ this.detaildata.device_name }}</div>
      <div class="line_cell">
        设备状态： {{ formate_status(this.detaildata.status) }}
      </div>
      <div class="line_cell">设备网络： {{ this.detaildata.device_ip }}</div>
    </div>
    <div class="detail_line">
      <div class="line_cell">网络属性： 静态</div>
      <div class="line_cell">网络类型：{{ this.detaildata.type_title}}</div>
      <div class="line_cell">
        可用天数： {{ this.detaildata.available_day }} ({{
          this.detaildata.expired_at
        }})到期
      </div>
    </div>
    <div class="detail_line">
      <div class="line_cell">
        设备归属： {{ this.detaildata.device_region_title }}
        {{ this.detaildata.device_area_title }}
      </div>
      <div class="line_cell">购买时间： {{ this.detaildata.created_at }}</div>
      <div class="line_cell">绑定平台:</div>
    </div>

    <div class="middle_wrap">
      <div
        class="middle_cell"
        :class="check_type == 1 ? 'middlecell_check' : ''"
        @click="change_type(1)"
      >
        已绑定环境
      </div>
      <div
        class="middle_cell"
        :class="check_type == 2 ? 'middlecell_check' : ''"
        @click="change_type(2)"
      >
        历史绑定记录
      </div>
      <div
        class="middle_cell"
        :class="check_type == 3 ? 'middlecell_check' : ''"
        @click="change_type(3)"
      >
        设备操作日志
      </div>
    </div>

    <a-table
      :loading="table_loading"
      :columns="base_columns"
      :data-source="table_data"
      :row-key="(r, i) => i.toString()"
      :scroll="{ y: 400 }"
      :pagination="pagination"
    >
      <div slot="cell_logtype" slot-scope="text">
           {{format_logtype(text)}}
      </div>
    </a-table>
  </a-modal>
</template>
<script>
import {
  device_bind_environment_list,
  device_bind_history_record,
  device_operate_log_list,
} from "@/api/equipment";
export default {
  props: {
    detail_modalstatus: Boolean,
    detaildata: Object,
  },
  data() {
    return {
      isshow: false,
      bind_eventlist: [],
      check_type: 1,
      pagination: {
        pageNum: 1, //当前页数
        pageSize: 20, //每页条数
        total: 0,
        showTotal: total => `共 ${total} 条`, // 显示总数
      },
      bind_historylist: [],
      logolist: [],

      table_data: [],
      base_columns: [],
      table_loading: false,
    };
  },
  mounted() {
    console.log(this.detaildata)
    this.isshow = this.detail_modalstatus;
    this.get_has_bindlist();


  },
  methods: {
    handleCancel() {
      this.isshow = false;
      this.$emit("cancel");
    },
    change_type(data) {
      this.check_type = data
      if (data == 1) {
        this.get_has_bindlist();
      }
      if (data == 2) {
        this.get_bind_historylist()
      }
      if (data == 3) {
        this.get_bind_logolist()
      }
    },
    //已绑定环境
    async get_has_bindlist() {
      this.table_loading = true
      let { data } = await device_bind_environment_list({
        pagesize: 300,
        page: 1,
        device_id: this.detaildata.id,
      });
      this.table_loading = false
      if (data.code == 200) {
        this.table_data = data.data.list;
        this.pagination.total = data.data.total

        this.base_columns = [
          {
            title: '环境',
            dataIndex: 'env_name'
          },
          {
            title: '代理设备',
            dataIndex: 'device_name'
          },

          {
            title: '平台站点',
            dataIndex: 'site'
          },
          {
            title: '最后登录用户',
            dataIndex: 'last_username'
          },
          {
            title: '最后登录时间',
            dataIndex: 'last_login_time'
          },
          {
            title: '所属子公司',
            dataIndex: ''
          },
        ]
      }
    },
    //绑定历史记录
    async get_bind_historylist() {
      this.table_loading = true
      let { data } = await device_bind_history_record({
        pagesize: 300,
        page: 1,
        device_id: this.detaildata.id,
      });
      this.table_loading = false
      if (data.code == 200) {
        this.table_data = data.data.list;
        this.pagination.total = data.data.total

        this.base_columns = [
          {
            title: '环境',
            dataIndex: 'env_name'
          },
          {
            title: '代理设备',
            dataIndex: 'device_name'
          },

          {
            title: '平台站点',
            dataIndex: 'site'
          },
          {
            title: '解绑用户',
            dataIndex: 'last_username'
          },
          {
            title: '解绑时间',
            dataIndex: 'last_login_time'
          },
          {
            title: '所属子公司',
            dataIndex: ''
          },
        ]
      }
    },
    //绑定历史记录
    async get_bind_logolist() {
      this.table_loading = true
      let { data } = await device_operate_log_list({
        pagesize: 300,
        page: 1,
        device_id: this.detaildata.id,
      });
      this.table_loading = false
      if (data.code == 200) {
        this.table_data = data.data.list;

        this.pagination.total = data.data.total

        this.base_columns = [
          {
            title: '登录成员',
            dataIndex: 'business_name'
          },
          {
            title: '时间',
            dataIndex: 'created_at'
          },

          {
            title: '操作内容',
            dataIndex: 'type',
             scopedSlots: { customRender: "cell_logtype" },
          },
          {
            title: '所属子公司',
            dataIndex: ''
          },
        ]
      }
    },
    format_logtype(data){
       if (data == 0) {
        return "绑定环境";
      }
      if (data == 1) {
        return "解绑环境";
      }
      if (data == 2) {
        return "替换设备";
      }
      if (data == 3) {
        return "绑定设备";
      }
      if (data == 4) {
        return "解绑设备";
      }
    },

    format_event_state(data) {
      if (data == 0) {
        return "启用";
      }
      if (data == 1) {
        return "禁用";
      }
      if (data == 2) {
        return "删除";
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
/deep/ .ant-modal-footer {
  display: none;
}

/deep/ .ant-modal-content {
  min-height: 400px;
}

.detail_line {
  display: flex;
  margin-top: 15px;
  justify-content: space-around;
  color: hsl(240, 2%, 54%);
  .line_cell {
    width: 270px;
    font-size: 14px;
  }
}

.middle_wrap {
  display: flex;
  margin-top: 50px;
  margin-bottom: 20px;
  .middle_cell {
    font-size: 16px;
    width: 130px;
    cursor: pointer;
    text-align: center;
  }
  .middlecell_check {
    color: #4c84ff;
    border-bottom: 1px solid #4c84ff;
  }
}
</style>
