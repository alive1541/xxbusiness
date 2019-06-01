export const mutations = {
  setownerId(state, ownerId) {
    console.log('mutations', ownerId);
    state.ownerId = ownerId;
  }
};
