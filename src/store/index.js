import Vue from 'vue';
import Vuex from 'vuex';

import list from './module/list';
import user from './module/user';

Vue.use(Vuex);


export default function createStore () {
  return new Vuex.Store({
    modules: {
      list,
      user
    },
    getters: {
      token: state => state.user.token,
      lists: state => state.list.lists
    }
  })
}