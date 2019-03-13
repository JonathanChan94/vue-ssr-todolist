<script>
import TabContainer from './tabContainer.vue';

export default {
  name: 'Tabs',
  components: { TabContainer },
  props: {
    value: {
      type: Number
    }
  },
  data () {
    return {
      children: []
    }
  },
  methods: {
    change (index) {
      this.$emit('change', index);
    }
  },
  render (h) {
    return h('div', {}, [
      h('ul', {
        attrs: {
          class: 'tab-list'
        }
      }, this.$slots.default),
      h('tab-container', {
        props: {
          children: this.children
        }
      })
    ])
  }
}
</script>

<style>
.tab-list{
  overflow: hidden;
  border-bottom: 1px solid #ddd;
}
.tab-list li{
  width: 150px;
  height: 45px;
  line-height: 45px;
  float: left;
  list-style: none;
  text-align: center;
}
</style>
