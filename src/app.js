import Vue from 'vue';
import App from './App.vue';
import createRouter from './router/router';
import createStore from './store/index';
import { sync } from 'vuex-router-sync';
// import headMixin from './utils/head';

import './component/index';

// Vue.mixin(headMixin);

export default function createApp (token) {

  const router = createRouter(token);
  const store = createStore();

  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });

  return { app, router, store }
}