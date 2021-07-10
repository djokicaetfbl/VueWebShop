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

    <MDBBtn v-if="getCartLength > 0"
      color="primary"
      aria-controls="buyModal"
      @click="
        buyModal = true
      "
      >Kupi</MDBBtn
    >
    <MDBModal
      id="buyModal"
      tabindex="-1"
      labelledby="buyModalLabel"
      v-model="buyModal"
    >
      <MDBModalHeader>
        <MDBModalTitle id="buyModalLabel"> Uspješna kupovina </MDBModalTitle>
      </MDBModalHeader>
      <MDBModalBody>
        <p>
          Kupovina u iznosu {{ getSummaryPriceXQuantity }} KM je uspješno
          obavljena.
        </p>
        <p>Hvala Vam na kupovini!</p>
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="secondary" @click="buyModal = false; clearCart();">Zatvori</MDBBtn>
        <!-- <MDBBtn color="primary">Save changes</MDBBtn>  -->
      </MDBModalFooter>
    </MDBModal>
  </base-card>
</template>

<script>
import TheHeader from "../../components/layout/TheHeader.vue";
import BaseCard from "../../components/ui/BaseCard.vue";
import CartItem from "../../components/article/CartItem.vue";
import {
  MDBTable,
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-vue-ui-kit";
import { ref } from "vue";
export default {
  components: {
    TheHeader,
    BaseCard,
    CartItem,
    MDBTable,
    MDBBtn,
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  },
  setup() {
    const buyModal = ref(false);

    return {
      buyModal,
    };
  },
  data() {
    return {
      isLoading: false,
      error: null,
      summaryPriceXQuantity: 0.0,
    };
  },
  methods: {
    clearCart() {
      var cart = this.getCart;
      cart = [];
      this.$store.dispatch("article/setCart", cart);
      this.$router.replace("/articles");
    },
    handleError() {
      this.error = null;
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    getCart() {
      return this.$store.getters["article/cart"];
    },
    getSummaryPriceXQuantity() {
      var articles = this.getCart;
      var tmpSum = 0.0;
      for (var i = 0; i < articles.length; i++) {
        var parseDecimalSum =
          parseFloat(articles[i].price) * parseInt(articles[i].quantity);
        tmpSum = tmpSum + parseDecimalSum;
      }
      return tmpSum;
    },
    getCartLength() {
      return this.getCart.length;
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