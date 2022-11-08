/**
 * @name: vant
 * @description：vant.js
 * @date: 2022/10/20 9:57
 * @author: yf_hu
 */
import Vue from "vue";
import {
  Locale,
  Button,
  Field,
  Form,
  Icon,
  Cell,
  CellGroup,
  Tabbar,
  TabbarItem,
  NavBar,
  RadioGroup,
  Radio,
  Picker,
  Popup,
} from "vant";
import { getLanguage, messages } from "@/lang";

const language = getLanguage();
Locale.use(language, messages[language]);

Vue.use(Button);
Vue.use(Field);
Vue.use(Form);
Vue.use(Icon);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Picker);
Vue.use(Popup);
