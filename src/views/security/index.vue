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
        <a-menu-item key="member_security" class="menu_one">
          <div class="my_equipment"></div>
          <div class="title">成员登录控制</div>
        </a-menu-item>
        <a-menu-item key="terminal_security" class="menu_one">
          <div class="my_equipment expired"></div>
          <div class="title">终端白名单</div>
        </a-menu-item>
      </a-menu>
    </div>
    <router-view class="info" />
  </div>
</template>
<script>

export default {
  name: "equipment",
  data() {
    return {
      current: "member_security", //选中的目录
    }
  },
  mounted() {
    this.check_navstate()
  },
  methods: {
    handleClick: function ({ key }) {
      this.current = key;
      this.$router.push({name: key});
    },
    check_navstate() {
      //console.log(this.$route.name)
      if (this.$route.name == 'member_security') {
        this.current = 'member_security'
        return
      }
      if (this.$route.name == 'terminal_security') {
        this.current = 'terminal_security'
        return
      }
    },
  }
}
</script>
<style scoped lang="less">
.equipment {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  padding-left: 15px;
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
        margin-top: 15px;
        margin-right: 7px;
        width: 18px;
        height: 18px;
        background-image: url("../../assets/img/member_login.png");
        background-repeat: no-repeat;
        background-size: 100% 100%
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
  .info {
    flex: 1;
    height: calc(100vh - 90px);
    background-color: #fff;
    margin-left: 11px;
  }
}
</style>