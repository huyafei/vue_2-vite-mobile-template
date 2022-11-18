<!--
 * @name: index
 * @description: index.vue
 * @date: 2022/10/27 12:46
 * @author: yf_hu
-->
<script>
export default {
  name: "Empty",
};
</script>
<script setup>
import {
  ref,
  reactive,
  toRefs,
  computed,
  watch,
  onMounted,
  nextTick,
} from "vue";
const props = defineProps({
  text: {
    type: String,
    default: "暂无数据",
  },
});
</script>
<template>
  <div class="empty">
    <slot>
      {{ text }}
    </slot>
  </div>
</template>
<style scoped>
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 14px;
}
</style>
