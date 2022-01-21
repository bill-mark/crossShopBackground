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
        <!-- <a-menu-item key="5"> 待托管账密 </a-menu-item> -->
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

          <a-button class="top_btn" @click="show_tagmanage = true">
            标签管理
          </a-button>
          <a-button class="top_btn" :disabled="selectedRowKeys.length === 0">
            批量操作
          </a-button>
          <a-input-search
            placeholder="多个环境名/设备名称/设备信息/环境标签间用逗号隔开搜索"
            class="btn_search"
            @search="handle_search"
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

          <a-button class="top_btn" @click="open_drawer"> 筛选 </a-button>
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
            slot-scope="text, record, index, dataIndex"
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

            <div @click="go_edit(record, index, dataIndex)" class="cell_blue">
              编辑
            </div>

             <a-popover trigger="hover" overlayClassName="table-popover">
                <div slot="content" class="popover-content">
                  <div>删除环境</div>
                </div>

                <div class="cell_blue">更多</div>
              </a-popover>

           
          </div>
        </a-table>
        <div class="down_txt">共{{ pagination.total }}条数据</div>
      </div>
    </div>

    <a-drawer
      title="筛选"
      placement="right"
      :closable="false"
      :width="360"
      :visible="drawer_visible"
      @close="drawer_onClose"
    >
      <a-input placeholder="环境名称" v-model="standard_config.device_name" />

      <div class="drawer_line">
        <div class="drawer_l_left">授权成员:</div>
        <div class="drawer_l_right">
          <a-select
            mode="multiple"
            placeholder=""
            style="width: 100%"
            :filter-option="false"
            @focus="drawer_mult_select_getfocus('member')"
            @search="drawer_mult_select_fetchUser($event, 'member')"
            @change="drawer_multselect_handle($event, 'member_id')"
          >
            <a-select-option v-for="item in drawer_memberlist" :key="item.id">
              {{ item.username }}
            </a-select-option>
          </a-select>
        </div>
      </div>

      <div class="drawer_line">
        <div class="drawer_l_left">环境标签:</div>
        <div class="drawer_l_right">
          <a-select
            mode="multiple"
            placeholder=""
            style="width: 100%"
            :filter-option="false"
            @focus="drawer_mult_select_getfocus('tag')"
            @search="drawer_mult_select_fetchUser($event, 'tag')"
            @change="drawer_multselect_handle($event, 'tag_id')"
          >
            <a-select-option v-for="item in drawer_taglist" :key="item.id">
              {{ item.tag }}
            </a-select-option>
          </a-select>
        </div>
      </div>

      <div class="drawer_line">
        <div class="drawer_l_left">所属平台:</div>
        <div class="drawer_l_right">
          <a-select
            mode="multiple"
            placeholder=""
            style="width: 100%"
            @change="drawer_multselect_handle($event, 'platform_id')"
          >
            <a-select-option v-for="item in drawer_platformlist" :key="item.id">
              {{ item.site }}
            </a-select-option>
          </a-select>
        </div>
      </div>

      <div class="drawer_line">
        <div class="drawer_l_left">设备信息:</div>
        <div class="drawer_l_right">
          <a-select
            mode="multiple"
            placeholder=""
            style="width: 100%"
            @change="drawer_multselect_handle($event, 'device_ip')"
          >
            <a-select-option
              v-for="item in drawer_iplist"
              :key="item.device_ip"
            >
              {{ item.device_ip }}
            </a-select-option>
          </a-select>
        </div>
      </div>

      <div class="drawer_line">
        <div class="drawer_l_left">设备名称:</div>
        <div class="drawer_l_right">
          <a-select
            mode="multiple"
            placeholder=""
            style="width: 100%"
            @change="drawer_multselect_handle($event, 'device_name')"
          >
            <a-select-option
              v-for="item in drawer_namelist"
              :key="item.device_name"
            >
              {{ item.device_name }}
            </a-select-option>
          </a-select>
        </div>
      </div>

      <div class="drawer_line">
        <div class="drawer_l_left">企业简称:</div>
        <div class="drawer_l_right">
          <a-select
            mode="multiple"
            placeholder=""
            style="width: 100%"
            @change="drawer_multselect_handle($event, 'business_short')"
          >
            <a-select-option
              v-for="item in drawer_busshortlist"
              :key="item.business_short"
            >
              {{ item.business_short }}
            </a-select-option>
          </a-select>
        </div>
      </div>

      <div class="drawer_line">
        <div class="drawer_l_left">创建者:</div>
        <div class="drawer_l_right">
          <a-select
            mode="multiple"
            placeholder=""
            style="width: 100%"
            @change="drawer_multselect_handle($event, 'username')"
          >
            <a-select-option
              v-for="item in drawer_createrlist"
              :key="item.username"
            >
              {{ item.username }}
            </a-select-option>
          </a-select>
        </div>
      </div>

      <div class="drawer_line">
        <div class="drawer_l_left">创建时间:</div>
        <div class="drawer_l_right">
          <a-range-picker format="YYYY-MM-DD" @change="drawer_datepecker" />
        </div>
      </div>

      <div class="drawer_line">
        <div class="drawer_l_left">网络类型:</div>
        <div class="drawer_l_right">
          <a-select
            mode="multiple"
            placeholder=""
            style="width: 100%"
            @change="drawer_multselect_handle($event, 'type_id')"
          >
            <a-select-option v-for="item in drawer_networklist" :key="item.id">
              {{ item.type_title }}
            </a-select-option>
          </a-select>
        </div>
      </div>

      <a-button class="drawer_btn" type="primary" @click="get_tabledata">
        确定筛选
      </a-button>
    </a-drawer>

    <tag_manage
      v-if="show_tagmanage"
      @cancel="cancel_tagmanage"
      :isshow="show_tagmanage"
    />

    <device_manage
      v-if="show_devicemanage"
      @cancel="cancel_devicemanage"
      @success="bind_device_success"
      :eventname="need_bind_eventname"
      :eventid="need_bind_eventid"
      :isshow="show_devicemanage"
    />
  </div>
</template>
<script>
import { environment_index } from "@/api/home";
import {
  environment_platform_list, environment_tag_list, environment_device_ip_list, environment_username_list,
  environment_device_name_list, environment_device_network_type_list, environment_business_short_list
} from "@/api/environment.js";
import { user_member_list } from '@/api/member.js'
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

      show_devicemanage: false,
      need_bind_eventname: '',
      need_bind_eventid: null,

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
      },

      table_data: [],
      table_loading: false,
      pagination: {
        pageNum: 1, //当前页数
        pageSize: 20, //每页条数
        total: 0,
      },
      no_auth_environment: '',//待授权
      no_bind_count: '',//待绑定
      urgent_renewal_count: '',//待付费

      selectedRowKeys: [],//表格 选中单元
      checked_columns: [],//自定义表格头
      columns: [
        {
          title: '环境',
          dataIndex: 'env_name',
          scopedSlots: { customRender: "cell_envname" },
          show: true,
        },
        {
          title: '所属平台',
          dataIndex: 'country',
          scopedSlots: { customRender: "cell_platform" },
          show: true,
        },

        {
          title: '标签',
          dataIndex: 'tag',
          scopedSlots: { customRender: "cell_tag" },
          show: false,
        },
        {
          title: '企业简称',
          dataIndex: 'business_short',
          show: false,
        },
        {
          title: '创建者',
          dataIndex: 'username',
          show: false,
        },
        {
          title: '创建时间',
          dataIndex: 'created_at',
          show: false,
        },
        {
          title: '更新时间',
          dataIndex: 'updated_at',
          show: false,
        },

        {
          title: '设备名称',
          dataIndex: 'device_name',
          show: true,
        },
        {
          title: '设备信息',
          dataIndex: 'bind_status',
          scopedSlots: { customRender: "cell_device" },
          show: true,
        },
        {
          title: '最后登陆者',
          dataIndex: 'last_username',
          scopedSlots: { customRender: "cell_last" },
          show: true,
        },
        {
          title: '最后登陆时间',
          dataIndex: 'last_login_time',
          show: true,
        },
        {
          dataIndex: 'operation',
          width: 250,
          fixed: "right",
          slots: { title: 'operaTitle' },
          scopedSlots: { customRender: "cell_operate" },
          show: true,
        },


      ],

      tag_list: [],//标签列表
      member_list: [],//成员列表
      platform_list: [],//平台列表

      device_iplist: [],//设备信息列表
      device_namelist: [],//设备名称列表
      network_typelist: [],//网络类型列表
      busine_shortlist: [],//企业简称列表
      creater_namelist: [],//创建者列表

      drawer_visible: false,//抽屉状态
      drawer_taglist: [],
      drawer_memberlist: [],
      drawer_platformlist: [],

      drawer_iplist: [],
      drawer_namelist: [],
      drawer_networklist: [],
      drawer_busshortlist: [],
      drawer_createrlist: [],
    };
  },
  mounted() {
    this.get_platformlist();
    this.get_taglist()
    this.get_member_data()
    
    this.init()
  },
  methods: {
    //打开drawer
    open_drawer() {
      this.get_device_iplist()
      this.get_device_namelist()
      this.get_busine_shortlist()
      this.get_creater_namelist()
      this.get_network_typelist()

      this.drawer_visible = true
    },
    //取消drawer
    drawer_onClose() {
      this.drawer_visible = false;
    },
    //drawer 多选 选中回调
    drawer_multselect_handle(params, type) {
      //console.log(params)
      //console.log(type)

      this.standard_config[type] = params.toString()
      console.log(this.standard_config)
    },
    //drawer 多选  获得焦点
    drawer_mult_select_getfocus(type) {
      if (type == 'tag') {
        this.drawer_taglist = this.tag_list
      }
      if (type == 'member') {
        this.drawer_platformlist = this.platform_list
      }

    },
    //drawer 多选  搜索
    async drawer_mult_select_fetchUser(value, type) {
      if (type == 'tag') {
        let { data } = await environment_tag_list({
          tag: value
        })
        if (data.code == 200) {

          this.drawer_taglist = data.data.list
        }
      }

      if (type == 'member') {
        let { data } = await user_member_list({
          keywords: value
        })
        if (data.code == 200) {

          this.drawer_memberlist = data.data.list
        }
      }
    },
    //drawer 日期回调
    drawer_datepecker(date) {
      this.standard_config.begin_created_at = date[0].format("YYYY-MM-DD")
      this.standard_config.end_created_at = date[1].format("YYYY-MM-DD")
    },


    //获得成员列表
    async get_member_data(keywords) {
      let { data } = await user_member_list({
        keywords: keywords,
      })
      if (data.code == 200) {
        this.member_list = data.data.list
        this.drawer_memberlist = this.member_list
      }
    },

    //取消标签管理
    cancel_tagmanage() {
      this.show_tagmanage = false
    },
    //取消添加设备
    cancel_devicemanage() {
      this.show_devicemanage = false
    },
    bind_device_success() {
      this.show_devicemanage = false
      this.init();
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
        this.drawer_platformlist = this.platform_list
      }
    },
    //标签列表
    async get_taglist() {
      let { data } = await environment_tag_list({

      })
      if (data.code == 200) {

        this.tag_list = data.data.list
        this.drawer_taglist = this.tag_list
      }
    },


    //设备信息列表
    async get_device_iplist() {
      let { data } = await environment_device_ip_list({

      });
      if (data.code == 200) {
        this.device_iplist = data.data.list
        this.drawer_iplist = this.device_iplist
      }
    },
    //设备名称列表
    async get_device_namelist() {
      let { data } = await environment_device_name_list({

      });
      if (data.code == 200) {
        this.device_namelist = data.data.list
        this.drawer_namelist = this.device_namelist
      }
    },
    //企业简称列表
    async get_busine_shortlist() {
      let { data } = await environment_business_short_list({

      });
      if (data.code == 200) {
        this.busine_shortlist = data.data.list
        this.drawer_busshortlist = this.busine_shortlist
      }
    },
    //创建者列表
    async get_creater_namelist() {
      let { data } = await environment_username_list({

      });
      if (data.code == 200) {
        this.creater_namelist = data.data.list
        this.drawer_createrlist = this.creater_namelist
      }
    },
    //网络类型列表
    async get_network_typelist() {
      let { data } = await environment_device_network_type_list({

      });
      if (data.code == 200) {
        this.network_typelist = data.data.list
        this.drawer_networklist = this.network_typelist
      }
    },


    menu_handleClick(e) {
      console.log("click ", e.keyPath);
      this.current = e.key;
    },

    async init() {
      this.table_loading = true
      let { data } = await environment_index({
        pagesize: 20,
        page: this.pagination.pageNum,
      })
      this.table_loading = false
      if (data.code == 200) {
        this.pagination.total = data.data.total;
        this.no_auth_environment = data.data.no_auth_environment
        this.no_bind_count = data.data.no_bind_count
        this.urgent_renewal_count = data.data.urgent_renewal_count

        this.table_data = data.data.list
      }
    },
    //表格行选中
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },

    //搜索回调
    handle_search(keywords) {
      console.log(keywords)
      this.standard_config.keywords = keywords
      this.pagination.pageNum = 1
      this.get_tabledata();
    },

    //表格 切换页码
    handleTableChange(pagination) {
      this.pagination.pageNum = pagination.current;
      this.get_tabledata();
    },
    async get_tabledata() {
      console.log(this.standard_config)
      // return

      let { data } = await environment_index({
        ...this.standard_config,
        pagesize: 20,
        page: this.pagination.pageNum,
      });
      if (data.code == 200) {
        this.pagination.total = data.data.total;
        this.no_auth_environment = data.data.no_auth_environment
        this.no_bind_count = data.data.no_bind_count
        this.urgent_renewal_count = data.data.urgent_renewal_count

        this.table_data = data.data.list
      }
    },
    event_change(value) {
      console.log(value)
      this.event_guanli = value
    },
    go_addenv() {
      this.$router.push({ name: 'manage_addenv' })
    },

    format_devicestate(state, record) {
      if (!state) {
        return '未绑定'
      } else {
        return record.device_ip + ' ' + record.device_area_title + ' ' + record.device_package_title
      }
    },

    go_bind(record) {
      this.show_devicemanage = true
      this.need_bind_eventname = record.env_name
      this.need_bind_eventid = record.id
    },
    go_open(record) {
      console.log(record)
    },
    go_edit(record) {
      this.$router.push({ path: 'editenv', query: { id: record.id } })
    },

  },
};
</script>

<style scoped lang="less">
.table-popover{
  .popover-content{
    width: 70px;
    text-align: center;
  }
}

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

.drawer_line {
  display: flex;
  height: 32px;
  margin-top: 18px;
  .drawer_l_left {
    width: 75px;
    flex: none;
    line-height: 32px;
  }
  .drawer_l_right {
    flex: 1;
  }
}
.drawer_btn {
  position: absolute;
  bottom: 20px;
  left: 140px;
}
</style>
