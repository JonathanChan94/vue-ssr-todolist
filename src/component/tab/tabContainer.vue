<script>
export default {
  name: 'TabContainer',
  props: {
    children: {
      type: Array
    }
  },
  render (h) {
    let childNode = this.children.map(child => {
      return child.active ? child.$slots.default : null;
      // return child.$slots.default;
    });
    return h('div', {}, childNode)
  }
}
</script>

<style>

</style>
