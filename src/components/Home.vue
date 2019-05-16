<template>
  <div>
    <div class="mainbody-size">
      <div>
        <h2 class=expire-divide>마감이 지난 List</h2>
      </div>
      <ExpireList />
      <div>
        <h2 class=expire-divide>현재 List</h2>
      </div>
      <MainList />
      <div>
        <h2 class=expire-divide>완료된 List</h2>
      </div>
      <CompleteList />
    </div>
  </div>
</template>

<script>
//import HelloWorld from "./components/HelloWorld.vue";
import MainList from "./MainList.vue";
import CompleteList from "./CompleteList.vue";
import ExpireList from "./ExpireList.vue";

export default {
  name: "app",
  components: { MainList, CompleteList, ExpireList }
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
