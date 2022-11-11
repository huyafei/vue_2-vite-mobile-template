/**
 * @name: setup
 * @description：setup.js
 * @date: 2022/10/26 22:16
 * @author: yf_hu
 */
import Vue from "vue";
import { PiniaVuePlugin } from "pinia";
import pinia from "@/stores/pinia";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./lang";
import "lib-flexible";
// 引入组件
import "./components";
// 加载插件
import "./plugins";

import "./assets/styles/css/main.css";
import "./assets/styles/less/index.less";

Vue.use(PiniaVuePlugin);
new Vue({
  router,
  pinia,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
