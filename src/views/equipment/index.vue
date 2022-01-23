<template>
  <div class="equipment">
    <div class="menu">
      <a-menu style="width: 210px" mode="vertical" @click="handleClick">
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
          <div class="title">代绑定环境设备 {{ no_bind_env }}</div>
        </a-menu-item>
        <a-menu-item key="6" class="menu_one">
          <div class="my_equipment renewal"></div>
          <div class="title">自动续费的设备</div>
        </a-menu-item>
      </a-menu>
    </div>

    <div class="content" v-if="showEqList">
      <div class="search_panel">
        <a-radio-group @change="changeEqType">
          <a-radio-button value="large" class="eq_radio"
            >平台设备</a-radio-button
          >
          <a-radio-button value="small" class="eq_radio"
            >本地虚拟设备</a-radio-button
          >
        </a-radio-group>
        <a-button type="primary" class="eq_buy_btn" @click="buyEq"
          >购买设备</a-button
        >
        <a-button
          type="primary"
          class="eq_buy_btn"
          :disabled="selectedRowKeys.length === 0"
          @click="renewalEq"
          >续费设备</a-button
        >

        <a-input-search
          class="eq_buy_btn"
          style="width: 460px"
          placeholder="多个店铺名/设备名称/设备信息/归属 请用逗号间隔"
          @search="onSearchKey"
        />
        <a-button @click="showDrawer" class="fliter_drawer">筛选</a-button>
      </div>

      <div class="eq_info">
        <no-equipment v-if="!has_device"></no-equipment>

        <a-table
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange,
          }"
          :row-key="(record) => record.id"
          :columns="columns"
          :data-source="list"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
          v-show="has_device"
           :scroll="{ x: 1200 }"
        >
          <div slot="cell_under" slot-scope="text,record">
            {{ text }} , {{record.device_package_title}}
          </div>

          <div slot="cell_remote" slot-scope="text">
             {{formate_remote(text)}}
          </div>

          <div slot="cell_renew" slot-scope="text">
             {{formate_renew(text)}}
          </div>

          <div slot="cell_status" slot-scope="text">
             {{formate_status(text)}}
          </div>

          <template slot="operation" slot-scope="text, record">
            <a-button type="primary" @click="onRenew(record)">续费</a-button>
            <a-button @click="view(record)" class="view_btn">详情</a-button>
          </template>
        </a-table>

        

      </div>
    </div>
    <tag-list v-else></tag-list>

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
          <a-input
            v-model="query.device_name"
            placeholder="搜索设备名称/设备信息"
          />
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
        <a-button type="primary" @click="onSearch"> 确定筛选 </a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import noEquipment from "./noEquipment.vue";
import TagList from "./tagList.vue";
import { getList } from "@/api/equipment";

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
  },
  {
    title: "设备归属",
    dataIndex: "device_area_title",
    scopedSlots: { customRender: "cell_under" },
    show:true,
  },
  {
    title: "远程状态",
    dataIndex: "device_remote",
    scopedSlots: { customRender: "cell_remote" },
    show:true,
  },
  {
    title: "网络属性",
    dataIndex: "device_net",
  },
  {
    title: "自动续费状态",
    dataIndex: "renew_status",
    scopedSlots: { customRender: "cell_renew" },
    show:true,
  },
  {
    title: "设备状态",
    dataIndex: "status",
    scopedSlots: { customRender: "cell_status" },
    show:true,
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
  components: { noEquipment, TagList },
  name: "equipment",
  data() {
    return {
      // canRenew: true,
      drawer_visible: false,
      list: [],
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      query,
      common: {
        version: "1.0.0",
        mask: "dev",
        platform: 1,
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 24 },
      showEqList: true,
      pagination: {
        pageNum: 1, //当前页数
        pageSize: 10, //每页条数
        total: 0,
      },
      loading: false,
      about_expire: 0,
      expired: 0,
      no_bind_env: 0,

      has_device:true,
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
    //格式化远程
    formate_remote(data){
      if(data == 0){
        return '不可远程'
      }
      if(data == 1){
        return '可远程'
      }
    },
    //格式化自动续费
    formate_renew(data){
      if(data == 0){
        return '未开启'
      }
      if(data == 1){
        return '开启'
      }
    },
    //格式化状态
    formate_status(data){
      if(data == 0){
        return '正常'
      }
      if(data == 1){
        return '过期'
      }
      if(data == 2){
        return '待分配'
      }
      if(data == 3){
        return '故障'
      }
      if(data == 4){
        return '已删除'
      }
    },
    

    handleClick: function ({ key }) {
      if (key === "8") {
        // console.log('yyyy')
        this.showEqList = false;
      } else {
        this.showEqList = true;
      }

      // key 1 query all  2 expire(2) 3 expire(1) 4 status(4) 5 bind_env(1) 6 renew_status(1)
      if (key === "1") {
        this.query = query;
      } else if (key === "2") {
        this.query = { ...query, expire: 2 };
      } else if (key === "3") {
        this.query = { ...query, expire: 1 };
      } else if (key === "4") {
        this.query = { ...query, status: 4 };
      } else if (key === "5") {
        this.query = { ...query, bind_env: 1 };
      } else if (key === "6") {
        this.query = { ...query, renew_status: 1 };
      }

      this.fetchList();
    },
    // 设备类别改变
    changeEqType: function () {},

    onSearch: function () {
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
    onRenew: function () {},
    view: function () {},
    
    async fetchList() {
      this.loading = true;
      const {data} = await getList({
        ...this.query,
        pagesize: 10,
        page: this.pagination.pageNum,
      });
     
      if(data.code ==200){
        this.pagination.total = data.data.total;
        this.loading = false;

        this.list =  data.data.list;

        if(this.list.length == 0){
          this.has_device = false
        }else{
          this.has_device = true
        }

        this.about_expire =  data.data.about_expire;
        this.expired =  data.data.expired;
        this.no_bind_env =  data.data.no_bind_env;
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
    buyEq: function () {},
    // 续费设备
    renewalEq: function () {
      console.log("this.selectedRowKeys", this.selectedRowKeys);
    },
  },
};
</script>
<style scoped lang="less">
.equipment {
  margin-top: 11px;
  display: flex;
  flex-direction: row;
  .menu {
    height: 100%;
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
    margin-left: 11px;
    height: calc(100vh - 126px);
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
