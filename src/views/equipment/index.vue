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
          <div class="count">{{ about_expire }}</div>
        </a-menu-item>
        <a-menu-item key="3" class="menu_one">
          <div class="my_equipment expired"></div>
          <div class="title">已过期设备 {{ expired }} </div>
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
        <!-- <a-menu-item key="7" class="menu_one">
          <div class="my_equipment renewal"></div>
          <div class="title">设备标签</div>
        </a-menu-item> -->
        <a-menu-item key="8" class="menu_one">
          <div class="my_equipment renewal"></div>
          <div class="title">标签管理</div>
        </a-menu-item>
      </a-menu>
    </div>
    <div class="content" v-if="showEqList">
      <div class="search_panel">
        <a-radio-group  @change="changeEqType">
          <a-radio-button value="large" class="eq_radio">平台设备</a-radio-button>
          <a-radio-button value="default" class="eq_radio">自有设备</a-radio-button>
          <a-radio-button value="small" class="eq_radio">本地虚拟设备</a-radio-button>
        </a-radio-group>
        <a-button type="primary" class="eq_buy_btn" @click="buyEq">购买设备</a-button>
        <a-button type="primary" class="eq_buy_btn" :disabled="selectedRowKeys.length === 0" @click="renewalEq">续费设备</a-button>
        <a-dropdown class="eq_buy_btn">
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="1">单个添加</a-menu-item>
            <a-menu-item key="2">批量导入</a-menu-item>
          </a-menu>
          <a-button> 添加自有设备 <a-icon type="down" /> </a-button>
        </a-dropdown>
        <a-input-search class="eq_buy_btn" style="width: 460px" placeholder="多个店铺名/设备名称/设备信息/归属 请用逗号间隔" @search="onSearchKey" />
        <a-button @click="showDrawer" class="fliter_drawer">筛选</a-button>
      </div>
      <div class="eq_info">
        <a-table
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          :row-key="record => record.id"
          :columns="columns"
          :data-source="list"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
          v-if="list.length > 0"
        >
        <template slot="operation" slot-scope="text, record">
          <a-button type="primary" @click="onRenew(record)">续费</a-button>
          <a-button @click="view(record)" class="view_btn">详情</a-button>
        </template>
        </a-table>
        <no-equipment v-else></no-equipment>
      </div>
    </div>
    <tag-list v-else></tag-list>
    <a-drawer
      title="筛选"
      placement="right"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      :width="450"
      @close="onClose"
    >
      <a-form-model :model="query" :label-col="labelCol" :wrapper-col="wrapperCol">
        <!-- <a-form-model-item>
          <a-input v-model="query.keyword" placeholder="搜索环境名/设备名称/设备信息/归属" />
        </a-form-model-item> -->
        <a-form-model-item label="设备状态">
          <a-radio-group v-model="query.status">
            <a-radio value="all">全部</a-radio>
            <a-radio value="0">正常</a-radio>
            <a-radio value="1">过期</a-radio>
            <a-radio value="2">待分配</a-radio>
            <a-radio value="3">故障</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="设备名称">
          <a-input v-model="query.device_name" placeholder="请选择或搜索设备名称" />
        </a-form-model-item>
        <a-form-model-item label="环境名称">
          <a-input v-model="query.env_name" placeholder="请选择或搜索环境名称" />
        </a-form-model-item>
        <a-form-model-item label="设备IP">
          <a-input v-model="query.device_ip" placeholder="请选择或搜索设备IP" />
        </a-form-model-item>
        <a-form-model-item label="设备标签">
          <a-input v-model="query.tags" placeholder="请选择或搜索设备标签" />
        </a-form-model-item>
        <a-form-model-item label="设备国家">
          <a-input v-model="query.country" placeholder="请选择或搜索设备国家" />
        </a-form-model-item>
        <!-- <a-form-model-item label="企业简称">
          <a-input v-model="query.name" placeholder="请选择或搜索企业简称" />
        </a-form-model-item> -->
        <a-form-model-item label="自动续费">
          <a-radio-group v-model="query.renew_status">
            <a-radio value="all">全部</a-radio>
            <a-radio value="0">未开启</a-radio>
            <a-radio value="1">开启</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="标签设备">
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
        <!-- <a-button :style="{ marginRight: '8px' }" @click="onClose">
          Cancel
        </a-button> -->
        <a-button type="primary" @click="onSearch">
          确定筛选
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import noEquipment from './noEquipment.vue';
import TagList from './tagList.vue';
import {getList} from '@/api/equipment';

const columns = [
  {
    title: '设备id',
    dataIndex: 'id',
  },{
    title: '设备信息id',
    dataIndex: 'device_info_id',
  },{
    title: '设备类型id',
    dataIndex: 'device_type_id',
  },{
    title: '设备地域id',
    dataIndex: 'device_region_id',
  },{
    title: '设备地区id',
    dataIndex: 'device_area_id',
  },{
    title: '设备套餐id',
    dataIndex: 'device_package_id',
  },{
    title: '设备购买时长id',
    dataIndex: 'device_purchase_id',
  },{
    title: '订单id',
    dataIndex: 'order_id',
  },{
    title: '设备名称',
    dataIndex: 'device_name',
  },{
    title: '设备ip',
    dataIndex: 'device_ip',
  },{
    title: '设备状态',
    dataIndex: 'status',
  },{
    title: '续费状态',
    dataIndex: 'renew_status',
  },{
    title: '创建时间',
    dataIndex: 'created_at',
  },{
    title: '编辑时间',
    dataIndex: 'updated_at',
  },{
    title: '过期时间',
    dataIndex: 'expired_at',
  },{
    title: '环境名称',
    dataIndex: 'env_name',
  },{
    title: '站点',
    dataIndex: 'site',
  },{
    title: '国家',
    dataIndex: 'country',
  },{
    title: '设备远程',
    dataIndex: 'device_remote',
  },{
    title: '设备类型',
    dataIndex: 'device_type',
  },{
    title: '设备标签',
    dataIndex: 'tags',
  },{
    title: '可用天数',
    dataIndex: 'available_day',
  },{
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
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
  expire: null,  //过期 全部 all 1 已过期 2 将要过期
  renew_status: null, //是否自动续费 全部 all 0 未开启 1 开启
  device_remote: null, //是否可远程 全部 all 0 不可远程 1 可远程 
  no_tag: null, //有无标签设备 全部 all 0 无标签 1 有标签
  bind_env: null, //绑定环境 全部 all 0 已绑定环境 1 未绑定
  pagesize: 20,
  page: null
};
export default {
  components: { noEquipment, TagList },
  name: 'equipment',
  data() {
    return {
      // canRenew: true,
      visible: false,
      list: [],
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      query,
      common: {
        version: '1.0.0',
        mask: 'dev',
        platform: 1
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 24 },
      showEqList: true,
      pagination: {},
      loading: false,
      about_expire: 0,
      expired: 0,
      no_bind_env: 0
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    }
  },
  mounted() {
    this.fetchList();
  },
  methods: {
    handleClick: function({ key }) {
      if(key === '8') {
        // console.log('yyyy')
        this.showEqList = false;
      } else {
        this.showEqList = true;
      }

      // key 1 query all  2 expire(2) 3 expire(1) 4 status(4) 5 bind_env(1) 6 renew_status(1)
      if (key === '1') {
        this.query = query;
      } else if (key === '2') {
        this.query = {...query, expire: 2};
      } else if (key === '3') {
        this.query = {...query, expire: 1};
      } else if (key === '4') {
        this.query = {...query, status: 4};
      } else if (key === '5') {
        this.query = {...query, bind_env: 1};
      } else if (key === '6') {
        this.query = {...query, renew_status: 1};
      }

      this.fetchList();
    },
    // 设备类别改变
    changeEqType: function() {

    },
    handleMenuClick(e) {
      console.log('click', e);
    },
    onSearch: function() {
      this.fetchList();
    },
    afterVisibleChange(val) {
      console.log('visible', val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    onRenew: function() {
      
    },
    view: function() {

    },
    async fetchList() {
      
      this.loading = true;
      const {data: {data: {list, total, about_expire, expired, no_bind_env}}} = await getList({
        ...this.query,
        version: '1.0.0',
        mask: 'dev',
        platform: 1
      });
      console.log('list', list);
      const pagination = { ...this.pagination };
      pagination.total = total;
      this.loading = false;
      // this.list = list;
      this.list = [
        {id: '11', device_info_id: '123',device_region_id: '322',device_area_id: '123',device_package_id: '123',device_purchase_id: '123',order_id: '123',device_name: '123',device_ip: '123',status: '123',renew_status: '123',created_at: '123',updated_at: '123',expired_at: '123',env_name: '123',site: '123',country: '123',device_remote: '123',device_type: '123',tags: '123',available_day: '123'},
        {id: '112', device_info_id: '1232',device_region_id: '3222',device_area_id: '123',device_package_id: '123',device_purchase_id: '123',order_id: '123',device_name: '123',device_ip: '123',status: '123',renew_status: '123',created_at: '123',updated_at: '123',expired_at: '123',env_name: '123',site: '123',country: '123',device_remote: '123',device_type: '123',tags: '123',available_day: '123'}];
      this.pagination = pagination;
      this.about_expire = about_expire;
      this.expired = expired;
      this.no_bind_env = no_bind_env;
    },
    handleTableChange(pagination) {
      console.log(pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.query.page = pagination.current;
      this.pagination = pager;
      // const {tag, pagesize} = this.query;
      this.fetchList();
    },
    onSearchKey: function(key) {
      // console.log('key', key);
      this.query.keyword = key;
      this.fetchList();
    },
    // 购买设备
    buyEq: function() {

    },
    // 续费设备
    renewalEq: function() {
      console.log('this.selectedRowKeys', this.selectedRowKeys);
    }

  }
}
</script>
<style scoped lang="less">
.equipment {
  margin-top:11px;
  display:flex;
  flex-direction:row;
  .menu {
    height:100%;
    width: 210px;
    background-color: #fff;
    padding-top: 38px;
    .menu_one {
      display:flex;
      flex-direction: row;
      height: 46px;
      .ant-menu-item-selected {
        background: linear-gradient(90deg, #F7F9FF 0%, #EBF0FC 100%);
      }
      .my_equipment {
        margin-top: 14px;
        margin-right: 7px;
        width: 18px;
        height: 16px;
        background-image: url('../../assets/img/equipment/device@2x.png');
        background-repeat: no-repeat;
      }
      .will_expire {
        background-image: url('../../assets/img/equipment/will_expire@2x.png')
      }
      .expired {
        background-image: url('../../assets/img/equipment/expired@2x.png')
      }
      .bin {
        background-image: url('../../assets/img/equipment/bin@2x.png')
      }
      .bound {
        background-image: url('../../assets/img/equipment/bound@2x.png')
      }
      .renewal {
        background-image: url('../../assets/img/equipment/renewal@2x.png')
      }

      .title {
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #374567;
        line-height:46px;
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
