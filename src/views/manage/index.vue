<template>
  <div class="manage_wrap">
    <div class="nav_wrap">
      <div class="nav_w_left">
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
      </div>

      <div class="nav_w_right">
        <!-- <div class="rightcell_1">APP下载</div>
        <div class="rightcell_line"></div>
        <div class="rightcell_2">帮助中心</div>
        <div class="rightcell_line"></div> -->

        <a-popover trigger="click" overlayClassName="manage-popover">
          <div slot="content" class="pop_wrap">
            <div class="pop_top">
              <div class="pop_t_left">
                <div class="pop_t_txt">环境数量</div>
                <div class="pop_t_num">{{ env_count }}</div>
              </div>
              <div class="pop_t_right">
                <div class="pop_t_txt">优惠券</div>
                <div class="pop_t_num">{{ coupon_count }}</div>
              </div>
            </div>

            <div class="pop_content">
              <div class="pop_c_left">
                <div class="pop_c_l_txt">账户余额</div>
                <div class="pop_c_l_num">¥ {{ balance }}</div>
              </div>
              <div class="pop_c_right">
                <div class="pop_btn" @click="go_page('charge_fee')">续费</div>
              </div>
            </div>

            <div class="pop_line">
              <div class="pop_line_ico"></div>
              <div class="pop_line_txt" @click="go_page('manage_edituser')">修改个人信息</div>
            </div>

            <div class="pop_line">
              <div class="pop_line_ico_2"></div>
              <div class="pop_line_txt"  @click="go_page('invite_fee')">邀请有礼</div>
            </div>

            <div class="pop_line">
              <div class="pop_line_ico_3"></div>
              <div class="pop_line_txt" @click="go_out">退出登录</div>
            </div>

          </div>

          <div class="rightcell_3">{{ username }}</div>
        </a-popover>

        <div class="rightcell_ico"></div>
      </div>
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
          menuName: "manage_home"
        },
        {
          name: "环境管理",
          value: "11",
          menuName: "manage_environment"
        },
        {
          name: "设备管理",
          value: "2",
          menuName: 'manage_equipment'
        },
        {
          name: "成员管理",
          value: "3",
          menuName: 'manage_member'
        },
        {
          name: "安全管理",
          value: "4",
          menuName: 'manage_security'
        },
        {
          name: "企业配置",
          value: "6",
          menuName: 'companydevice'

        },
        {
          name: "费用管理",
          value: "7",
          menuName: 'manage_fee'
        },
      ],
      check_nav: 0,
      username: "",
      coupon_count: null,
      env_count: null,
      balance: null,
    };
  },
  mounted() {
    let c_1 = JSON.parse(localStorage.member)
    this.username = c_1.real_name
    this.env_count = c_1.env_count
    this.coupon_count = c_1.coupon_count
    this.balance = c_1.balance
  },
  methods: {
    //菜单跳转
    nav_click(index, menuName) {
      this.check_nav = index;
      this.$router.push({ name: menuName })
    },
    go_page(name){
       this.$router.push({ name: name })
    },
    go_out(){
       localStorage.clear()
        this.$router.push({ name: 'login' })
    }


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
  background: #f0f2f5;
  margin-left: 40px;
  min-width: 1845px;
  //overflow-x: auto;
  //border: 1px solid red;
  .nav_wrap {
    display: flex;
    justify-content: space-between;
    height: 60px;
    min-width: 1845px;
    margin: 0 auto;
    margin-left: 15px;
    margin-right: 15px;
    background-color: white;
    overflow: none;
    .nav_w_left {
      display: flex;
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
    }
    .nav_w_right {
      display: flex;
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
        width: 80px;
        flex: none;
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
        width: 130px;
        flex: none;
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
}

.pop_wrap {
  width: 304px;
  height: 334px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  background-image: url("../../assets/img/用户信息背景@2x.png");

  padding: 10px;
  .pop_top {
    display: flex;

    // border: 1px solid red;
    .pop_t_left {
      width: 50%;
      text-align: center;
    }
    .pop_t_right {
      width: 50%;
      text-align: center;
    }
    .pop_t_txt {
      padding-top: 2px;
      color: #6a3e0a;
      font-size: 14px;
    }
    .pop_t_num {
      font-size: 22px;
      font-weight: bold;
      color: #6a3e0a;
    }
  }
  .pop_content {
    display: flex;
    // border: 1px solid green;
    .pop_c_left {
      width: 50%;
      .pop_c_l_txt {
        color: #e6d0c6;
        margin-top: 4px;
        margin-left: 35px;
      }
      .pop_c_l_num {
        height: 17px;
        margin-top: 9px;
        line-height: 17px;
        color: #efcfac;
        font-size: 14px;
        margin-left: 35px;
      }
    }
    .pop_c_right {
      width: 50%;
      .pop_btn {
        width: 64px;
        height: 22px;
        margin-left: 42px;
        margin-top: 17px;
        background: linear-gradient(90deg, #ffefd8, #fad7b0);
        border-radius: 2px;
        text-align: center;
        font-size: 14px;
        color: #6a3e0a;
        cursor: pointer;
      }
    }
  }
  .pop_line {
    display: flex;
    height: 18px;
    margin-top: 30px;
    margin-left: 25px;
    cursor: pointer;

   // border: 1px solid red;
    .pop_line_ico {
      width: 18px;
      height: 18px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
      background-image: url("../../assets/img/个人信息 (2)@2x.png");
    }
     .pop_line_ico_2 {
      width: 18px;
      height: 18px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
      background-image: url("../../assets/img/邀请@2x.png");
    }
    .pop_line_ico_3 {
      width: 18px;
      height: 18px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
      background-image: url("../../assets/img/退出登录@2x.png");
    }
    .pop_line_txt {
      margin-left: 10px;
      line-height: 18px;
    }
    .pop_line_txt:hover{
     color: #4c84ff;
    }
  }
}
</style>