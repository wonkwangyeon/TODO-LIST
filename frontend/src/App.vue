<template>
  <div id="app">
    <MainNav />
    <router-view />
  </div>
</template>

<script>
import MainNav from "./components/MainNav.vue";
export default {
  name: "app",
  components: { MainNav }
};
</script>

<style>
#app {
  font-family: "Nanum Gothic", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>