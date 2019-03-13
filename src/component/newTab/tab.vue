<template>
  <div v-show="active">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  props: {
    label: {
      type: String
    },
    index: {
      type: Number
    }
  },
  computed: {
    active () {
      return this.index === this.$parent.currentValue
    }
  }
}
</script>

<style>
</style>
