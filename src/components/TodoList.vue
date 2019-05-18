<template>
  <b-container>
    <b-row>
      <b-col md="8">
        <div>
          <b-form-checkbox v-model="view_completed_items">
            완료된 할일 보기
          </b-form-checkbox>
        </div>
        <b-list-group>
          <draggable v-model="todoList">
            <b-list-group-item
              class="todo_item"
              @click="setCurrentTodo(element)"
              v-for="element in todoList"
              :key="element.id"
            >
              <todo-item :item="element" />
            </b-list-group-item>
          </draggable>
          <template v-if="view_completed_items">
            <b-list-group-item
                    @click="setCurrentTodo(element)"
                    class="todo_item"
                    v-for="element in completedTodoList"
                    :key="`complete-${element.id}`"
            >
              <todo-item :item="element" />
            </b-list-group-item>
          </template>
          <add-todo />
        </b-list-group>
      </b-col>
      <b-col md="4">
        <current-todo
          v-if="Object.keys($store.getters.getCurrentTodo).length !== 0"
          :current-todo="currentTodo"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import draggable from "vuedraggable";
import AddTodo from "./AddTodo";
import CurrentTodo from "./CurrentTodo";
import TodoItem from "./TodoItem";

export default {
  name: "TodoList",
  //  components: { AddList },
  components: {
    TodoItem,
    CurrentTodo,
    AddTodo,
    draggable
  },
  computed: {
    todoList: {
      get: function() {
        return this.$store.getters.getTodoList.filter(function(todo) {
          return !todo.complete;
        });
      },
      set: function(value) {
        console.log(value);
        //this.$store.
      }
    },
    completedTodoList: {
      get: function() {
        return this.$store.getters.getTodoList.filter(function(todo) {
          return !!todo.complete;
        });
      }
    },
    currentTodo: {
      get: function() {
        return this.$store.getters.getCurrentTodo;
      },
      set: function(value) {
        this.$store.commit("setCurrentTodo", value);
      }
    }
  },
  methods: {
    setCurrentTodo(todo_element) {
      this.$store.commit("setCurrentTodo", todo_element);
    },
    todoModifyComplete(index) {
      try {
        this.$store.dispatch("modifyTodo", this.todoList[index]);
      } catch (e) {
        // 요청 실패
        console.error(e.response.message);
        //TODO: Modal
      }
    },
    todoPriorityModify() {
      try {
        this.$store.dispatch("modifyTodo", this.todoList);
      } catch (e) {
        // 요청 실패
        console.error(e.response.message);
        //TODO: Modal
      }
    }
  },
  data() {
    return {
      fields: [
        { key: "title", label: "Todo 제목" },
        { key: "expire", label: "마감기한" },
        "상세보기"
      ],
      visible: false,
      btnVisible: true,
      view_completed_items: false
    };
  }
};
</script>

<style>
.check_box {
  display: inline-block;
}
.todo_item {
  cursor: pointer;
}
.todo_title {
  display: inline-block;
}

.expire_date {
  display: inline-block;
  float: right;
}

.completed_todo_item {
  text-decoration: line-through;
  color: #e2e2e2;
}

.list-body {
  max-width: 400px;
  margin: auto;
}

.btn-visible-size {
  width: 50px;
}

.list-btn {
  margin: 0 10px;
}
</style>
