export default {
  setRouteTitle({ commit }, title) {
    console.log("action", title);
    commit("setRouteTitle", title);
  }
};
