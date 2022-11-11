/**
 * @name: axios
 * @description：axios.js
 * @date: 2022/10/20 11:12
 * @author: yf_hu
 */
import Vue from "vue";
import axios from "axios";
import { Dialog, Toast } from "vant";
import cookies from "@plugins/modules/cookies";
import router from "@router";

/**
 * 创建axios实例
 * headers['Content-Type']: 'application/json' 或 'application/x-www-form-urlencoded'
 *
 */
const instance = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: $global.baseURL,
  timeout: 10000,
  headers: {},
});

// instance.defaults.baseURL = import.meta.env.VITE_PROJECT_API_baseURL;
// instance.defaults.timeout = 10000;
// instance.defaults.headers.post["Content-Type"] = "application/json";

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 全局加token
    const token = cookies.get("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    const res = response.data;
    if (res.code === 200) {
      return res;
    } else {
      let message = "服务器响应错误";
      if (res.code === 401) {
        message = "登录过期，请从新登录";
        Toast(message);
        setTimeout(() => {
          console.log(router);
          router.push({
            name: "login",
            query: {
              redirect: router.currentRoute.value.fullPath,
            },
          });
        }, 1500);
      } else {
        message += `，状态码：${res.code}`;
      }
      return Promise.reject(message);
    }
  },
  function (error) {
    // 对响应错误做点什么
    console.error("服务器error:", error.toString(), String(error));
    let message = "服务器响应错误";
    if (error?.response) {
      const { status } = error.response;
      switch (status) {
        case 400:
          message = "传参数据结构错误";
          break;
        case 401:
          message = "登录已过期, 请重新登录(401)";
          break;
        case 404:
          message = "请求出错(404)";
          break;
        case 408:
          message = "请求超时(408)";
          break;
        case 500:
          message = "服务器错误(500)";
          break;
        case 501:
          message = "服务未实现(501)";
          break;
        case 502:
          message = "网络错误(502)";
          break;
        case 503:
          message = "服务不可用(503)";
          break;
        case 504:
          message = "网络超时(504)";
          break;
        case 505:
          message = "HTTP版本不受支持(505)";
          break;
        default:
          message = "网络似乎正在开小差，请耐心等待";
      }
    } else if (error.message.includes("timeout")) {
      message = "服务器请求超时";
    }
    Dialog.alert({
      title: "提示",
      message: message,
    });
    return Promise.reject(error);
  }
);

Vue.prototype.$axios = instance;

export default instance;
