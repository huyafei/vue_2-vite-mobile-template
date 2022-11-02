<script>
export default {
  name: "Home",
}
</script>
<script setup>
import {getCurrentInstance,onMounted, reactive} from 'vue'
import {useUserStore} from "@/stores/user";
import useCalculate from "./hooks/useCalculate";

const _this = getCurrentInstance().proxy.$root;
const userStore = useUserStore();
const {num1, num2, value, plus, multiply, minus, divide} = useCalculate()

const _data = reactive({
  userInfo: userStore.userInfo
})
const option = reactive({
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: "line",
    },
  ],
});



onMounted(() => {
  console.log(userStore)
})
</script>
<template>
  <div class="main-content page">
    <VenNavbar title="首页"   left-arrow>
      <template #right>
        <VenLang></VenLang>
      </template>
    </VenNavbar>
    <div class="page-content">
      <van-cell-group>
        <van-cell title="用户名称" :value="_data.userInfo.name"/>
      </van-cell-group>
      <VenChart :option="option"></VenChart>
      <p class="wz">
        君子知夫不全不粹之不足以为美也，故诵数以贯之，思索以通之，为其人以处之，除其害者以持养之。使目非是无欲见也，使耳非是无欲闻也，使口非是无欲言也，使心非是无欲虑也。及至其致好之也，目好之五色，耳好之五声，口好之五味，心利之有天下。是故权利不能倾也，群众不能移也，天下不能荡也。生乎由是，死乎由是，夫是之谓德操。德操然后能定，能定然后能应。能定能应，夫是之谓成人。天见其明，地见其光，君子贵其全也。
      </p>
      <div>
        <div>数1：<input v-model="num1" type="text"></div>
        <div>数2：<input v-model="num2" type="text"></div>
        <div>值：{{ value }}</div>
      </div>
      <van-button @click="plus">加</van-button>
      <van-button @click="minus">减</van-button>
      <van-button @click="multiply">乘</van-button>
      <van-button @click="divide">除</van-button>

    </div>
  </div>
</template>


<style scoped lang="less">
#echars {
  height: 300px;
}

p {
  color: var(--color-text-blue);
  .ellipsis(2);
}

.wz {
  font-size: 16px;
  color: var(--color-blue-text);
}
</style>
