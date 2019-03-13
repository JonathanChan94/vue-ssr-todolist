import Vue from 'vue';
import Component from './notification.vue';

const NotificationConstructor = Vue.extend(Component);

let seed = 1;
let compArr = [];

class Message {
  constructor () {
    
  }
  info (options) {
    this.create({ status: 'info', ...options });
  }
  success (options) {
    this.create({ status: 'success', ...options });
  }
  error (options) {
    this.create({ status: 'error', ...options });
  }
  warning (options) {
    this.create({ status: 'warning', ...options });
  }
  create (options) {
    const { status, duration, ...rest } = options;
    const instance = new NotificationConstructor({
      propsData: {
        status,
        ...rest
      },
      data: {
        duration: duration ? duration : 3000
      }
    });

    let id = `notification_${seed++}`;

    const comp = instance.$mount();

    comp.id = id;

    document.body.appendChild(comp.$el);

    let offset = 0;

    compArr.forEach(comp => {
      offset += comp.$el.offsetHeight + 16;
    })

    offset += 16;

    comp.verticalTop = offset;

    comp.$on('startLeave', () => {
      removeComp(comp);
    })

    comp.$on('closed', () => {
      document.body.removeChild(comp.$el);
      comp.$destroy();
    })

    compArr.push(comp);
  }
}

const removeComp = (comp) => {
  if (!comp) return;
  let index = compArr.findIndex(item => {
    return item.id === comp.id;
  })
  compArr.splice(index, 1);
  let height = comp.height;
  for (let i = index; i < compArr.length; i++) {
    compArr[i].verticalTop = parseInt(compArr[i].verticalTop - height -16);
  }
}

const message = new Message();

export default message;