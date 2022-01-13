<template>
  <div class="environment_wrap">
    <div class="content_left">
      <a-menu
        style="width: 256px"
        :default-selected-keys="['1']"
        mode="inline"
        :selected-keys="[current]"
        @click="menu_handleClick"
      >
        <a-menu-item key="1"> 我的环境 </a-menu-item>
        <a-menu-item key="2"> 常用环境 </a-menu-item>
        <a-menu-item key="3"> 最近打开 </a-menu-item>
        <a-menu-item key="4"> 急需付费 {{ urgent_renewal_count }} </a-menu-item>
        <a-menu-item key="5"> 待托管账密 </a-menu-item>
        <a-menu-item key="6"> 待授权 {{ no_auth_environment }}</a-menu-item>
        <a-menu-item key="7"> 待绑定设备 {{ no_bind_count }} </a-menu-item>

        <!-- <a-sub-menu key="platform">
          <span slot="title">
            <span>所属平台</span>
          </span>
          <a-menu-item  v-for="item in platform_list" :key="item.id"> 
            {{item.site}}
          </a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="tag">
          <span slot="title">
            <span>环境标签</span>
          </span>
          <a-menu-item  v-for="item in tag_list" :key="item.id"> 
            {{item.tag}}
          </a-menu-item>
        </a-sub-menu> -->
      </a-menu>
    </div>

    <div class="content_right">
      <div class="top_line">
        <div class="top_l_left">
          <a-button type="primary" class="top_btn" @click="go_addenv">
            新建环境
          </a-button>

          <a-button class="top_btn" @click="show_tagmanage = true"> 标签管理 </a-button>
          <a-button class="top_btn" :disabled="selectedRowKeys.length === 0"> 批量操作 </a-button>
          <a-input-search
            placeholder="多个环境名/设备名称/设备信息/环境标签间用逗号隔开搜索"
            class="btn_search"
            @search="onSearch"
          />
        </div>

        <div class="top_l_right">
          <a-select
            default-value="1"
            style="width: 120px"
            @change="event_change"
          >
            <a-select-option value="1"> 环境管理 </a-select-option>
            <a-select-option value="2"> 环境运营 </a-select-option>
          </a-select>

          <a-button class="top_btn"> 筛选 </a-button>
        </div>
      </div>

      <div class="down_table">
        <a-table
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange,
          }"
          :columns="columns"
          :data-source="table_data"
          :row-key="(r, i) => i.toString()"
          :scroll="{ x: 1200, }"
          :pagination="pagination"
          @change="handleTableChange"
        >
          

         
          <div slot="cell_envname" slot-scope="text" class="content_envname">
            {{ text }}
          </div>

           <div slot="cell_platform" slot-scope="text,record">
            {{ text }}{{record.site}}
          </div>

          <div slot="cell_tag" slot-scope="text" >
             <span v-for="item in text" :key="item.id">
               {{item.tag}}
             </span>
          </div>

          <div slot="cell_device" slot-scope="text,record">
            {{ format_devicestate(text,record) }}
          </div>

           <div slot="cell_last" slot-scope="text,record">
            {{ text }}({{record.business_name}})
          </div>

          <div slot="operaTitle" class="title_operate">
              <div class="title_operate_left">操作</div>
              <!-- <div class="title_operate_right">
                 <a-icon type="setting" />
              </div> -->
          </div>

          <div slot="cell_operate" slot-scope="text, record, index, dataIndex" class="content_operate">
              <div @click="go_bind(record)"
                  v-if="!record.bind_status"
                  class="cell_blue"
              >
                绑定
              </div>

              <div @click="go_open(record)"
                  v-if="record.bind_status"
                  class="cell_blue"
              >
                打开
              </div>

              <div @click="go_edit( record, index, dataIndex)"
                class="cell_blue"
              >
                编辑
              </div>

              <div 
                class="cell_blue"
              >
                更多
              </div>
          </div>


        </a-table>
         <div class="down_txt">共{{pagination.total}}条数据</div>
      </div>
    </div>

    <tag_manage v-if="show_tagmanage" @cancel="cancel_tagmanage" :isshow="show_tagmanage" />
    
    <device_manage v-if="show_devicemanage" @cancel="cancel_devicemanage" 
       :eventname="need_bind_eventname" :eventid="need_bind_eventid"
      :isshow="show_devicemanage" />
  </div>
</template>
<script>
import { environment_index } from "@/api/home";
import { environment_platform_list, environment_tag_list } from "@/api/environment.js";

import tag_manage from './components/tag_manage.vue'
import device_manage from './components/device_manage.vue'
export default {
  components: {
    tag_manage,
    device_manage
  },
  data() {
    return {
      current: "1",//选中的目录
      event_guanli: "1",//环境模式
      show_tagmanage: false,//标签管理状态

      platform_list: [],//环境列表
      tag_list: [],//标签列表

      show_devicemanage:true,
      need_bind_eventname:'',
      need_bind_eventid:'',

      //默认配置
      standard_config: {
        keywords: '',
        platform_id: '',
        tag_id: '',
        device_ip: '',
        device_name: '',
        business_short: '',
        begin_created_at: '',
        end_created_at: '',
        urgent_renewal: 'all',
        recent_open: 'all',
        no_tag: 'all',
        env_common: 'all',
        env_top: 'all',
        no_bind: 'all',
        no_auth_env: 'all',
        member_id: '',
        pagesize: 20,
        page: 1,
      },

      table_data: [],
      pagination: {
        pageNum: 0, //当前页数
        pageSize: 20, //每页条数
        total: 0,
      },
      no_auth_environment: '',//待授权
      no_bind_count: '',//待绑定
      urgent_renewal_count: '',//待付费

      selectedRowKeys: [],
      checked_columns:[],
      columns: [
        {
          title: '环境',
          dataIndex: 'env_name',
          scopedSlots: { customRender: "cell_envname" },
          show:true,
        },
        {
          title: '所属平台',
          dataIndex: 'country',
          scopedSlots: { customRender: "cell_platform" },
           show:true,
        },

         {
          title:'标签',
          dataIndex: 'tag',
          scopedSlots: { customRender: "cell_tag" },
          show:false,
        },
        {
          title: '企业简称',
          dataIndex: 'business_short',
          show:false,
        },
        {
          title: '创建者',
          dataIndex: 'username',
          show:false,
        },
        {
          title: '创建时间',
          dataIndex: 'created_at',
          show:false,
        },
        {
          title: '更新时间',
          dataIndex: 'updated_at',
          show:false,
        },

        {
          title: '设备名称',
          dataIndex: 'device_name',
          show:true,
        },
        {
          title: '设备信息',
          dataIndex: 'bind_status',
          scopedSlots: { customRender: "cell_device" },
          show:true,
        },
        {
          title: '最后登陆者',
          dataIndex: 'last_username',
          scopedSlots: { customRender: "cell_last" },
          show:true,
        },
        {
          title: '最后登陆时间',
          dataIndex: 'last_login_time',
          show:true,
        },
        {
          dataIndex: 'operation',
          width: 250,
          fixed: "right",
          slots: { title: 'operaTitle' },
          scopedSlots: { customRender: "cell_operate" },
          show:true,
        },
       
        
      ],
    };
  },
  mounted() {
    this.get_platformlist();
    this.get_taglist()

    this.init()
  },
  methods: {
    //取消标签管理
    cancel_tagmanage(){
       this.show_tagmanage = false
    },
    //取消添加设备
    cancel_devicemanage(){
        this.show_devicemanage = false
    },
    //平台列表
    async get_platformlist() {
      let { data } = await environment_platform_list({
        type: "all",
        pagesize: 100,
        page: 1,
      });
      if (data.code == 200) {
        this.platform_list = data.data.list
      }
    },
    //标签列表
    async get_taglist() {
      let { data } = await environment_tag_list({

      })
      if (data.code == 200) {

        this.tag_list = data.data.list
      }
    },
    menu_handleClick(e) {
      console.log("click ", e.keyPath);
      this.current = e.key;
    },

    async init() {
      let { data } = await environment_index({
        pagesize: 20,
        page: this.pagination.pageNum,
      })
      if (data.code == 200) {
        this.pagination.total = data.data.total;
        this.no_auth_environment = data.data.no_auth_environment
        this.no_bind_count = data.data.no_bind_count
        this.urgent_renewal_count = data.data.urgent_renewal_count

        this.table_data = data.data.list
      }
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },

     //表格 切换页码
    handleTableChange(pagination) {
      this.pagination.pageNum = pagination.current-1;
      this.onSearch();
    },

    async onSearch(keywords) {
      console.log(keywords);
      let { data } = await environment_index({
        keywords: keywords,
        platform_id: this.platform_id,
        recent_open: this.recent_open,
        env_common: this.env_common,
        pagesize: 20,
        page: this.pagination.pageNum,
      });
      if (data.code == 200) {
        this.pagination.total = data.data.total;
      }
    },
    event_change(value) {
      console.log(value)
      this.event_guanli = value
    },
    go_addenv() {
      this.$router.push({ name: 'manage_addenv' })
    },

    format_devicestate(state,record){
       if(!state){
        return '未绑定'
       }else{
         return record.device_ip +' ' +record.device_area_title+' '+record.device_package_title
       }
     },

    go_bind(record){
       this.show_devicemanage = true
       this.need_bind_eventname =record.env_name
       this.need_bind_eventid =record.id
    },
    go_open( record){
       console.log(record)
    },
    go_edit(text, record, index, dataIndex){
       console.log(text, record, index, dataIndex)
    },

  },
};
</script>

<style scoped lang="less">
.environment_wrap {
  min-width: 1845px;
  padding-left: 15px;
  margin: 0 auto;
  min-height: 600px;
  margin-top: 20px;

  border: 1px solid green;
  display: flex;
  .content_left {
    min-width: 220px;
    background-color: white;
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
      .title_operate{
        display: flex;
          width: 200px;
        justify-content: space-between;
      }
      .content_operate{
        display: flex;
      
        .cell_blue{
           padding-left: 20px;
           color: #4C84FF;
           cursor: pointer;
        }
      }
    }
  }
}
</style>
