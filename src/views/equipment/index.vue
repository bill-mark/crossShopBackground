<template>
  <div class="equipment">
    <div class="menu">
      <a-menu
        style="width: 210px; height: 100%"
        mode="inline"
        :default-selected-keys="['1']"
        :selected-keys="[current]"
        @click="handleClick"
      >
        <a-menu-item key="1" class="menu_one">
          <div class="my_equipment"></div>
          <div class="title">我的设备</div>
        </a-menu-item>
        <a-menu-item key="2" class="menu_one">
          <div class="my_equipment will_expire"></div>
          <div class="title">即将过期设备</div>
          <div class="title">{{ about_expire }}</div>
        </a-menu-item>
        <a-menu-item key="3" class="menu_one">
          <div class="my_equipment expired"></div>
          <div class="title">已过期设备 {{ expired }}</div>
        </a-menu-item>
        <a-menu-item key="4" class="menu_one">
          <div class="my_equipment bin"></div>
          <div class="title">设备回收站</div>
        </a-menu-item>
        <a-menu-item key="5" class="menu_one">
          <div class="my_equipment bound"></div>
          <div class="title">待绑定环境设备 {{ no_bind_env }}</div>
        </a-menu-item>
        <a-menu-item key="6" class="menu_one">
          <div class="my_equipment renewal"></div>
          <div class="title">自动续费的设备</div>
        </a-menu-item>
      </a-menu>
    </div>

    <div class="content">
      <div class="search_panel">
        <a-button type="primary" class="eq_buy_btn" @click="buyEq"
          >购买设备</a-button
        >

        <a-button
          type="primary"
          class="eq_buy_btn"
          @click="show_tagmanage = true"
          >设备标签管理
        </a-button>

        <!-- <a-button
          type="primary"
          class="eq_buy_btn"
          :disabled="selectedRowKeys.length === 0"
          @click="renewalEq"
          >续费设备</a-button
        > -->

        <a-input-search
          class="eq_buy_btn"
          style="width: 460px"
          placeholder="多个店铺名/设备名称/设备信息/归属 请用逗号间隔"
          @search="onSearchKey"
        />
        <a-button @click="showDrawer" class="fliter_drawer">筛选</a-button>
      </div>

      <div class="eq_info">
        <!-- <no-equipment v-if="!has_device"></no-equipment> -->

        <a-table
          :row-key="(record) => record.id"
          :columns="columns"
          :data-source="list"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
          :scroll="{ x: 1200 }"
        >
          <div slot="cell_under" slot-scope="text, record">
            {{ text }} , {{ record.device_package_title }}
          </div>

          <div slot="cell_name" slot-scope="text, record">
            {{ format_name(record) }}
          </div>

          <div slot="device_net">静态</div>

          <div slot="cell_remote" slot-scope="text">
            {{ formate_remote(text) }}
          </div>

          <div slot="cell_tags" slot-scope="text">
            {{ formate_tags(text) }}
          </div>

          <div slot="cell_renew" slot-scope="text">
            {{ formate_renew(text) }}
          </div>

          <div slot="cell_status" slot-scope="text">
            {{ formate_status(text) }}
          </div>

          <template slot="operation" slot-scope="text, record">
            <!-- <a-button type="primary" @click="onRenew(record)">续费</a-button> -->

            <a-button @click="show_detail(record)" class="view_btn"
              >详情</a-button
            >

            <a-popover
              v-if="record.status != 4 || query.status != 4 "
              trigger="hover"
              overlayClassName="table-popover"
            >
              <div
                slot="content"
                v-if="record.renew_status == 0"
                class="popover_edit-content"
                @click="change_autopay(record, 1)"
              >
                <div>开启自动续费</div>
              </div>
              <div
                slot="content"
                v-if="record.renew_status == 1"
                @click="change_autopay(record, 0)"
                class="popover_edit-content"
              >
                <div>关闭自动续费</div>
              </div>

              <div
                slot="content"
                @click="show_editname_pop(record)"
                class="popover_edit-content"
              >
                <div>编辑设备名称</div>
              </div>
              <div
                slot="content"
                @click="open_binddevice_pop(record)"
                class="popover_edit-content"
              >
                <div>绑定环境</div>
              </div>
              <div
                slot="content"
                @click="open_unbinddevice_pop(record)"
                class="popover_edit-content"
              >
                <div>解绑环境</div>
              </div>
              <div
                slot="content"
                class="popover_edit-content"
                @click="open_edit_devicetag_pop(record)"
              >
                <div>编辑标签</div>
              </div>
              <div
                slot="content"
                class="popover_edit-content"
                @click="change_deletdevice_pop(record)"
              >
                <div>删除设备</div>
              </div>

              <a-button  class="view_btn"
               v-if="record.status != 4 "
              >
                更多
                </a-button>
            </a-popover>

            <a-button
              v-if="query.status == 4 && record.status == 4"
              @click="recover_device(record)"
              class="view_btn"
              >恢复</a-button
            >
          </template>
        </a-table>
      </div>
    </div>

    <a-drawer
      title="筛选"
      placement="right"
      :closable="false"
      :visible="drawer_visible"
      :after-visible-change="afterVisibleChange"
      :width="450"
      @close="onClose"
    >
      <a-form-model
        :model="query"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="搜索">
          <a-input v-model="query.keyword" placeholder="搜索" />
        </a-form-model-item>

        <a-form-model-item label="设备状态">
          <a-radio-group v-model="query.status">
            <a-radio value="0">正常</a-radio>
            <a-radio value="1">过期</a-radio>
            <a-radio value="2">待分配</a-radio>
            <a-radio value="3">故障</a-radio>
          </a-radio-group>
        </a-form-model-item>

        <a-form-model-item label="设备标签">
          <a-input v-model="query.tags" placeholder="请选择或搜索设备标签" />
        </a-form-model-item>

        <a-form-model-item label="设备归属">
          <a-input v-model="query.country" placeholder="请选择或搜索设备国家" />
        </a-form-model-item>

        <a-form-model-item label="自动续费">
          <a-radio-group v-model="query.renew_status">
            <a-radio value="all">全部</a-radio>
            <a-radio value="0">未开启</a-radio>
            <a-radio value="1">开启</a-radio>
          </a-radio-group>
        </a-form-model-item>

        <a-form-model-item label="网络属性">
          <a-radio-group v-model="query.no_tag">
            <a-radio value="all">全部</a-radio>
            <a-radio value="0">无标签</a-radio>
            <a-radio value="1">有标签</a-radio>
          </a-radio-group>
        </a-form-model-item>

        <a-form-model-item label="远程状态">
          <a-radio-group v-model="query.device_remote">
            <a-radio value="all">全部</a-radio>
            <a-radio value="1">可远程</a-radio>
            <a-radio value="0">不可远程</a-radio>
          </a-radio-group>
        </a-form-model-item>
      </a-form-model>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-button type="primary" @click="onSearch_btn"> 确定筛选 </a-button>
      </div>
    </a-drawer>

    <device_detail
      v-if="detail_modalstatus"
      :detail_modalstatus="detail_modalstatus"
      :detaildata="check_device"
      @cancel="cancel_detailmodal"
    >
    </device_detail>

    <a-modal
      title="编辑设备名称"
      :visible="editname_state"
      @ok="editname_handleOk"
      @cancel="editname_handleCancel"
    >
      <div style="display: flex">
        <div style="width: 60px; flex: none">新名称:</div>
        <a-input
          style="width: 300px"
          placeholder="输入新名称"
          v-model="checkdevice_newname"
        />
      </div>
    </a-modal>

    <device_unbind
      v-if="unbinddevice_modalstatus"
      :modalstatus="unbinddevice_modalstatus"
      :modaldata="check_device"
      @cancel="cancel_unbinddevice"
      @success="success_unbinddevice"
    >
    </device_unbind>

    <device_bind
      v-if="binddevice_modalstatus"
      :modalstatus="binddevice_modalstatus"
      :modaldata="check_device"
      @cancel="cancel_binddevice"
      @success="success_binddevice"
    >
    </device_bind>

    <edit_devicetag
      v-if="edit_devicetag_modalstatus"
      :modalstatus="edit_devicetag_modalstatus"
      :modaldata="check_device"
      @cancel="cancel_edit_devicetag"
      @success="success_edit_devicetag"
    >
    </edit_devicetag>

    <tag_device
      v-if="show_tagmanage"
      @cancel="cancel_tagmanage"
      :isshow="show_tagmanage"
    />
  </div>
</template>
<script>
import noEquipment from "./noEquipment.vue";
import TagList from "./tagList.vue";
import {
  getList,
  device_cancelrenewstatus,
  device_updatedevicename,
  device_deletedevicemore,
  recovery_device_more,
} from "@/api/equipment";

import device_detail from "./compoents/device_detail.vue";
import device_unbind from "./compoents/device_unbind.vue";
import device_bind from "./compoents/device_bind.vue";
import tag_device from './compoents/tag_device.vue'
import edit_devicetag from './compoents/edit_devicetag.vue'

const columns = [
  {
    title: "设备名称",
    dataIndex: "device_name",
  },
  {
    title: "设备信息",
    dataIndex: "device_ip",
  },
  {
    title: "绑定环境",
    dataIndex: "env_name",
    scopedSlots: { customRender: "cell_name" },
  },
  {
    title: "标签",
    dataIndex: "tags",
    scopedSlots: { customRender: "cell_tags" },
  },
  {
    title: "设备归属",
    dataIndex: "device_area_title",
    scopedSlots: { customRender: "cell_under" },
    show: true,
  },
  {
    title: "远程状态",
    dataIndex: "device_remote",
    scopedSlots: { customRender: "cell_remote" },
    show: true,
  },
  {
    title: "网络属性",
    dataIndex: "device_net",
    scopedSlots: { customRender: "device_net" },
  },
  {
    title: "自动续费状态",
    dataIndex: "renew_status",
    scopedSlots: { customRender: "cell_renew" },
    show: true,
  },
  {
    title: "设备状态",
    dataIndex: "status",
    scopedSlots: { customRender: "cell_status" },
    show: true,
  },
  {
    title: "设备到期时间",
    dataIndex: "expired_at",
  },
  {
    title: "操作",
    width: 250,
    fixed: "right",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  },
];
const base_query = {
  keyword: null, //关键词
  device_name: null, //设备名称
  env_name: null, //环境名称
  device_ip: null, //设备IP
  country: null, //设备国家
  tags: null, //标签
  status: null, //状态 全部 all 0 正常 1 过期 2 待分配 3 故障 4 已删除(设备回收站)
  expire: null, //过期 全部 all 1 已过期 2 将要过期
  renew_status: null, //是否自动续费 全部 all 0 未开启 1 开启
  device_remote: null, //是否可远程 全部 all 0 不可远程 1 可远程
  no_tag: null, //有无标签设备 全部 all 0 无标签 1 有标签
  bind_env: null, //绑定环境 全部 all 0 已绑定环境 1 未绑定
  pagesize: 20,
  page: null,
};
const query = {
  keyword: null, //关键词
  device_name: null, //设备名称
  env_name: null, //环境名称
  device_ip: null, //设备IP
  country: null, //设备国家
  tags: null, //标签
  status: null, //状态 全部 all 0 正常 1 过期 2 待分配 3 故障 4 已删除(设备回收站)
  expire: null, //过期 全部 all 1 已过期 2 将要过期
  renew_status: null, //是否自动续费 全部 all 0 未开启 1 开启
  device_remote: null, //是否可远程 全部 all 0 不可远程 1 可远程
  no_tag: null, //有无标签设备 全部 all 0 无标签 1 有标签
  bind_env: null, //绑定环境 全部 all 0 已绑定环境 1 未绑定
  pagesize: 20,
  page: null,
};
export default {
  components: { noEquipment, TagList, device_detail, device_unbind, device_bind, tag_device, edit_devicetag },
  name: "equipment",
  data() {
    return {
      current: "1", //选中的目录
      show_tagmanage: false, //标签管理状态

      drawer_visible: false,
      list: [],
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      query: query,
      base_query: base_query,
      common: {
        version: "1.0.0",
        mask: "dev",
        platform: 1,
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 24 },
      pagination: {
        pageNum: 1, //当前页数
        pageSize: 20, //每页条数
        total: 0,
        showTotal: (total) => `共 ${total} 条`, // 显示总数
      },
      loading: false,
      about_expire: 0,
      expired: 0,
      no_bind_env: 0,

      has_device: true,
      check_device: null, //选中的设备
      detail_modalstatus: false, //设备详情弹窗

      editname_state: false, //编辑设备名称弹窗
      checkdevice_newname: "", //选中设备新名称

      unbinddevice_modalstatus: false,//解绑环境弹窗
      binddevice_modalstatus: false,//绑定环境弹窗
      edit_devicetag_modalstatus: false,//编辑绑定设备


    };
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
  },
  mounted() {
    this.fetchList();
  },
  methods: {
    //恢复设备
    async recover_device(record) {
      console.log('recover_device')
      let { data } = await recovery_device_more({
        device_id: record.id
      });
      if (data.code == 200) {
        this.fetchList();
        this.$message.success("操作成功");
      }
    },
    //取消标签管理
    cancel_tagmanage() {
      this.show_tagmanage = false;
    },

    //编辑名称弹窗
    show_editname_pop(record) {
      this.check_device = record;
      this.checkdevice_newname = record.device_name;
      this.editname_state = true;
    },
    editname_handleCancel() {
      this.editname_state = false;
    },
    //编辑名称
    async editname_handleOk() {
      let { data } = await device_updatedevicename({
        device_id: this.check_device.id,
        device_name: this.checkdevice_newname,
      });
      if (data.code == 200) {
        this.editname_state = false;
        this.fetchList();
        this.$message.success("操作成功");
      }
    },

    //解绑环境弹窗
    open_unbinddevice_pop(record) {
      this.check_device = record;
      this.unbinddevice_modalstatus = true
    },
    cancel_unbinddevice() {
      this.unbinddevice_modalstatus = false
    },
    success_unbinddevice() {
      this.unbinddevice_modalstatus = false
      this.fetchList();
    },


    //绑定环境弹窗
    open_binddevice_pop(record) {
      this.check_device = record;
      this.binddevice_modalstatus = true
    },
    cancel_binddevice() {
      this.binddevice_modalstatus = false
    },
    success_binddevice() {
      this.binddevice_modalstatus = false
      this.fetchList();
    },

    //编辑绑定设备弹窗
    open_edit_devicetag_pop(record) {
      this.check_device = record;
      this.edit_devicetag_modalstatus = true
    },
    cancel_edit_devicetag() {
      this.edit_devicetag_modalstatus = false
    },
    success_edit_devicetag() {
      this.edit_devicetag_modalstatus = false
      this.fetchList();
    },




    //自动续费弹窗
    change_autopay(record, type) {
      let that = this;

      let c_1 = "";
      let c_2 = "";
      if (type == 1) {
        c_1 = "开启自动续费";
        c_2 = "确定将已选择设备开启按月自动续费？";
      }
      if (type == 0) {
        c_1 = "关闭自动续费";
        c_2 = "确定将已选择设备关闭按月自动续费？";
      }

      this.$confirm({
        title: c_1,
        content: "设备名称:" + record.device_name + ", " + c_2,
        onOk() {
          that.go_autopay(record.id, type);
          return false;
        },
        onCancel() { },
      });
    },
    //自动续费
    async go_autopay(id, type) {
      let { data } = await device_cancelrenewstatus({
        device_id: id,
        renew_status: type,
      });
      if (data.code == 200) {
        this.fetchList();
        this.$message.success("操作成功");
      }
    },


    //删除设备弹窗
    change_deletdevice_pop(record) {
      let that = this;

      this.$confirm({
        title: '删除设备',
        content: '确定删除设备 ' + record.device_name + ' 吗？提示：若删除的是未过期设备，在设备过期前可在回收站找回。',
        onOk() {
          that.go_deletdevice(record.id);
          return false;
        },
        onCancel() { },
      });
    },
    //自动删除设备
    async go_deletdevice(id) {
      let { data } = await device_deletedevicemore({
        device_id: id,
      });
      if (data.code == 200) {
        this.fetchList();
        this.$message.success("操作成功");
      }
    },




    //格式化环境名称
    format_name(data) {
      //console.log(data)
      let c_1 = []
      data.env_name.forEach(item => {
        c_1.push(item.env_name)
      })
      // console.log(c_1)
      return c_1.toString()
    },


    //格式化远程
    formate_remote(data) {
      if (data == 0) {
        return "不可远程";
      }
      if (data == 1) {
        return "可远程";
      }
    },
    formate_tags(data) {
      // console.log(data)
      let c_1 = []
      if (data.length > 0) {
        data.forEach(item => {
          c_1.push(item.tag)
        })
      }
      return c_1.toString()
    },
    //格式化自动续费
    formate_renew(data) {
      if (data == 0) {
        return "未开启";
      }
      if (data == 1) {
        return "开启";
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

    handleClick: function ({ key }) {
      this.current = key;
      this.query = JSON.parse(JSON.stringify(this.base_query));

      if (key === "2") {
        this.query = { ...query, expire: 2 };
      }
      if (key === "3") {
        this.query = { ...query, expire: 1 };
      }
      if (key === "4") {
        this.query = { ...query, status: 4 };
      }
      if (key === "5") {
        this.query = { ...query, bind_env: 1 };
      }
      if (key === "6") {
        this.query = { ...query, renew_status: 1 };
      }

      this.pagination.pageNum = 1

      this.fetchList();
    },
    // 设备类别改变
    changeEqType: function () { },

    onSearch_btn: function () {
      this.fetchList();
    },
    afterVisibleChange(val) {
      console.log("visible", val);
    },
    showDrawer() {
      this.drawer_visible = true;
    },
    onClose() {
      this.drawer_visible = false;
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    onRenew: function () { },

    //显示详情
    show_detail(record) {
      this.check_device = record;
      this.detail_modalstatus = true;
    },
    cancel_detailmodal() {
      this.detail_modalstatus = false;
    },

    async fetchList() {
      this.loading = true;
      const { data } = await getList({
        ...this.query,
        pagesize: 20,
        page: this.pagination.pageNum,
      });

      if (data.code == 200) {
        this.pagination.total = data.data.total;
        this.loading = false;

        this.list = data.data.list;

        if (this.list.length == 0) {
          this.has_device = false;
        } else {
          this.has_device = true;
        }

        this.about_expire = data.data.about_expire;
        this.expired = data.data.expired;
        this.no_bind_env = data.data.no_bind_env;
      }
    },
    handleTableChange(pagination) {
      // console.log(pagination);
      this.pagination.pageNum = pagination.current;

      this.fetchList();
    },
    onSearchKey: function (key) {
      // console.log('key', key);
      this.query.keyword = key;
      this.fetchList();
    },
    // 购买设备
    buyEq: function () {
      this.$router.push({ name: 'manage_buyequipment' })
    },
    // 续费设备
    renewalEq: function () {
      console.log("this.selectedRowKeys", this.selectedRowKeys);
    },
  },
};
</script>

<style scoped lang="less">
.table-popover {
  .popover-content {
    //width: 90px;
    padding-top: 8px;
    cursor: pointer;
  }
  .popover-content:hover {
    color: #4c84ff;
  }
  .popover_edit-content {
    width: 90px;
    padding-top: 5px;
    //text-align: center;
    cursor: pointer;
  }
  .popover_edit-content:hover {
    color: #4c84ff;
  }
}

.equipment {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  margin-left: 15px;
  .menu {
    width: 210px;
    background-color: #fff;
    padding-top: 38px;
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
        background-image: url("../../assets/img/equipment/device@2x.png");
        background-repeat: no-repeat;
      }
      .will_expire {
        background-image: url("../../assets/img/equipment/will_expire@2x.png");
      }
      .expired {
        background-image: url("../../assets/img/equipment/expired@2x.png");
      }
      .bin {
        background-image: url("../../assets/img/equipment/bin@2x.png");
      }
      .bound {
        background-image: url("../../assets/img/equipment/bound@2x.png");
      }
      .renewal {
        background-image: url("../../assets/img/equipment/renewal@2x.png");
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
  .content {
    flex: 1;
    margin-left: 10px;
    min-height: calc(100vh - 126px);
    background-color: #fff;
    .search_panel {
      margin-top: 25px;
      margin-left: 36px;
      .eq_radio {
        min-width: 102px;
      }
      .eq_buy_btn {
        margin-left: 9px;
      }
      .fliter_drawer {
        float: right;
        right: 20px;
      }
    }
    .eq_info {
      margin-top: 18px;
      height: 100%;
      .view_btn {
        margin-left: 10px;
      }
    }
  }
  .ant-drawer-content-wrapper {
    width: 450px;
  }
}
</style>
