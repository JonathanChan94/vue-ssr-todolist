import Vue from 'vue';
import createApp from './app.js';
import Cookies from 'js-cookie';
import bus from './utils/bus';

Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const {
      asyncData
    } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

const {
  app,
  router,
  store
} = createApp(Cookies.get('token'));

bus.$on('toLogin', () => {
  router.push('/login');
})

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {

  router.beforeResolve((to, from, next) => {

    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    // 只关心之前没有渲染的组件,对比它们，找出两个匹配列表的差异组件
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })

    if (!activated.length) {
      return next()
    }
    // 这里如果有加载指示器 (loading indicator)，就触发
    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({
          store,
          route: to
        });
      }
    })).then(() => {
      // 停止加载指示器(loading indicator)
      next();
    }).catch(() => {
      next();
    })
  })

  // 如果没有initial_state，则回退到客户端渲染
  if (!window.__INITIAL_STATE__) {
    console.log('开启客户端渲染');
    const matchedComps = router.getMatchedComponents();
    Promise.all(matchedComps.map(c => {
      return c.asyncData && c.asyncData({
        store,
        route: router.currentRoute
      })
    })).then(() => {
      app.$mount('#de-app');
    })
  } else {
    app.$mount('#app');
  }
})

function clientGetData(route) {
  const matched = router.getMatchedComponents(route);
  Promise.all(matched.map(c => {
    return c.asyncData && c.asyncData({
      store,
      route
    });
  })).then(() => {
    console.log('ok');
  }).catch(() => {});
}