<template>
  <a-modal
    v-model="isshow"
    :width="660"
    title="编辑设备标签"
    @cancel="handleCancel"
    @ok="ok_handle"
  >
    <div class="top_wrap">
      <div>{{ modaldata.created_at }}</div>
      &nbsp | &nbsp
      <div>{{ modaldata.device_ip }}</div>
      &nbsp | &nbsp
      <div>
        {{ modaldata.device_region_title }} {{ modaldata.device_area_title }}
      </div>
      &nbsp | &nbsp
      <div>过期时间:{{ modaldata.expired_at }}</div>
      
    </div>


    <div class="cell_rightcont">
        <a-select mode="multiple" style="width: 380px" v-model="check_tagids">
          <a-select-option
            :value="item.id"
            v-for="item in data_list"
            :key="item.id"
          >
            {{ item.tag }}
          </a-select-option>
        </a-select>
    </div>
   
  </a-modal>
</template>
<script>
import {
  device_devicetaglist,
  device_devicebindtag,
} from "@/api/equipment";
export default {
  props: {
    modalstatus: Boolean,
    modaldata: Object,
  },
  data() {
    return {
      isshow: false,
      data_list: [],
      check_tagids: []
    };
  },
  mounted() {
    console.log(this.modaldata);
    this.isshow = this.modalstatus;

    this.check_tagids = this.modaldata.tags.map(item=>{
        return item.id
    })

    this.get_initdata();

  },
  methods: {
    handleCancel() {
      this.isshow = false;
      this.$emit("cancel");
    },
    async get_initdata() {
      let { data } = await device_devicetaglist({
      });
      if (data.code == 200) {
        this.data_list = data.data.list;
      }
    },
    handleCancel() {
      this.isshow = false;
      this.$emit("cancel");
    },
    async ok_handle() {


      let { data } = await device_devicebindtag({
        tags: this.check_tagids.toString(),
        device_id: this.modaldata.id,
      });
      if (data.code == 200) {
        this.$message.success("操作成功");
        this.isshow = false;
        this.$emit("success");
      }
    }
  },
};
</script>
<style scoped lang="less">
/deep/ .ant-modal-content {
  min-height: 300px;
}

.top_wrap {
  display: flex;
  margin-bottom: 20px;
}
</style>
