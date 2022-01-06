<template>
  <div class="tag_list">
    <div class="tag_search">
      <a-form-model :model="query" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="标签名称:">
          <a-input v-model="query.tag" />
        </a-form-model-item>
      </a-form-model>
      <a-button type="primary" @click="fetch" class="search_btn">查询</a-button>
      <a-button type="primary" @click="add" class="search_btn">添加设备标签</a-button>
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
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <span><a @click="() => edit(record)">编辑</a></span>
          </div>
        </template>
      </a-table>
    </div>
    <a-modal v-model="showDialog" title="添加/新增设备标签" @ok="handleOk">
      <a-form-model :model="addForm" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="标签名称">
          <a-input v-model="addForm.tag" />
        </a-form-model-item>
        <a-form-model-item label="排序" v-if="!isEdit">
          <a-input v-model="addForm.sort" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
import {addTag, updateTag, fetchTagList} from '@/api/tag'

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
}, {
  title: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' },
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
      loading: false,
      showDialog: false,
      addForm: {
        tag: null,
        sort: 0
      },
      common: {
        version: '1.0.0',
        mask: 'dev',
        platform: 1
      },
      isEdit: false,
    }
  },
  mounted(){
    this.fetch();
  },
  methods: {
    async fetch() {
      // this.list = [{id: '231', tag: 'tag', status: '1', sort: '1', created_at: '1231231'}]; //mock

      this.loading = true;
      const {data: list, total} = await fetchTagList({
        ...this.query,
        version: '1.0.0',
        mask: 'dev',
        platform: 1
      });
      // console.log('result', result);
      const pagination = { ...this.pagination };
      pagination.total = total;
      this.loading = false;
      this.list = list;
      this.pagination = pagination;

    },
    handleTableChange(pagination) {
      console.log(pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.query.page = pagination.current;
      this.pagination = pager;
      // const {tag, pagesize} = this.query;
      this.fetch();
    },
    add: function() {
      this.showDialog = true;
      this.isEdit = false;
    },
    async handleOk() {
      let data;
      if (this.isEdit) {
        data = await updateTag({...this.addForm, ...this.common});
      } else {
        data = await addTag({...this.addForm, ...this.common});
      }
      
      if (data && data.data) {
        this.$messgae.success('添加/编辑成功');
      }
      this.showDialog = false;
      this.isEdit = false;
    },
    edit: function({id, tag}) {
      this.isEdit = true;
      this.showDialog = true;
      this.addForm = {id, tag};
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
