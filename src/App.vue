<template>
   <a-config-provider :locale="locale">
    <div id="app">

      <div class="left_nav">
          <div class="nav_content nav_1">
            管理
          </div>
           <div class="nav_content nav_2">
            环境
          </div>
          <div class="nav_content nav_3">
            插件
          </div>
      </div>

      <router-view />
    </div>
  </a-config-provider>
</template>
<script>
// 修改 antd 的语言为中文
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
export default {
  data() {
    return {
      locale: zhCN,
    };
  },
};
</script>
<style lang="less" scoped>
.left_nav{
  z-index: 99;
  width: 40px;
  background-color: white;
  position: fixed;
  left: 0px;
  height: 100%;
  border-right: 1px solid #DEDFE2;
  .nav_content{
    width: 100%;
    height: 45px;
    cursor: pointer;
    background-repeat: no-repeat;
    background-position:6px 0px;
    background-size: 28px 28px;
    padding-top: 33px;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
  .nav_content:hover{
    color: #4C84FF
  }
  .nav_1{
    margin-top: 10px;
    background-image: url('./assets/img/管理@2x.png');
  }
  .nav_2{
    margin-top: 24px;
    background-image: url('./assets/img/店铺@2x.png');
  }
  .nav_3{
    margin-top: 24px;
    background-image: url('./assets/img/插件@2x.png');
  }
}
</style>
