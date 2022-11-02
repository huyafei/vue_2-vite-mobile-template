<script>
export default {
  name: "Login",
}
</script>
<script setup>
import {getCurrentInstance, onMounted, reactive, ref} from 'vue'

import {useRoute, useRouter} from "@/router";
import {useUserStore} from "@/stores/user";

// 获取当前实例
const _this = getCurrentInstance().proxy;
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const formData = reactive({
  username: '',
  password: ''
})
const redirectPath = ref(route.query.redirect || "/home");

const onSubmit = async () => {
  const res = await userStore._userLogin(formData);
  if (res) {
    const _res = await userStore._getUserInfo()
    if (_res) {
      console.log(redirectPath.value)
      router.replace(redirectPath.value);
    }
  }
};

onMounted(() => {
  console.log('_this', _this)
})
</script>

<template>
  <div class="main">
    <van-form @submit="onSubmit">
      <van-field
          v-model="formData.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="formData.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<style scoped lang="less">

</style>
