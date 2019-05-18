<template>
  <b-container>
    <b-row>
      <b-col md="8">
        <b-list-group>
          <draggable v-model="todoList">
            <b-list-group-item
              class="todo_item"
              @click="setCurrentTodo(element)"
              v-for="element in todoList"
              :key="element.id"
            >
              <div class="check_box">
                <b-form-checkbox
                  v-model="element.complete"
                  name="`chkbox-${element.id}`"
                />
              </div>
              <div class="todo_title">
                <p v-text="element.title" />
              </div>
              <div class="expire_date">
                <!--            <b-badge v-if="typeof element.expire !== 'null' && element.expire.length > 0" variant="info">-->
                <!--              {{ element.expire | moment("YYYY.MM.DD") }}-->
                <!--            </b-badge>-->
              </div>
            </b-list-group-item>
          </draggable>
          <add-todo />
        </b-list-group>
      </b-col>
      <b-col md="4">
        <current-todo :current-todo="currentTodo"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import draggable from "vuedraggable";
import AddTodo from "./AddTodo";
import CurrentTodo from "./CurrentTodo";

export default {
  name: "TodoList",
  //  components: { AddList },
  components: {
    CurrentTodo,
    AddTodo,
    draggable
  },
  computed: {
    todoList: {
      get: function() {
        return this.$store.getters.getTodoList;
      },
      set: function(value) {
        console.log(value);
        //this.$store.
      }
    },
    currentTodo: {
      get: function() {
        return this.$store.getters.getCurrentTodo;
      },
      set: function(value) {
        this.$store.commit('setCurrentTodo', value)
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
      test: []
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
