import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import { mutations } from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: "XX理财",
    routeTitle: "账户", //todo
    currentRoute: "Account",
    ifRefresh: true,
    language: "zh"
  },
  actions,
  mutations
});
