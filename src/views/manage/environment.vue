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
               <a-button type="primary">
                    新建环境
                    </a-button>
           </div>
           <div class="top_l_right"></div>
       </div>
    </div>

  </div>
</template>
<script>
import {environment_platform_list} from '@/api/environment.js'
export default {
  data() {
    return {
      current: '1',
    }
  },
  mounted(){
    this.menu_init()
  },
  methods: {
    async menu_init(){
       let {data} = await environment_platform_list({
           type:'all',
           pagesize:100,
           page:1,
       })
       console.log(data)
    },
    menu_handleClick(e) {
      console.log('click ', e);
      this.current = e.key;
    },
  },
}
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
  .content_right{ 
      .top_line{
         display: flex;
        justify-content: space-between;
        .top_l_left{

        }
      }
  }
}
</style>
