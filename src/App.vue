<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <div class="left_nav">
        <div class="nav_content nav_1">管理</div>
        <div class="nav_content nav_2">环境</div>
        <div class="nav_content nav_3">插件</div>
      </div>

      <router-view />
    </div>
  </a-config-provider>
</template>
<script>
// 修改 antd 的语言为中文
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
export default {
  data() {
    return {
      locale: zhCN,
      websocketObj: null,
      websocket_port: 42536,
    };
  },
  created() {
    this.initWebsocket();
  },
  methods: {
    initWebsocket() {
     // console.log('appvue initWebsocket', this.websocket_port)
      this.webSocketObj = new WebSocket(
        "ws://" + '127.0.0.1:' + this.websocket_port
      );
      this.webSocketObj.onmessage = this.onMessage
      this.webSocketObj.onopen = this.onOpen
      this.webSocketObj.onerror = this.onError
      this.webSocketObj.onclose = this.onClose

    },
    //接收到消息的回调方法
    onMessage(evt) {
      //console.log('onMessage')
     // console.log(JSON.parse(evt.data))
      let c_1 = JSON.parse(evt.data)
      localStorage.version = c_1.version
      localStorage.mask = c_1.mask
      localStorage.platform = c_1.platform
    },
    //连接成功建立的回调方法
    onOpen() {
      //console.log('onOpen s2', this.webSocketObj.readyState)
      if (this.webSocketObj.readyState === 1) {
        this.get_client_params()
      }

    },
    //连接发生错误
    onError() {
      console.log('onError')

      if (this.websocket_port <= 42540) {
        setTimeout(() => {
          this.onClose();
          this.websocket_port += 1;
          this.initWebsocket();

        }, 1000);
      } else {
        this.$message.error('获取公共参数失败,websocket通信异常!');
        this.onClose();
      }
    },
    //连接关闭的回调方法
    onClose() {
      console.log('onClose')
      this.webSocketObj && this.webSocketObj.close && this.webSocketObj.close();
    },
    get_client_params() {
      let c_1 = {
        "message": "/connection/success"
      }
      c_1 = JSON.stringify(c_1)
      this.webSocketObj.send(c_1);

    },
  },
};
</script>
<style lang="less" scoped>
.left_nav {
  z-index: 99;
  width: 40px;
  background-color: white;
  position: fixed;
  left: 0px;
  height: 100%;
  border-right: 1px solid #dedfe2;
  .nav_content {
    width: 100%;
    height: 45px;
    cursor: pointer;
    background-repeat: no-repeat;
    background-position: 6px 0px;
    background-size: 28px 28px;
    padding-top: 33px;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
  .nav_content:hover {
    color: #4c84ff;
  }
  .nav_1 {
    margin-top: 10px;
    background-image: url("./assets/img/管理@2x.png");
  }
  .nav_2 {
    margin-top: 24px;
    background-image: url("./assets/img/店铺@2x.png");
  }
  .nav_3 {
    margin-top: 24px;
    background-image: url("./assets/img/插件@2x.png");
  }
}
</style>
