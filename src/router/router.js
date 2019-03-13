import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Login = () => import('../page/login.vue');
const TodoList = () => import('../page/todoList.vue');
const TodoList2 = () => import('../page/todoList2.vue');

export default function createRouter (token) {
  const router =  new Router({
    mode: 'history',
    routes: [
      {
        path: '/login',
        component: Login
      },
      {
        path: '/todo',
        component: TodoList
      },
      {
        path: '/todo2',
        component: TodoList2,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/',
        redirect: '/login'
      }
    ]
  })

  router.beforeEach((to, from, next) => {
    let getToken = token || router.app.$options.store.getters.token;
    if (to.matched.some(r => r.meta.requireAuth) && !getToken) {
      next('/');
    } else {
      next();
    }
  })

  return router;
}