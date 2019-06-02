import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import { mutations } from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: "XX理财"
    //未读消息的数量
    // badge: "14"
  },
  actions,
  mutations
});
