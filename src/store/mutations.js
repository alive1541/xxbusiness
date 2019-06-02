export const mutations = {
  setList(state, list) {
    console.log("mutations", list);
    state.list = list;
    state.badge = String(list.length);
  }
};
