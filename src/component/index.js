import Vue from 'vue';

const components = require.context('./global', true, /index\.js/);

components.keys().forEach(component => {
  const componentConfig = components(component);
  const comp = componentConfig.default || componentConfig;
  Vue.use(comp);
});