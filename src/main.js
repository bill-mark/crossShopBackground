import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less'
Vue.use(Antd);

import './style/index.less'
import 'normalize.css'

Vue.config.productionTip = false



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
