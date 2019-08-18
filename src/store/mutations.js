import ctx from "../main";

export const mutations = {
  setRouteTitle(state, title) {
    state.routeTitle = title;
  },
  setCurrentRoute(state, currentRoute) {
    state.currentRoute = currentRoute;
  },
  updateRefresh(state, refresh) {
    state.ifRefresh = refresh;
  }
};
