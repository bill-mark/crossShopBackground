<template>
  <div class="faren_wrap">
    <div class="top_line">
      <div class="top_line_1">温馨提示</div>
      <div class="top_line_2">目前仅支持中国工商局注册的企业提交企业认证。</div>
      <div class="top_line_2">
        请根据资料提示准备好材料，选择任一认证方式开始认证，请勿中图退出，否则将重新开始认证流程。
      </div>
    </div>

    <div class="content">
      <div class="content_title">
        企业认证 / <span style="color: #3b77fa">法人认证（人脸识别）</span>
      </div>

      <div class="content_top">
        <div class="con_t_left">
          <div class="line_1">
            <div class="left_num">1</div>
            <div class="left_txt">个人认证</div>
            <div :class="[peo_status == 0 ?'left_no_state':'left_active_state']" >{{ pep_status }}</div>
          </div>
          <div class="left_middle">
            <div class="left_m_line"></div>
            <div class="left_m_right">
              <div class="top">请提交法人中国大陆身份证正反面照片</div>
              <div class="down">非中国大陆居民的法人无法进行企业认证</div>
            </div>
          </div>
        </div>
        <div class="con_t_right">
          <a-button type="primary" @click="go_pop" class="right_btn">
            {{ pep_btn }}
          </a-button>
        </div>
      </div>

      <div class="content_down">
        <div class="con_t_left">
          <div class="line_1">
            <div class="left_num">2</div>
            <div class="left_txt">组织认证</div>
            <div :class="[company_status == 0 ?'left_no_state':'left_active_state']">{{ com_status }}</div>
          </div>

          <div class="com_line_txt">选择一: 法人人脸识别</div>
          <div class="com_line_yellow">所需资料：营业执照照片或扫描件</div>

          <div class="com_line_txt" style="margin-top: 30px">
            选择二：对公账户打款
          </div>
          <div class="com_line_yellow">
            所需资料：对公银行账户、开户银行、开户行
          </div>
        </div>
        <div class="con_t_right">
          <a-button type="primary" 
          :disabled="company_status == 0"
          @click="go_com"
          class="right_btn">
            {{ com_btn }}
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { certify_latest_info_v2 } from '@/api/authencation'
export default {
  data() {
    return {
      peo_status: 0,//个人状态
      company_status: 0,//公司状态

      pep_btn: '进行个人认证',
      pep_status: '未认证',

      com_btn: '进行组织认证',
      com_status: '未认证',
    }
  },
  created() {
    this.auth_info(0)
    this.auth_info(1)
  },
  methods: {
    async auth_info(type) {
      let { data } = await certify_latest_info_v2({
        type: type
      })
      if (data.code == 200) {
        if (type == 0) {
          this.peo_status = data.data.status
          if (this.peo_status == 0) {
            this.pep_btn = '进行个人认证'
            this.pep_status = '未认证'
          }
          if (this.peo_status == 1) {
            this.pep_btn = '重新认证'
            this.pep_status = '已认证'
          }
        }
        if (type == 1) {
          this.company_status = data.data.status
          if (this.peo_status == 0) {
            this.com_btn = '进行个人认证'
            this.com_status = '未认证'
          }
          if (this.peo_status == 1) {
            this.com_btn = '重新认证'
            this.com_status = '已认证'
          }
        }

      }
    },
    go_pop(){
       this.$router.push({name:'company_peo_act'})
    },
     go_com(){
       this.$router.push({name:'company_faren_act'})
    },
  }
}
</script>
<style scoped lang="less">
.faren_wrap {
  .top_line {
    width: 1304px;
    height: 104px;
    margin: 0 auto;
    margin-top: 29px;
    background: #fefbf1;
    overflow: hidden;
    .top_line_1 {
      color: #e7a848;
      font-size: 14px;
      height: 14px;
      line-height: 14px;
      margin-left: 60px;
      margin-top: 18px;
    }
    .top_line_2 {
      padding-left: 74px;
      margin-top: 13px;
      height: 14px;
      line-height: 14px;
      color: #e7a848;
      font-size: 14px;
      color: #e7a848;
    }
  }
  .content {
    margin: 0 auto;
    margin-top: 43px;
    width: 1304px;
    height: 528px;
    background: #ffffff;
    box-shadow: 0px 0px 12px 1px rgba(193, 199, 203, 0.3);
    .content_title {
      margin-left: 60px;
      padding-top: 31px;
      height: 19px;
      font-size: 18px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #374567;
      line-height: 19px;
    }
    .content_top {
      display: flex;
      .con_t_left {
        width: 440px;
        margin-left: 65px;
        margin-top: 54px;

        // border: 1px solid red;
        .line_1 {
          display: flex;
          .left_num {
            width: 38px;
            height: 38px;
            background: #3370ff;
            border-radius: 50%;
            font-size: 18px;
            color: white;
            text-align: center;
            line-height: 38px;
          }
          .left_txt {
            margin-top: 11px;
            margin-left: 21px;
            width: 66px;
            height: 16px;
            font-size: 16px;
            font-family: Source Han Sans CN;
            font-weight: 500;
            color: #374567;
            line-height: 16px;
          }
          .left_no_state {
            margin-top: 11px;
            margin-left: 39px;
            width: 50px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            font-size: 14px;
            color: #8a909a;
            background: #eeeff1;
            border-radius: 2px;
          }
          .left_active_state{
              margin-top: 11px;
            margin-left: 39px;
            width: 50px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            font-size: 14px;
            color: #28B964;
            background: #EAF6EE;
            border-radius: 2px;
          }
        }
        .left_middle {
          display: flex;
          .left_m_line {
            margin-top: 44px;
            margin-left: 19px;
            width: 1px;
            height: 100px;
            background: #e3e3e3;
          }
          .left_m_right {
            margin-top: 37px;
            margin-left: 39px;
            .top {
              font-size: 14px;
              color: #606c80;
              line-height: 14px;
              height: 14px;
            }
            .down {
              margin-top: 10px;
              font-size: 14px;
              color: #e8ac51;
              line-height: 14px;
              height: 14px;
            }
          }
        }
      }
      .con_t_right {
        margin-top: 52px;
        .right_btn {
          width: 128px;
          height: 40px;
        }
      }
    }

    .content_down {
      display: flex;
      .con_t_left {
        width: 440px;
        margin-left: 65px;
        margin-top: 43px;

        //border: 1px solid red;
        .line_1 {
          display: flex;
          .left_num {
            width: 38px;
            height: 38px;
            background: #3370ff;
            border-radius: 50%;
            font-size: 18px;
            color: white;
            text-align: center;
            line-height: 38px;
          }
          .left_txt {
            margin-top: 11px;
            margin-left: 21px;
            width: 66px;
            height: 16px;
            font-size: 16px;
            font-family: Source Han Sans CN;
            font-weight: 500;
            color: #374567;
            line-height: 16px;
          }
          .left_no_state {
            margin-top: 11px;
            margin-left: 39px;
            width: 50px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            font-size: 14px;
            color: #8a909a;
            background: #eeeff1;
            border-radius: 2px;
          }
          .left_active_state{
              margin-top: 11px;
            margin-left: 39px;
            width: 50px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            font-size: 14px;
            color: #28B964;
            background: #EAF6EE;
            border-radius: 2px;
          }
        }
        .com_line_txt {
          margin-top: 15px;
          margin-left: 60px;
          height: 14px;
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 500;
          color: #606c80;
          line-height: 14px;
        }
        .com_line_yellow {
          margin-top: 10px;
          margin-left: 60px;
          height: 14px;
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 500;
          color: #e8ac51;
          line-height: 14px;
        }
      }
      .con_t_right {
        margin-top: 42px;
        .right_btn {
          width: 128px;
          height: 40px;
        }
      }
    }
  }
}
</style>