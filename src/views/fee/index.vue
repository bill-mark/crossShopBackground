<template>
  <div class="equipment">
    <div class="menu">
      <a-menu
        style="width: 210px; height: 100%"
        mode="inline"
        :selected-keys="[current]"
        @click="handleClick"
      >
        <a-menu-item key="charge_fee" class="menu_one">
          <div class="my_equipment"></div>
          <div class="title">账户充值</div>
        </a-menu-item>
        <a-menu-item key="balance_fee" class="menu_one">
          <div class="my_equipment will_expire"></div>
          <div class="title">余额明细</div>
        </a-menu-item>
        <a-menu-item key="order_fee" class="menu_one">
          <div class="my_equipment expired"></div>
          <div class="title">订单管理</div>
        </a-menu-item>
        <a-menu-item key="invite_fee" class="menu_one">
          <div class="my_equipment expired"></div>
          <div class="title">邀请有礼</div>
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
      current: "charge_fee", //选中的目录
    }
  },
  mounted() {
    this.check_navstate()
  },
  methods: {
    check_navstate() {
      //console.log(this.$route.name)
      if (this.$route.name == 'charge_fee') {
        this.current = 'charge_fee'
        return
      }
      if (this.$route.name == 'balance_fee') {
        this.current = 'balance_fee'
        return
      }
      if (this.$route.name == 'order_fee') {
        this.current = 'order_fee'
        return
      }
      if (this.$route.name == 'invite_fee') {
        this.current = 'invite_fee'
        return
      }
    },
    handleClick: function ({ key }) {
      this.current = key;
      this.$router.push({ name: key });
    }
  }
}
</script>
<style scoped lang="less">
.equipment {
  margin-top: 11px;
  display: flex;
  flex-direction: row;
  margin-left: 15px;
  margin-right: 15px;
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
        background-image: url("../../assets/img/charge@2x.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .will_expire {
        background-image: url("../../assets/img/balance@2x.png");
      }
      .expired {
        background-image: url("../../assets/img/order@2x.png");
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
    height: calc(100vh - 126px);
    background-color: #fff;
    margin-left: 11px;
  }
}
</style>