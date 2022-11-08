/**
 * @name: index
 * @description：index.js
 * @date: 2022/10/20 9:53
 * @author: yf_hu
 */
import Vue from "vue";

const modules = import.meta.glob(["./**/*.vue"], { eager: true });

const prefix = "Ven";

for (let modulesKey in modules) {
  Vue.component(
    prefix + modules[modulesKey].default.name,
    modules[modulesKey].default
  );
}
