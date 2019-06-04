export const mutations = {
  setRouteTitle(state, title) {
    console.log("mutation", title);
    state.routeTitle = title;
  }
};
