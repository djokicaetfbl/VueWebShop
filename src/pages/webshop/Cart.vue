<template>
  <the-header-basic v-if="!isLitMob" style="width: 100%"></the-header-basic>
  <the-header-basic v-if="isLitMob" style="width: 120%"></the-header-basic>

  <h1 id="korpa">Korpa</h1>
  <div v-if="!isMobile">
    <base-card>
      <MDBTable>
        <thead class="table-light">
          <tr>
            <th v-if="!isMobile" scope="col" id="columnProizvod">Proizvod</th>
            <th
              v-if="isMobile && !isForMobile"
              scope="col"
              id="columnProizvod"
              style="font-size: 15px"
            >
              Proizvod
            </th>
            <th
              v-if="isMobile && isForMobile"
              scope="col"
              id="columnProizvod"
              style="font-size: 8px"
            >
              Proizvod
            </th>
            <!-- <th v-else scope="col" id="columnProizvodMDisplay">Proizvod</th>  -->
            <th v-if="!isMobile" scope="col" id="columnUkloni">Ukloni</th>
            <th
              v-if="isMobile && !isForMobile"
              scope="col"
              id="columnUkloni"
              style="font-size: 15px"
            >
              Ukloni
            </th>
            <th
              v-if="isMobile && isForMobile"
              scope="col"
              id="columnUkloni"
              style="font-size: 8px"
            >
              Ukloni
            </th>
            <!-- <th v-else scope="col" id="columnUkloniMDisplay">Ukloni</th>  -->
            <th v-if="!isMobile" scope="col" id="columnKolicina">Količina</th>
            <th
              v-if="isMobile && !isForMobile"
              scope="col"
              id="columnKolicina"
              style="font-size: 15px"
            >
              Količina
            </th>
            <th
              v-if="isMobile && isForMobile"
              scope="col"
              id="columnKolicina"
              style="font-size: 8px"
            >
              Količina
            </th>
            <!-- <th v-else scope="col" id="columnKolicinaMDisplay">Količina</th>  -->
            <th v-if="!isMobile" scope="col" id="columnCijena">Cijena</th>
            <th
              v-if="isMobile && !isForMobile"
              scope="col"
              id="columnCijena"
              style="font-size: 15px"
            >
              Cijena
            </th>
            <th
              v-if="isMobile && isForMobile"
              scope="col"
              id="columnCijena"
              style="font-size: 8px"
            >
              Cijena
            </th>
            <!-- <th v-else scope="col" id="columnCijenamDisplay">Cijena</th> -->
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

      <h1 class="SummaryCartAmount">
        Ukupno: {{ getSummaryPriceXQuantity }} KM
      </h1>
      <br />

      <MDBBtn
        v-if="getCartLength > 0"
        id="byAllArticlesFromCart"
        color="primary"
        aria-controls="buyModal"
        @click="buyModal = true"
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
          <MDBBtn
            color="secondary"
            @click="
              buyModal = false;
              clearCart();
            "
            >Potvrdi</MDBBtn
          >
          <!-- <MDBBtn color="primary">Save changes</MDBBtn>  -->
        </MDBModalFooter>
      </MDBModal>
    </base-card>
  </div>

  <div v-if="isMobile">
    <MDBTable>
      <thead class="table-light">
        <tr>
          <th v-if="!isMobile" scope="col" id="columnProizvod">Proizvod</th>
          <th
            v-if="isMobile && !isForMobile"
            scope="col"
            id="columnProizvod"
            style="font-size: 15px"
          >
            Proizvod
          </th>
          <th
            v-if="isMobile && isForMobile"
            scope="col"
            id="columnProizvod"
            style="font-size: 10px"
          >
            Proizvod
          </th>
          <!-- <th v-else scope="col" id="columnProizvodMDisplay">Proizvod</th>  -->
          <th v-if="!isMobile" scope="col" id="columnUkloni">Ukloni</th>
          <th
            v-if="isMobile && !isForMobile"
            scope="col"
            id="columnUkloni"
            style="font-size: 15px"
          >
            Ukloni
          </th>
          <th
            v-if="isMobile && isForMobile"
            scope="col"
            id="columnUkloni"
            style="font-size: 10px"
          >
            Ukloni
          </th>
          <!-- <th v-else scope="col" id="columnUkloniMDisplay">Ukloni</th>  -->
          <th v-if="!isMobile" scope="col" id="columnKolicina">Količina</th>
          <th
            v-if="isMobile && !isForMobile"
            scope="col"
            id="columnKolicina"
            style="font-size: 15px"
          >
            Količina
          </th>
          <th
            v-if="isMobile && isForMobile"
            scope="col"
            id="columnKolicina"
            style="font-size: 10px"
          >
            Količina
          </th>
          <!-- <th v-else scope="col" id="columnKolicinaMDisplay">Količina</th>  -->
          <th v-if="!isMobile" scope="col" id="columnCijena">Cijena</th>
          <th
            v-if="isMobile && !isForMobile"
            scope="col"
            id="columnCijena"
            style="font-size: 15px"
          >
            Cijena
          </th>
          <th
            v-if="isMobile && isForMobile"
            scope="col"
            id="columnCijena"
            style="font-size: 10px"
          >
            Cijena
          </th>
          <!-- <th v-else scope="col" id="columnCijenamDisplay">Cijena</th> -->
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

    <h2 class="SummaryCartAmount">Ukupno: {{ getSummaryPriceXQuantity }} KM</h2>
    <br />

    <MDBBtn
      v-if="getCartLength > 0"
      id="byAllArticlesFromCart"
      color="primary"
      aria-controls="buyModal"
      @click="buyModal = true"
      style="font-size: 12px; margin-left: 25%"
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
        <MDBBtn
          color="secondary"
          @click="
            buyModal = false;
            clearCart();
          "
          >Potvrdi</MDBBtn
        >
        <!-- <MDBBtn color="primary">Save changes</MDBBtn>  -->
      </MDBModalFooter>
    </MDBModal>
  </div>
</template>

<script>
import TheHeaderBasic from "../../components/layout/TheHeaderBasic.vue";
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
    TheHeaderBasic,
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
      currentScreenWidth: window.screen.width,
      //currentWidth: 500,
      currentWidth: 680,
      //currentWidth: 570,
      isMobile: false,
      FOR_MOBILE: 570,
      isForMobile: false,
      LIT_MOB_WIDTH: 351,
      isLitMob: false,
    };
  },

  created() {
    /* this.currentScreenWidth = window.screen.width;
    if (this.currentScreenWidth < this.currentWidth) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }

    if (this.currentScreenWidth < this.FOR_MOBILE) {
      this.isForMobile = true;
    } else {
      this.isForMobile = false;
    }*/
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  mounted() {
    // IZVRSIT CE SE PRIJE NEGO SE KOMPONENTA UCITA
    /*console.log("POZVAO CART :D");
    this.currentScreenWidth = window.screen.width;
    window.onresize = () => {
      this.currentScreenWidth = window.screen.width;
      if (this.currentScreenWidth < this.currentWidth) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }

      if (this.currentScreenWidth < this.FOR_MOBILE) {
        this.isForMobile = true;
      } else {
        this.isForMobile = false;
      }
    };*/
  },

  unmounted() {
    /* umjesto destry */
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    handleResize() {
      /*this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;*/
      this.currentScreenWidth = window.innerWidth;
      if (this.currentScreenWidth < this.currentWidth) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }

      if (this.currentScreenWidth < this.FOR_MOBILE) {
        this.isForMobile = true;
      } else {
        this.isForMobile = false;
      }
      if (this.currentScreenWidth < this.LIT_MOB_WIDTH) {
        this.isLitMob = true;
        console.log("MA JA :D");
      } else {
        this.isLitMob = false;
      }
    },
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
    },
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

#columnProizvod,
#columnUkloni,
#columnKolicina,
#columnCijena {
  font-size: 23px;
}

#columnProizvodMDisplay,
#columnUkloniMDisplay,
#columnKolicinaMDisplay,
#columnCijenaMDisplay {
  font-size: 12px;
}

#byAllArticlesFromCart {
  align-self: center;
  width: 50%;
  background-color: #00b74a;
  font-size: 24px;
}

.SummaryCartAmount {
  font-weight: bold;
}
</style>