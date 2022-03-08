<template>
  <div class="invite">
    <div class="banner"></div>
    <div class="invite_link">
      <div class="link_title">专属邀请链接</div>
      <div class="link_clip">
        <a-input class="clip_input" :value="link" />
        <a-button type="link" class="clip_icon" @click="copyClick"
          >复制</a-button
        >
      </div>
      <div class="link_line"></div>
      <div class="link_info">
        1.通过你的邀请链接注册紫鸟浏览器专业版的好友，好友下单后可获得1张18元无门槛优惠券。<br />
        2.在你的好友第一次下单后，你的企业将获得2张18元优惠券。<br />
        3.无门槛优惠券的使用有效期及使用规则以券面标示为准。<br />
        4.本活动最终解释权归洋淘跨境浏览器所有。
      </div>
    </div>
    <div class="invite_info">
      <div class="invite_count">
        <div class="r_count">
          <div class="count_back"></div>
          <div class="count_info">
            <div class="co">{{ num }}</div>
            <div class="co_title">累计邀请好友 (人)</div>
          </div>
        </div>
        <div class="r_count q_count">
          <div class="count_back"></div>
          <div class="count_info">
            <div class="co">{{ count }}</div>
            <div class="co_title">获得礼金券 (元)</div>
          </div>
        </div>
      </div>
      <div class="invite_list">
        <a-table
          :row-key="(r, i) => i.toString()"
          :columns="columns"
          :data-source="table_data"
        >
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import { coupon_invite } from "@/api/const_manage";
const columns = [{
  title: "注册时间",
  dataIndex: "register_at"
}, {
  title: "注册公司名",
  dataIndex: "business_name"
}, {
  title: "优惠券金额",
  dataIndex: "money"
}, {
  title: "过期时间",
  dataIndex: "expire_at"
}
]
import { copy } from 'iclipboard';
export default {
  name: 'invite_fee',
  data() {
    return {
      link: 'http://119.23.136.12:8801/#/login/register?invite=',
      columns,
      table_data: [],
      count: null,
      total: null,
    }
  },
  mounted() {
    let c_1 = JSON.parse(localStorage.member)
    this.link = this.link + c_1.invite

    this.get_data()
  },
  methods: {
    copyClick: function () {
      if (copy(this.link)) {
        this.$message.success('复制成功');
      } else {
        this.$message.error('复制失败');
      }
    },

    async get_data() {
      let { data } = await coupon_invite({

      })
      if (data.code == 200) {
        this.count = data.data.count
        this.total = data.data.total
        this.table_data = data.data.list
      }
    },
  }
}
</script>

<style lang="less" scoped>
.invite {
  display: flex;
  flex-direction: column;
  .banner {
    width: 100%;
    height: 269px;
    background: url("../../assets/img/fee/邀请banner@2x.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .invite_link {
    display: flex;
    flex-direction: column;
    margin-top: -107px;
    margin-left: 200px;
    width: 1200px;
    height: 294px;
    background: #ffffff;

    box-shadow: 0px 0px 9px 1px rgba(185, 185, 185, 0.27);
    border-radius: 10px;
    .link_title {
      width: 100%;
      text-align: center;
      margin-top: 30px;
      font-size: 18px;
      font-family: SourceHanSansSC;
      font-weight: 500;
      color: #374567;
    }
    .link_clip {
      display: flex;
      flex-direction: row;
      margin-left: 294px;
      margin-top: 24px;
      .clip_input {
        width: 613px;
        height: 46px;
        background: #ffffff;

        border: 1px solid #4c84ff;

        border-radius: 23px;
      }
      .clip_icon {
        margin-left: 2px;
        margin-top: 8px;
      }
    }
    .link_line {
      margin-top: 39px;
      margin-left: 62px;
      width: 1074px;
      height: 1px;
      background: #e5e5e5;
    }
    .link_info {
      margin-top: 23px;
      margin-left: 63px;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #425070;

      line-height: 24px;
    }
  }
  .invite_info {
    display: flex;
    flex-direction: row;
    margin-top: 21px;
    margin-left: 200px;
    .invite_count {
      display: flex;
      flex-direction: column;
      .r_count {
        display: flex;
        flex-direction: row;
        width: 324px;
        height: 102px;
        background: #ffffff;

        box-shadow: 0px 0px 9px 1px rgba(185, 185, 185, 0.27);
        border-radius: 10px;
        .count_back {
          margin: 10px 49px 8px 30px;
          width: 84px;
          height: 84px;
          background: url("../../assets/img/fee/组 11@2x(1).png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
        .count_info {
          display: flex;
          flex-direction: column;
          margin-top: 10px;
          .co {
            margin-left: 42px;
            font-size: 30px;
            font-family: Source Han Sans CN;
            font-weight: 500;
            color: #425070;
          }
          .co_title {
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #425070;
          }
        }
      }
      .q_count {
        margin-top: 23px;
        .count_back {
          background: url("../../assets/img/fee/组 11@2x.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
  .invite_list {
    margin-left: 22px;
    width: 854px;
  }
}
</style>