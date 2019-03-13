import { getAllItems } from '~api';

const list = {
  state: {
    lists: []
  },
  mutations: {
    SET_LISTS (state, lists) {
      state.lists = lists;
    }
  },
  actions: {
    getAllItems ({commit}, cookie) {
      return new Promise((resolve, reject) => {
        getAllItems(cookie).then(res => {
          if (res.code === 0) {
            commit('SET_LISTS', res.res);
            resolve(res);
          } else {
            reject(res)
          }
        }).catch(err => {
          reject(err);
        })
      });
    }
  }
}

export default list;
