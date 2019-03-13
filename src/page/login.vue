<template>
  <div class="login-container">
    <img src="~public/logo.png" alt="">
    <input type="text" v-model="name" placeholder="账号">
    <input type="password" v-model="password" placeholder="密码">
    <button class="login-btn" @click="login">登录</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', {
        name: this.name,
        password: this.password
      }).then(res => {
        this.$router.push('/todo2');
      }).catch(() => {})
    }
  }
}
</script>

<style>
.login-container{
  width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.login-container input{
  appearance: none;
  outline: none;
  border: 1px solid #bbb;
  width: 100%;
  height: 35px;
  padding-left: 10px;
  line-height: 35px;
  margin-bottom: 20px;
  border-radius: 5px;
  /* font-size: 14px; */
}
.login-container input:focus{
  border: 1px solid #009be3;
}
.login-btn{
  appearance: none;
  border: none;
  outline: none;
  width: 300px;
  height: 35px;
  background: #00aeff;
  color: #fff;
  line-height: 35px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background .1s ease;
}
.login-btn:hover{
  background: #009be3;
}
</style>
