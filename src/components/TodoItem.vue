<template>
  <div class="todo-item">
    <div class="check_box">
      <!--완료여부 체크하는 체크박스-->
      <b-form-checkbox
        :checked="!!item.complete"
        @change="handleComplete"
        name="`chkbox-${element.id}`"
      />
      <!--/완료여부 체크하는 체크박스-->
    </div>

    <!--    할 일 제목-->
    <div class="item_title" :class="{ completed_todo_item: item.complete }">
      <p class="mb-0" v-text="item.title" />
    </div>
    <!--/할 일 제목-->

    <!--만료일이 설정된 경우 만료일에 대한 정보 안내-->
    <template v-if="!isNull(item.expire)">
      <div class="expire_date">
        <b-badge :variant="getVariant()">
          {{ getDateDiffAsString() }}
        </b-badge>
      </div>
    </template>
    <!--/만료일이 설정된 경우 만료일에 대한 정보 안내-->
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
        if (isChecked)
          new Audio(
            "http://www.orangefreesounds.com/wp-content/uploads/2014/08/Mario-coin-sound.mp3"
          ).play();
        else
          new Audio(
            "https://www.redringtones.com/wp-content/uploads/2017/03/mario-mushroom-sound.mp3"
          ).play();
        this.$bvToast.toast("완료처리 되었습니다.", {
          title: `요청 성공`,
          variant: "info"
        });
      } catch (e) {
        this.$bvToast.toast(e.message.data.message, {
          title: `요청 실패`,
          variant: "danger"
        });
      }
    },
    //만료일과 오늘과의 차이를 계산하는 함수
    calculateExpireDateDiff() {
      const now = this.$moment().format("YYYY-MM-DD");
      const parsedDate = this.$moment(this.item.expire);
      return parsedDate.diff(now, "days");
    },
    //위 함수와 기능은 동일하나, UI상에 보여질 문자를 리턴함
    getDateDiffAsString() {
      const diff = this.calculateExpireDateDiff();
      if (diff < 0) {
        return "기간지남";
      } else if (diff === 0) {
        return "오늘까지";
      } else if (diff < 7) {
        return `${diff}일 남음`;
      } else {
        return `~ ${this.item.expire}`;
      }
    },
    isNull(value) {
      if (
        value === "" ||
        value === null ||
        value === undefined ||
        (value !== null &&
          typeof value == "object" &&
          !Object.keys(value).length)
      ) {
        return true;
      } else {
        return false;
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
      if (dateDiff >= 1) {
        return "warning";
      }
      if (dateDiff === 0) {
        return "dark";
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
.completed_todo_item {
  text-decoration: line-through;
  color: #e2e2e2;
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
