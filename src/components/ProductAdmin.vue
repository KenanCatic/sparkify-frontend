<template>
  <div>
    <b-container class="bv-example-row mt-4">
      <b-row>
        <b-col md="6" v-for="product in products" :key="product.id">
          <b-card
            :title="product.name"
            tag="article"
            class="mb-4"
            style="max-height:100%"
          >
            <center>
              <img
                :src="product.img_url"
                alt=""
                img-alt="Image"
                img-top
                style="width:auto;height:200px"
              />
            </center>

            <b-card-text>
              <h5>Price: ${{ product.price }}.00</h5>
              <b-button variant="danger" @click="deleteProduct(product._id)">
                Delete
              </b-button>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "products",
  data() {
    return {
      products: [],
    };
  },

  created: function() {
    this.getProducts();
  },

  methods: {
    deleteProduct(id) {
      axios.delete("http://localhost:3000/products/" + id).then(() => {
        this.products.splice(this.products.indexOf(id), 1);
        location.reload();
      });
    },
    getProducts() {
      axios.get("http://localhost:3000/products").then((response) => {
        this.products = response.data;
      });
    },
  },
};
</script>

<style></style>
