<!--
 * @name: index
 * @description: index.vue
 * @date: 2022/10/27 9:34
 * @author: yf_hu
-->
<script>
export default {
  name: "Chart",
};
</script>
<script setup>
import {
  getCurrentInstance,
  ref,
  reactive,
  toRefs,
  computed,
  watch,
  onMounted,
  onUnmounted,
  nextTick,
} from "vue";

const _this = getCurrentInstance().proxy.$root;

const props = defineProps({
  option: {
    type: Object,
    default: () => {
      return {};
    },
  },
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "260px",
  },
  colors: {
    type: Array,
    default: () => [
      "#9E87FF",
      "#FDD56A",
      "#FDB36A",
      "#FD866A",
      "#1890FF",
      "#13C2C2",
      "#2FC25B",
      "#FACC14",
      "#F04864",
      "#8543E0",
      "#3436C7",
      "#223273",
    ],
  },
});

const chartRef = ref(null);
const myChart = ref(null);
const isShowChart = ref(false);

const initChart = () => {
  myChart.value = _this.$echarts.init(chartRef.value);

  const option = {
    color: props.colors,
    ...props.option,
  };
  myChart.value.setOption(option);
};
const onResize = () => {
  if (myChart.value) myChart.value.resize();
};

onMounted(() => {
  if (props.option.series?.length && props.option.series[0].data?.length) {
    isShowChart.value = true;
    nextTick(() => {
      initChart();
    });
  } else {
    isShowChart.value = false;
  }
  window.addEventListener("resize", onResize, false);
});
onUnmounted(() => {
  window.removeEventListener("resize", onResize, false);
});
</script>
<template>
  <div class="chart-box" :style="{ width: width, height: height }">
    <div v-if="isShowChart" ref="chartRef" class="chart"></div>
    <VenEmpty v-else class="empty"></VenEmpty>
  </div>
</template>
<style scoped>
.chart,
.empty {
  width: 100%;
  height: 100%;
}
</style>
