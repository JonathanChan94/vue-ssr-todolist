import { login } from '~api';

const user = {
  state: {
    token: ''
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token;
    }
  },
  actions: {
    login ({commit}, content) {
      return new Promise((resolve, reject) => {
        login(content).then(res => {
          if (res.code === 0) {
            commit('SET_TOKEN', res.token);
            resolve(res);
          } else {
            reject();
          }
        }).catch(() => {
          reject();
        })
      })
    }
  }
}

export default user;
