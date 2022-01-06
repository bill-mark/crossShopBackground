<template>
  <div class="tag_list">
    <div class="tag_search">
      <a-form-model :model="query" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="标签名称:">
          <a-input v-model="query.tag" />
        </a-form-model-item>
      </a-form-model>
      <a-button type="primary" @click="fetch" class="search_btn">查询</a-button>
    </div>
    <div class="tag_panel">
      <a-table
        :columns="columns"
        :row-key="record => record.id"
        :data-source="list"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
      </a-table>
    </div>
  </div>
</template>
<script>
import {fetchTagList} from '@/api/tag'

const columns = [{
  title: '标签ID',
  dataIndex: 'id'
},{
  title: '标签名称',
  dataIndex: 'tag'
},{
  title: '标签状态',
  dataIndex: 'status'
},{
  title: '标签排序',
  dataIndex: 'sort'
},{
  title: '标签创建时间',
  dataIndex: 'created_at'
}];
export default {
  name: 'tagList',
  data() {
    return {
      labelCol: { span: 8 },
      wrapperCol: { span:  16},
      query: {
        tag: null,
        pagesize: 20,
        page: 0
      },
      columns: columns,
      list: [],
      pagination: {},
      loading: false
    }
  },
  mounted(){
    this.fetch();
  },
  methods: {
    async fetch() {
      this.loading = true;
      const {data: list, total} = await fetchTagList({
        ...this.query,
        version: '1.0.0',
        mask: 'dev',
        platform: 1
      });
      // console.log('result', result);
      const pagination = { ...this.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = total;
      this.loading = false;
      this.list = list;
      this.pagination = pagination;

      // .then(({ data }) => {
      //   const pagination = { ...this.pagination };
      //   // Read total count from server
      //   // pagination.total = data.totalCount;
      //   pagination.total = 200;
      //   this.loading = false;
      //   this.data = data.list;
      //   this.pagination = pagination;
      // });
    },
    handleTableChange(pagination) {
      console.log(pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.query.page = pagination.current;
      this.pagination = pager;
      // const {tag, pagesize} = this.query;
      this.fetch();
    }
  }
}
</script>
<style lang="less" scoped>
.tag_list {
  width: 100%;
  height: 100%;
  background-color:#fff;
  .tag_search {
    display: flex;
    width: 100%;
    margin-top:20px;
  }
  .search_btn {
    margin-left: 40px;
    margin-top: 3px;
  }
  .tag_panel {
    margin-top: 20px;
    width: 100%;
  }
}
</style>
