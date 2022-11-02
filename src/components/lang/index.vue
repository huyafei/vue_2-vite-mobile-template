<!--
 * @name: index
 * @description：index.vue
 * @date: 2022/10/31 15:40
 * @author: yf_hu
-->
<template>
  <div class="">
    <span @click="openPopop">{{$i18n.locale}}</span>
    <van-popup v-model="isShow" position="bottom"  get-container="body" :overlay="false">
      <van-picker
          ref="picker_ref"
          :title="$t('global.lang')"
          show-toolbar
          :columns="languageList"
          @confirm="onConfirm"
          @cancel="() => { isShow = false }"
      />
    </van-popup>
  </div>
</template>
<script>
import {getCurrentInstance ,ref, reactive, computed, onMounted, nextTick, toRefs} from "vue"
import {Locale} from 'vant'
import {messages} from "@/lang";

export default {
  name: "Lang",
  components: {},
  props: {},
  emits: [],
  setup() {
    const _this = getCurrentInstance().proxy.$root;

    const picker_ref = ref(null);
    const isShow = ref(false)
    const languageList = ref(Object.keys(messages))
    const onConfirm = (value) => {
      _this.$i18n.locale = value
      _this.$cookies.set("language", value);
      Locale.use(value,messages[value]);
      isShow.value = false
    }
    const openPopop = () => {
      const index = languageList.value.indexOf(_this.$i18n.locale)
      isShow.value = true
      nextTick(() => {
        picker_ref.value.setIndexes([index])
      })
    }
    onMounted(() =>{})

    return {
      picker_ref,
      isShow,
      languageList,
      openPopop,
      onConfirm
    };
  },
  mounted() {}
};
</script>
<style scoped></style>
