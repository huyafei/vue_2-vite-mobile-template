import Vue from "vue";
import VueRouter from "vue-router";
import pinia from "@/stores/pinia";

Vue.use(VueRouter);

import constantRoutes from "./modules/constantRoutes";
import asyncRoutes from "./modules/asyncRoutes";
import cookies from "@plugins/modules/cookies";

// 处理路由跳转报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, resolve, reject) {
  if (resolve || reject)
    return originalPush.call(this, location, resolve, reject);
  return originalPush.call(this, location).catch((e) => {});
};
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location, resolve, reject) {
  if (resolve || reject)
    return originalReplace.call(this, location, resolve, reject);
  return originalPush.call(this, location).catch((e) => {});
};

import { useUserStore } from "@/stores/user";

let router = new VueRouter({
  mode: "history", // 或者 'hash'
  base: window.$global.basePath,
  routes: [...constantRoutes, ...asyncRoutes],
});
const whiteList = ["Login", "Page404", "Page401"];

router.beforeEach(async (to, from, next) => {
  if (whiteList.includes(to.name)) {
    next();
  } else {
    // 刷新页面重新登陆，更新权限
    // if (!from.name && to.name !== "Login") {
    //   next({
    //     name: "Login",
    //     query: {
    //       redirect: to.fullPath
    //     }
    //   });
    // } else {
    const token = cookies.get("token");
    if (token) {
      const userStore = useUserStore(pinia);
      if (!userStore.userInfo) {
        await userStore._getUserInfo();
      }
      next();
    } else {
      next({
        name: "Login",
        query: {
          redirect: to.fullPath,
        },
      });
    }
    // }
  }
});

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  window.scrollTo(0, 0);
});

export function useRouter() {
  return router;
}

export function useRoute() {
  return router.currentRoute;
}

export default router;
