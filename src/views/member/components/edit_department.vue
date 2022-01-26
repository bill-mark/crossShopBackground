<template>
  <a-modal
    v-model="isshow"
    :width="650"
    title="部门管理"
    @cancel="handleCancel"
  >
    <div class="top_wrap">
      <div class="top_left">
        <a-button type="primary" class="top_btn"> 添加部门 </a-button>

        <a-button class="top_btn" :disabled="selectedRowKeys.length === 0">
          删除部门
        </a-button>
      </div>
      <div class="top_right">
        <a-input-search
          placeholder="输入部门名称"
          class="btn_search"
          @search="handle_search"
        />
      </div>
    </div>

    <a-table
      :columns="columns"
      :row-key="(r, i) => r.id"
      :data-source="tableData"
      :row-selection="rowSelection"
      :expanded-row-keys.sync="expandedRowKeys"
    >
      <div slot="operaTitle" class="title_operate">
        <div class="title_operate_left">操作</div>
      </div>

      <div
        slot="cell_operate"
        slot-scope="text, record"
        class="content_operate"
      >
        <div @click="go_edit(record)" class="cell_leftblue">编辑</div>

        <div class="cell_blue">转移成员</div>
        <div class="cell_blue">删除</div>

      </div>
    </a-table>
  </a-modal>
</template>

<script>
import { user_listdepartment } from "@/api/member.js";
export default {
  props: {
    modalstatus: Boolean,
  },
  data() {
    return {
      isshow: false,
      tableData: [],
      selectedRowKeys: [], //表格 选中单元序号
      selectedRows: [],//表格 选中单元行数组
      expandedRowKeys: [],

      columns: [
        {
          title: "部门名称",
          dataIndex: "title",
          show: true,
        },
        {
          title: "部门人数",
          dataIndex: "member_count",
          show: true,
        },
        {
          dataIndex: "operation",
          width: 250,
          fixed: "right",
          slots: { title: "operaTitle" },
          scopedSlots: { customRender: "cell_operate" },
          show: true,
        },
      ],

    }
  },
  mounted() {
    this.isshow = this.modalstatus;
    this.get_tabledata()
  },
  computed: {
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRows = selectedRows
          this.selectedRowKeys = selectedRowKeys
        },
        onSelect: (record, selected, selectedRows) => {
          console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          console.log(selected, selectedRows, changeRows);
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.pid == 0,
            name: record.title,
          },
        }),
      };
    },
  },
  methods: {
    async get_tabledata() {
      let { data } = await user_listdepartment({
      });
      if (data.code == 200) {

        this.tableData = data.data.list
      }
    },
    handleCancel() {
      this.isshow = false;
      this.$emit("cancel");
    },
    //搜索回调
    handle_search(keywords) {
      this.standard_config.keywords = keywords;
      this.pagination.pageNum = 1;
      this.get_tabledata();
    },
  }
}
</script>

<style scoped lang="less">
/deep/ .ant-modal-footer {
  display: none;
}

/deep/ .ant-modal-content {
  min-height: 300px;
}

.top_wrap {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .top_btn {
    margin-right: 20px;
  }
  .top_right {
    width: 250px;
  }
}

.content_operate {
        display: flex;

        .cell_blue {
          padding-left: 20px;
          color: #4c84ff;
          cursor: pointer;
        }
        .cell_leftblue {
          color: #4c84ff;
          cursor: pointer;
        }
      }
</style>
