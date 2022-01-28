<template>
  <div class="member_wrap" :style="{ height: wrap_height + 'px' }">
    <div class="content_left">
      <a-menu
        style="width: 256px; height: 100%"
        :default-selected-keys="['1']"
        mode="inline"
        :selected-keys="[current]"
        @click="menu_handleClick"
      >
        <a-menu-item key="0" class="menu_one">
          <div class="my_equipment menu_txt_right_1"></div>
          <div class="title">所有成员</div>
        </a-menu-item>
        <a-menu-item key="status" class="menu_one">
          <div class="my_equipment menu_txt_right_2"></div>
          <div class="title">已禁用</div>
        </a-menu-item>
        <a-menu-item key="recent" class="menu_one">
          <div class="my_equipment menu_txt_right_3"></div>
          <div class="title">近七天成员</div>
        </a-menu-item>

        <a-sub-menu key="platform">
          <div class="menu_one" slot="title">
            <div class="my_equipment menu_txt_right_1"></div>
            <div class="title">所有角色</div>
          </div>
          <a-menu-item key="boss"> 老板 </a-menu-item>
          <a-menu-item key="jiucai"> 员工 </a-menu-item>

          <!-- <a-menu-item v-for="item in role_list" :key="item.id">
            {{item.title}}
          </a-menu-item> -->
        </a-sub-menu>
      </a-menu>
    </div>

    <div class="content_right">
      <div class="top_line">
        <div class="top_l_left">
          <a-button type="primary" class="top_btn" @click="open_addmember_pop">
            添加成员
          </a-button>

          <a-button class="top_btn" @click="open_editdepartment_pop">
            部门管理
          </a-button>

          <a-popover
            trigger="click"
            v-model="batch_visibal"
            overlayClassName="table-popover"
          >
            <div slot="content" class="popover-content"
            @click="batch_enable"
            >
              <div>批量启用成员</div>
            </div>

            <div slot="content" class="popover-content"
            @click="batch_ban"
            >
              <div>批量禁用成员</div>
            </div>

            <div slot="content" class="popover-content"
            @click="batch_opendelet"
            >
              <div>批量删除成员</div>
            </div>

            <a-button class="top_btn" :disabled="selectedRowKeys.length === 0">
              批量操作
            </a-button>
          </a-popover>

          <a-input-search
            placeholder="多个用户名"
            class="btn_search"
            @search="handle_search"
          />
        </div>

        <div class="top_l_right">
          <a-button class="top_btn"> 所有部门 </a-button>
        </div>
      </div>

      <div class="down_table">
        <a-table
          :row-selection="rowSelection"
          :loading="table_loading"
          :columns="columns"
          :data-source="table_data"
          :row-key="(r, i) => i.toString()"
          :scroll="{ x: 1200 }"
          :pagination="pagination"
          @change="handleTableChange"
        >
          <div slot="cell_auth" slot-scope="text">
            {{ table_formate_auth(text) }}
          </div>

          <div slot="cell_status" slot-scope="text">
            {{ table_formate_status(text) }}
          </div>

          <div slot="cell_depart" slot-scope="text">
            {{ table_formate_depart(text) }}
          </div>

          <div slot="operaTitle" class="title_operate">
            <div class="title_operate_left">操作</div>
          </div>

          <div
            slot="cell_operate"
            slot-scope="text, record"
            class="content_operate"
            v-if="record.role_id != 1"
          >
            <div @click="open_editmember_pop(record)" class="cell_leftblue">
              编辑
            </div>

            <div class="cell_blue" @click="open_auth_pop(record)">授权</div>

            <a-popover trigger="hover" overlayClassName="table-popover">
              <div
                slot="content"
                class="popover_edit-content"
                @click="open_view_pop(record)"
              >
                <div>查看成员</div>
              </div>

              <div
                slot="content"
                class="popover_edit-content"
                v-if="record.status == 0"
                @click="open_ban(record)"
              >
                <div>禁用成员</div>
              </div>

              <div
                slot="content"
                class="popover_edit-content"
                v-if="record.status == 1"
                @click="open_enable(record)"
              >
                <div>启用成员</div>
              </div>

              <div
                slot="content"
                class="popover_edit-content"
                @click="open_delet(record)"
              >
                <div>删除成员</div>
              </div>

              <div class="cell_blue">更多</div>
            </a-popover>
          </div>
        </a-table>
      </div>
    </div>

    <add_member
      v-if="addmember_modalstatus"
      :modalstatus="addmember_modalstatus"
      @cancel="cancel_addmember"
      @success="success_addmember"
    >
    </add_member>

    <edit_department
      v-if="editdepartment_modalstatus"
      :modalstatus="editdepartment_modalstatus"
      @cancel="cancel_editdepartment"
      @success="success_editdepartment"
    >
    </edit_department>

    <edit_member
      v-if="editmember_modalstatus"
      :modaldata="check_data"
      :modalstatus="editmember_modalstatus"
      @cancel="cancel_editmember"
      @success="success_editmember"
    >
    </edit_member>

    <auth_environment
      v-if="auth_modalstatus"
      :modaldata="check_data"
      :modalstatus="auth_modalstatus"
      @cancel="cancel_auth"
      @success="success_auth"
    >
    </auth_environment>

    <view_member
      v-if="view_modalstatus"
      :modaldata="check_data"
      :modalstatus="view_modalstatus"
      @cancel="cancel_view"
      @success="success_view"
    >
    </view_member>
  </div>
</template>
<script>
import { environment_clear_auth_more } from "@/api/environment.js";

import {
  user_member_list, user_rolelist, user_deletemembermore, user_banmembermore,
  user_enablemembermore,
} from "@/api/member.js";
import add_member from './components/add_member.vue'
import edit_department from './components/edit_department.vue'
import edit_member from './components/edit_member.vue'
import auth_environment from './components/auth_environment.vue'

import view_member from './components/view_member.vue'
export default {
  components: {
    add_member, edit_department, edit_member, auth_environment,
    view_member,
  },
  data() {
    return {
      wrap_height: null, //wrap高度
      current: "1", //选中的目录
      batch_visibal: false, //批量气泡状态
      //默认配置
      standard_config: {
        keywords: "",
        role_id: null,
        status: "all",
        department_id: null,
        recent: "all",
      },

      table_data: [],
      table_loading: false,
      pagination: {
        pageNum: 1, //当前页数
        pageSize: 20, //每页条数
        total: 0,
        showTotal: (total) => `共 ${total} 条`, // 显示总数
      },

      selectedRowKeys: [], //表格 选中单元序号
      selectedRows: [],//表格 选中单元行数组
      checked_columns: [], //自定义表格头
      columns: [
        {
          title: "用户名",
          dataIndex: "username",
          show: true,
        },
        {
          title: "姓名",
          dataIndex: "real_name",
          show: true,
        },
        {
          title: "所在部门",
          dataIndex: "depart",
          scopedSlots: { customRender: "cell_depart" },
          show: true,
        },
        {
          title: "授权环境",
          dataIndex: "auth_method",
          scopedSlots: { customRender: "cell_auth" },
          show: true,
        },
        {
          title: "角色",
          dataIndex: "role_title",
          show: true,
        },
        {
          title: "状态",
          dataIndex: "status",
          scopedSlots: { customRender: "cell_status" },
          show: true,
        },
        {
          title: "绑定登录手机号",
          dataIndex: "business_phone",
          show: true,
        },
        {
          title: "联系方式",
          dataIndex: "contact",
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

      member_list: [], //成员列表
      role_list: [], //角色列表
      check_data: null,//选中成员

      addmember_modalstatus: false,
      editdepartment_modalstatus: false,
      editmember_modalstatus: false,
      auth_modalstatus: false,

      view_modalstatus: false,
    };
  },
  mounted() {
    this.get_rolelist();
    this.set_wrap_height();
    this.get_tabledata();
  },
  computed: {
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRows = selectedRows
          this.selectedRowKeys = selectedRowKeys
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.role_id === 1,
            name: record.username,
          },
        }),
      };
    },
  },
  methods: {
    //高度绑定为页面高度
    set_wrap_height() {
      this.wrap_height = document.body.clientHeight - 82;
      // console.log(this.wrap_height);
    },

    open_delet(record) {
      let that = this;
      this.$confirm({
        title: '删除成员',
        content: "成员:" + record.username + " ,确定删除吗",
        onOk() {
          that.go_delet(record.id)
          return false;
        },
        onCancel() { },
      });
    },
    batch_opendelet() {
      let c_1 = []
      this.selectedRows.forEach(item=>{
        c_1.push(item.id)
      })

      let that = this;
      this.$confirm({
        title: '批量删除成员',
        content: "确定批量删除所选成员吗",
        onOk() {
          that.go_delet( c_1.toString() )
          return false;
        },
        onCancel() { },
      });
    },
    async go_delet(id) {
      let { data } = await user_deletemembermore({
        id: id
      });
      if (data.code == 200) {
        this.$message.success("删除成功");
        this.get_tabledata()
      }
    },

    open_ban(record) {
      let that = this;
      this.$confirm({
        title: '禁用成员',
        content: "成员:" + record.username + " ,确定禁用吗",
        onOk() {
          that.go_ban(record.id)
          return false;
        },
        onCancel() { },
      });
    },
      batch_ban() {
      let c_1 = []
      this.selectedRows.forEach(item=>{
        c_1.push(item.id)
      })

      let that = this;
      this.$confirm({
        title: '批量禁用成员',
        content: "确定批量禁用所选成员吗",
        onOk() {
          that.go_ban( c_1.toString() )
          return false;
        },
        onCancel() { },
      });
    },
    async go_ban(id) {
      let { data } = await user_banmembermore({
        id: id
      });
      if (data.code == 200) {
        this.$message.success("禁用成功");
        this.get_tabledata()
      }
    },

    //启用
    open_enable(record) {
      let that = this;
      this.$confirm({
        title: '启用成员',
        content: "成员:" + record.username + " ,确定启用吗",
        onOk() {
          that.go_enable(record.id)
          return false;
        },
        onCancel() { },
      });
    },
     batch_enable() {
      let c_1 = []
      this.selectedRows.forEach(item=>{
        c_1.push(item.id)
      })

      let that = this;
      this.$confirm({
        title: '批量启用成员',
        content: "确定批量启用所选成员吗",
        onOk() {
          that.go_enable( c_1.toString() )
          return false;
        },
        onCancel() { },
      });
    },
    async go_enable(id) {
      let { data } = await user_enablemembermore({
        id: id
      });
      if (data.code == 200) {
        this.$message.success("启用成功");
        this.get_tabledata()
      }
    },





    //获得角色列表
    async get_rolelist() {
      let { data } = await user_rolelist({});
      if (data.code == 200) {
        this.role_list = data.data.list;
      }
    },
    //获得表格数据
    async get_tabledata() {
      this.table_loading = true;
      this.selectedRowKeys = [];
      let { data } = await user_member_list({
        ...this.standard_config,
        pagesize: 20,
        page: this.pagination.pageNum,
      });
      this.table_loading = false;
      if (data.code == 200) {
        this.pagination.total = data.data.total;

        this.table_data = data.data.list;
      }
    },
    //菜单点击
    menu_handleClick(e) {
      console.log("click ", e.key);
      //return

      this.current = e.key;

      Object.assign(this.$data, this.$options.data());
      this.current = e.key;

      if (e.key == "status") {
        this.standard_config.status = 1;
      }
      if (e.key == "recent") {
        this.standard_config.recent = 1;
      }
      if (e.key == "boss") {
        this.standard_config.role_id = 1;
      }
      if (e.key == "jiucai") {
        this.standard_config.role_id = 2;
      }

      this.get_tabledata();
    },
    //格式化授权
    table_formate_auth(data) {
      if (data == 0) {
        return "全部终端";
      }
      if (data == 1) {
        return "后端";
      }
      if (data == 2) {
        return "新终端";
      }
    },
    //格式化部门
    table_formate_depart(data) {
      let c_1 = []
      if (data.length == 0) {
        return
      }
      data.forEach(item => {
        c_1.push(item.title)
      })
      return c_1.toString()
    },
    //格式化状态
    table_formate_status(data) {
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

    //selectedRowKeys
    //批量操作确认弹窗
    batch_open(title) {
      this.batch_visibal = false;
      console.log(this.selectedRowKeys);
      let c_1 = [];
      this.selectedRowKeys.forEach((item) => {
        c_1.push(this.table_data[item].id);
      });
      console.log(c_1);

      let that = this;
      this.$confirm({
        title: title,
        content: "环境:" + c_1.length + "个,确定进行该批量操作吗",
        onOk() {
          that.go_clear_auth(c_1, title);
          return false;
        },
        onCancel() { },
      });
    },
    //批量操作ajax
    async go_clear_auth(idarr, type) {
      //console.log(idarr)

      if (type == "清空授权") {
        let { data } = await environment_clear_auth_more({
          id: idarr.toString(),
        });
        if (data.code == 200) {
          this.get_tabledata();
          this.$message.success("清空授权 操作成功");
        }
      }
    },

    //获得成员列表
    async get_member_data(keywords) {
      let { data } = await user_member_list({
        keywords: keywords,
      });
      if (data.code == 200) {
        this.member_list = data.data.list;
        this.drawer_memberlist = this.member_list;
      }
    },



    //搜索回调
    handle_search(keywords) {
      this.standard_config.keywords = keywords;
      this.pagination.pageNum = 1;
      this.get_tabledata();
    },

    //表格 切换页码
    handleTableChange(pagination) {
      this.pagination.pageNum = pagination.current;
      this.get_tabledata();
    },

    //添加成员弹窗
    open_addmember_pop() {
      this.addmember_modalstatus = true
    },
    cancel_addmember() {
      this.addmember_modalstatus = false
    },
    success_addmember() {
      this.addmember_modalstatus = false
      this.get_tabledata();
    },

    //编辑成员弹窗
    open_editmember_pop(record) {
      this.editmember_modalstatus = true
      this.check_data = record
    },
    cancel_editmember() {
      this.editmember_modalstatus = false
    },
    success_editmember() {
      this.editmember_modalstatus = false
      this.get_tabledata();
    },

    //授权弹窗
    open_auth_pop(record) {
      this.auth_modalstatus = true
      this.check_data = record
    },
    cancel_auth() {
      this.auth_modalstatus = false
    },
    success_auth() {
      this.auth_modalstatus = false
      this.get_tabledata();
    },


    //查看用户弹窗
    open_view_pop(record) {
      this.view_modalstatus = true
      this.check_data = record
    },
    cancel_view() {
      this.view_modalstatus = false
    },
    success_view() {
      this.view_modalstatus = false
      this.get_tabledata();
    },


    //部门管理弹窗
    open_editdepartment_pop() {
      this.editdepartment_modalstatus = true
    },
    cancel_editdepartment() {
      this.editdepartment_modalstatus = false
    },
    success_editdepartment() {
      this.editdepartment_modalstatus = false
      this.get_tabledata();
    },

  },
};
</script>

<style scoped lang="less">
.table-popover {
  .popover-content {
    width: 90px;
    padding-top: 8px;
    cursor: pointer;
  }
  .popover-content:hover {
    color: #4c84ff;
  }
  .popover_edit-content {
    width: 60px;
    padding-top: 5px;
    text-align: center;
    cursor: pointer;
  }
  .popover_edit-content:hover {
    color: #4c84ff;
  }
}

.member_wrap {
  min-width: 1845px;
  padding-left: 15px;
  margin: 0 auto;
  min-height: 600px;
  margin-top: 20px;

  //border: 1px solid green;
  display: flex;
  .content_left {
    min-width: 220px;
    background-color: white;
    .menu_one {
      display: flex;
      flex-direction: row;
      height: 46px;
      .ant-menu-item-selected {
        background: linear-gradient(90deg, #f7f9ff 0%, #ebf0fc 100%);
      }
      .my_equipment {
        margin-top: 14px;
        margin-right: 7px;
        width: 18px;
        height: 16px;
        background-position: center;
        background-size: 100%;
        background-repeat: no-repeat;
      }
      .menu_txt_right_1 {
        background-image: url("../../assets/img/member/成员@2x.png");
      }
      .menu_txt_right_2 {
        background-image: url("../../assets/img/member/已禁用@2x.png");
      }
      .menu_txt_right_3 {
        background-image: url("../../assets/img/member/成员审核@2x.png");
      }

      .title {
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #374567;
        line-height: 46px;
      }
      .count {
        border: 1px solid #374567;
      }
    }
  }
  .content_right {
    background-color: white;
    flex: 1;
    margin-right: 20px;
    .top_line {
      display: flex;
      justify-content: space-between;
      padding-top: 25px;
      .top_l_left {
        display: flex;
        .top_btn {
          margin-left: 15px;
        }
        .btn_search {
          margin-left: 15px;
          width: 450px;
          height: 30px;
        }
      }
      .top_l_right {
        display: flex;
        .top_btn {
          margin-left: 15px;
          margin-right: 20px;
        }
      }
    }

    .down_table {
      margin-top: 10px;
      .content_envname {
        color: #4c84ff;
      }
      .title_operate {
        display: flex;
        width: 200px;
        justify-content: space-between;
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
    }
  }
}
</style>
