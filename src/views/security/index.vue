<template>
  <div class="equipment">
    <div class="menu">
      <a-menu
        style="width: 210px; height: 100%"
        mode="inline"
        :default-selected-keys="['1']"
        :selected-keys="[current]"
        @click="handleClick"
      >
        <a-menu-item key="1" class="menu_one">
          <div class="my_equipment"></div>
          <div class="title">成员登录控制</div>
        </a-menu-item>
        <a-menu-item key="2" class="menu_one">
          <div class="my_equipment will_expire"></div>
          <div class="title">登录请求授权</div>
        </a-menu-item>
        <a-menu-item key="3" class="menu_one">
          <div class="my_equipment expired"></div>
          <div class="title">终端白名单</div>
        </a-menu-item>
      </a-menu>
    </div>
  </div>
</template>
<style scoped lang="less">
.equipment {
  margin-top: 11px;
  display: flex;
  flex-direction: row;
  .menu {
    width: 210px;
    background-color: #fff;
    padding-top: 38px;
    .menu_one {
      display: flex;
      flex-direction: row;
      height: 46px;
      .ant-menu-item-selected {
        background: linear-gradient(90deg, #f7f9ff 0%, #ebf0fc 100%);
      }
      .my_equipment {
        margin-top: 14px;
        margin-right: 7px;
        width: 18px;
        height: 16px;
        background-image: url("../../assets/img/成员登录控制@2x.png");
        background-repeat: no-repeat;
      }
      .will_expire {
        background-image: url("../../assets/img/登录请求授权@2x.png");
      }
      .expired {
        background-image: url("../../assets/img/终端@2x.png");
      }
      .title {
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #374567;
        line-height: 46px;
      }
      .count {
        border: 1px solid #374567;
      }
    }
  }
}
</style>