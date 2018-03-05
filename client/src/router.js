import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import Perf from "./views/Performance.vue";
import Adhesion1 from "./views/Adhesion1";
import Adhesion2 from "./views/Adhesion2";
import Adhesion3 from "./views/Adhesion3";

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
    },
    {
      path: "/adhesion/profil-investisseur",
      component: Adhesion1
    },
    {
      path: "/adhesion/informations-personnelles",
      component: Adhesion2
    },
    {
      path: "/adhesion/validation",
      component: Adhesion3
    }
  ]
});
