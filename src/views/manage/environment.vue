<template>
  <div class="environment_wrap" :style="{ height: wrap_height + 'px' }">
    <div class="content_left">
      <a-menu
        style="width: 256px; height: 100%"
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
            slot-scope="text, record"
            class="content_operate"
          >
            <div
              @click="go_bind(record)"
              v-if="!record.bind_status"
              class="cell_leftblue"
            >
              绑定
            </div>

            <div
              @click="go_open(record)"
              v-if="record.bind_status"
              class="cell_leftblue"
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
import tag_manage from "./components/tag_manage.vue";
import device_manage from "./components/manage_binddevice.vue";
export default {
  components: {
    tag_manage,
    device_manage,
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
      show_columns: [], //自定义表格头
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

      device_iplist: [], //设备信息列表
      device_namelist: [], //设备名称列表
      network_typelist: [], //网络类型列表
      busine_shortlist: [], //企业简称列表
      creater_namelist: [], //创建者列表

      drawer_visible: false, //抽屉状态
      drawer_taglist: [],
      drawer_memberlist: [],
      drawer_platformlist: [],

      drawer_iplist: [],
      drawer_namelist: [],
      drawer_networklist: [],
      drawer_busshortlist: [],
      drawer_createrlist: [],

      websocketObj: null,
      websocket_port: 42536,
      check_record:null,//选中的表格行
    };
  },
  mounted() {
    this.get_platformlist();
    this.get_taglist();
    this.get_member_data();

    this.init();

    this.set_wrap_height()

    
  },
  methods: {
    //高度绑定为页面高度
    set_wrap_height() {
      this.wrap_height = document.body.clientHeight - 82
      console.log(this.wrap_height)
    },

    go_open(record) {
      console.log(record);
      this.check_record = record
      this.initWebsocket();
    },
    initWebsocket() {
      console.log('initWebsocket', this.websocket_port)
      this.webSocketObj = new WebSocket(
        "ws://" + '127.0.0.1:' + this.websocket_port
      );
      this.webSocketObj.onmessage = this.onMessage
      this.webSocketObj.onopen = this.onOpen
      this.webSocketObj.onerror = this.onError
      this.webSocketObj.onclose = this.onClose

    },
    //接收到消息的回调方法
    onMessage(evt) {
      console.log('onMessage')
      console.log(JSON.parse(evt.data))
    },
    //连接成功建立的回调方法
    onOpen() {
      console.log('onOpen ', this.webSocketObj.readyState)
      if (this.webSocketObj.readyState === 1) {
        this.websocket_open_client()
      }

    },
    //连接发生错误
    onError() {
      console.log('onError')

      if (this.websocket_port <= 42540) {
        setTimeout(() => {
          this.onClose();
          this.websocket_port += 1;
          this.initWebsocket();

        }, 1000);
      } else {
        this.$message.error('打开失败,websocket通信异常');
        this.onClose();
      }
    },
    //连接关闭的回调方法
    onClose() {
      console.log('onClose')
      this.webSocketObj && this.webSocketObj.close && this.webSocketObj.close();
    },
    websocket_open_client() {
      console.log(this.check_record.device_ip)
      let c_1 = {
        "message": "/connection/proxy",
        "serverIp":this.check_record.device_ip+':'+this.websocket_port,
        "browser_id":this.check_record.id
      }
      c_1 = JSON.stringify(c_1)
      this.webSocketObj.send(c_1);

    }, 

    //解绑设备弹出
    open_unbuind(record) {
      //console.log(record)
      let that = this;
      this.$confirm({
        title: "解绑设备",
        content: "所选环境： " + record.env_name + " ,确定解绑设备吗",
        onOk() {
          that.go_unbinddevice(record.id);
          return false;
        },
        onCancel() { },
      });
    },
    //解绑设备
    async go_unbinddevice(id) {
      let { data } = await environment_unbind_device({
        id: id,
      });
      if (data.code == 200) {
        this.$message.success("解绑成功");
      }
    },

    //删除环境弹窗
    open_delet(record) {
      //console.log(record)
      let that = this;
      this.$confirm({
        title: "删除环境",
        content: "所选环境： " + record.env_name + " ,确定删除该环境吗",
        onOk() {
          let c_1 = [];
          c_1.push(record.id);
          that.go_deletenviroment(c_1);
          return false;
        },
        onCancel() { },
      });
    },
    //批量删除环境
    async go_deletenviroment(idarr) {
      let { data } = await environment_delete_more({
        id: idarr.toString(),
      });
      if (data.code == 200) {
        this.get_tabledata();
        this.$message.success("删除成功");
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
    //批量操作jaax
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

    //打开drawer
    open_drawer() {
      this.get_device_iplist();
      this.get_device_namelist();
      this.get_busine_shortlist();
      this.get_creater_namelist();
      this.get_network_typelist();

      this.drawer_visible = true;
    },
    //取消drawer
    drawer_onClose() {
      this.drawer_visible = false;
    },
    //drawer 多选 选中回调
    drawer_multselect_handle(params, type) {
      //console.log(params)
      //console.log(type)

      this.standard_config[type] = params.toString();
      console.log(this.standard_config);
    },
    //drawer 多选  获得焦点
    drawer_mult_select_getfocus(type) {
      if (type == "tag") {
        this.drawer_taglist = this.tag_list;
      }
      if (type == "member") {
        this.drawer_platformlist = this.platform_list;
      }
    },
    //drawer 多选  搜索
    async drawer_mult_select_fetchUser(value, type) {
      if (type == "tag") {
        let { data } = await environment_tag_list({
          tag: value,
        });
        if (data.code == 200) {
          this.drawer_taglist = data.data.list;
        }
      }

      if (type == "member") {
        let { data } = await user_member_list({
          keywords: value,
        });
        if (data.code == 200) {
          this.drawer_memberlist = data.data.list;
        }
      }
    },
    //drawer 日期回调
    drawer_datepecker(date) {
      this.standard_config.begin_created_at = date[0].format("YYYY-MM-DD");
      this.standard_config.end_created_at = date[1].format("YYYY-MM-DD");
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

    //取消标签管理
    cancel_tagmanage() {
      this.show_tagmanage = false;
    },
    //取消添加设备
    cancel_devicemanage() {
      this.show_devicemanage = false;
    },
    bind_device_success() {
      this.show_devicemanage = false;
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
        this.platform_list = data.data.list;
        this.drawer_platformlist = this.platform_list;
      }
    },
    //标签列表
    async get_taglist() {
      let { data } = await environment_tag_list({});
      if (data.code == 200) {
        this.tag_list = data.data.list;
        this.drawer_taglist = this.tag_list;
      }
    },

    //设备信息列表
    async get_device_iplist() {
      let { data } = await environment_device_ip_list({});
      if (data.code == 200) {
        this.device_iplist = data.data.list;
        this.drawer_iplist = this.device_iplist;
      }
    },
    //设备名称列表
    async get_device_namelist() {
      let { data } = await environment_device_name_list({});
      if (data.code == 200) {
        this.device_namelist = data.data.list;
        this.drawer_namelist = this.device_namelist;
      }
    },
    //企业简称列表
    async get_busine_shortlist() {
      let { data } = await environment_business_short_list({});
      if (data.code == 200) {
        this.busine_shortlist = data.data.list;
        this.drawer_busshortlist = this.busine_shortlist;
      }
    },
    //创建者列表
    async get_creater_namelist() {
      let { data } = await environment_username_list({});
      if (data.code == 200) {
        this.creater_namelist = data.data.list;
        this.drawer_createrlist = this.creater_namelist;
      }
    },
    //网络类型列表
    async get_network_typelist() {
      let { data } = await environment_device_network_type_list({});
      if (data.code == 200) {
        this.network_typelist = data.data.list;
        this.drawer_networklist = this.network_typelist;
      }
    },

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

.environment_wrap {
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
  }
  .content_right {
    background-color: white;
    flex: 1;
    margin-right: 20px;
    margin-left: 10px;
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
