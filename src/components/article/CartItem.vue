<template>
  <tr>
    <th scope="row">
      <div class="row">
        <div class="column">
          <div class="card">
            <img
              :src="imageUrl"
              class="card-img-top"
              alt="..."
              style="max-height: 300px"
            />
          </div>
        </div>
        <div class="card-body">
          <p>{{ name }} » {{ category }}</p>
        </div>
      </div>
    </th>
    <th scope="row">
      <MDBBtn color="danger" @click="deleteArticleFromCart">Ukloni</MDBBtn>
    </th>
    <th scope="row">{{ quantity }}</th>
    <th>{{ price }}</th>
  </tr>
</template>

<script>
import { MDBBtn } from "mdb-vue-ui-kit";

export default {
  components: { MDBBtn },
  props: [
    "childrenKey",
    "id",
    "category",
    "name",
    "price",
    "describe",
    "imageUrl",
    "active",
    "quantity",
  ],
  methods: {
    deleteArticleFromCart() {
     // console.log("THIS ID: " + this.id);
      var cart = this.getCart;
      //console.log("CART: "+cart);
      for(var i = 0; i < cart.length; i++){
          console.log("THIS ID: " + this.id);
          console.log("CART ID: " + cart[i].id);
          if(cart[i].id.toString().trim().localeCompare(this.id.toString().trim()) === 0){
              //tmppp.splice(i, 1);
              console.log("JAAAAAAAA");
              cart.splice(i,1);
              this.$store.dispatch("article/setCart",cart);
          }
      }
    },
  },
  computed: {
    getCart() {
      return this.$store.getters["article/cart"];
    },
  },
};
</script>