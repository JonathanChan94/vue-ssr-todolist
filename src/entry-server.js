import createApp from './app';

export default context => {
  return new Promise((resolve, reject) => {

    const { url, cookies } = context;

    const { app, router, store } = createApp(cookies && cookies.token);

    router.push(url)

    router.onReady(() => {

      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        reject({code: 404});
      }

      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute,
            cookie: cookies
          })
        }
      })).then(() => {
        context.state = store.state;

        resolve(app);
      }).catch(() => {
        reject({client: true});
      });
    }, reject)
  })
}