<template>
  <div class="adden_wrap">
    <div class="top_line">
      <a-button type="primary" class="top_l_btn" @click="go_back">
        <a-icon type="left" />返回
      </a-button>
      <div class="top_l_right" @click="test">新建环境</div>
    </div>

    <div class="cell_title">
      <div class="cell_title_left"></div>
      <div class="cell_title_right">环境基本信息</div>
    </div>

    <div class="cell_line">
      <div class="cell_lefttxt red_title">环境名称:</div>
      <div class="cell_leftcont">
        <a-input placeholder="请输入环境名称" v-model="env_name" />
      </div>
      <div class="cell_righttxt red_title">所属平台:</div>
      <div class="cell_rightcont">
        <a-cascader
          style="width: 380px"
          :field-names="{ label: 'country', value: 'id', children: 'child' }"
          :options="platform_options"
          :display-render="displayRender"
          expand-trigger="hover"
          placeholder="请选择所属平台"
          @change="platform_onChange"
        />
      </div>
    </div>

    <div class="cell_line">
      <div class="cell_lefttxt red_title">店铺账号:</div>
      <div class="cell_leftcont">
        <a-input placeholder="请输入店铺账号" v-model="shop_account" />
      </div>
      <div class="cell_righttxt red_title">店铺密码:</div>
      <div class="cell_rightcont">
        <a-input-password
          placeholder="请输入店铺密码"
          v-model="shop_password"
        />
      </div>
    </div>

    <div class="cell_line">
      <div class="cell_lefttxt">设备:</div>
      <div class="cell_leftcont">
        <a-select
          :allowClear="true"
          style="width: 380px"
          @change="device_handleChange"
        >
          <a-select-option
            :value="item.id"
            v-for="item in device_list"
            :key="item.id"
          >
            {{ item.device_name }}
          </a-select-option>
        </a-select>
      </div>
      <div class="cell_righttxt">环境标签:</div>
      <div class="cell_rightcont">
        <a-select
          mode="multiple"
          style="width: 380px"
          @change="tagid_handleChange"
        >
          <a-select-option
            :value="item.id"
            v-for="item in tagIds"
            :key="item.id"
          >
            {{ item.tag }}
          </a-select-option>
        </a-select>
      </div>
    </div>

    <div class="cell_line">
      <div class="cell_lefttxt">授权成员:</div>
      <div class="cell_leftcont">
        <a-select
          mode="multiple"
          placeholder=""
          style="width: 100%"
          :filter-option="false"
          @focus="drawer_mult_select_getfocus('member')"
          @search="drawer_mult_select_fetchUser($event, 'member')"
          @change="drawer_multselect_handle"
        >
          <a-select-option v-for="item in drawer_memberlist" :key="item.id">
            {{ item.username }}
          </a-select-option>
        </a-select>
      </div>
      <div class="cell_righttxt">企业简称:</div>
      <div class="cell_rightcont">
        <a-input placeholder="请输入企业简称" v-model="business_short" />
      </div>
    </div>

    <div class="cell_title">
      <div class="cell_title_left"></div>
      <div class="cell_title_right">环境设置</div>
    </div>

    <div class="cell_line">
      <div class="cell_lefttxt">默认浏览器:</div>
      <div class="cell_leftcont">
        <a-select
          style="width: 380px"
          default-value="0"
          @change="broser_handleChange"
        >
          <a-select-option
            :value="item.value"
            v-for="item in broser_list"
            :key="item.value"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </div>
      <div class="cell_righttxt">语言:</div>
      <div class="cell_rightcont">
        <a-select
          style="width: 380px"
          default-value="0"
          @change="lanage_handleChange"
        >
          <a-select-option
            :value="item.value"
            v-for="item in lanage_list"
            :key="item.value"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </div>
    </div>

    <div class="cell_line">
      <div class="cell_lefttxt">UA:</div>
      <div class="cell_leftcont">
        <a-radio-group v-model="checked_ua">
          <a-radio
            :value="item.value"
            v-for="item in ua_list"
            :key="item.value"
          >
            {{ item.name }}
          </a-radio>
        </a-radio-group>
      </div>
      <div class="cell_righttxt">同步方式:</div>
      <div class="cell_rightcont">
        <a-radio-group v-model="checked_cookie">
          <a-radio
            :value="item.value"
            v-for="item in cookie_list"
            :key="item.value"
          >
            {{ item.name }}
          </a-radio>
        </a-radio-group>
      </div>
    </div>

    <div class="cell_line">
      <div class="cell_lefttxt">windows:</div>
      <div class="cell_leftcont">
        <a-textarea :disabled="checked_ua != 1" v-model="env_windows" />
      </div>
      <div class="cell_righttxt">linux:</div>
      <div class="cell_rightcont">
        <a-textarea :disabled="checked_ua != 1" v-model="env_linux" />
      </div>
    </div>

    <div class="cell_line" style="margin-top: 40px">
      <div class="cell_lefttxt">mac:</div>
      <div class="cell_leftcont">
        <a-textarea :disabled="checked_ua != 1" v-model="env_mac" />
      </div>
      <div class="cell_righttxt">android:</div>
      <div class="cell_rightcont">
        <a-textarea :disabled="checked_ua != 1" v-model="env_android" />
      </div>
    </div>

    <a-button type="primary" class="btn_over" @click="go_finish">
      完成
    </a-button>
  </div>
</template>
<script>
import { environment_platform_list, client_v1_device, environment_tag_list, environment_create } from "@/api/environment.js";
import { user_member_list } from '@/api/member.js'
export default {
  data() {
    return {
      env_name: "",
      platform_options: [],
      platform_id: "",
      country_id: "",

      shop_account: "",
      shop_password: "",

      device_list: [
      ],
      device_id: '',
      tagIds: [],
      check_tagids: [],

      business_short: '',//企业简称

      broser_list: [
        {
          name: 'chrome',
          value: '0',
        },
        {
          name: 'Firefox',
          value: '1',
        },
      ],
      check_broser: '0',
      lanage_list: [
        {
          name: '随机',
          value: '0'
        },
        {
          name: '英语',
          value: '1'
        },
        {
          name: '日语',
          value: '2'
        },
        {
          name: '简体中文',
          value: '3'
        },
        {
          name: '繁体中文',
          value: '4'
        },
      ],
      check_lanage: '0',
      ua_list: [
        {
          name: '系统分配',
          value: '0'
        },
        {
          name: '自定义',
          value: '1'
        },
      ],
      checked_ua: '0',
      cookie_list: [
        {
          name: '环境同步',
          value: '0'
        },
        {
          name: '用户同步',
          value: '1'
        },
      ],
      checked_cookie: '0',
      member_list: [],//成员列表
      drawer_memberlist: [],
      check_member:[],

      env_windows: 'Mozilla/5.0 (Windows NT 6.3; Win32; x86) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.34 Safari/537.36',
      env_linux: 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4325.0 Safari/537.36',
      env_mac: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.89 Safari/537.36',
      env_android: 'Mozilla/5.0 (Linux; Android 6.0; T3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.42 Mobile Safari/537.36',

    };
  },
  mounted() {
    this.get_platformlist();
    this.get_device_list()
    this.get_tag_list()
    this.get_member_data()
  },
  methods: {
    test() {
      console.log(this.checked_ua)
    },
    //获得成员列表
    async get_member_data(keywords) {
      let { data } = await user_member_list({
        status:0,
        keywords: keywords,
      })
      if (data.code == 200) {
        this.member_list = data.data.list
        this.drawer_memberlist = this.member_list
      }
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
    //drawer 多选 选中回调
    drawer_multselect_handle(params) {
      console.log(params)
      this.check_member = params
    },


    go_back() {
      this.$router.push({ name: "manage_environment" });
    },
    async get_platformlist() {
      let { data } = await environment_platform_list({
        type: "all",
        pagesize: 100,
        page: 1,
        status:0,
      });
      if (data.code == 200) {
        data.data.list.forEach((item) => {
          item.country = item.site;
        });
        this.platform_options = data.data.list;
      }
    },
    platform_onChange(value) {
      console.log(value);
      this.platform_id = value[0];
      this.country_id = value[1];
    },
    displayRender({ labels }) {
      return labels[labels.length - 1];
    },


    async get_device_list() {
      let { data } = await client_v1_device({
        pagesize: 100,
        page: 1,
        status:0,
      });
      if (data.code == 200) {
        this.device_list = data.data.list
      }
    },
    device_handleChange(value) {
      console.log(value)
      this.device_id = value
    },

    async get_tag_list() {
      let { data } = await environment_tag_list({
        pagesize: 100,
        page: 1,
      });
      if (data.code == 200) {
        this.tagIds = data.data.list
      }
    },
    tagid_handleChange(value) {

      this.check_tagids = value
      console.log(this.check_tagids)
    },

    broser_handleChange(value) {
      console.log(value)
      this.check_broser = value
    },
    lanage_handleChange(value) {
      console.log(value)
      this.check_lanage = value
    },

    async go_finish() {
      console.log(this.tagIds)
      // return

      let c_1 = {
        env_name: this.env_name,
        platform_id: this.platform_id,
        country_id: this.country_id,
        shop_account: this.shop_account,
        shop_password: this.shop_password,
        tagIds: this.check_tagids.toString(),
        business_short: this.business_short,
        member: this.check_member.toString(),
      }
      let c_2 = []
      c_2[0] = c_1
      console.log(c_1)
      let { data } = await environment_create({
        environment: JSON.stringify(c_2),
        env_ua: this.checked_ua,
        device_id: this.device_id,
        lang: this.check_lanage,
        cookie: this.checked_cookie,
        browser: this.check_broser,
        windows: this.env_windows,
        mac: this.env_mac,
        linux: this.env_linux,
        android: this.env_android,
      })
      if (data.code == 200) {
        this.$message.success('环境创建成功')
        this.$router.push({ name: 'manage_environment' })
      }
    }

  },
};
</script>
<style scoped lang="less">
.adden_wrap {
  width: 1200px;
  background: white;
  margin: 0 auto;
  min-height: 700px;
  margin-top: 20px;
  .top_line {
    display: flex;
    .top_l_btn {
      margin-left: 20px;
      margin-top: 20px;
    }
    .top_l_right {
      margin-top: 22px;
      color: #28282a;
      font-size: 24px;
      font-weight: bold;
      line-height: 24px;
      margin-left: 20px;
    }
  }
  .cell_title {
    display: flex;
    height: 16px;
    margin-top: 20px;
    margin-left: 122px;
    .cell_title_left {
      border-left: 3px solid #3569fd;
    }
    .cell_title_right {
      font-size: 16px;
      line-height: 16px;
      color: #28282a;
      font-weight: bold;
      margin-left: 5px;
    }
  }
  .cell_line {
    display: flex;
    height: 32px;
    margin-top: 25px;
    margin-left: 122px;

    //border: 1px solid red;
    .cell_lefttxt {
      flex: none;
      width: 80px;
      line-height: 32px;
      text-align: right;
    }
    .red_title::before {
      display: inline-block;
      margin-right: 4px;
      color: #f5222d;
      font-size: 14px;
      font-family: SimSun, sans-serif;
      line-height: 1;
      content: "*";
    }

    .cell_leftcont {
      flex: none;
      width: 380px;
      margin-left: 10px;
      line-height: 32px;
    }
    .cell_righttxt {
      line-height: 32px;
      flex: none;
      width: 80px;
      text-align: right;
    }
    .cell_rightcont {
      flex: none;
      width: 380px;
      margin-left: 10px;
      line-height: 32px;
    }
  }
  .btn_over {
    margin-top: 50px;
    margin-left: 1000px;
  }
}
</style>
