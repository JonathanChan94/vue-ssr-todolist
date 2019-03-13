<template>
  <div>
    <ul class="tab-list">
      <li v-for="item in nav" :class="{active: currentValue === item.index}" :key="item.index" @click="handleClick(item.index)">{{ item.label }}</li>
    </ul>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { findComponentsDownward } from '../../utils/assist';

export default {
  name: 'Tabs',
  props: {
    value: {
      type: Number
    }
  },
  data () {
    return {
      currentValue: this.value,
      nav: []
    }
  },
  mounted () {
    this.initNav();
  },
  watch: {
    value: function (val) {
      this.currentValue = val;
    }
  },
  methods: {
    getTabs () {
      return findComponentsDownward(this, 'Tab');
    },
    initNav () {
      this.getTabs().map(tab => {
        this.nav.push({
          label: tab.label,
          index: tab.index
        })
      })
    },
    handleClick (index) {
      this.currentValue = index;
      this.$emit('input', index);
    }
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
  cursor: pointer;
}
.tab-list li.active{
  color: #00aeff;
  border-bottom: 2px solid #00aeff;
}
</style>
