<template>
  <div>
    <Header />
    <Carousel />
    <Products />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Carousel from "./components/Carousel.vue";
import Products from "./components/Products.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "Home",
  components: {
    Header,
    Carousel,
    Products,
    Footer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
