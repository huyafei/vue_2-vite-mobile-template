/**
 * @name: useCalculate
 * @description：useCalculate.js
 * @date: 2022/10/28 15:19
 * @author: yf_hu
 */
import { getCurrentInstance, ref } from "vue";
import { add, subtract } from "@vensst/js-toolkit";

export default function () {
  // 获取全局Vue实例
  const _this = getCurrentInstance().proxy.$root;
  const num1 = ref(0);
  const num2 = ref(0);
  const value = ref(0);
  const plus = function () {
    value.value = add(num1.value, num2.value);
  };
  const minus = function () {
    value.value = subtract(num1.value, num2.value);
  };
  const multiply = function () {
    value.value = _this.$jstk.multiply(num1.value, num2.value);
  };
  const divide = function () {
    value.value = _this.$jstk.divide(num1.value, num2.value);
  };
  return {
    num1,
    num2,
    value,
    plus,
    minus,
    multiply,
    divide,
  };
}
