import Vue from 'vue';
import App from './App.vue';
import createRouter from './router/router';
import createStore from './store/index';
import { sync } from 'vuex-router-sync';

import './component/index';

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