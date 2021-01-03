<template>
  <div>
    <b-container class="bv-example-row mt-4">
      <b-row>
        <b-col md="6" v-for="(product, index) in products" :key="index">
          <b-card :title="product.name" tag="article" class="mb-4">
            <center>
              <img
                :src="product.img_url"
                alt=""
                img-alt="Image"
                img-top
                style="width:auto;max-height:200px"
              />
            </center>

            <b-card-text>
              <h5>Price: ${{ product.price }}.00</h5>
            </b-card-text>

            <b-button
              block
              href="#"
              variant="primary"
              @click="addToCart(product)"
            >
              Add to cart
            </b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store";
export default {
  name: "products",
  data() {
    return {
      products: [],
      errors: [],
    };
  },

  created() {
    axios
      .get(`http://localhost:3000/products`)
      .then((response) => {
        this.products = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },

  methods: {
    addToCart(product) {
      product.quantity = 1;
      store.commit("pushToCart", product);
      console.log(store.getters.getCartContents);
    },
  },
};
</script>

<style></style>
