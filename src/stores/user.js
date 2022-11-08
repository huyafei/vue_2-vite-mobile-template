import { defineStore } from "pinia";
import { getUserInfo, userLogin } from "@/api";
import cookies from "@/plugins/modules/cookies";
import router from "@router";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    userInfo: "",
  }),
  getters: {
    name: (state) => state.userInfo.name,
  },
  actions: {
    async _userLogin(data) {
      const res = await userLogin(data);
      if (res?.result?.token) {
        let millisecond = new Date().getTime();
        let expires = new Date(millisecond + 7200 * 1000); // 2小时
        cookies.set("token", res.result.token, { expires });
        return {
          code: 200,
        };
      }
    },
    /**
     * 获取用户信息
     */
    async _getUserInfo() {
      const res = await getUserInfo();
      if (res?.result) {
        this.userInfo = res.result;
        return {
          code: 200,
        };
      }
    },
    /**
     * 退出登录
     */
    _userLogOut() {
      cookies.remove("token");
      this.userInfo = "";
      router.push({ name: "Login" });
      return {
        code: 200,
      };
    },
  },
});
