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
        <a-menu-item key="4"> 急需付费 </a-menu-item>
        <a-menu-item key="5"> 待托管账密 </a-menu-item>
        <a-menu-item key="6"> 待授权 </a-menu-item>
        <a-menu-item key="7"> 待绑定设备 </a-menu-item>

        <a-sub-menu key="8">
          <span slot="title">
            <span>所属平台</span>
          </span>
          <a-menu-item key="yamaxun"> 亚马逊 </a-menu-item>
          <a-menu-item key="yamaxun">自定义平台 </a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="9">
          <span slot="title">
            <span>环境标签</span>
          </span>
          <a-menu-item key="11"> 无环境标签 </a-menu-item>
          <a-menu-item key="12"> 我们 他们 </a-menu-item>
          <a-menu-item key="13"> 它们 </a-menu-item>
          <a-menu-item key="14"> 你们 </a-menu-item>
          <a-menu-item key="15"> 他们 </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>

    <div class="content_right">
      <div class="top_line">
        <div class="top_l_left">
          <a-button type="primary" class="top_btn" @click="go_addenv"> 新建环境 </a-button>

          <a-button class="top_btn"> 标签管理 </a-button>
          <a-button class="top_btn"> 批量操作 </a-button>
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
    </div>

    <tag_manage v-if="show_tagmanage" :isshow="show_tagmanage" />

  </div>
</template>
<script>
import { environment_index } from "@/api/home";
import { environment_platform_list } from "@/api/environment.js";

import tag_manage from './components/tag_manage.vue'
export default {
  components:{
      tag_manage
  },
  data() {
    return {
      current: "1",
      event_guanli:"1",

      show_tagmanage:true,
    };
  },
  mounted() {
    this.get_platformlist();
  },
  methods: {
    async get_platformlist() {
      let { data } = await environment_platform_list({
        type: "all",
        pagesize: 100,
        page: 1,
      });
      console.log(data);
    },
    menu_handleClick(e) {
      console.log("click ", e);
      this.current = e.key;
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
    event_change(value){
       console.log(value)
       this.event_guanli = value
    },
    go_addenv(){
      this.$router.push({name:'manage_addenv'})
    }
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
      .top_l_right{
        display: flex;
         .top_btn {
          margin-left: 15px;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
