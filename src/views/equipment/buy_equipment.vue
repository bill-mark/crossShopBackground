<template>
  <div class="buyequ_wrap">
    <div class="top_wrap">
      <div class="top_content">
        <div class="top_line" @click="go_back">
          <div class="top_l_left"></div>
          <div class="top_l_right">购买设备</div>
        </div>
        <div class="top_down">
          下单前请认真阅读设备
          <span style="color: yellow; cursor: pointer" @click="open_board"
            >购买须知</span
          >， 洋淘提供的设备皆受国家网络监管，请合法合规使用。
        </div>
      </div>
    </div>
    <a-modal title="购买须知" v-model="pop_board" @ok="pop_boardhandle">
      <p>
        洋淘浏览器专业版提供的国内/外设备，均受国家网络部门监管，禁止访问国家明令禁止登录的敏感网站，不提供一切翻墙服务。
      </p>
      <p>
        设备购买后无法退换，频繁更换设备会有潜在安全风险，购买设备时请根据账号日常运营环境或根据注册资料所在地进行选择。
      </p>
      <p>
        在购买成功后，系统将在2小时内分配
        设备到您的账户。如需购买Lazada，daraz平台使用的设备，购买前请先联系客服。
      </p>
      <p>
        洋淘浏览器专业版仅保证设备能够正常联网，无法保证设备是否能够注册或登录某些电商平台，购买前请根据各平台的政策谨慎选择设备。
      </p>
      <p>
        小众设备仅海外和北京地区无法做亚马逊视频认证。其他平台设备做亚马逊视频认证请提前联系客服了解相关注意事项
      </p>
      <p>
        节能型-云主机只提供80小时/月的远程时长，当您远程时长仅剩24小时，系统会提示您设备将进入休眠状态；当月远程时长使用完，次月才能再次远程该设备。
      </p>
      <p>
        洋淘浏览器专业版仅提供设备使用服务，设备信息由云服务商提供，请根据各平台的政策谨慎选择设备。
      </p>
      <p>
        未通过认证的企业仅支持购买10个设备。<a href="/#/companydevice/setting"
          >立即认证</a
        >
      </p>
    </a-modal>

    <div class="content_wrap">
      <div class="content_left">
        <div class="device_wrap">
          <div class="cell_title">
            <div class="cell_t_left"></div>
            <div class="cell_t_right">选择设备</div>
          </div>
          <div class="device_content">
            <div
              class="device_cell"
              :class="[check_deviceindex == index ? 'device_active_cell' : '']"
              v-for="(item, index) in device_info"
              :key="item.id"
              @click="check_device(index)"
            >
              <div
                class="device_active_ico"
                v-show="check_deviceindex == index"
              ></div>

              <div class="device_c_top">
                <div class="device_ico"></div>
                <div class="device_title">{{ item.device_title }}</div>
              </div>

              <div class="device_c_down">
                <div class="down_left">
                  {{ format_devicetype(item.device_type) }}
                </div>
                <div
                  :class="[
                    item.device_remote == 0
                      ? 'down_right_yellow'
                      : 'down_right_green',
                  ]"
                >
                  {{ format_deviceremote(item.device_remote) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="net_wrap">
          <div class="cell_title">
            <div class="cell_t_left"></div>
            <div class="cell_t_right">选择网络</div>
          </div>

          <div class="net_line">
            <div class="net_l_left">类型:</div>
            <div class="net_l_right">
              <div
                class="net_cell"
                :class="[check_networkindex == index ? 'net_active_cell' : '']"
                v-for="(item, index) in network_type"
                :key="item.id"
                @click="check_net(index)"
              >
                {{ item.type_title }}

                <div
                  class="net_active_ico"
                  v-show="check_networkindex == index"
                ></div>
              </div>
            </div>
          </div>

          <div class="net_line">
            <div class="net_l_left">地域:</div>
            <div class="net_l_right">
              <div
                class="net_cell"
                :class="[check_regionindex == index ? 'net_active_cell' : '']"
                v-for="(item, index) in network_region"
                :key="item.id"
                @click="check_region(index)"
              >
                {{ item.region_title }}

                <div
                  class="net_active_ico"
                  v-show="check_regionindex == index"
                ></div>
              </div>
            </div>
          </div>

          <div class="net_line">
            <div class="net_l_left">地区:</div>
            <div class="net_l_right">
              <div
                class="net_cell"
                :class="[check_areaindex == index ? 'net_active_cell' : '']"
                v-for="(item, index) in network_area"
                :key="item.id"
                @click="check_area(index)"
              >
                {{ item.area_title }}

                <div
                  class="net_active_ico"
                  v-show="check_areaindex == index"
                ></div>
              </div>
            </div>
          </div>

          <div class="net_line">
            <div class="net_l_left">套餐:</div>
            <div class="net_l_right">
              <div
                class="package_cell"
                :class="[check_packageindex == index ? 'net_active_cell' : '']"
                v-for="(item, index) in network_package"
                :key="item.id"
                @click="check_package(index)"
              >
                <div class="package_c_txt">
                  {{ item.package_title }}
                </div>
                <div class="package_c_money">
                  {{ item.package_amount }}/{{ item.package_unit }}
                </div>

                <div
                  class="net_active_ico"
                  v-show="check_packageindex == index"
                ></div>
              </div>
            </div>
          </div>

          <div class="net_down">
            *本线路无法访问全球etsy、Lazada平台、全球joom平台、fnac平台、mercari平台、noon平台，部分线路访问亚马逊平台会出现图片无法上传
            的问题，请谨慎选择。eBay平台的店铺，近期请不要选择该区域的设备。拼多多用户建议优先选择中国设备。
          </div>
        </div>

        <div class="duration_wrap">
          <div class="cell_title">
            <div class="cell_t_left"></div>
            <div class="cell_t_right">购买时长</div>
          </div>

          <div class="net_line">
            <div class="net_l_left">时长:</div>
            <div class="net_l_right">
              <div
                class="net_cell"
                :class="[check_durationindex == index ? 'net_active_cell' : '']"
                v-for="(item, index) in duration_list"
                :key="item.id"
                @click="check_duration(index)"
              >
                {{ item.duration }}个{{ item.duration_unit }}
                <span v-if="item.send > 0"
                  >(送{{ item.send }}{{ item.send_unit }} )</span
                >
                <div
                  class="net_active_ico"
                  v-show="check_durationindex == index"
                ></div>
              </div>
            </div>
          </div>

          <div class="net_line">
            <div class="net_l_left">数量:</div>
            <a-input-number
              class="durantion_input"
              v-model="buy_num"
              :min="1"
              :max="50"
            />
            <div class="net_tip">*单次最多购买50个设备</div>
          </div>
        </div>

        <div class="payway_wrap">
          <div class="cell_title">
            <div class="cell_t_left"></div>
            <div class="cell_t_right">支付方式</div>
          </div>

          <div class="cell_wrap">
            <div class="pay_cell" 
              @click="check_payway(0)"
              >
              <div class="cell_left"></div>
              <div class="cell_right" >
                <div class="cell_r_top">{{payway_list[0].title}}</div>
                <div class="cell_r_down">{{payway_list[0].desc}}</div>
              </div>
            </div>

             <div class="pay_cell" 
              @click="check_payway(1)"
              >
              <div class="cell_left left_ali"></div>
              <div class="cell_right" >
                <div class="cell_r_top">{{payway_list[1].title}}</div>
                <div class="cell_r_down">{{payway_list[1].desc}}</div>
              </div>
            </div>

             <div class="pay_cell" 
              @click="check_payway(2)"
              >
              <div class="cell_left left_wechat"></div>
              <div class="cell_right" >
                <div class="cell_r_top">{{payway_list[2].title}}</div>
                <div class="cell_r_down">{{payway_list[2].desc}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="content_right"></div>
    </div>
  </div>
</template>
<script>
import { device_purchase_device_list, device_purchase_duration_list } from '@/api/environment'
import { device_pay_channel } from '@/api/const_manage'
import { user_info } from '@/api/login'

export default {
  data() {
    return {
      pop_board: false,
      device_info: [],//设备类型列表
      check_deviceindex: 0,//选中的设备

      network_type: [],//网络类型列表
      check_networkindex: 0,//选中的网络类型

      network_region: [],//地域列表
      check_regionindex: 0,//选中的地域

      network_area: [],//地区列表
      check_areaindex: 0,//选中的地区

      network_package: [],//套餐列表
      check_packageindex: 0,//选中的套餐

      duration_list: [],
      check_durationindex: 0,

      buy_num: 1,

      payway_list: [],
      check_paywayindex:0,
    };
  },
  created() {
    this.get_init_data()
    this.get_duration_data()
    this.get_payway()

    
  },
  methods: {
     async get_userinfo() {
      let { data } = await user_info({
        user_role: JSON.parse(localStorage.member).user_role
      })
      if (data.code == 200) {
       localStorage.member = JSON.stringify(data.data.member)
       this.payway_list[0].desc = '可用余额:'+data.data.member.balance+'元'
      
      }
    },
    async get_payway() {
      let { data } = await device_pay_channel()
      if (data.code == 200) {
        this.payway_list = data.data.list
        this.get_userinfo()
      }
    },
    go_back() {
      this.$router.back(-1)
    },
    open_board() {
      this.pop_board = true
    },
    pop_boardhandle() {
      this.pop_board = false
    },
    format_deviceremote(data) {
      if (data == 0) {
        return '不可远程'
      }
      if (data == 1) {
        return '可远程'
      }
    },
    format_devicetype(data) {
      if (data == 0) {
        return '标准型'
      }
      if (data == 1) {
        return '节能型'
      }
    },
    check_device(index) {
      this.check_deviceindex = index
    },
    check_net(index) {
      this.check_networkindex = index
    },
    check_region(index) {
      this.check_regionindex = index
    },
    check_area(index) {
      this.check_areaindex = index
    },
    check_package(index) {
      this.check_packageindex = index
    },
    //时长
    check_duration(index) {
      this.check_durationindex = index
    },
    check_payway(index) {
      this.check_durationindex = index
    },

    async get_init_data() {
      let { data } = await device_purchase_device_list({
        info_id: 1,
        type_id: 1,
        region_id: 1,
        area_id: 1,
      })
      if (data.code == 200) {
        this.device_info = data.data.device_info
        this.network_type = data.data.network_type
        this.network_region = data.data.network_region
        this.network_area = data.data.network_area
        this.network_package = data.data.network_package
      }
    },

    async get_duration_data() {
      let { data } = await device_purchase_duration_list()
      if (data.code == 200) {
        this.duration_list = data.data.list
      }
    },

  },
};
</script>
<style scoped lang="less">
.buyequ_wrap {
  min-width: 1200px;
  background: white;
  margin: 0 auto;
  min-height: 700px;
  margin-top: 20px;
  .top_wrap {
    width: 100%;
    max-width: 1879px;
    height: 134px;
    margin: 0 auto;

    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    background-image: url("../../assets/img/equipment/buytop.png");
    .top_content {
      width: 1200px;

      margin: 0 auto;
      //border: 1px solid yellow;
      .top_line {
        display: flex;
        cursor: pointer;
        .top_l_left {
          width: 23px;
          height: 20px;
          margin-left: 95px;
          margin-top: 31px;

          background-repeat: no-repeat;
          background-position: center;
          background-size: 100%;
          background-image: url("../../assets/img/equipment/jiantou.png");
        }
        .top_l_right {
          width: 100px;
          margin-left: 8px;
          margin-top: 28px;
          height: 24px;
          font-size: 24px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: #ffffff;
          line-height: 24px;
        }
      }
      .top_down {
        margin-left: 95px;
        margin-top: 26px;
        height: 14px;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
        line-height: 14px;
      }
    }
  }

  .content_wrap {
    display: flex;
    width: 1200px;

    margin: 0 auto;
    border: 1px solid green;
    .content_left {
      width: 850px;
      flex: none;
      .cell_title {
        display: flex;
        .cell_t_left {
          margin-left: 21px;
          margin-top: 21px;
          width: 4px;
          height: 14px;
          background: #4c84ff;
        }
        .cell_t_right {
          margin-left: 7px;
          margin-top: 21px;
          height: 14px;
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #374567;
          line-height: 14px;
        }
      }

      .device_wrap {
        width: 850px;
        height: 172px;
        background: #ffffff;
        box-shadow: 0px 0px 12px 1px rgba(193, 199, 203, 0.3);
        .device_content {
          display: flex;
          height: 85px;
          margin-left: 3px;
          margin-top: 16px;
          cursor: pointer;
          .device_cell {
            position: relative;
            width: 188px;
            height: 85px;
            margin-left: 18px;
            background: #f7f9fd;
            border: 1px solid #ecf1fc;
            .device_c_top {
              display: flex;
              height: 46px;
              .device_ico {
                width: 30px;
                height: 38px;
                margin-left: 13px;
                margin-top: 8px;
                background-repeat: no-repeat;
                background-position: center;
                background-size: 100%;
                background-image: url("../../assets/img/equipment/index@2x.png");
              }
              .device_title {
                line-height: 46px;
                padding-left: 8px;
              }
            }
            .device_c_down {
              display: flex;
              .down_left {
                margin-left: 34px;
                margin-top: 7px;
                width: 54px;
                height: 18px;
                text-align: center;
                line-height: 18px;
                font-size: 12px;
                color: #4c84ff;
                background: #e1eaff;
                border-radius: 2px;
              }
              .down_right_yellow {
                margin-left: 6px;
                margin-top: 7px;
                width: 62px;
                text-align: center;
                line-height: 18px;
                font-size: 12px;
                color: #f29f55;
                height: 18px;
                background: #fef5d9;
                border-radius: 2px;
              }
              .down_right_green {
                margin-left: 6px;
                margin-top: 7px;
                width: 62px;
                text-align: center;
                line-height: 18px;
                font-size: 12px;
                color: #04b49c;
                height: 18px;
                background: #d5f6f2;
                border-radius: 2px;

                padding-left: 19px;
                background-repeat: no-repeat;
                background-position: 3px 2px;
                background-size: 15px 15px;
                background-image: url("../../assets/img/equipment/可远程图标@2x.png");
              }
            }
          }
          .device_active_cell {
            border: 1px solid #739afe;
            .device_active_ico {
              position: absolute;
              width: 20px;
              height: 20px;
              top: -10px;
              left: 177px;
              background-repeat: no-repeat;
              background-position: center;
              background-size: 100%;
              background-image: url("../../assets/img/equipment/勾选@2x.png");
            }
          }
        }
      }

      .net_wrap {
        width: 850px;
        margin-top: 17px;
        height: 439px;
        background: #ffffff;
        box-shadow: 0px 0px 12px 1px rgba(193, 199, 203, 0.3);
        .net_line {
          margin-top: 15px;
          display: flex;
          min-height: 30px;

          // border: 1px solid red;
          .net_l_left {
            width: 33px;
            flex: none;
            margin-left: 25px;
            height: 13px;
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #374567;
            line-height: 30px;
            padding-top: 10px;
          }
          .net_l_right {
            display: flex;
            flex-wrap: wrap;
            margin-left: 13px;
            .net_cell {
              position: relative;
              margin-top: 10px;
              min-width: 88px;
              padding-left: 17px;
              padding-right: 17px;
              height: 30px;
              margin-right: 17px;
              line-height: 30px;
              text-align: center;
              cursor: pointer;
              font-size: 14px;
              color: #374567;
              background: #f7f9fd;
              border: 1px solid #ecf1fc;
            }
            .package_cell {
              position: relative;
              margin-top: 10px;
              min-width: 88px;
              padding-left: 17px;
              padding-right: 17px;
              height: 88px;
              margin-right: 17px;
              text-align: center;
              cursor: pointer;
              font-size: 14px;
              color: #374567;
              background: #f7f9fd;
              border: 1px solid #ecf1fc;
              .package_c_txt {
                margin-top: 20px;
                text-align: center;
                height: 14px;
                line-height: 14px;
                color: #374567;
              }
              .package_c_money {
                margin-top: 16px;
                text-align: center;
                height: 18px;
                line-height: 18px;
                color: #ea5529;
              }
            }
            .net_active_cell {
              border: 1px solid #739afe;
              .net_active_ico {
                position: absolute;
                width: 20px;
                height: 20px;
                top: -10px;
                right: -10px;
                background-repeat: no-repeat;
                background-position: center;
                background-size: 100%;
                background-image: url("../../assets/img/equipment/勾选@2x.png");
              }
            }
          }
        }
        .net_down {
          padding-left: 23px;
          margin-top: 27px;
          font-size: 12px;
          color: #abb4c3;
        }
      }
      .duration_wrap {
        margin-top: 17px;
        width: 850px;
        height: 176px;
        background: #ffffff;
        box-shadow: 0px 0px 12px 1px rgba(193, 199, 203, 0.3);
        .net_line {
          margin-top: 15px;
          display: flex;
          min-height: 30px;

          // border: 1px solid red;
          .net_l_left {
            width: 33px;
            flex: none;
            margin-left: 25px;
            height: 13px;
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #374567;
            line-height: 30px;
            padding-top: 10px;
          }
          .net_l_right {
            display: flex;
            flex-wrap: wrap;
            margin-left: 13px;
            .net_cell {
              position: relative;
              margin-top: 10px;
              min-width: 88px;
              padding-left: 17px;
              padding-right: 17px;
              height: 30px;
              margin-right: 17px;
              line-height: 30px;
              text-align: center;
              cursor: pointer;
              font-size: 14px;
              color: #374567;
              background: #f7f9fd;
              border: 1px solid #ecf1fc;
            }
            .net_active_cell {
              border: 1px solid #739afe;
              .net_active_ico {
                position: absolute;
                width: 20px;
                height: 20px;
                top: -10px;
                right: -10px;
                background-repeat: no-repeat;
                background-position: center;
                background-size: 100%;
                background-image: url("../../assets/img/equipment/勾选@2x.png");
              }
            }
          }
          .durantion_input {
            margin-left: 13px;
            height: 30px;
            margin-top: 10px;
          }
          .net_tip {
            margin-top: 16px;
            margin-left: 11px;
            height: 12px;
            font-size: 12px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #abb4c3;
          }
        }
      }

      .payway_wrap {
        margin-top: 17px;
        width: 850px;
        height: 299px;
        background: #ffffff;
        box-shadow: 0px 0px 12px 1px rgba(193, 199, 203, 0.3);
        .cell_wrap {
          display: flex;
          margin-top: 20px;
          margin-left: 21px;
          .pay_cell {
            display: flex;
            width: 160px;
            margin-right: 30px;
            height: 64px;
            background: #f7f9fd;
            border: 1px solid #ecf1fc;
            cursor: pointer;
            .cell_left {
              flex: none;
              width: 22px;
              height: 22px;
              margin-left: 20px;
              margin-top: 21px;
              background-repeat: no-repeat;
              background-position: center;
              background-size: 100%;
              background-image: url("../../assets/img/equipment/账户余额@2x.png");
            }
            .left_ali{
               background-image: url("../../assets/img/equipment/ali-lite@2x.png");
            }
            .left_wechat{
               background-image: url("../../assets/img/equipment/wx-lite@2x.png");
            }
            .cell_right{
              .cell_r_top{
                height: 15px;
                margin-left: 15px;
                margin-top: 15px;
                font-size: 14px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #374567;
                line-height: 15px;
              }
              .cell_r_down{
                height: 12px;
                 margin-left: 15px;
                margin-top: 7px;
                font-size: 12px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #ABB4C3;
                line-height: 12px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
