<template>
  <div class="home_wrap">
    <div class="top_1">欢迎使用洋淘浏览器</div>
    <div class="top_2">跨境电商全栈解决方案</div>
    <div class="content">
      <div class="content_left">
        <div class="content_img_left"></div>
        <div class="content_txt" @click="go_login">我有账号，直接登录 》</div>
      </div>
      <div class="content_right">
        <div class="content_img_right"></div>
        <div class="content_txt" @click="go_register">没有账号，立即注册 》</div>
      </div>
    </div>
  </div>
</template>
<script>
export default{
    methods:{
        go_login(){
            this.$router.push({name:'login_login'})
        },
        go_register(){
           this.$router.push({name:'login_register'})
        }
    }
}
</script>

<style scoped lang="less">
.home_wrap {
  background: white;
  margin-left: 40px;
  .top_1 {
    margin: 0 auto;
    padding-top: 260px;
    width: 276px;
    font-size: 30px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #333333;
    line-height: 29px;
  }
  .top_2 {
    margin: 0 auto;
    margin-top: 14px;
    width: 188px;
    height: 18px;
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #666666;
    line-height: 18px;
  }
  .content {
    display: flex;
    justify-content: center;
    margin-top: 86px;
    .content_txt {
      text-align: center;
      margin-top: 34px;
      cursor: pointer;
      height: 16px;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #3860f4;
      line-height: 16px;
    }
    .content_left {
      width: 366px;
      height: 228px;
      background: #ffffff;
      box-shadow: 0px 0px 19px 2px rgba(153, 153, 153, 0.18);
      border-radius: 2px;
      .content_img_left {
        width: 194px;
        height: 136px;

        margin: 0 auto;
        margin-top: 19px;

        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        background-image: url("../assets/img/home/登录@2x.png");
      }
    }
    .content_right {
      margin-left: 98px;
      width: 366px;
      height: 228px;
      background: #ffffff;
      box-shadow: 0px 0px 19px 2px rgba(153, 153, 153, 0.18);
      border-radius: 2px;
      .content_img_right {
        width: 194px;
        height: 136px;

        margin: 0 auto;
        margin-top: 19px;

        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        background-image: url("../assets/img/home/注册@2x.png");
      }
    }
  }
}
</style>
