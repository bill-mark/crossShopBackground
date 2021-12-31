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
        </a-menu-item>
        <a-menu-item key="3" class="menu_one">
          <div class="my_equipment expired"></div>
          <div class="title">已过期设备</div>
        </a-menu-item>
        <a-menu-item key="4" class="menu_one">
          <div class="my_equipment bin"></div>
          <div class="title">设备回收站</div>
        </a-menu-item>
        <a-menu-item key="5" class="menu_one">
          <div class="my_equipment bound"></div>
          <div class="title">代绑定环境设备</div>
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
        <a-button type="primary" class="eq_buy_btn">购买设备</a-button>
        <a-button type="primary" class="eq_buy_btn" :disabled="selectedRowKeys.length > 0">续费设备</a-button>
        <a-dropdown class="eq_buy_btn">
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="1">单个添加</a-menu-item>
            <a-menu-item key="2">批量导入</a-menu-item>
          </a-menu>
          <a-button> 添加自有设备 <a-icon type="down" /> </a-button>
        </a-dropdown>
        <a-input-search class="eq_buy_btn" style="width: 460px" placeholder="多个店铺名/设备名称/设备信息/归属 请用逗号间隔" @search="onSearch" />
        <a-button @click="showDrawer" class="fliter_drawer">筛选</a-button>
      </div>
      <div class="eq_info">
        <a-table
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          :columns="columns"
          :data-source="list"
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
    <div v-else>
      <tag-list></tag-list>
    </div>
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
        <a-form-model-item>
          <a-input v-model="query.name" placeholder="搜索环境名/设备名称/设备信息/归属" />
        </a-form-model-item>
        <a-form-model-item label="设备状态">
          <a-radio-group v-model="query.resource">
            <a-radio value="1">正常</a-radio>
            <a-radio value="2">过期</a-radio>
            <a-radio value="3">待分配</a-radio>
            <a-radio value="4">故障</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="设备标签">
          <a-input v-model="query.name" placeholder="请选择或搜索设备标签" />
        </a-form-model-item>
        <a-form-model-item label="设备归属">
          <a-input v-model="query.name" placeholder="请选择或搜索设备归属" />
        </a-form-model-item>
        <a-form-model-item label="企业简称">
          <a-input v-model="query.name" placeholder="请选择或搜索企业简称" />
        </a-form-model-item>
        <a-form-model-item label="自动续费">
          <a-radio-group v-model="query.resource">
            <a-radio value="1">已开始</a-radio>
            <a-radio value="2">已关闭</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="属性">
          <a-radio-group v-model="query.resource">
            <a-radio value="1">静态</a-radio>
            <a-radio value="2">动态</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="远程状态">
          <a-radio-group v-model="query.resource">
            <a-radio value="1">可远程</a-radio>
            <a-radio value="2">不可远程</a-radio>
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
import TagList from './tagList.vue'
const columns = [
  {
    title: '设备名称',
    dataIndex: 'name',
  },{
    title: '设备信息',
    dataIndex: 'name',
  },{
    title: '绑定环境',
    dataIndex: 'name',
  },{
    title: '设备归属',
    dataIndex: 'name',
  },{
    title: '远程状态',
    dataIndex: 'name',
  },{
    title: '网络属性',
    dataIndex: 'name',
  },{
    title: '自动续费状态',
    dataIndex: 'name',
  },{
    title: '设备状态',
    dataIndex: 'name',
  },{
    title: '可用天数',
    dataIndex: 'name',
  },{
    title: '设备到期时间',
    dataIndex: 'name',
  },{
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];
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
      query: {

      },
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      showEqList: true,
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    }
  },
  methods: {
    handleClick: function({ key }) {
      if(key === '8') {
        // console.log('yyyy')
        this.showEqList = false;
      } else {
        this.showEqList = true;
      }
    },
    // 设备类别改变
    changeEqType: function() {

    },
    handleMenuClick(e) {
      console.log('click', e);
    },
    onSearch: function() {},
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
