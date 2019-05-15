<template>
  <div id="app">

    <MainNav />
    <router-link to="/">home</router-link>
    <router-link to="/add">add</router-link>
    <router-view />

  </div>
</template>

<script>
//import HelloWorld from "./components/HelloWorld.vue";

import MainNav from "./components/MainNav.vue";
export default {
  name: "app",
  components: {MainNav }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

</style>
