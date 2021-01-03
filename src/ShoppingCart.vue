<template>
  <div>
    <Header />
    <b-container>
      <center>
        <b-row
          cols="1"
          cols-sm="2"
          cols-md="4"
          cols-lg="6"
          v-for="(product, index) in products"
          :key="index"
        >
          <b-col
            ><img :src="product.img_url" style="width:auto;height:60px" alt=""
          /></b-col>
          <b-col>{{ product.name }}</b-col>
          <b-col
            ><b-button variant="success" @click="quantityPlus(product)"
              ><b-icon icon="arrow-up"></b-icon> &nbsp;</b-button
            ><b-button variant="danger" @click="quantityMinus(product)"
              ><b-icon icon="arrow-down"></b-icon
            ></b-button>
            <p>Quantity: {{ product.quantity }}</p>
          </b-col>
          <b-col>{{ product.price * product.quantity }}</b-col>
          <b-col
            ><b-button @click="removeFromCart(product)">Remove</b-button></b-col
          >
        </b-row>
      </center>
      <b-row>
        <b-col style="padding-top: 30px;"
          ><b-button
            variant="primary"
            style="width:100%; "
            v-b-modal.modal-prevent-closing
          >
            Enter Your details</b-button
          >
        </b-col>
        <b-col style="padding-top: 30px;"
          ><h3 style="padding-left:50%">${{ order.cost }}</h3></b-col
        >
      </b-row>
      <center>
        <b-modal
          id="modal-prevent-closing"
          ref="modal"
          title="Submit Your Name"
          @show="resetModal"
          @hidden="resetModal"
          @ok="handleOk"
        >
          <h5>Your total cost is: ${{ order.cost }}</h5>
          <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group
              label="Name"
              label-for="name-input"
              invalid-feedback="Name is required"
              :state="nameState"
            >
              <b-form-input
                id="name-input"
                v-model="customer.name"
                :state="nameState"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="Email"
              label-for="email-input"
              invalid-feedback="Email is required"
              :state="emailState"
            >
              <b-form-input
                id="email-input"
                v-model="customer.email"
                :state="emailState"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="Phone"
              label-for="phone-input"
              invalid-feedback="phone is required"
              :state="phoneState"
            >
              <b-form-input
                id="phone-input"
                v-model="customer.phone"
                :state="phoneState"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="deliveryAddress"
              label-for="deliveryAddress-input"
              invalid-feedback="deliveryAddress is required"
              :state="deliveryAddressState"
            >
              <b-form-input
                id="deliveryAddress-input"
                v-model="order.deliveryAddress"
                :state="deliveryAddressState"
                required
              ></b-form-input>
            </b-form-group>
          </form>
        </b-modal>
      </center>
    </b-container>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import store from "@/store";
import axios from "axios";

export default {
  name: "Cart",
  components: {
    Header,
  },
  data() {
    return {
      customer: { name: "", email: "", phone: null },
      nameState: null,
      emailState: null,
      phoneState: null,
      products: [],
      order: { cost: 0, deliveryAddress: "", createdAt: new Date() },
      deliveryAddressState: null,
      shipment: {
        deliveryAddress: "",
        senderAddress: "Sparkify Industries Inc.",
        createdAt: new Date(),
        deliveredAt: this.futureDate(),
      },
    };
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      this.emailState = valid;
      this.phoneState = valid;
      this.deliveryAddressState = valid;

      return valid;
    },
    resetModal() {
      this.customer.name = "";
      this.nameState = null;
      this.customer.email = "";
      this.emailState = null;
      this.customer.phone = "";
      this.phoneState = null;
      this.order.deliveryAddress = "";
      this.deliveryAddressState = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();

      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.callAll();

      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },

    addToAPI() {
      axios
        .post("http://localhost:3000/customers", this.customer)
        .then(() => {
          location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addOrderToAPI() {
      axios
        .post("http://localhost:3000/orders", this.order)
        .then(() => {
          location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
      store.commit("emptyCart");
      this.$router.push("/");
    },
    futureDate() {
      const currentDate = new Date();
      const futureDate = new Date(currentDate);
      futureDate.setDate(futureDate.getDate() + 14);
      return futureDate;
    },
    addShipmentToAPI() {
      axios
        .post("http://localhost:3000/shipments", {
          deliveryAddress: this.order.deliveryAddress,
          senderAddress: this.shipment.senderAddress,
          createdAt: this.shipment.createdAt,
          deliveredAt: this.shipment.deliveredAt,
        })
        .then(() => {
          location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    callAll() {
      this.addToAPI();
      this.addOrderToAPI();
      this.addShipmentToAPI();
    },
    removeFromCart(productToDelete) {
      store.commit("removeFromCart", productToDelete);
      location.reload();
    },
    async quantityPlus(product) {
      await store.commit("plusQuantity", product);
      this.order.cost = this.sum();
    },
    async quantityMinus(product) {
      await store.commit("minusQuantity", product);
      this.order.cost = this.sum();
    },
    sum() {
      let sum = 0;
      store.getters.getCartContents.forEach((product) => {
        sum += product.price * product.quantity;
      });
      this.order.cost = sum;
      return sum;
    },
  },
  async created() {
    this.products = await store.getters.getCartContents;
    console.log(this.products);
    this.sum();
  },
};
</script>

<style></style>
