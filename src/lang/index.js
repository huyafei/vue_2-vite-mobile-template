/**
 * @name: index
 * @description：index.js
 * @date: 2022/1/20 14:19
 * @author: yf_hu
 */
import Vue from "vue";
import VueI18n from "vue-i18n";
import cookies from "@plugins/modules/cookies";

import enUS from "vant/es/locale/lang/en-US";
import zhCN from "vant/es/locale/lang/zh-CN";

import enLocale from "./en-US";
import zhLocale from "./zh-CN";

Vue.use(VueI18n);

export const messages = {
  "en-US": {
    ...enUS,
    ...enLocale,
  },
  "zh-CN": {
    ...zhCN,
    ...zhLocale,
  },
};
// 获取语言
export const getLanguage = () => {
  const chooseLanguage = cookies.get("language");
  if (chooseLanguage) return chooseLanguage;
  const language = navigator.language || navigator.browserLanguage;
  const locales = Object.keys(messages);
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale;
    }
  }
  return "zh-CN";
};
export const i18n = new VueI18n({
  locale: getLanguage(),
  messages,
});
export default { getLanguage, i18n };
