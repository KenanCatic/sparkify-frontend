<template>
  <div id="app">
    <Header />
    <AddProduct />
    <ProductAdmin />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import ProductAdmin from "./components/ProductAdmin.vue";
import Footer from "./components/Footer.vue";
import AddProduct from "./components/AddProduct.vue";
export default {
  name: "Admin",
  components: {
    Header,
    ProductAdmin,
    Footer,
    AddProduct,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
