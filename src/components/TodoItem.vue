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
    <template v-if="item.expire !== null && item.expire.length > 0">
      <div class="expire_date">
        <b-badge :variant="getVariant()">
          {{ getDateDiffAsString() }}
        </b-badge>
      </div>
    </template>
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
    },
    calculateExpireDateDiff() {
      const now = this.$moment();
      const parsedDate = this.$moment(this.item.expire);
      // return now.diff(parsedDate,'days');
      return parsedDate.diff(now, "days") + 1;
    },
    getDateDiffAsString() {
      const diff = this.calculateExpireDateDiff();
      if (diff < 0) {
        return "기간지남";
      } else if (diff < 7) {
        return `${diff}일 남음`;
      } else {
        return `~ ${this.item.expire}`;
      }
    },
    getVariant() {
      const dateDiff = this.calculateExpireDateDiff();
      if (dateDiff > 6) {
        // 시간 여유 있음
        return "light";
      }
      if (dateDiff > 3) {
        // 시각화 시킬것
        return "primary";
      }
      if (dateDiff === 0) {
        return "info";
      }
      if (dateDiff < 0) {
        return "danger";
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
  max-width: 70%;
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
