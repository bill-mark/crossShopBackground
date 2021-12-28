<template>
  <div class="equipment">
    <div class="menu">
      <a-menu style="width: 210px" mode="vertical" @click="handleClick">
        <a-menu-item key="1" class="menu_one">
          <div class="my_equipment"></div>
          <div class="title">我的设备</div>
        </a-menu-item>
        <a-menu-item key="2" class="menu_one">
          <div class="my_equipment will_expire"></div>
          <div class="title">即将过期设备</div>
        </a-menu-item>
        <a-menu-item key="3" class="menu_one">
          <div class="my_equipment expired"></div>
          <div class="title">已过期设备</div>
        </a-menu-item>
        <a-menu-item key="4" class="menu_one">
          <div class="my_equipment bin"></div>
          <div class="title">设备回收站</div>
        </a-menu-item>
        <a-menu-item key="5" class="menu_one">
          <div class="my_equipment bound"></div>
          <div class="title">代绑定环境设备</div>
        </a-menu-item>
        <a-menu-item key="6" class="menu_one">
          <div class="my_equipment renewal"></div>
          <div class="title">自动续费的设备</div>
        </a-menu-item>
        <a-menu-item key="7" class="menu_one">
          <div class="my_equipment renewal"></div>
          <div class="title">设备标签</div>
        </a-menu-item>
        <a-menu-item key="8" class="menu_one">
          <div class="my_equipment renewal"></div>
          <div class="title">标签管理</div>
        </a-menu-item>
      </a-menu>
    </div>
  </div>
</template>
<script>
export default {
  name: 'equipment',
  data() {
    return {}
  },
  methods: {
    handleClick: function() {

    }
  }
}
</script>
<style scoped lang="less">
.equipment {
  margin-top:11px;
  display:flex;
  flex-direction:row;
  .menu {
    height:100%;
    width: 210px;
    background-color: #fff;
    padding-top: 38px;
    .menu_one {
      display:flex;
      flex-direction: row;
      height: 46px;
      .ant-menu-item-selected {
        background: linear-gradient(90deg, #F7F9FF 0%, #EBF0FC 100%);
      }
      .my_equipment {
        margin-top: 14px;
        margin-right: 7px;
        width: 18px;
        height: 16px;
        background-image: url('../../assets/img/equipment/device@2x.png');
        background-repeat: no-repeat;
      }
      .will_expire {
        background-image: url('../../assets/img/equipment/will_expire@2x.png')
      }
      .expired {
        background-image: url('../../assets/img/equipment/expired@2x.png')
      }
      .bin {
        background-image: url('../../assets/img/equipment/bin@2x.png')
      }
      .bound {
        background-image: url('../../assets/img/equipment/bound@2x.png')
      }
      .renewal {
        background-image: url('../../assets/img/equipment/renewal@2x.png')
      }

      .title {
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #374567;
        line-height:46px;
      }
    }
    

  }
}
</style>
