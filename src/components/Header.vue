<template>
  <header>
    <div>
      <b-navbar toggleable="lg" type="light" variant="white">
        <b-navbar-brand href="#" @click="goToHome" class="font"
          >Sparkify</b-navbar-brand
        >

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-container class="bv-example-row">
              <b-row>
                <b-col>
                  <b-button
                    @click="goToCart"
                    active
                    class="button"
                    variant="primary"
                  >
                    <b-icon icon="credit-card" aria-hidden="true"></b-icon>
                    Cart</b-button
                  ></b-col
                >

                <b-col>
                  <b-button
                    @click="goToAdmin()"
                    v-b-modal="'my-modal'"
                    active
                    class="button"
                    >Admin</b-button
                  >
                </b-col>
              </b-row>
            </b-container>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    goToAdmin() {
      this.$router.push("/admin");
    },
    goToCart() {
      this.$router.push("/cart");
    },
    goToHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");
.font {
  font-family: "Pacifico", cursive;
}
.button {
  width: 140px;
}
</style>
