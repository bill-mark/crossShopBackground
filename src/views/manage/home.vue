<template>
  <div class="manage_home_wrap">
    <div class="top_wrap">
      <div class="top_cell top_left">
        <div class="t_cell_left" style="background-color: #f29690"></div>
        <div class="top_cell_ico ico_only"></div>
        <div class="top_line"></div>
        <div class="top_content">
          <div class="top_cont_cell">
            <div class="top_num">{{ shop }}</div>
            <div class="top_txt">待绑定店铺</div>
          </div>
          <div class="top_cont_cell">
            <div class="top_num">{{ shebei }}</div>
            <div class="top_txt">待绑定设备</div>
          </div>
          <div class="top_cont_cell">
            <div class="top_num">{{ fufei }}</div>
            <div class="top_txt">急需付费</div>
          </div>
        </div>
      </div>

      <div class="top_cell top_middle">
        <div class="t_cell_left" style="background-color: #ffbe00"></div>
        <div class="top_cell_ico ico_only"></div>
        <div class="top_line"></div>
        <div class="top_content">
          <div class="top_cont_cell">
            <div class="top_num">{{ huanjing }}</div>
            <div class="top_txt">待绑定环境</div>
          </div>
          <div class="top_cont_cell">
            <div class="top_num">{{ will_guoqi }}</div>
            <div class="top_txt">即将过期</div>
          </div>
          <div class="top_cont_cell">
            <div class="top_num">{{ has_guoqi }}</div>
            <div class="top_txt">已过期</div>
          </div>
        </div>
      </div>

      <div class="top_cell top_right">
        <div class="t_cell_left" style="background-color: #47d2b6"></div>
        <div class="top_cell_ico ico_only"></div>
        <div class="top_line"></div>
        <div class="top_yuer">
             <div class="top_num">{{ yuer }}</div>
            <div class="top_txt">账户余额</div>
        </div>
        <div class="chongzhi_btn">
            充值
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      shop: 0,
      shebei: 0,
      fufei: 0,
      huanjing: 0,
      will_guoqi: 0,
      has_guoqi: 0,
      yuer: 0,
    };
  },
  methods: {},
};
</script>

<style scoped lang="less">
.manage_home_wrap {
  width: 1845px;
  margin: 0 auto;
  .top_wrap {
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
    .top_cell {
      height: 72px;
      background: #ffffff;
      box-shadow: 0px 0px 12px 1px rgba(193, 199, 203, 0.18);
      border-radius: 1px;
      display: flex;
      .t_cell_left {
        width: 4px;
        height: 72px;
        border-radius: 1px;
      }
      .top_cell_ico {
        flex: none;
        width: 30px;
        height: 30px;
        margin-left: 30px;
        margin-top: 22px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
      }
      .top_line {
        width: 1px;
        height: 33px;
        background: #eef2f5;
        margin-left: 20px;
        margin-top: 21px;
      }
      .top_content {
        flex: 1;
        display: flex;
        justify-content: space-around;
        .top_cont_cell {
          width: 80px;
          .top_num {
            font-size: 22px;
            line-height: 22px;
            padding-top: 17px;
            font-weight: bold;
            color: #374567;
            text-align: center;
          }
          .top_txt {
            text-align: center;
            margin-top: 7px;
            color: #878fa7;
          }
        }
      }
    }
    .top_left {
      width: 620px;
      .ico_only {
        background-image: url("../../assets/img/店铺icon拷贝@2x.png");
      }
    }
    .top_middle {
      width: 620px;
      .ico_only {
        background-image: url("../../assets/img/设备管理@2x.png");
      }
    }
    .top_right {
      width: 571px;
      .ico_only {
        background-image: url("../../assets/img/账户余额@2x.png");
      }
      .top_yuer{
          width: 325px;
          .top_num {
            font-size: 22px;
            line-height: 22px;
            padding-top: 17px;
            font-weight: bold;
            color: #374567;
            text-align: center;
          }
          .top_txt {
            text-align: center;
            margin-top: 7px;
            color: #878fa7;
          }
      }
      .chongzhi_btn{
          width: 84px;
          text-align: center;
          cursor: pointer;
          margin-top: 22px;
          line-height: 30px;
height: 30px;
background: linear-gradient(270deg, #3DBB9C 0%, #47D3B7 99%);
border-radius: 2px;
color: white;
      }
    }
  }
}
</style>
