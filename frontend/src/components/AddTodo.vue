<template>
  <b-list-group-item @click="activateForm" class="add-todo">
    <font-awesome-icon icon="plus" />

    <template v-if="!isEditable">
      <span class="new todo_title">추가하려면 클릭하세요</span>
    </template>

    <template v-else>
      <div class="item_add_form">
        <b-form-input
          ref="inputform"
          size="sm"
          v-model="title"
          placeholder="무슨 할일이 더 있나요?"
          @keydown.native="add_new_todo"
          @blur="add_new_todo"
        />
      </div>
    </template>
  </b-list-group-item>
</template>

<script>
export default {
  name: "AddTodo",
  props: {
    todo: {
      type: Object,
      required: false,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      isEditable: false,
      title: ""
    };
  },
  methods: {
    async request_new_todo() {
      const title = this.title;
      this.title = "";
      try {
        await this.$store.dispatch("setTodo", {
          title: title
        });
        this.$bvToast.toast("새로운 항목이 추가되었습니다", {
          title: `요청 성공`,
          variant: "success",
          solid: true
        });
        await this.$store.dispatch("getAllTodoList");
      } catch (e) {

        this.$bvToast.toast(e.message.data.message, {
          title: "요청 실패",
          variant: "danger",
          solid: true
        });
      }
    },
    async add_new_todo(event) {
      if (event.which === 13) {
        // 엔터키 입력시 저장 또는 작성취소
        if (this.title.length === 0) {
          return (this.isEditable = false);
        }
        await this.request_new_todo();
      } else if (event.type === "blur") {
        // focus 아웃시 저장 또는 작성취소
        if (this.title.length === 0) {
          return (this.isEditable = false);
        }
        await this.request_new_todo();
      } else return;
    },
    activateForm() {
      this.isEditable = true;
      this.$nextTick(function() {
        this.$refs.inputform.$el.focus();
      });
    }
  }
};
</script>

<style scoped>
.add-todo {
  cursor: pointer;
  position: relative;
  align-items: center;
  display: flex;
}
.new,
.todo_title {
  color: #bcbcbc;
  padding-left: 20px;
}
.item_add_form {
  width: 90%;
  display: inline-block;
}
</style>
