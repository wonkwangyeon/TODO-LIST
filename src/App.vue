<template>
  <div id="app">

    <MainNav />
    <!-- <div class="router-size">-->
    <!-- <router-link to="/" class="router-size">Home</router-link> -->
    <!-- <b-button class="nav-btn" @click="$router.push('/')">Home</b-button> -->
    <!-- <router-link to="/add"   class="router-size">Todo추가</router-link> -->
    <!-- <b-button class="nav-btn" @click="$router.push('/add')">Add</b-button>
    </div> -->
    <router-view />

  </div>
</template>

<script>
//import HelloWorld from "./components/HelloWorld.vue";

import MainNav from "./components/MainNav.vue";
export default {
  name: "app",
  components: { MainNav }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /* margin-top: 60px; */
}
.router-size{
   margin: 0 20px;
}
.nav-btn {
  margin: 0 10px;
}
</style>
