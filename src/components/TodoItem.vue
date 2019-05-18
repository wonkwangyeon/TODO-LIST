<template>
  <div class="todo-item">
    <div class="check_box">
      <b-form-checkbox
        :checked="!!item.complete"
        @change="handleComplete"
        name="`chkbox-${element.id}`"
      />
    </div>
    <div class="item_title" :class="{ completed_todo_item: item.complete }">
      <p class="mb-0" v-text="item.title" />
    </div>
    <div class="expire_date">
      {{ item.expire }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  methods: {
    handleComplete: async function(isChecked) {
      //체크박스가 선택됐을때 서버에 체크된 할일 정보를 전송하고,
      //리스트에 적용시키기 (vuex)
      try {
        const copiedItem = JSON.parse(JSON.stringify(this.item));
        copiedItem.complete = isChecked ? 1 : 0;
        await this.$store.dispatch("modifyTodo", copiedItem);
        this.$bvToast.toast("완료처리 되었습니다.", {
          title: `요청 성공`,
          variant: "info"
        });
      } catch (e) {
        this.$bvToast.toast("완료하지 못했습니다.", {
          title: `요청 실패`,
          variant: "danger"
        });
      }
    }
  }
};
</script>

<style scoped>
.todo-item {
  position: relative;
  align-items: center;
  display: flex;
}
.check_box {
  display: inline-block;
}
.item_title {
  display: inline-block;
  max-width: 80%;
}
.item_title > p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.expire_date {
  margin-left: auto;
}
</style>
