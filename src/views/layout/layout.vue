<script setup>
import {computed, getCurrentInstance, onMounted, watch} from 'vue'
import {useRouterStore} from "@/stores/router";

const _this = getCurrentInstance().proxy;
const routerStore = useRouterStore();

const cachedViews = computed(() => routerStore.cachedViews)
const key = computed(() => _this.$route.path)

watch(() => _this.$route, () => {
  addCachedViews()
})

const addCachedViews = function () {
  const {name} = _this.$route
  if (name) {
    routerStore.addCachedViews(_this.$route)
  }
}
onMounted(() => {
  addCachedViews()
})
</script>
<template>
  <div class="layout">
    <div class="main">
        <keep-alive :include="cachedViews">
          <router-view :key="key"/>
        </keep-alive>
    </div>
    <VenTabbar></VenTabbar>
  </div>
</template>
<style scoped lang="less">
.layout {
  height: 100%;

  & > .main {
    height: calc(100% - 50px);
  }
}
</style>
