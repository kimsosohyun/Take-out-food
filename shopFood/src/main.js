// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./vuex/index"
import  "./common/reset.css"
import {Button,Popup} from 'mint-ui'
import "./mock/mockServer.js"
import lazyLoad from "vue-lazyload"
import loading from "./common/imgs/loading.gif"
Vue.use(lazyLoad,{
  loading
})
Vue.component(Button.name, Button)
Vue.component(Popup.name, Popup);
Vue.config.productionTip = false
Vue.prototype.$store=store;
// 小程序的注册方式,也可以这样注册store
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  // store
})
