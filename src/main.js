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
  ToastPlugin
} from "vux";
import FastClick from "fastclick";
import VueClipboard from "vue-clipboard2";

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

/* eslint-disable no-new */
export default new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app-box");
