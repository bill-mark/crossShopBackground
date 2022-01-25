<template>
  <div class="tag_wrap">
    <a-modal
      v-model="isshow"
      title="设备标签管理"
      :width="840"
      @cancel="handleCancel"
    >
      <div class="top">
        <div class="top_txt" @click="test">添加标签:</div>
        <a-input class="top_input" v-model="new_tag" placeholder="输入标签名" />
        <a-button type="primary" class="top_btn" @click="create_tag">
          确认添加
        </a-button>
      </div>

      <div class="content">
        <div class="tag_cell" v-for="item in check_list" :key="item.id">
          <input
            class="tag_input"
            type="checkbox"
            :id="item.id"
            :value="item.id"
            v-model="checked"
          />
          <label :for="item.id" class="tag_c_txt">{{ item.tag }}</label>

          <a-popover v-model="item.visible" trigger="click">
            <div slot="content" class="popo_content">
              <div class="pop_txt">重命名:</div>
              <a-input class="pop_input" v-model="item.tag" />
              <a-button
                type="primary"
                class="pop_btn"
                @click="update_tag(item)"
              >
                确定
              </a-button>
            </div>

            <div class="tag_c_edit">编辑</div>
          </a-popover>
        </div>
      </div>

      <a-button type="primary" class="btn_delet" @click="delete_tag">
        删除标签
      </a-button>
    </a-modal>
  </div>
</template>
<script>
import {
  device_devicetaglist,
  device_updatedevicetag,
  device_createdevicetag,
  device_deletedevicetagmore,
} from "@/api/equipment.js";

export default {
  props: {
    isshow: Boolean,
  },
  data() {
    return {
      new_tag: "",
      check_list: [],
      checked: [],
    };
  },
  mounted() {
    this.get_taglist();
  },
  methods: {
    test() {
      console.log(this.checked.toString());
    },
    async get_taglist() {
      let { data } = await device_devicetaglist({});
      if (data.code == 200) {
        data.data.list.forEach((item) => {
          item.visible = false;
        });
        this.check_list = data.data.list;
      }
    },
    handleCancel() {
      this.$emit("cancel");
    },
    async create_tag() {
      let { data } = await device_createdevicetag({
        tag: this.new_tag,
      });
      if (data.code == 200) {
        this.$message.success("添加成功");
        this.new_tag = "";
        this.get_taglist();
      }
    },
    async update_tag(item) {
      let { data } = await device_updatedevicetag({
        tag: item.tag,
        id: item.id,
      });
      if (data.code == 200) {
        this.$message.success("修改成功");
        this.get_taglist();
      }
    },
    async delete_tag() {
      let { data } = await device_deletedevicetagmore({
        id: this.checked.toString(),
      });
      if (data.code == 200) {
        this.$message.success("删除成功");
        this.get_taglist();
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
  height: 530px;
}

.top {
  display: flex;
  //height: 50px;
  line-height: 32px;
  padding-bottom: 5px;
  //border-bottom: 1px solid #e9e9e9;
  .top_txt {
    width: 80px;
  }
  .top_input {
    width: 200px;
    margin-left: 10px;
  }
  .top_btn {
    margin-left: 10px;
  }
}
.content {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 100%;
  height: 330px;
  margin-top: 20px;
  overflow-y: auto;

  border: 1px solid #e9e9e9;
  .tag_cell {
    display: flex;
    margin-left: 10px;
    margin-top: 10px;
    min-width: 120px;
    height: 35px;
    line-height: 20px;

    padding: 10px;
    border: 1px solid #e9e9e9;
    .tag_input {
      padding-top: 5px;
    }
    .tag_c_txt {
      margin-left: 5px;
      margin-top: -3px;
      font-size: 15px;
    }
    .tag_c_edit {
      margin-left: 20px;
      margin-top: -3px;
      font-size: 13px;
      cursor: pointer;
    }
    .tag_c_edit:hover {
      color: #4c84ff;
    }
  }
}

.popo_content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 280px;
  .pop_txt {
    width: 46px;
    flex: none;
  }
  .pop_input {
    width: 100px;
    margin-left: 10px;
  }
  .pop_btn {
    margin-left: 10px;
  }
}

.btn_delet {
  margin-top: 10px;
  float: right;
}
</style>
