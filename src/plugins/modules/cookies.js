/**
 * @name: cookies
 * @description: cookies.js
 * @date: 2022/10/20 17:37
 * @author: yf_hu
 */
import Vue from "vue";
import Cookies from "js-cookie";
import { version } from "../../../package.json";

const prefix = `__${version}__`;

const cookies = {
  /**
   * 获取 cookie
   * @param name
   * @return {*}
   */
  get(name) {
    return Cookies.get(prefix + name);
  },
  /**
   * 设置 cookie
   * @param name
   * @param value
   * @param options Object 同 js-cookie 中 option { expires, path, domain, secure }
   */
  set(name, value, options = {}) {
    if (typeof value === "object") {
      value = JSON.stringify(value);
    }
    Cookies.set(prefix + name, value, { ...options });
  },
  /**
   * 删除 cookie
   * @param name
   * @param options Object 同 js-cookie 中 option { expires, path, domain, secure }
   */
  remove(name, options = {}) {
    Cookies.remove(prefix + name, { ...options });
  },
  getJSON(name) {
    const value = Cookies.get(prefix + name);
    return value ? JSON.parse(value) : value;
  },
};

Vue.prototype.$cookies = cookies;

export default cookies;
