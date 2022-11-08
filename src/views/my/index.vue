<template>
  <div class="main-content page">
    <VenNavbar title="我的"></VenNavbar>
    <div class="page-content">
      <van-button type="primary" block @click="logOut">退出登录</van-button>
    </div>
  </div>
</template>
<script>
import { useUserStore } from "@/stores/user";
export default {
  name: "My",
  components: {},
  props: {},
  setup() {
    const userStore = useUserStore();

    const logOut = () => {
      userStore._userLogOut();
    };
    return {
      logOut,
    };
  },
};
</script>
<style scoped></style>
