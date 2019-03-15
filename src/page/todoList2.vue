<template>
  <div class="todo-container">
    <input
      class="todo-input"
      type="text"
      v-model="val"
      placeholder="请输入待办事项"
      @keyup.enter="addTodo"
    >
    <tabs v-model="index">
      <tab label="所有事项" :index="1">
        <div class="todo-content">
          <transition-group name="list" tag="div">
            <div class="todo-item" v-for="(item, index) in lists" :key="item._id">
              <checkbox v-model="item.complete" @change="change(index)">{{ item.content }}</checkbox>
              <span class="todo-delete" @click="deleteList(index)">×</span>
            </div>
          </transition-group>
        </div>
      </tab>
      <tab label="待完成事项" :index="2">
        <div class="todo-content">
          <transition-group name="list" tag="div">
            <template v-for="(item, index) in lists">
              <div class="todo-item" v-if="!item.complete" :key="item._id">
                <checkbox v-model="item.complete" @change="change(index)">{{ item.content }}</checkbox>
              </div>
            </template>
          </transition-group>
        </div>
      </tab>
      <tab label="已完成事项" :index="3">
        <div class="todo-content">
          <transition-group name="list" tag="div">
            <template v-for="item in lists">
              <div class="todo-item" v-if="item.complete" :key="item._id">
                <checkbox v-model="item.complete" :disabled="item.complete">{{ item.content }}</checkbox>
              </div>
            </template>
          </transition-group>
        </div>
      </tab>
    </tabs>
  </div>
</template>

<script>
import Tabs from "../component/newTab/tabs.vue";
import Tab from "../component/newTab/tab.vue";
import Checkbox from "../component/checkbox/checkbox.vue";
import { addItem, updateItem, deleteItem } from "../api/api";
import headMixin from '../utils/head';

export default {
  name: "TodoList",
  mixins: [headMixin],
  components: { Tabs, Tab, Checkbox },
  head() {
    return {
      title: 'todo list',
      description: 'this is a todo list',
      keywords: 'todo'
    }
  },
  asyncData({ store, cookie, route }) {
    return store.dispatch("getAllItems", cookie);
  },
  data() {
    return {
      index: 1,
      val: ""
    };
  },
  computed: {
    lists() {
      return this.$store.getters.lists;
    }
  },
  methods: {
    handleChange(index) {
      this.index = index;
    },
    deleteList(index) {
      deleteItem({
        _id: this.lists[index]._id
      })
        .then(res => {
          if (res.code === 0) {
            this.$message.success({
              content: "删除成功",
              duration: 1500
            });
            this.lists.splice(index, 1);
          }
        })
        .catch(err => {});
    },
    addTodo() {
      addItem({
        content: this.val,
        complete: false
      })
        .then(res => {
          if (res.code === 0) {
            this.val = "";
            this.$message.success({
              content: "添加成功",
              duration: 1500
            });
            this.lists.unshift(res.res);
          }
        })
        .catch(() => {});
    },
    change(index) {
      let data = {
        _id: this.lists[index]._id,
        complete: this.lists[index].complete
      };
      updateItem(data)
        .then(res => {
          if (res.code === 0) {
            this.$message.success({
              content: "更新成功",
              duration: 1500
            });
          }
        })
        .catch(() => {
          this.lists[index].complete = !this.lists[index].complete;
        });
    }
  }
};
</script>

<style>
.todo-container {
  margin: 50px auto;
  width: 500px;
  height: 500px;
  text-align: center;
}
.todo-input {
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
  transition: border 0.2s;
}
.todo-input:focus {
  border: 1px solid #00aeff;
}
.todo-content {
  margin-top: 20px;
}
.todo-item {
  width: 100%;
  position: relative;
  transition: all 0.5s;
}
.todo-delete {
  height: 40px;
  line-height: 40px;
  color: red;
  font-size: 20px;
  position: absolute;
  right: 20px;
  top: 0;
  cursor: pointer;
}

.list-enter, .list-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-10px);
}
.list-leave-active {
  position: absolute;
}
</style>
