import Vue from "vue";
import Router from "vue-router";
// import AddList from '@/components/AddList'
import Home from "@/components/Home";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    }
  ]
});
