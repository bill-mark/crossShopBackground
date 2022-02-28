<template>
  <div class="peo_act_wrap">
    <div class="top_line">
      仅用于平台实名认证，平台不会泄露您的信息，请放心认证。
    </div>
    <div class="content">
      <div class="content_title">
        企业认证 / 法人认证（人脸识别）
        <span style="color: #3b77fa">个人认证</span>
      </div>

      <div class="content_top">
        <a-steps :current="step_now">
          <a-step title="个人资料" />

          <a-step title="人脸识别" />
          <a-step title="完成认证" />
        </a-steps>
      </div>

      <div class="content_card" v-show="step_now == 0">
        <div class="card_top">
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
              <div class="ant-upload-text">身份证头像面</div>
            </div>
          </a-upload>

          <a-upload
            name="file"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :action="upload_url"
            :data="uptoken"
            :before-upload="beforeUpload_two"
            @change="handleChange_two"
          >
            <img
              v-if="imageUrl_2"
              class="upload_img"
              :src="imageUrl_2"
              alt="avatar"
            />
            <div v-else>
              <a-icon :type="loading_2 ? 'loading' : 'plus'" />
              <div class="ant-upload-text">身份证国徽面</div>
            </div>
          </a-upload>
        </div>

        <div class="card_down">
          请上传身份证照片
          <span style="color: #878fa7">（图片大小不超过2M）</span>
        </div>
      </div>

      <a-button
        type="primary"
        class="down_btn"
        v-show="step_now == 0"
        @click="get_qrcode"
      >
        下一步
      </a-button>

      <div class="content_qr" v-show="step_now == 1">
        <div class="qr_top" id="peo_ac_qr" ref="peo_ac_qr"></div>
        <div class="qr_second">请扫码继续在移动端完成认证</div>
        <div class="qr_third">
          <div class="third_left">如已在手机上完成操作，请</div>
          <div class="third_right" @click="get_info">
            点击刷新
          </div>
        </div>
      </div>


    </div>
  </div>
</template>
<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
import { certify_latest_info_v2,certify_person_certify } from '@/api/authencation'
import QRCode from 'qrcode2'
export default {
  data() {
    return {
      loading: false,
      imageUrl: '',
      loading_2: false,
      imageUrl_2: '',
      uptoken: {
        version: '',
        mask: '',
        platform: '',
      },
      upload_url: '',

      front_id: '',
      back_id: '',
      step_now: 0,
    }
  },
  created() {
    this.uptoken.version = localStorage.version
    this.uptoken.mask = localStorage.mask
    this.uptoken.platform = localStorage.platform
    this.uptoken.token = localStorage.token
    this.uptoken.scene = 1
    this.upload_url = JSON.parse(localStorage.publicconfig).baseURL + '/client_v1/upload'


  },
  methods: {
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        //console.log(info.file.response)

        if (info.file.response.code == 200) {
          this.front_id = info.file.response.data.id
        }

        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    handleChange_two(info) {
      if (info.file.status === 'uploading') {
        this.loading_2 = true;
        return;
      }
      if (info.file.status === 'done') {
        //console.log(info.file.response)

        if (info.file.response.code == 200) {
          this.back_id = info.file.response.data.id
        }

        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl_2 = imageUrl;
          this.loading_2 = false;
        });
      }
    },
    beforeUpload_two(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },

    creatQrCode(urldata) {
      //console.log(urldata)
      this.$refs.peo_ac_qr.innerHTML = '';
      new QRCode(this.$refs.peo_ac_qr, {
        text: urldata, //页面地址 ,如果页面需要参数传递请注意哈希模式#
        width: 160,
        height: 160,
      })
    },


    async get_qrcode() {
      let { data } = await certify_person_certify({
        type: 0,
        front_id: this.front_id,
        back_id: this.back_id,
      })
      if (data.code == 200) {
        this.step_now = 1
        this.creatQrCode(data.data.url)
      }
    },

     async get_info(){
         let {data} = await certify_latest_info_v2({
             type:0
         })
         if(data.code ==200){
           if(data.data.status == 1){
             this.$message.success('认证成功')
             this.$router.push({name:'company_setting'})
           }
           if(data.data.status != 1){
             this.$message.warning('暂未检测到认证成功,请完成认证或稍后再试')
           }
         }
       },


  }
}
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
      margin: 0 auto;
      margin-top: 50px;
      width: 840px;
    }
    .content_card {
      height: 200px;
      .card_top {
        width: 420px;
        margin: 0 auto;
        margin-top: 70px;
        display: flex;
        justify-content: center;
      }
      .card_down {
        padding-left: 439px;
        margin-top: 32px;
        font-size: 14px;
        color: #374567;
      }
    }
    .down_btn {
      margin: 0 auto;
      margin-left: 580px;
      margin-top: 10px;
    }
    .qr_top {
      margin: 0 auto;
      margin-top: 40px;
      width: 160px;
      height: 160px;
      border: 1px solid #e3e3e3;
    }
    .qr_second {
      margin: 0 auto;
      margin-top: 32px;
      width: 187px;
      height: 15px;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #374567;
      line-height: 24px;
    }
    .qr_third {
      display: flex;
      justify-content: center;
      margin-top: 23px;
      .third_left {
        color: #878fa7;
      }
      .third_right {
        color: #4c84ff;
        cursor: pointer;
      }
    }
  }
}
</style>