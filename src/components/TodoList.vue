<template>
  <b-container>
    <b-row>
      <b-col md="8">
        <div class="view_completed_items">
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
              class="todo_item"
              @click="setCurrentTodo(element)"
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
        return this.$store.getters.getTodoList
          .filter(function(todo) {
            return !todo.complete;
          })
          .sort(function(a, b) {
            if (a.priority > b.priority) return 1;
            if (a.priority < b.priority) return -1;
            else return 0;
          });
      },
      set: async function(value) {
        try {
          value = value.map(function(element, index) {
            element.priority = index + 1;
            return element;
          });
          await this.$store.dispatch(
            "modifyPriority",
            value.concat(this.completedTodoList)
          );
          //서버로 부터 값을 갱신받음
          // await this.$store.dispatch('getAllTodoList')
        } catch (e) {
          this.$bvToast.toast(
            "요청중 오류가 발생하여 우선순위를 변경할 수 없습니다.",
            {
              title: `요청 실패`,
              variant: "danger"
            }
          );
        }
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
.todo_item {
  cursor: pointer;
}
</style>
