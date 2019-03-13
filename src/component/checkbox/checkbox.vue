<template>
  <div class="checkbox-container">
    <label>
      <input
        class="checkbox-input"
        type="checkbox"
        :checked="currentValue"
        :disabled="disabled"
        @change="change"
      >
      <span class="checkbox-circle"></span>
      <span class="checkbox-title">
        <slot></slot>
      </span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  watch: {
    value: function (val) {
      this.currentValue = val;
    }
  },
  methods: {
    change (e) {
      let checked = e.target.checked;
      this.currentValue = checked;
      this.$emit('input', checked);
      this.$emit('change', checked);
    }
  }
}
</script>

<style>
.checkbox-container{
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #1d1d1d;
  text-align: left;
}
.checkbox-circle{
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  border-radius: 50%;
  position: relative;
}
.checkbox-container span{
  vertical-align: middle;
}
.checkbox-input{
  display: none;
}
.checkbox-input:checked + .checkbox-circle:before{
  content: '';
  display: block;
  width: 7px;
  height: 3px;
  background: #00aeff;
  transform: rotateZ(45deg);
  transform-origin: left top;
  position: absolute;
  bottom: 6px;
  left: 4px;
}
.checkbox-input:checked + .checkbox-circle:after{
  content: '';
  width: 3px;
  height: 11px;
  background: #00aeff;
  position: absolute;
  bottom: 4px;
  left: 5px;
  transform: rotateZ(45deg);
  transform-origin: left bottom;
}
.checkbox-input:checked ~ .checkbox-title{
  text-decoration: line-through;
  color: #bbb;
}
.checkbox-title{
  margin-left: 10px;
}
</style>
