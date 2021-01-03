import VueRouter from "vue-router";
import Home from "./Home.vue";
import Admin from "./Admin.vue";
import Cart from "./ShoppingCart.vue";
import store from "./store/index.js";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  store,
});
export default router;
