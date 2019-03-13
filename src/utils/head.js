function getHead (vm) {
  const { head } = vm.$options;
  if (head) {
    return typeof head === 'function' ? head.call(vm) : head;
  }
}

const ServerHeadMixin = {
  created () {
    const head = getHead(this);
    if (head) {
      if (head.title) this.$ssrContext.title = head.title;
      if (head.description) this.$ssrContext.description = head.description;
      if (head.keywords) this.$ssrContext.keywords = head.keywords;
    }
  }
}

const ClientHeadMixin = {
  created () {
    const head = getHead(this);
    if (head) {
      if (head.title) document.title = head.title;
      if (head.description) document.querySelector('meta[name="description"]').setAttribute('content', head.description);
      if (head.keywords) document.querySelector('meta[name="keywords"]').setAttribute('content', head.keywords);
    }
  }
}

export default process.env.VUE_ENV === 'server' ? ServerHeadMixin : ClientHeadMixin;