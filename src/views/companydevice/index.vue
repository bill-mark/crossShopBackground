<template>
  <div class="company_wrap">
    <div class="menu">
      <a-menu
        style="width: 210px; height: 100%"
        mode="inline"
        :default-selected-keys="['charge_fee']"
        :selected-keys="[current]"
        @click="handleClick"
      >
        <a-menu-item key="company_setting" class="menu_one">
          <div class="my_equipment"></div>
          <div class="title">企业认证</div>
        </a-menu-item>
      </a-menu>
    </div>
    <router-view class="info" />
  </div>
</template>
<script>

export default {
  name: "companydevice",
  data() {
    return {
      current: "company_setting", //选中的目录
    }
  },
  methods: {
    handleClick: function ({ key }) {
      this.current = key;
      this.$router.push({name: key});
    }
  }
}
</script>
<style scoped lang="less">
.company_wrap {
  margin-top: 11px;
  display: flex;
  flex-direction: row;
  margin-left: 15px;
  margin-right: 15px;
  height: 100%;
  .menu {
    width: 210px;
    min-height: 500px;
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
        margin-top: 15px;
        margin-right: 7px;
        width: 18px;
        height: 18px;
        background-image: url("../../assets/img/authcation/企业@2x.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
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
  .info {
    flex: 1;
    overflow-y: auto;
     height: calc(100vh - 90px);
    background-color: #fff;
    margin-left: 11px;
  }
}
</style>