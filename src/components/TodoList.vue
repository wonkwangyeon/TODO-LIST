<template>
  <b-container>
    <b-row>
      <!-- 2 : 1 비율로 좌측에는 할일, 오른쪽에는 클릭한 할일에 대한 상세 내용을 확인할 수 있다.-->
      <b-col md="8">
        <div class="view_completed_items">
          <b-form-checkbox v-model="view_completed_items">
            완료된 할일 보기
          </b-form-checkbox>
        </div>
        <b-list-group>
          <!-- 완료되지 않은 할일들 상위 노출-->
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
          <!--/완료되지 않은 할일들 상위 노출-->

          <!-- 완료된 일들은 체크박스 선택 시 노출-->
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
          <!--/완료된 일들은 체크박스 선택 시 노출-->

          <!--할일 추가 폼-->
          <add-todo />
          <!--/할일 추가 폼-->
        </b-list-group>
      </b-col>
      <b-col md="4">

        <!--특정 To do를 클릭하였을 때, 상세한 내역이 보이는 영역-->
        <current-todo
          v-if="Object.keys($store.getters.getCurrentTodo).length !== 0"
          :current-todo="currentTodo"
        />
        <!--/특정 To do를 클릭하였을 때, 상세한 내역이 보이는 영역-->

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
      // 순서 조정시 서버에 요청을 한 뒤 Vuex에 반영함
      set: async function(value) {
        try {
          // 할일 순서를 base로 하여 현재 보이는 순서(array index)대로 우선순위를 재설정함
          value = value.map(function(element, index) {
            element.priority = index + 1;
            return element;
          });

          await this.$store.dispatch(
            "modifyPriority",
            value.concat(this.completedTodoList) // 서버에 우선순위가 재설정된 To do 목록을 전송할 때에는 완료된 값까지 모두 포함하여 전송
          );
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
          return !!todo.complete; // 서버측으로 부터 true, false가 아닌 1, 0을 수신할 수 있으므로 boolean으로 parse 처리함
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
      view_completed_items: false // 완료된 할일을 보여줄지 말지 결정하는 flag 변수
    };
  }
};
</script>

<style>
.todo_item {
  cursor: pointer;
}
</style>
