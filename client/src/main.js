import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import Chartkick from "chartkick";
import VueChartkick from "vue-chartkick";
import Chart from "chart.js";
import App from "./App.vue";
import router from "./router";

Vue.use(BootstrapVue);
Vue.use(VueChartkick, { Chartkick });
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
