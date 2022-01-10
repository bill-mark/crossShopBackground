<template>
  <div class="tag_wrap">
    <a-modal v-model="isshow" style="width:840px;height:530px" title="环境标签管理" @cancel="handleCancel">
       <div class="top">
           <div class="top_txt">添加标签: </div>
           <a-input placeholder="输入标签名" />
            <a-button type="primary">
              确认添加
            </a-button>
       </div>
    </a-modal>
  </div>
</template>
<script>
export default {
  props: {
    isshow: Boolean,
  },
  data() {
    return {

    }
  },
  methods: {
    handleCancel() {
      this.$emit('cancel')
    }
  }
}
</script>
<style scoped lang="less">
/deep/ .ant-modal-footer{
    display: none;
}


    .top{
        width: 840px;
        display: flex;
    }

</style>
