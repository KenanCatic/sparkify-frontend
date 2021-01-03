import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import Vue from "vue";
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    cart: [],
  },
  mutations: {
    emptyCart(state) {
      state.cart = [];
    },
    pushToCart(state, product) {
      for (const obj in state.cart) {
        if (JSON.stringify(state.cart[obj]) === JSON.stringify(product)) return;
      }

      state.cart.push(product);
    },
    removeFromCart(state, productToDelete) {
      state.cart = state.cart.filter(
        (product) => product._id !== productToDelete._id
      );
    },
    plusQuantity(state, product) {
      state.cart.find((stateProduct) => stateProduct._id === product._id)
        .quantity++;
    },
    minusQuantity(state, product) {
      state.cart.find((stateProduct) => stateProduct._id === product._id)
        .quantity--;

      if (
        state.cart.find((stateProduct) => stateProduct._id === product._id)
          .quantity <= 1
      ) {
        state.cart.find(
          (stateProduct) => stateProduct._id === product._id
        ).quantity = 1;
      }
    },
  },
  getters: {
    getCartContents(state) {
      return state.cart;
    },
  },
  plugins: [createPersistedState()],
});

export default store;
