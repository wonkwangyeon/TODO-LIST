<template>
  <div class="home">
    <div class="mainbody-size">
      <h2 class=expire-divide>현재 List</h2>
      <div class="list-container">
        <todo-list />
      </div>
    </div>
  </div>
</template>

<script>
import TodoList from "./TodoList";
export default {
  name: "app",
  components: { TodoList },
  async mounted() {
    try {
      await this.$store.dispatch('getAllTodoList')
    } catch(e) {
      // 요청 실패
      this.$bvToast.toast('목록을 불러오던 중 오류가 발생하여 가져올 수 없습니다.', {
        title: `요청 실패`,
        variant: 'danger',
        solid: true
      })
    }
  }
};
</script>

<style>
.expire-divide {
  text-align: left;

  border-bottom: 1px solid #111;
}
.mainbody-size {
  margin: 15px 10% 0px 10%;
}
</style>
