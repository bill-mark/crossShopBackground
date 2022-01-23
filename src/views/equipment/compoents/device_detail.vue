<template>
  <a-modal
    v-model="isshow"
    :width="925"
    title="设备详情"
    @cancel="handleCancel"
  >
    <div class="detail_line">
        <div class="line_cell">设备名称： {{this.detaildata.device_name}}</div>
         <div class="line_cell">设备状态： {{ formate_status(this.detaildata.status) }}</div>
         <div class="line_cell">设备网络： {{this.detaildata.device_ip}}</div>
    </div>
    <div class="detail_line">
        <div class="line_cell">网络属性： 静态</div>
         <div class="line_cell">网络类型： </div>
         <div class="line_cell">可用天数：  {{this.detaildata.available_day}}  ({{this.detaildata.expired_at}})到期 </div>
    </div>
    <div class="detail_line">
        <div class="line_cell">设备归属： {{this.detaildata.device_region_title}} {{this.detaildata.device_area_title}}</div>
         <div class="line_cell">购买时间： {{this.detaildata.created_at}}</div>
         <div class="line_cell">设备功能： </div>
    </div>


  </a-modal>
</template>
<script>
import {
  device_bind_environment_list,
  device_bind_history_record,
  device_operate_log_list,
  device_devicenetworkregionlist,
} from "@/api/equipment";
export default {
  props: {
    detail_modalstatus: Boolean,
    detaildata: Object,
  },
  data() {
    return {
      isshow: false,
      bind_eventlist: [],
      beunder_list:[],//归属列表
    };
  },
  mounted() {
      console.log(this.detaildata)
    this.isshow = this.detail_modalstatus;
    // this.get_has_bindlist();

  },
  methods: {
    handleCancel() {
      this.isshow = false;
      this.$emit("cancel");
    },
    //绑定环境
    async get_has_bindlist() {
      let { data } = await device_bind_environment_list({
        pagesize: 200,
        page: 1,
        device_id: this.detaildata.id,
      });
      if (data.code == 200) {
        this.bind_eventlist = data.data.list;
      }
    },
    //归属列表
    async get_beunderlist() {
      let { data } = await device_devicenetworkregionlist({
        pagesize: 200,
        page: 1,
        device_id: this.detaildata.id,
      });
      if (data.code == 200) {
        this.beunder_list = data.data.list;
      }
    },
     //格式化远程
    formate_remote(data) {
      if (data == 0) {
        return "不可远程";
      }
      if (data == 1) {
        return "可远程";
      }
    },
    //格式化自动续费
    formate_renew(data) {
      if (data == 0) {
        return "未开启";
      }
      if (data == 1) {
        return "开启";
      }
    },
    //格式化状态
    formate_status(data) {
      if (data == 0) {
        return "正常";
      }
      if (data == 1) {
        return "过期";
      }
      if (data == 2) {
        return "待分配";
      }
      if (data == 3) {
        return "故障";
      }
      if (data == 4) {
        return "已删除";
      }
    },
  },
};
</script>
<style scoped lang="less">
/deep/ .ant-modal-footer {
  display: none;
}

/deep/ .ant-modal-content {
  height: 700px;
}

.detail_line{
    display: flex;
    margin-top: 15px;
    justify-content: space-around;
    color: #87878b;
    .line_cell{
        width: 270px;
        font-size: 14px;
    }
}
</style>
