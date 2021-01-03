import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./routes.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import store from "@/store";

Vue.use(VueRouter);
Vue.use(BootstrapVue);

Vue.use(IconsPlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
