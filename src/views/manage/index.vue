<template>
  <div class="manage_wrap">
    <div class="nav_wrap">
      <div class="logo"></div>

      <div class="nav_middle">
        <div
          :class="index == check_nav ? 'nav_cell_now' : 'nav_cell_no'"
          v-for="(item, index) in nav_list"
          :key="item.value"
          @click="nav_click(index, item.menuName)"
        >
          {{ item.name }}
        </div>
      </div>

      <div class="rightcell_1">APP下载</div>
      <div class="rightcell_line"></div>
      <div class="rightcell_2">帮助中心</div>
      <div class="rightcell_line"></div>

      <a-popover trigger="click" overlayClassName="manage-popover">
          <div slot="content" class="popcontent">
              
          </div>
    
           <div class="rightcell_3">{{ username }}</div>
      </a-popover>

      <div class="rightcell_ico"></div>
    </div>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "manage_index",
  data() {
    return {
      nav_list: [
        {
          name: "首页",
          value: "1",
          menuName: "manage"
        },
        {
          name: "设备管理",
          value: "2",
          menuName: 'equipment'
        },
        {
          name: "成员管理",
          value: "3",
          menuName: 'member'
        },
        {
          name: "安全管理",
          value: "4",
          menuName: 'security'
        },
        {
          name: "店铺报表",
          value: "5",
          menuName: 'shop'
        },
        {
          name: "企业配置",
          value: "6",
          menuName: 'enterprise'

        },
        {
          name: "费用管理",
          value: "7",
          menuName: 'fee'
        },
      ],
      check_nav: 0,
      username: "尾号9988的团队",
    };
  },
  methods: {
    nav_click(index, menuName) {
      // const {value: index, menuName} = item;
      console.log('index', index);
      this.check_nav = index;
      this.$router.push({name: menuName})

    },
  },
};
</script>
<style lang="less">
.manage-popover {
  padding: 0 !important;
  .ant-popover-inner {
    .ant-popover-inner-content {
      padding: 0;
    }
  }
}
</style>
<style scoped lang="less">
.manage_wrap {
  background: #666;
  margin-left: 40px;
  min-width: 1845px;
  //overflow-x: auto;
  border: 1px solid red;
  .nav_wrap {
    display: flex;
    height: 60px;
    width: 1845px;
    margin: 0 auto;
    background-color: white;
    overflow: none;
    .logo {
      flex: none;
      width: 156px;
      height: 28px;
      margin-left: 25px;
      margin-top: 15px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
      background-image: url("../../assets/img/logo@2x.png");
    }
    .nav_middle {
      flex: none;
      display: flex;
      margin-left: 109px;
      .nav_cell_no {
        width: 90px;
        height: 100%;
        text-align: center;
        line-height: 60px;
        color: #374567;
        cursor: pointer;
        font-size: 14px;
      }
      .nav_cell_now {
        width: 90px;
        font-size: 14px;
        height: 100%;
        text-align: center;
        line-height: 60px;
        color: #3860f4;
        background: linear-gradient(
          0deg,
          rgba(76, 132, 255, 0.12),
          rgba(255, 255, 255, 0.12)
        );
        border-bottom: 3px solid #4c84ff;
      }
    }
    .rightcell_1 {
      flex: none;
      width: 80px;
      margin-left: 515px;
      padding-left: 22px;
      height: 60px;
      font-size: 14px;
      color: #374567;
      line-height: 60px;
      background-repeat: no-repeat;
      background-position: 0px 21px;
      background-size: 18px 18px;
      background-image: url("../../assets/img/APP下载@2x.png");
      cursor: pointer;
    }
    .rightcell_1:hover {
      color: #4c84ff;
    }
    .rightcell_line {
      width: 1px;
      height: 16px;
      margin-left: 23px;
      margin-right: 23px;
      margin-top: 24px;
      background: #dedfe2;
    }
    .rightcell_2 {
      padding-left: 22px;
      height: 60px;
      font-size: 14px;
      color: #374567;
      line-height: 60px;
      background-repeat: no-repeat;
      background-position: 0px 21px;
      background-size: 18px 18px;
      background-image: url("../../assets/img/帮助中心@2x.png");
      cursor: pointer;
    }
    .rightcell_2:hover {
      color: #4c84ff;
    }
    .rightcell_3 {
      padding-left: 22px;
      height: 60px;
      font-size: 14px;
      color: #374567;
      line-height: 60px;
      background-repeat: no-repeat;
      background-position: 0px 21px;
      background-size: 18px 18px;
      background-image: url("../../assets/img/团队@2x.png");
      cursor: pointer;
    }
    .rightcell_3:hover {
      color: #4c84ff;
    }
    .rightcell_ico {
      margin-left: 9px;
      margin-top: 28px;
      width: 9px;
      height: 5px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
      background-image: url("../../assets/img/下拉按钮@2x.png");
    }

    
  }

 
}



 .popcontent{
        width: 304px;
        height: 334px;
        background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
      background-image: url("../../assets/img/用户信息背景@2x.png");
    }
</style>