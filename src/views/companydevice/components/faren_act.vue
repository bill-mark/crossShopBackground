<template>
  <div class="peo_act_wrap">
    <div class="top_line">
      仅用于平台实名认证，平台不会泄露您的信息，请放心认证。
    </div>

    <div class="content">
      <div class="content_top">
        <a-steps :current="step_now">
          <a-step title="填写企业信息" />
          <a-step title="等待审核" />
          <a-step title="核对打款信息" />
          <a-step title="完成认证" />
        </a-steps>
      </div>

      <div class="line_wrap" style="margin-top: 53px">
        <div class="line_left red_title" @click="test">组织类型</div>
        <div class="line_right">
          <a-radio-group
            name="radioGroup"
            class="right_1"
            v-model="company_type"
          >
            <a-radio :value="0"> 企业 </a-radio>
            <a-radio :value="1"> 个体工商户 </a-radio>
            <a-radio :value="2"> 政府/事业单位 </a-radio>
            <a-radio :value="3"> 其他组织 </a-radio>
          </a-radio-group>
        </div>
      </div>

      <div class="line_wrap" style="margin-top: 10px">
        <div class="line_left red_title">营业执照</div>
        <div class="license_right">
          <div class="license_r_left">
            <a-upload
              name="file"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              :action="upload_url"
              :data="uptoken"
              :before-upload="beforeUpload"
              @change="handleChange"
            >
              <img
                v-if="imageUrl"
                class="upload_img"
                :src="imageUrl"
                alt="avatar"
              />
              <div v-else>
                <a-icon :type="loading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">上传营业执照</div>
              </div>
            </a-upload>
          </div>
          <div class="license_r_right">
            <div class="lincese_1_top">
              请上传多证合一营业执照，照片或扫描件；
              信息需清晰可见，内容真实有效，不得做任何修改； 支持
              JPG、JPEG、PNG格式，大
            </div>
            <div class="lincese_1_down">
              <a
                target="view_window"
                href="https://ytbrowser-1301747098.cos.ap-nanjing.myqcloud.com/static/EnterpriseBusinessLicense.jpg"
                >查看示例图</a
              >
            </div>
          </div>
        </div>
      </div>

      <div class="line_wrap">
        <div class="line_left red_title">企业名称</div>
        <div class="line_right">
          <a-input class="right_input" v-model="com_name" />
        </div>
      </div>

      <div class="line_wrap">
        <div class="line_left red_title">统一社会认证代码</div>
        <div class="line_right">
          <a-input class="right_input" v-model="reg_num" />
        </div>
      </div>

      <div class="line_wrap">
        <div class="line_left red_title">法定代表人姓名</div>
        <div class="line_right">
          <a-input class="right_input" v-model="person" />
        </div>
      </div>

      <div class="line_wrap">
        <div class="line_left red_title" @click="test">认证方式</div>
        <div class="line_right">
          <a-radio-group
            name="radioGroup"
            class="right_1"
            v-model="certify_type"
          >
            <a-radio :value="0"> 法人身份认证(即时认证) </a-radio>
            <a-radio :value="1"> 对公打款认证(3-5个工作日)</a-radio>
          </a-radio-group>
        </div>
      </div>

      <div class="line_down">
        企业/个体工商户类型，管理员为企业法定代表人身份时,
      </div>
      <div class="line_down" style="margin-top: 8px">
        在法人身份认证通过情况下（企业名称、统一社会信用代码、法人姓名、法人身份证号码校验一致），企业实名认证通过；
      </div>

      <div class="line_wrap" v-show="certify_type == 1">
        <div class="line_left red_title">对公银行账号</div>
        <div class="line_right">
          <a-input class="right_input" v-model="bank_account" />
        </div>
      </div>

      <div class="line_wrap" v-show="certify_type == 1">
        <div class="line_left red_title">开户银行</div>
        <div class="line_right">
          <a-input class="right_input" v-model="bank" />
        </div>
      </div>

      <div class="line_wrap" v-show="certify_type == 1">
        <div class="line_left red_title">开户行所在省市</div>
        <div class="line_right">
          <a-input class="right_input" v-model="cities" />
        </div>
      </div>

      <div class="last">
        <a-button type="primary" @click="go_next"> 下一步 </a-button>
      </div>
    </div>
  </div>
</template>
<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
import { certify_enterprise,certify_latest_info_v2} from "@/api/authencation";

export default {
  data() {
    return {
      loading: false,
      imageUrl: "",
      uptoken: {
        version: "",
        mask: "",
        platform: "",
      },
      upload_url: "",

      front_id: "",
      step_now: 0,

      company_type: 0, //企业类型
      com_name: "",
      reg_num: "",
      person: "",
      certify_type: 0, //认证方式

      bank_account: "",
      bank: "",
      cities: "",
    };
  },
  created() {
    this.uptoken.version = localStorage.version;
    this.uptoken.mask = localStorage.mask;
    this.uptoken.platform = localStorage.platform;
    this.uptoken.token = localStorage.token;
    this.uptoken.scene = 1;
    this.upload_url =
      JSON.parse(localStorage.publicconfig).baseURL + "/client_v1/upload";
  },
  methods: {
    test() {
      console.log(this.company_type);
    },
    async go_next() {
      let { data } = await certify_enterprise({
        type: this.company_type,
        file_id: this.front_id,
        name: this.com_name,
        reg_num: this.reg_num,
        person: this.person,
        certify_type: this.certify_type,
        bank_account: this.bank_account,
        bank: this.bank,
        cities: this.cities,
      });
      if (data.code == 200) {
         if(this.certify_type ==0){
              this.$router.push({name:'company_faren_home'})
         }
          if(this.certify_type ==1){
              this.$router.push({name:'company_wait_act'})
         }
      }
    },
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        //console.log(info.file.response)

        if (info.file.response.code == 200) {
          this.front_id = info.file.response.data.id;
        }

        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
  },
};
</script>
<style scoped lang="less">
.anticon {
  padding-top: 34px;
}
.ant-upload-text {
  width: 168px;
  height: 62px;

  color: #4c84ff;
  // line-height: 100px;
}

.upload_img {
  width: 170px;
  height: 113px;
}

.peo_act_wrap {
  .top_line {
    margin: 0 auto;
    margin-top: 29px;
    padding-left: 60px;

    width: 1304px;
    height: 44px;
    line-height: 44px;
    background: #fefbf1;

    color: #e7a848;
  }
  .content {
    margin: 0 auto;
    margin-top: 42px;
    width: 1304px;
    height: 1017px;
    background: #ffffff;
    box-shadow: 0px 0px 12px 1px rgba(193, 199, 203, 0.3);
    .content_top {
      margin: 0 auto;
      padding-top: 45px;
      width: 880px;
    }
    .red_title::after {
      display: inline-block;
      margin-right: 4px;
      color: #f5222d;
      font-size: 14px;
      font-family: SimSun, sans-serif;
      line-height: 1;
      content: "*";
    }
    .line_wrap {
      display: flex;
      margin-top: 18px;
      .line_left {
        width: 222px;
        text-align: right;
        line-height: 44px;
      }
      .license_right {
        margin-left: 20px;
        width: 760px;
        height: 139px;
        background: #fafafc;
        display: flex;

        .license_r_left {
          margin-left: 20px;
        }
        .license_r_right {
          .lincese_1_top {
            padding-left: 22px;
            padding-top: 10px;
            width: 321px;
            height: 63px;
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #878fa7;
            line-height: 24px;
          }
          .lincese_1_down {
            padding-left: 20px;
            padding-top: 25px;
            cursor: pointer;
            height: 14px;
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #4c84ff;
            line-height: 24px;
          }
        }
      }
      .line_right {
        width: 430px;
        margin-left: 20px;
        .right_input {
          margin-left: 20px;
          width: 760px;
          height: 44px;
          border-radius: 2px;
        }
        .right_1 {
          line-height: 44px;
        }
      }
    }

    .line_down {
      margin-left: 240px;
      margin-top: 10px;
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #878fa7;
      line-height: 12px;
    }
    .last {
      margin-left: 237px;
      margin-top: 55px;
    }
  }
}
</style>