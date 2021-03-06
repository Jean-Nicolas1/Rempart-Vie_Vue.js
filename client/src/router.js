import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import Perf from "./views/Performance.vue";
import Adhesion1 from "@/views/forms/Adhesion1";
import Adhesion2 from "@/views/forms/Adhesion2";
import Adhesion3 from "@/views/forms/Adhesion3";
import UserProfile from "@/views/customerArea/UserProfile";
import Versement from "@/views/customerArea/Versement";
import Rachat from "@/views/customerArea/Rachat";
import Operation from "@/views/customerArea/Operation";
import UserInfo from "@/views/customerArea/UserInfo";

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
    },
    {
      path: "/account",
      component: UserProfile
    },
    {
      path: "/account/versement",
      component: Versement
    },
    {
      path: "/account/rachat",
      component: Rachat
    },
    {
      path: "/account/mes-operations",
      component: Operation
    },
    {
      path: "/account/mon-profil",
      component: UserInfo
    }
  ]
});
