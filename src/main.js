// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import {
  XHeader,
  ConfirmPlugin,
  Flexbox,
  FlexboxItem,
  Group,
  Tabbar,
  TabbarItem,
  AlertPlugin,
  ToastPlugin,
  LocalePlugin
} from "vux";
import FastClick from "fastclick";
import VueClipboard from "vue-clipboard2";

//i18n
import vuexI18n from "vuex-i18n";
import Vuex from "vuex";
import objectAssign from "object-assign";
import vuxLocales from "./locales/all.yml";
import componentsLocales from "./locales/component.yml";

import router from "./router/index";
import store from "./store";
import App from "./App";

VueClipboard.config.autoSetContainer = true;

FastClick.attach(document.body);

Vue.config.productionTip = false;

Vue.component("x-header", XHeader);
Vue.component("flexbox", Flexbox);
Vue.component("flexbox-item", FlexboxItem);
Vue.component("group", Group);
Vue.component("tabbar", Tabbar);
Vue.component("tabbar-item", TabbarItem);
Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);
Vue.use(ToastPlugin);
Vue.use(VueClipboard);

//i18n
Vue.use(Vuex);
let lanStore = new Vuex.Store({
  modules: {
    i18n: vuexI18n.store
  }
});
Vue.use(vuexI18n.plugin, lanStore);
Vue.use(LocalePlugin);
const finalLocales = {
  en: objectAssign(vuxLocales["en"], componentsLocales["en"]),
  zh: objectAssign(vuxLocales["zh-CN"], componentsLocales["zh-CN"]),
  id: objectAssign(vuxLocales["id"], componentsLocales["id"])
};

for (let i in finalLocales) {
  Vue.i18n.add(i, finalLocales[i]);
}
const nowLocale = Vue.locale.get();
if (/zh/.test(nowLocale)) {
  Vue.i18n.set("zh");
} else if (/en/.test(nowLocale)) {
  Vue.i18n.set("en");
} else if (/id/.test(nowLocale)) {
  Vue.i18n.set("id");
}

/* eslint-disable no-new */
export default new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app-box");
