<template>
  <van-tabbar
    v-model="tabbarIndex"
    active-color="#1989fa"
    safe-area-inset-bottom
  >
    <template v-for="item in tabbarList">
      <van-tabbar-item :key="item.to" :icon="item.icon" :to="item.to">{{
        item.text
      }}</van-tabbar-item>
    </template>
  </van-tabbar>
</template>
<script>
import { getCurrentInstance, ref, watchEffect } from "vue";

export default {
  name: "Tabbar",
  components: {},
  props: {},
  setup() {
    const _this = getCurrentInstance().proxy;
    const tabbarIndex = ref(0);
    const tabbarList = ref([
      {
        icon: "home-o",
        text: "首页",
        to: "/home/index",
      },
      {
        icon: "flag-o",
        text: "分类",
        to: "/classify/index",
      },
      {
        icon: "friends-o",
        text: "购物车",
        to: "/cart/index",
      },
      {
        icon: "user-o",
        text: "我的",
        to: "/my/index",
      },
    ]);
    watchEffect(() => {
      tabbarIndex.value = tabbarList.value.findIndex(
        (item) => item.to === _this.$route.path
      );
    });
    return {
      tabbarIndex,
      tabbarList,
    };
  },
};
</script>
<style scoped lang="less"></style>
