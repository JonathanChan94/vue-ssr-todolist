import Notification from './notification.vue';
import message from './func-notification';

export default (Vue) => {
  Vue.component(Notification.name. Notification);
  Vue.prototype.$message = message;
}