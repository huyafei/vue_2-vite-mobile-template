/**
 * @name: asyncRoutes
 * @description：asyncRoutes.js
 * @date: 2022/1/6 13:49
 * @author: yf_hu
 */

/*
 * @params meta {Object} 路由元信息
 * - @params title {String} 路由标题
 * - @params roles {Array} 路由权限
 * - @params isCache {Boolean} 是否缓存
 * 缓存
 *
 * */
const constantRoutes = [
  {
    path: "/",
    redirect: "/home/index",
  },
  {
    path: "/home",
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/layout/layout.vue"),
    redirect: "/home/index",
    children: [
      {
        path: "index",
        name: "Home",
        meta: {
          title: "首页",
          isCache: true,
        },
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/home/index.vue"),
      },
    ],
  },
  {
    path: "/classify",
    component: () =>
      import(/* webpackChunkName: "classify" */ "@/views/layout/layout.vue"),
    redirect: "/classify/index",
    children: [
      {
        path: "index",
        name: "Classify",
        meta: {
          title: "分类",
          isCache: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "classify" */ "@/views/classify/index.vue"
          ),
      },
    ],
  },
  {
    path: "/cart",
    component: () =>
      import(/* webpackChunkName: "cart" */ "@/views/layout/layout.vue"),
    redirect: "/cart/index",
    children: [
      {
        path: "index",
        name: "Cart",
        meta: {
          title: "购物车",
        },
        component: () =>
          import(/* webpackChunkName: "cart" */ "@/views/cart/index.vue"),
      },
    ],
  },
  {
    path: "/my",
    component: () =>
      import(/* webpackChunkName: "my" */ "@/views/layout/layout.vue"),
    redirect: "/my/home",
    children: [
      {
        path: "index",
        name: "My",
        meta: {
          title: "我的",
        },
        component: () =>
          import(/* webpackChunkName: "my" */ "@/views/my/index.vue"),
      },
    ],
  },
];
export default constantRoutes;
