<template>
  <div class="no_eq">
    <div class="no_eq_container">
      <div class="back"></div>
      <div class="instruction">暂无设备，给店铺绑定设备，愉快的开始跨境之旅吧~</div>
      <div class="no_eq_btns">
        <a-button type="primary" class="buy_btn" @click="buyEq">购买设备</a-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'noEquipment',
  data() {
    return {};
  },
  methods: {
        buyEq: function () { 
      this.$router.push({name:'manage_buyequipment'})
    },
  }
}
</script>
<style lang="less" scoped>
.no_eq {
  height: 100%;
  .no_eq_container {
    min-width: 151px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center; /* 水平居中 */
    align-items: center;     /* 垂直居中 */
    .back {
      width: 151px;
      height: 134px;
      background-image: url('../../assets/img/equipment/non_equipment@2x.png');
      background-repeat: no-repeat;
      background-size: 151px auto;
    }
    .instruction {
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #878FA7;
      line-height: 88px;
    }
    .no_eq_btns {
      height: 30px;
      display: flex;
      flex-direction: row;
      .buy_btn {
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #FFFFFF;
      }
      .add_btn {
        margin-left: 28px;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #374567;
      }
    }
  }
}
</style>
