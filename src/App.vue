<template>
  <div id="app">
    <div class="head">
      <hgroup>
        <p class="title">
          Todo List
        </p>
        <p class="subtitle">
          Today : {{ new Date() | moment("YYYY 년 MM월 DD일 dddd") }}
        </p>
      </hgroup>
    </div>
    <MainList />
    <!-- <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
//import HelloWorld from "./components/HelloWorld.vue";
import MainList from "./components/MainList.vue";

export default {
  name: "app",
  components: { MainList }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Acme|Source+Serif+Pro");

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
hgroup {
  padding-top: 50px;
  background-color: #00c6ed;
}
p.title {
  margin-bottom: 0;
}
.title {
  font-family: "Acme", sans-serif;
  font-size: 50px;
  color: #eaeaea;
}
p.subtitle {
  padding-bottom: 20px;
}
.subtitle {
  font-family: "Source Serif Pro", serif;
  font-size: 20px;
  color: #eaeaea;
}
</style>
