<template>
  <transition name="fade" @after-enter="enter" @leave="startLeave" @after-leave="leave">
    <div v-show="visible" class="notification" :style="style" @mouseenter="clearTimer" @mouseleave="createTimer">
      <span class="icon" :class="iconName"></span>
      <span class="text">{{ content }}</span>
      <a v-if="closeBtn" class="btn" @click="close">关闭</a>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    status: {
      validator: function (value) {
        return ['info', 'success', 'warning', 'error', 'loading'].indexOf(value) !== -1
      }
    },
    content: {
      type: String,
      required: true
    },
    closeBtn: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      verticalTop: 20,
      duration: 3000,
      timer: null,
      visible: false,
      height: 0
    }
  },
  computed: {
    iconName () {
      return `icon-${this.status}`
    },
    style () {
      return {
        top: `${this.verticalTop}px`
      }
    }
  },
  mounted () {
    this.visible = true;
    this.createTimer();
  },
  beforeDestroy () {
    this.clearTimer();
  },
  methods: {
    createTimer () {
      if (this.duration) {
        this.timer = setTimeout(() => {
          this.visible = false;
        }, this.duration);
      }
    },
    clearTimer () {
      clearInterval(this.timer);
    },
    close () {
      this.visible = false;
    },
    enter () {
      this.height = this.$el.offsetHeight;
    },
    startLeave () {
      this.$emit('startLeave');
    },
    leave () {
      this.$emit('closed');
    }
  }
}
</script>

<style>
.notification{
  display: flex;
  height: 40px;
  line-height: 40px;
  padding: 0 20px 0 15px;
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
  border-radius: 5px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  z-index: 999;
  transition: all .5s;
}
.notification .text{
  color: #515a6e;
}
.notification .icon{
  margin-right: 10px;
  margin-top: 12px;
  display: inline-block;
  width: 16px;
  height: 16px;
  background-size: cover;
}
.icon-info{
  background-image: url(../../../assets/info.png);
}
.icon-success{
  background-image: url(../../../assets/success.png)
}
.icon-error{
  background-image: url(../../../assets/error.png);
}
.icon-warning{
  background-image: url(../../../assets/warning.png);
}
.notification .btn{
  margin-left: 20px;
  color: #1d1d1d;
  cursor: pointer;
  font-size: 12px;
}
.fade-enter, .fade-leave-active{
  opacity: 0;
  transform: translate(-50%, -20px)
}
</style>
