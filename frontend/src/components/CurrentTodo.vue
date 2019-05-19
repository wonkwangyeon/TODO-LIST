<template>
  <b-container>
    <!--    To do 에 대해 상세 내용을 볼 수 있는 컴포넌트-->
    <b-row class="current_todo_row">
      <b-col>
        <b-form-input
          v-model="todo_element.title"
          type="text"
          required
          placeholder="작업의 이름"
        />
      </b-col>
    </b-row>

    <b-row class="current_todo_row">
      <b-col sm="4" class="pr-md-0">
        <p class="text-center mb-0 h-100 label">작성일</p>
      </b-col>
      <b-col sm="8" class="pl-md-0">
        <span>{{ todo_element.created_time | moment("YYYY.MM.DD") }}</span>
      </b-col>
    </b-row>

    <b-row class="current_todo_row">
      <b-col sm="4" class="pr-md-0">
        <p class="text-center mb-0 h-100 label">마감일</p>
      </b-col>
      <b-col sm="8" class="pl-md-0">
        <b-form-input type="date" v-model="todo_element.expire" />
      </b-col>
    </b-row>
    <b-row class="current_todo_row">
      <b-col>
        <b-form-textarea
          v-model="todo_element.content"
          placeholder="상세 내용을 입력하세요"
        />
      </b-col>
    </b-row>

    <b-row>
      <b-col offset-sm="6">
        <div class="control_todo">
          <b-button @click="delete_todo()" variant="danger">삭제</b-button>
          <b-button @click="modify_todo()" variant="success">저장</b-button>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "CurrentTodo",
  props: {
    currentTodo: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      todo_element: JSON.parse(JSON.stringify(this.currentTodo)), // 객체 깊은 복사를 위해 2중으로 JSON처리 함.
      test: null
    };
  },
  watch: {
    currentTodo(val) {
      this.todo_element = JSON.parse(JSON.stringify(val));
    }
  },
  methods: {
    async modify_todo() {
      try {
        await this.$store.dispatch("modifyTodo", this.todo_element);
        this.$bvToast.toast("할일이 변경되었습니다", {
          title: "요청 성공",
          variant: "success"
        });
      } catch (e) {
        this.$bvToast.toast(e.message.data.message, {
          title: "요청 실패",
          variant: "danger"
        });
      }
    },
    async delete_todo() {
      try {
        await this.$store.dispatch("deleteTodo", this.currentTodo.id);
        this.$bvToast.toast("할일을 삭제했습니다.", {
          title: `요청 성공`,
          variant: "success",
          solid: true
        });
      } catch (e) {
        this.$bvToast.toast(e.message.data.message, {
          title: `요청 실패`,
          variant: "danger",
          solid: true
        });
      }
    }
  }
};
</script>

<style scoped>
.label {
  font-weight: bold;
  margin-top: 7px;
}
.current_todo_row {
  margin-top: 10px;
  margin-bottom: 10px;
}
.control_todo > button {
  margin-left: 10px;
}
</style>
