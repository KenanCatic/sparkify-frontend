<template>
  <div class="padding-top">
    <center>
      <b-button variant="primary" style="width:25%" v-b-modal.modalPopover>
        Add Product
      </b-button>

      <b-modal id="modalPopover" title="Add product" hide-footer>
        <b-form-input
          v-model="product.name"
          placeholder="Enter product name"
        ></b-form-input>
        <br />

        <b-form-input
          v-model="product.price"
          placeholder="Enter product price"
        ></b-form-input>
        <br />
        <b-form-input
          v-model="product.img_url"
          placeholder="Enter product image URL"
        ></b-form-input
        ><br />
        <b-form-input
          v-model="product.quantity"
          placeholder="Enter product quantity"
        ></b-form-input
        ><br />
        <b-form-input
          v-model="product.vendor"
          placeholder="Enter product vendor"
        ></b-form-input>
        <br />

        <b-button variant="primary" @click="addToAPI()" style="width:100%"
          >Add</b-button
        >
      </b-modal>
    </center>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddProduct",
  data() {
    return {
      product: {
        name: "",
        price: null,
        img_url: "",
        quantity: null,
        vendor: "",
      },
    };
  },
  methods: {
    addToAPI() {
      axios
        .post("http://localhost:3000/products", this.product)
        .then((response) => {
          console.log(response);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
  },
};
</script>

<style>
.padding-top {
  padding-top: 20px;
}
</style>
