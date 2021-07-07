<template>
  <the-header></the-header>

  <h1 id="korpa">Korpa</h1>
  <base-card>
    <MDBTable>
      <thead class="table-light">
        <tr>
          <th scope="col">Proizvod</th>
          <th scope="col">Ukloni</th>
          <th scope="col">Kolicina</th>
          <th scope="col">Cijena</th>
        </tr>
      </thead>

      <tbody>
        <cart-item
          v-for="article in getCart"
          :key="article.id"
          :childrenKey="article.childrenKey"
          :name="article.name"
          :imageUrl="article.imageUrl"
          :describe="article.describe"
          :price="article.price"
          :category="article.category"
          :active="article.active"
          :id="article.id"
          :quantity="article.quantity"
        ></cart-item>
      </tbody>
    </MDBTable>

    <h2>Ukupno: {{ getSummaryPriceXQuantity }}KM</h2>

    <MDBBtn color="success" @click="buy">Kupi</MDBBtn>
  </base-card>
</template>

<script>
import TheHeader from "../../components/layout/TheHeader.vue";
import BaseCard from "../../components/ui/BaseCard.vue";
import CartItem from "../../components/article/CartItem.vue";
import { MDBTable, MDBBtn } from "mdb-vue-ui-kit";
export default {
  components: { TheHeader, BaseCard, CartItem, MDBTable, MDBBtn },
  data() {
    return {
      isLoading: false,
      error: null,
      summaryPriceXQuantity: 0.0,
    };
  },
  methods: {
    buy() {
      console.log("KUPI!");
      console.log("THIS GET CART" + JSON.stringify(this.getCart).length);

      /*var articles = this.getCart;
      var tmpSum = 0.0;
      for (var i = 0; i < articles.length; i++) {
        var parseDecimalSum =
          parseFloat(articles[i].price) * parseInt(articles[i].quantity);
        tmpSum = tmpSum + parseDecimalSum;
      }
      this.summaryPriceXQuantity = tmpSum;*/
    },
    handleError() {
      this.error = null;
    },
  },
  computed: {
    isLoggedIn() {
      //this.isLoading = this.$store.getters.isAuthenticated;
      return this.$store.getters.isAuthenticated;
      // return this.isLoading;
    },
    getCart() {
      return this.$store.getters["article/cart"];
    },
   getSummaryPriceXQuantity(){
      var articles = this.getCart;
      var tmpSum = 0.0;
      for(var i = 0 ; i < articles.length; i++){
        var parseDecimalSum = parseFloat(articles[i].price) * parseInt(articles[i].quantity);
        tmpSum = tmpSum + parseDecimalSum;
      }
      //this.summaryPriceXQuantity = tmpSum;
      return tmpSum;
    }
  },
};
</script>

<style scoped>
#korpa {
  margin-top: 5%;
  margin-left: 10%;
}

.column {
  float: left;
  min-width: 50%;
  padding: 10px;
  /*height: 300px;*/ /* Should be removed. Only for demonstration */
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

.th,
td {
  text-align: center;
}

tr {
  line-height: 1px;
}
</style>