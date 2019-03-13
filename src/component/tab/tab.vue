<template>
  <li :class="{active: active}" @click="handleClick">
    <slot name="label">{{ label }}</slot>
  </li>
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
      return this.index === this.$parent.value
    }
  },
  created () {
    this.$parent.children.push(this);
  },
  methods: {
    handleClick () {
      this.$parent.change(this.index);
    }
  }
}
</script>

<style>
li{
  cursor: pointer;
}
li.active{
  color: #00aeff;
  border-bottom: 2px solid #00aeff;
}
</style>
