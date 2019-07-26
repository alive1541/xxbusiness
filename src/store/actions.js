export default {
  setRouteTitle({ commit }, title) {
    commit("setRouteTitle", title);
  },
  setCurrentRoute({ commit }, currentRoute) {
    commit("setCurrentRoute", currentRoute);
  },
  updateRefresh({ commit }, refresh) {
    commit("updateRefresh", refresh);
  }
};
