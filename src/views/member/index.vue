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
        <a-menu-item key="1" class="menu_one">
          <div class="my_equipment menu_txt_right_1"></div>
          <div class="title">所有成员</div>
        </a-menu-item>
         <a-menu-item key="2" class="menu_one">
          <div class="my_equipment"></div>
          <div class="title">已禁用</div>
        </a-menu-item>
         <a-menu-item key="3" class="menu_one">
          <div class="my_equipment"></div>
          <div class="title">近七天成员</div>
        </a-menu-item>

        <a-sub-menu key="platform">
          <span slot="title">
            <span>所有角色</span>
          </span>
          <a-menu-item v-for="item in platform_list" :key="item.id">
            {{ item.site }}
          </a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="tag">
          <span slot="title">
            <span>申请人列表</span>
          </span>
          <a-menu-item v-for="item in tag_list" :key="item.id">
            {{ item.tag }}
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>

    <div class="content_right">
      <div class="top_line">
        <div class="top_l_left">
          <a-button type="primary" class="top_btn" @click="go_addenv">
            新建环境
          </a-button>

          <a-button class="top_btn" @click="show_tagmanage = true">
            标签管理
          </a-button>

          <a-popover
            trigger="click"
            v-model="batch_visibal"
            overlayClassName="table-popover"
          >
            <div
              slot="content"
              class="popover-content"
              @click="batch_open('清空授权')"
            >
              <div>清空授权</div>
            </div>

            <div
              slot="content"
              class="popover-content"
              @click="batch_open('清空环境标签')"
            >
              <div>清空环境标签</div>
            </div>

            <div
              slot="content"
              class="popover-content"
              @click="batch_open('解绑设备')"
            >
              <div>解绑设备</div>
            </div>

            <div
              slot="content"
              class="popover-content"
              @click="batch_open('设为常用环境')"
            >
              <div>设为常用环境</div>
            </div>
            <div
              slot="content"
              class="popover-content"
              @click="batch_open('取消常用环境')"
            >
              <div>取消常用环境</div>
            </div>

            <div
              slot="content"
              class="popover-content"
              @click="batch_open('删除环境标签')"
            >
              <div>删除环境标签</div>
            </div>

            <div
              slot="content"
              class="popover-content"
              @click="batch_open('删除环境')"
            >
              <div>删除环境</div>
            </div>

            <a-button class="top_btn" :disabled="selectedRowKeys.length === 0">
              批量操作
            </a-button>
          </a-popover>

          <a-input-search
            placeholder="成员名"
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
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange,
          }"
          :loading="table_loading"
          :columns="columns"
          :data-source="table_data"
          :row-key="(r, i) => i.toString()"
          :scroll="{ x: 1200 }"
          :pagination="pagination"
          @change="handleTableChange"
        >
          <div slot="cell_envname" slot-scope="text" class="content_envname">
            {{ text }}
          </div>

          <div slot="cell_platform" slot-scope="text, record">
            {{ text }}{{ record.site }}
          </div>

          <div slot="cell_tag" slot-scope="text">
            <span v-for="item in text" :key="item.id">
              {{ item.tag }}
            </span>
          </div>

          <div slot="cell_device" slot-scope="text, record">
            {{ format_devicestate(text, record) }}
          </div>

          <div slot="cell_last" slot-scope="text, record">
            {{ text }}({{ record.business_name }})
          </div>

          <div slot="operaTitle" class="title_operate">
            <div class="title_operate_left">操作</div>
            <!-- <div class="title_operate_right">
                 <a-icon type="setting" />
              </div> -->
          </div>

          <div
            slot="cell_operate"
            slot-scope="text, record"
            class="content_operate"
          >
            <div
              @click="go_bind(record)"
              v-if="!record.bind_status"
              class="cell_blue"
            >
              绑定
            </div>

            <div
              @click="go_open(record)"
              v-if="record.bind_status"
              class="cell_blue"
            >
              打开
            </div>

            <div @click="go_edit(record)" class="cell_blue">编辑</div>

            <a-popover trigger="hover" overlayClassName="table-popover">
              <div
                slot="content"
                class="popover_edit-content"
                @click="open_unbuind(record)"
              >
                <div>解绑设备</div>
              </div>
              <div
                slot="content"
                @click="open_delet(record)"
                class="popover_edit-content"
              >
                <div>删除环境</div>
              </div>

              <div class="cell_blue">更多</div>
            </a-popover>
          </div>
        </a-table>
        <div class="down_txt">共{{ pagination.total }}条数据</div>
      </div>
    </div>
  </div>
</template>
<script>
import { environment_index } from "@/api/home";
import {
  environment_platform_list,
  environment_tag_list,
  environment_device_ip_list,
  environment_username_list,
  environment_delete_more,
  environment_device_name_list,
  environment_device_network_type_list,
  environment_business_short_list,
  environment_unbind_device,
  environment_clear_auth_more,
  environment_clearenvironmenttagmore,
  environment_unbinddevicemore,
  environment_commonmore,
  environment_deleteenvironmenttagmore,
} from "@/api/environment.js";
import { user_member_list } from "@/api/member.js";
export default {
  components: {
  },
  data() {
    return {
      wrap_height: null,//wrap高度

      current: "1", //选中的目录
      event_guanli: "1", //环境模式
      show_tagmanage: false, //标签管理状态
      batch_visibal: false, //批量气泡状态

      show_devicemanage: false,
      need_bind_eventname: "",
      need_bind_eventid: null,

      //默认配置
      standard_config: {
        status: 0,
        keywords: "",
        platform_id: "",
        tag_id: "",
        device_ip: "",
        device_name: "",
        business_short: "",
        begin_created_at: "",
        end_created_at: "",
        urgent_renewal: "all",
        recent_open: "all",
        no_tag: "all",
        env_common: "all",
        env_top: "all",
        no_bind: "all",
        no_auth_env: "all",
        member_id: "",
      },

      table_data: [],
      table_loading: false,
      pagination: {
        pageNum: 1, //当前页数
        pageSize: 20, //每页条数
        total: 0,
      },
      no_auth_environment: "", //待授权
      no_bind_count: "", //待绑定
      urgent_renewal_count: "", //待付费

      selectedRowKeys: [], //表格 选中单元
      checked_columns: [], //自定义表格头
      columns: [
        {
          title: "环境",
          dataIndex: "env_name",
          scopedSlots: { customRender: "cell_envname" },
          show: true,
        },
        {
          title: "所属平台",
          dataIndex: "country",
          scopedSlots: { customRender: "cell_platform" },
          show: true,
        },
        {
          title: "标签",
          dataIndex: "tag",
          scopedSlots: { customRender: "cell_tag" },
          show: false,
        },
        {
          title: "企业简称",
          dataIndex: "business_short",
          show: false,
        },
        {
          title: "创建者",
          dataIndex: "username",
          show: false,
        },
        {
          title: "创建时间",
          dataIndex: "created_at",
          show: false,
        },
        {
          title: "更新时间",
          dataIndex: "updated_at",
          show: false,
        },

        {
          title: "设备名称",
          dataIndex: "device_name",
          show: true,
        },
        {
          title: "设备信息",
          dataIndex: "bind_status",
          scopedSlots: { customRender: "cell_device" },
          show: true,
        },
        {
          title: "最后登陆者",
          dataIndex: "last_username",
          scopedSlots: { customRender: "cell_last" },
          show: true,
        },
        {
          title: "最后登陆时间",
          dataIndex: "last_login_time",
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

      tag_list: [], //标签列表
      member_list: [], //成员列表
      platform_list: [], //平台列表

    };
  },
  mounted() {

    this.init();

    this.set_wrap_height()
  },
  methods: {
    //高度绑定为页面高度
    set_wrap_height() {
      this.wrap_height = document.body.clientHeight - 82
      console.log(this.wrap_height)
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
      if (type == "清空环境标签") {
        let { data } = await environment_clearenvironmenttagmore({
          id: idarr.toString(),
        });
        if (data.code == 200) {
          this.get_tabledata();
          this.$message.success("清空环境标签 操作成功");
        }
      }

      if (type == "解绑设备") {
        let { data } = await environment_unbinddevicemore({
          id: idarr.toString(),
        });
        if (data.code == 200) {
          this.get_tabledata();
          this.$message.success("解绑设备 操作成功");
        }
      }

      if (type == "设为常用环境") {
        let { data } = await environment_commonmore({
          dev_common: 1,
          id: idarr.toString(),
        });
        if (data.code == 200) {
          this.get_tabledata();
          this.$message.success("设为常用环境 操作成功");
        }
      }

      if (type == "取消常用环境") {
        let { data } = await environment_commonmore({
          dev_common: 0,
          id: idarr.toString(),
        });
        if (data.code == 200) {
          this.get_tabledata();
          this.$message.success("取消常用环境 操作成功");
        }
      }

      if (type == "删除环境标签") {
        let { data } = await environment_deleteenvironmenttagmore({
          id: idarr.toString(),
        });
        if (data.code == 200) {
          this.get_tabledata();
          this.$message.success("删除环境标签 操作成功");
        }
      }

      if (type == "删除环境") {
        let { data } = await environment_delete_more({
          id: idarr.toString(),
        });
        if (data.code == 200) {
          this.get_tabledata();
          this.$message.success("删除环境 操作成功");
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




    //菜单点击
    menu_handleClick(e) {
      console.log("click ", e.keyPath, e.key);
      this.current = e.key;

      Object.assign(this.$data, this.$options.data())
      this.current = e.key;

      if (e.key == 2) {
        this.standard_config.env_common = 1
      }
      if (e.key == 3) {
        this.standard_config.recent_open = 1
      }
      if (e.key == 4) {
        this.standard_config.urgent_renewal = 1
      }
      if (e.key == 6) {
        this.standard_config.no_auth_env = 0
      }
      if (e.key == 7) {
        this.standard_config.no_bind = 0
      }

      this.get_tabledata()
    },

    async init() {
      this.table_loading = true;
      let { data } = await environment_index({
        status: 0,
        pagesize: 20,
        page: this.pagination.pageNum,
      });
      this.table_loading = false;
      if (data.code == 200) {
        this.pagination.total = data.data.total;
        this.no_auth_environment = data.data.no_auth_environment;
        this.no_bind_count = data.data.no_bind_count;
        this.urgent_renewal_count = data.data.urgent_renewal_count;

        this.table_data = data.data.list;
      }
    },
    //表格行选中
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },

    //搜索回调
    handle_search(keywords) {
      console.log(keywords);
      this.standard_config.keywords = keywords;
      this.pagination.pageNum = 1;
      this.get_tabledata();
    },

    //表格 切换页码
    handleTableChange(pagination) {
      this.pagination.pageNum = pagination.current;
      this.get_tabledata();
    },
    //获得表格数据
    async get_tabledata() {
      // console.log(this.standard_config);
      // return

      this.table_loading = true;
      this.selectedRowKeys = []
      let { data } = await environment_index({
        ...this.standard_config,
        pagesize: 20,
        page: this.pagination.pageNum,
      });
      this.table_loading = false;
      if (data.code == 200) {
        this.pagination.total = data.data.total;
        this.no_auth_environment = data.data.no_auth_environment;
        this.no_bind_count = data.data.no_bind_count;
        this.urgent_renewal_count = data.data.urgent_renewal_count;

        this.table_data = data.data.list;
      }
    },
    event_change(value) {
      console.log(value);
      this.event_guanli = value;
    },
    go_addenv() {
      this.$router.push({ name: "manage_addenv" });
    },

    format_devicestate(state, record) {
      if (!state) {
        return "未绑定";
      } else {
        return (
          record.device_ip +
          " " +
          record.device_area_title +
          " " +
          record.device_package_title
        );
      }
    },

    go_bind(record) {
      this.show_devicemanage = true;
      this.need_bind_eventname = record.env_name;
      this.need_bind_eventid = record.id;
    },
    go_open(record) {
      console.log(record);
    },
    go_edit(record) {
      this.$router.push({ path: "editenv", query: { id: record.id } });
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
      .menu_txt_right_1{
          background-image: url("../../assets/img/member/成员@2x.png");
      }
       .menu_txt_right_2{
          background-image: url("../../assets/img/member/已禁用@2x.png");
      }
       .menu_txt_right_3{
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
      }
    }
  }
}
</style>
