export default {
  setList({ commit }, list) {
    console.log("action", list);
    commit("setList", list);
  }
};
