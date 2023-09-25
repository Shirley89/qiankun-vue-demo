import 'whatwg-fetch';
import 'custom-event-polyfill';
import 'core-js/stable/promise';
import 'core-js/stable/symbol';
import 'core-js/stable/string/starts-with';
import 'core-js/web/url';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerMicroApps, start } from 'qiankun';

var host = "62.234.164.217"; // 生产环境
if (process.env.NODE_ENV == 'development') {  // 开发环境
  host = "localhost";
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

registerMicroApps([
  { 
    name: 'app-vue-hash', 
    entry: `http://${host}:1111`, 
    container: '#appContainer', 
    activeRule: '/app-vue-hash', 
    props: { data : { store, router } }
  },
  // { 
  //   name: 'app-vue-history',
  //   entry: `http://${host}:2222`, 
  //   container: '#appContainer', 
  //   activeRule: '/app-vue-history',
  //   props: { data : store }
  // },
]);

start();
