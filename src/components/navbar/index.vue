<!--
 * @name: index
 * @description：index.vue
 * @date: 2022/10/27 14:54
 * @author: yf_hu
-->
<script>
export default {
  name: 'Navbar',
}
</script>
<script setup>
import {getCurrentInstance,ref, reactive, toRefs, computed, watch, onMounted, nextTick} from "vue"

const _this = getCurrentInstance().proxy.$root;

const onClickLeft=()=> {
  _this.$router.go(-1)
}
</script>
<template>
  <van-nav-bar
      v-bind="$attrs"
      v-on="$listeners"
      @click-left="onClickLeft"
      safe-area-inset-top
  >
    <template #left>
      <slot name="left"></slot>
    </template>
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #right>
      <slot name="right"></slot>
    </template>
  </van-nav-bar>
</template>
<style scoped></style>
