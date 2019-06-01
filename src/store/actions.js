export default {
  setownerId({ commit }, ownerId) {
    console.log('action', ownerId);
    commit('setownerId', ownerId);
  }
};
