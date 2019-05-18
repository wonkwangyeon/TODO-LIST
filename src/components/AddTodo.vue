<template>
  <b-list-group-item @click="activateForm" class="add-todo">
    <font-awesome-icon icon="plus" />
    <template v-if="!isEditable">
      <span class="new todo_title">추가하려면 클릭하세요</span>
    </template>
    <template v-else>
      <div style="margin-left: 12px;display: inline-block; width: 440px;">
        <b-form-input
          ref="inputform"
          size="sm"
          v-model="title"
          placeholder="New title"
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
    request_new_todo: async function() {
      const title = this.title;
      this.title = "";
      try {
        await this.$store.dispatch("setTodo", {
          title: title,
          priority: this.$store.getters.getTodoList.length
        });
        this.$bvToast.toast("새로운 항목이 추가되었습니다", {
          title: `요청 성공`,
          variant: "success",
          solid: true
        });
        await this.$store.dispatch("getAllTodoList");
      } catch (e) {
        this.$bvToast.toast("요청에 실패했습니다.", {
          title: "요청 실패",
          variant: "danger",
          solid: true
        });
      }
    },
    add_new_todo: async function(event) {
      if (event.which === 13) {
        if (this.title.length === 0) {
          return (this.isEditable = false);
        }
        await this.request_new_todo();
      } else if (event.type === "blur") {
        if (this.title.length === 0) {
          return (this.isEditable = false);
        }
        await this.request_new_todo();
      } else return;
    },
    activateForm: function() {
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
}
.new,
.todo_title {
  color: #bcbcbc;
  padding-left: 20px;
}
</style>
