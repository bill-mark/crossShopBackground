<template>
  <div class="register_wrap">
    <div class="content">
        <div class="content_left"></div>
        <div class="content_right">
            
        </div>
    </div>
  </div>
</template>
<script>

</script>

<style scoped lang="less">
.register_wrap {
  background: white;
  margin-left: 40px;
  .content {
    width: 920px;
    height: 540px;
    margin: 0 auto;
    margin-top: 50px;
    display: flex;
    .content_left{
        width: 342px;
        height: 540px;
        background-image: url("../../assets/img/login/left.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .content_right{
        flex: 1;
        border: 1px solid red;
    }
  }
}
</style>
