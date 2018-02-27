import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import Perf from "./views/Performance.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/signup",
      component: Signup
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/performance",
      component: Perf
    }
  ]
});
