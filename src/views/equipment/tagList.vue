<template>
  <div class="tag_list">
    <div class="tag_search">
      <a-form-model :model="query" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="标签名称">
          <a-input v-model="query.tag" />
        </a-form-model-item>
      </a-form-model>
    </div>
    <div class="tag_panel"></div>
  </div>
</template>
<script>
export default {
  name: 'tagList',
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      query: {}
    }
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.tag_list {
  width: 100%;
  height: 100%;
  background-color:#fff;
  .search_contrainer {
    display: flex;
    width: 100%;
  }
}
</style>
