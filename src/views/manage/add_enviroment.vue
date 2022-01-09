<template>
  <div class="adden_wrap">
    <div class="top_line">
      <a-button type="primary" class="top_l_btn" @click="go_back">
        <a-icon type="left" />返回
      </a-button>
      <div class="top_l_right">新建环境</div>
    </div>

    <div class="cell_title">
      <div class="cell_title_left"></div>
      <div class="cell_title_right">环境基本信息</div>
    </div>

    <div class="cell_line">
      <div class="cell_lefttxt">环境名称:</div>
      <div class="cell_leftcont">
        <a-input placeholder="请输入环境名称" v-model="env_name" />
      </div>
      <div class="cell_righttxt">所属平台:</div>
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
      <div class="cell_lefttxt">店铺账号:</div>
      <div class="cell_leftcont">
        <a-input placeholder="请输入店铺账号" v-model="shop_account" />
      </div>
      <div class="cell_righttxt">店铺密码:</div>
      <div class="cell_rightcont">
        <a-input placeholder="请输入店铺密码" v-model="shop_password" />
      </div>
    </div>

     <div class="cell_line">
      <div class="cell_lefttxt">设备:</div>
      <div class="cell_leftcont">
          <a-select :allowClear="true" style="width: 380px" @change="device_handleChange">
            <a-select-option :value="item.id" v-for="item in device_list" :key="item.id">
                {{item.device_name}}
            </a-select-option>
          </a-select>
      </div>
      <div class="cell_righttxt">环境标签:</div>
      <div class="cell_rightcont">
         <a-select mode="multiple" style="width: 380px" @change="tagid_handleChange">
            <a-select-option 
            :value="item.id" v-for="item in tagIds" :key="item.id"
            >
                {{item.tag}}
            </a-select-option>
          </a-select>
      </div>
    </div>

    <div class="cell_line">
      <div class="cell_lefttxt">授权成员:</div>
      <div class="cell_leftcont">
       
      </div>
      <div class="cell_righttxt">企业简称:</div>
      <div class="cell_rightcont">
        <a-input placeholder="请输入企业简称" v-model="business_short" />
      </div>
    </div>

  </div>
</template>
<script>
import { environment_platform_list,client_v1_device,environment_tag_list } from "@/api/environment.js";
export default {
  data() {
    return {
      env_name: "",
      platform_options: [],
      platform_id: "",
      country_id: "",

      shop_account: "",
      shop_password: "",

      device_list:[
          {
              id:'111',
              device_name:'shebei 111',
          },
           {
              id:'222',
              device_name:'shebei 222',
          }
      ],
      device_id:'',
      tagIds:[],

      business_short:'',//企业简称
    };
  },
  mounted() {
    this.get_platformlist();
   // this.get_device_list()
   this.get_tag_list()
  },
  methods: {
    go_back() {
      this.$router.push({ name: "manage_environment" });
    },
    async get_platformlist() {
      let { data } = await environment_platform_list({
        type: "all",
        pagesize: 100,
        page: 1,
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


    async get_device_list(){
      let { data } = await client_v1_device({
        pagesize: 100,
        page: 1,
      });
      if (data.code == 200) {
        console.log(data)
      }
    },
    device_handleChange(value){
        console.log(value)
        this.device_id = value
    },

    async get_tag_list(){
      let { data } = await environment_tag_list({
        pagesize: 100,
        page: 1,
      });
      if (data.code == 200) {
        this.tagIds = data.data.list
      }
    },
    tagid_handleChange(value){
        console.log(value)
    },

  },
};
</script>
<style scoped lang="less">
.adden_wrap {
  width: 1200px;
  background: white;
  margin-left: 40px;
  margin: 0 auto;
  min-height: 600px;
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
    .cell_leftcont {
      flex: none;
      width: 380px;
      margin-left: 10px;
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
    }
  }
}
</style>
