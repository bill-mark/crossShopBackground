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
        <a-steps :current="0">
          <a-step title="个人资料" />

          <a-step title="人脸识别" />
          <a-step title="完成认证" />
        </a-steps>
      </div>

      <div class="content_card">
        <div class="card_top">
          <a-upload
            name="file"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :action="upload_url"
            :data=uptoken
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">身份证头像面</div>
            </div>
          </a-upload>

          <!-- <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">身份证国徽面</div>
            </div>
          </a-upload> -->
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
import { certify_latest_info_v2 } from '@/api/authencation'
export default {
  data() {
    return {
      loading: false,
      imageUrl: '',
      uptoken:{
        version:'',
        mask:'',
        platform:'',
      },
      upload_url:'http://119.23.136.12:8611/client_v1/upload',
    }
  },
  created() {
        this.uptoken.version = localStorage.version
        this.uptoken.mask = localStorage.mask
        this.uptoken.platform = localStorage.platform
  },
  methods: {
    handleChange(info) {
        console.log(info)
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
          console.log(info.file.response)
        
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
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
    async auth_info(type) {
      let { data } = await certify_latest_info_v2({
        type: type
      })
      if (data.code == 200) {


      }
    },
  }
}
</script>
<style scoped lang="less">
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
      .card_top {
        width: 420px;
        margin: 0 auto;
        margin-top: 70px;
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>