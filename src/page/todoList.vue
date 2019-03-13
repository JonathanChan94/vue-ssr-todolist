<template>
  <div class="todo-container">
    <input class="todo-input" type="text" v-model="val" placeholder="请输入待办事项">
    <tabs :value="index" @change="handleChange">
      <tab label="待办事项" :index="1">
        <div class="todo-content">
          <div class="todo-item" v-for="(item, index) in lists" :key="index">
            <checkbox v-model="item.complete">{{ item.content }}</checkbox>
            <span class="todo-delete" @click="deleteList(index)">×</span>
          </div>
        </div>
      </tab>
      <tab label="已完成事项" :index="2">
        <div class="todo-content">
          <div v-for="(item, index) in lists" :key="index">
            <template v-if="item.complete">
              <checkbox v-model="item.complete" :disabled="item.complete">{{ item.content }}</checkbox>
            </template>
          </div>
        </div>
      </tab>
    </tabs>
  </div>
</template>

<script>
import Tabs from '../component/tab/tabs.vue';
import Tab from '../component/tab/tab.vue';
import Checkbox from '../component/checkbox/checkbox.vue';

export default {
  name: 'TodoList',
  components: { Tabs, Tab, Checkbox },
  data () {
    return {
      index: 1,
      val: '',
      lists: [
        { content: 'this is todolist 1', complete: false },
        { content: 'this is todolist 2', complete: false },
        { content: 'this is todolist 3', complete: false }
      ]
    }
  },
  methods: {
    handleChange (index) {
      this.index = index;
    },
    deleteList (index) {
      let lists = this.lists;
      lists.splice(index, 1);
      this.$set(this.lists, lists);
    }
  }
}
</script>

<style>
.todo-container{
  margin: 50px auto;
  width: 500px;
  height: 500px;
  text-align: center;
}
.todo-input{
  margin-bottom: 40px;
  appearance: none;
  outline: none;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 350px;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  font-size: 16px;
  transition: border .2s;
}
.todo-input:focus{
  border: 1px solid #00aeff;
}
.todo-content{
  margin-top: 20px;
}
.todo-item{
  position: relative;
}
.todo-delete{
  height: 40px;
  line-height: 40px;
  color: red;
  font-size: 20px;
  position: absolute;
  right: 20px;
  top: 0;
  cursor: pointer;
}
</style>
