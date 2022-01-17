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
        <div class="chongzhi_btn">充值</div>
      </div>
    </div>

    <div class="down_wrap">
      <div class="down_top">
        <div
          class="top_btn btn_1"
          :class="[env_common == 'all' ? 'btn_be_check' : '']"
          @click="click_env_common('all')"
        >
          所有环境
        </div>
        <div
          class="top_btn"
          :class="[env_common == 1 ? 'btn_be_check' : '']"
          @click="click_env_common(1)"
        >
          常用环境
        </div>
        <div
          class="top_btn"
          :class="[recent_open == 1 ? 'btn_be_check' : '']"
          @click="click_recent"
        >
          最近打开
        </div>

        <div class="top_btn btn_2">购买设备</div>
        <div class="btn_3">新建环境</div>

        <a-input-search
          placeholder="搜索设备名称/设备环境/设备信息"
          class="btn_search"
          @search="onSearch"
        />

        <a-select
          default-value="all"
          class="btn_select"
          :showSearch="true"
          :filterOption="filterOptionEvent"
          @change="select_handleChange"
        >
          <a-select-option
            :value="item.value"
            v-for="item in plate_list"
            :key="item.name"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </div>

      <a-table
        :columns="table_column"
        :data-source="table_data"
        :row-key="(r, i) => i.toString()"
        class="down_table"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <div
          slot="operator_column"
          slot-scope="record"
          class="table_open"
          @click="go_open(record)"
        >
          打开
        </div>
      </a-table>

       <div class="down_txt">共{{pagination.total}}条数据</div>

    </div>
  </div>
</template>
<script>
import {environment_index,environment_first_count} from '@/api/home'
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

      env_common: "all", //所有环境all 常用1 不选中0
      recent_open: 0,
      plate_list: [
        {
          name: "所有平台",
          value: "",
        },
        {
          name: "亚马逊",
          value: "ymx",
        },
        {
          name: "ebay",
          value: "ebay",
        },
      ],
      platform_id:'',
      pagination: {
        pageNum: 1, //当前页数
        pageSize: 10, //每页条数
        total: 0,
      },

      table_column: [
        {
          title: "环境",
          dataIndex: "env_name",
        },
        {
          title: "企业简称",
          dataIndex: "business_short",
        },
        {
          title: "操作",
          scopedSlots: { customRender: "operator_column" },
        },
      ],
      table_data: [
        {
          id: "1",
          env_name: "John Brown",
          business_short: "企业1",
        },
        {
          id: "2",
          env_name: "John Brown",
          business_short: "企业1",
        },
        {
          id: "3",
          env_name: "John Brown",
          business_short: "企业1",
        },
      ],
    };
  },
  created(){
       this.init()
  },
  methods: {
    click_env_common(data) {
      this.env_common = data;
      this.recent_open = 0;
    },
    click_recent() {
      this.env_common = 0;
      this.recent_open = 1;
    },
    filterOptionEvent(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    select_handleChange(data) {
      console.log(data);
      this.platform_id = data
    },

    async init(){
      let {data} = await environment_first_count()
      if(data.code ==200){
        this.huanjing = data.data.environment.no_bind_count
      }
    },

    async onSearch(keywords) {
      console.log(keywords)
      let {data} = await environment_index({
         keywords:keywords,
         platform_id:this.platform_id,
         recent_open:this.recent_open,
         env_common:this.env_common,
         pagesize:20,
         page:this.pagination.pageNum,
      })
      if(data.code ==200){
         this.pagination.total = data.data.total;
      }
    },
    //表格 切换页码
    handleTableChange(pagination) {
      console.log(pagination);
      this.pagination.pageNum = pagination.current;
      this.onSearch();
    },
    go_open(data) {
      console.log(data);
    },
  },
};
</script>

<style scoped lang="less">
.manage_home_wrap {
  width: 1845px;
  padding-left: 15px;
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
      .top_yuer {
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
      .chongzhi_btn {
        width: 84px;
        text-align: center;
        cursor: pointer;
        margin-top: 22px;
        line-height: 30px;
        height: 30px;
        background: linear-gradient(270deg, #3dbb9c 0%, #47d3b7 99%);
        border-radius: 2px;
        color: white;
      }
    }
  }

  .down_wrap {
    width: 100%;
    min-height: 400px;
    background-color: white;
    margin-top: 21px;
    .down_top {
      display: flex;
      .top_btn {
        margin-left: 12px;
        width: 102px;
        height: 30px;
        background: #f7f9fd;
        border-radius: 1px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
        margin-top: 13px;
        color: #878fa7;
      }
      .top_btn:hover {
        color: #4c84ff;
      }
      .btn_be_check {
        background: #eef2fd;
        color: #4c84ff;
      }
      .btn_1 {
        margin-left: 43px;
      }
      .btn_2 {
        margin-left: 780px;
      }
      .btn_3 {
        margin-left: 12px;
        width: 102px;
        height: 30px;
        background: #4c84ff;
        border-radius: 1px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
        margin-top: 13px;
        color: white;
      }
      .btn_search {
        margin-left: 11px;
        width: 338px;
        height: 30px;
        margin-top: 12px;
      }
      .btn_select {
        width: 100px;
        margin-left: 11px;
        height: 30px;
        margin-top: 12px;
      }
    }
    .down_table {
      margin-top: 11px;
      margin-left: 14px;
      margin-right: 14px;
      .table_open {
        cursor: pointer;
        text-align: center;
        width: 40px;
        height: 22px;
        background: #ffffff;
        border: 1px solid #d9dde7;
        box-shadow: 0px 2px 6px 0px rgba(157, 163, 178, 0.33);
        border-radius: 2px;
        color: #425070;
      }
      .table_open:hover {
        color: #4c84ff;
      }
    }
    .down_txt{
      margin-top: 11px;
      margin-left: 14px;
    }
  }
}
</style>
