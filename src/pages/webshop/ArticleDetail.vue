<template>
  <the-header-basic style="width: 100%"></the-header-basic>
  <div>
    <base-card style="width: 82%; height: 100%">
      <div class="row" style="height: 100%">
        <div class="column" style="height: 100%">
          <div class="card" style="height: 100%">
            <img
              :src="article.imageUrl"
              class="card-img-top"
              alt="..."
              style="max-height: 300px; max-width: 60%; margin: 10%"
            /> <!-- height="300px" width="60%" style="margin: 10%;" -->
          </div>
                    <div id="divForArticleDescribe">
            <p id="articleDescribeParagraph" class="card-text">
              {{ article.describe }}
            </p>
            </div>
        </div>
        <div class="column">
          <div class="card-body">
            <h4 class="card-title">{{ article.name }}</h4>
            <br><br>
            <!-- <p id="articleDescribeParagraph" class="card-text">
              {{ article.describe }}
            </p>  -->
            <!-- <MDBTextarea label="Message" rows="4" v-model="textareaValue" /> -->
            <!-- <h4 class="card-title">{{ article.price }}KM</h4>  -->

            <div class="row">
              <div class="column">
                <div class="col-sm-6 col-md-5 col-lg-6">
                  <div class="qty-selector input-group js-qty-selector">
                    <span class="input-group-btn">
                      <button
                        v-if="!isMobile"
                        class="btn btn-primary"
                        id="buttonPlus"
                        type="button"
                        @click="addQuantity"
                      >
                        <i class="fas fa-plus"></i>
                      </button>
                      <button
                        v-else
                        class="btn btn-primary"
                        id="buttonPlusMDisplay"
                        type="button"
                        @click="addQuantity"
                      >
                        <i class="fas fa-plus"></i>
                      </button>

                      <input
                        v-if="!isMobile"
                        type="number"
                        id="quantity"
                        readonly
                        maxlength="3"
                        class="form-control"
                        :value="getCounter"
                        name="pdpAddtoCartInput"
                      />
                      <input
                        v-else
                        type="number"
                        id="quantityMDisplay"
                        readonly
                        maxlength="3"
                        class="form-control"
                        :value="getCounter"
                        name="pdpAddtoCartInput"
                      />

                      <button
                        v-if="!isMobile"
                        class="btn btn-primary"
                        id="buttonMinus"
                        type="button"
                        @click="removeQuantity"
                      >
                        <i class="fas fa-minus"></i>
                      </button>
                      <button
                        v-else
                        class="btn btn-primary"
                        id="buttonMinusMDisplay"
                        type="button"
                        @click="removeQuantity"
                      >
                        <i class="fas fa-minus"></i>
                      </button>
                    </span>
                  </div>
                  <div class="stock-status"></div>
                </div>
              </div>
              <div class="column" id="columnAddArticleToCart">

                <MDBBtn
                  v-if="!isMobile"
                  color="primary"
                  id="addToCart"
                  aria-controls="buyModal"
                  @click="buyModal = true"
                >
                  Dodaj u korpu <i class="fas fa-shopping-cart fa-2x"></i
                ></MDBBtn>
                <MDBBtn
                   v-if="isMobile"
                  color="primary"
                  id="addToCartMDisplay"
                  aria-controls="buyModal"
                  @click="buyModal = true"
                >
                  Dodaj u korpu<i class="fas fa-shopping-cart fa-2x"></i
                ></MDBBtn>

                <MDBModal
                  id="buyModal"
                  tabindex="-1"
                  labelledby="buyModalLabel"
                  v-model="buyModal"
                >
                  <MDBModalHeader>
                    <MDBModalTitle id="buyModalLabel">
                      Dodavanje artikla u korpu
                    </MDBModalTitle>
                  </MDBModalHeader>
                  <MDBModalBody>
                    <p>Artikl {{ article.name }} je uspješno dodat u korpu.</p>
                    <p>Količina: {{ counter }}</p>
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn
                      color="secondary"
                      @click="
                        buyModal = false;
                        addArticleToCart();
                      "
                      >Potvrdi</MDBBtn
                    >
                    <!-- <MDBBtn color="primary">Save changes</MDBBtn>  -->
                  </MDBModalFooter>
                </MDBModal>
                <div id="priceTestDIV">
                <h3 class="card-title">{{ article.price }}KM</h3>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </base-card>
  </div>
</template>

<script>
import TheHeaderBasic from "../../components/layout/TheHeaderBasic.vue";
import BaseCard from "../../components/ui/BaseCard.vue";

import {
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  // MDBTextarea ,
} from "mdb-vue-ui-kit";
import { ref } from "vue";

export default {
  components: {
    TheHeaderBasic,
    BaseCard,
    // MDBTextarea ,
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
      name: {
        val: "",
        isValid: true,
      },
      describe: {
        val: "",
        isValid: true,
      },
      category: {
        val: "",
        isValid: true,
      },
      price: {
        val: 0.0,
        isValid: true,
      },
      image: {
        val: null,
        isValid: true,
      },
      imageUrl: {
        val: "",
        isValid: true,
      },
      formIsValid: true,
      id: "",
      active: true,
      childrenKey: {
        val: "",
      },
      update: false,
      counter: 1,
      article: "",
      cart: [],
      currentScreenWidth: window.screen.width,
      currentWidth: 500,
      isLoading: false,
      isMobile: false,
    };
  },
  created() {
    this.loadArticles();

    this.currentScreenWidth = window.screen.width;
    if (this.currentScreenWidth < this.currentWidth) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  },
  mounted() {
    // IZVRSIT CE SE PRIJE NEGO SE KOMPONENTA UCITA
    this.currentScreenWidth = window.screen.width;
    window.onresize = () => {
      this.currentScreenWidth = window.screen.width;
      if (this.currentScreenWidth < this.currentWidth) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    };
  },
  methods: {
    addQuantity() {
      this.counter = this.counter + 1;
    },
    removeQuantity() {
      if (this.counter > 1) {
        this.counter = this.counter - 1;
      }
    },
    addArticleToCart() {
      //console.log("W");
      var tmpArticleWasChosen = false;
      this.cart = this.getCart;
      var articleToBuy = {
        id: this.article.id,
        name: this.article.name,
        describe: this.article.describe,
        category: this.article.category,
        price: this.article.price,
        imageUrl: this.article.imageUrl,
        quantity: this.counter,
      };
      //console.log("FAK: "+this.cart.length );
      if (this.cart.length > 0) {
        for (var i = 0; i < this.cart.length; i++) {
          // console.log("ARTIKLE TO BUY: "+articleToBuy.id);
          //console.log("TRENUTNI ARTIKL: "+this.cart[i].id);
          if (
            this.cart[i].id
              .toString()
              .trim()
              .localeCompare(articleToBuy.id.toString().trim()) === 0
            /*&& parseInt(this.cart[i].quantity.toString().trim()) !== parseInt(articleToBuy.quantity) */
          ) {
            tmpArticleWasChosen = true;
            //console.log("A: "+this.cart[i].quantity);
            //console.log("A2B: "+articleToBuy.quantity);
            var tmpQuantinityInteger = parseInt(
              this.cart[i].quantity.toString().trim()
            );
            var tmpQuantinityIntegerA2B = parseInt(
              articleToBuy.quantity.toString().trim()
            );
            tmpQuantinityInteger =
              tmpQuantinityInteger + tmpQuantinityIntegerA2B;
            var tmpQuantinityString = tmpQuantinityInteger.toString().trim();
            this.cart[i].quantity = tmpQuantinityString;
            // console.log("QA: "+this.cart[i].quantity);
          }
        }
        if (!tmpArticleWasChosen) {
          this.cart.push(articleToBuy);
        }
      } else {
        //console.log("DODAO2!");
        this.cart.push(articleToBuy);
      }
      //this.cart.push(articleToBuy);
      this.counter = 1;
      this.$store.dispatch("article/setCart", this.cart);
    },

    getArticleById: function (id) {
      var articles = this.getArticles;
      for (var i = 0; i < articles.length; i++) {
        if (
          articles[i].id
            .toString()
            .trim()
            .localeCompare(id.toString().trim()) === 0
        ) {
          return articles[i];
        }
      }
    },

    async loadArticles() {
      try {
        await this.$store.dispatch(
          "article/fetchArticles",
          this.$route.params.category
        );
      } catch (error) {
        this.error = error.message || "Something failed!";
      }
      this.article = this.getArticleById(this.$route.params.articleId);
    },
  },
  computed: {
    getCounter() {
      return this.counter;
    },
    getArticles() {
      return this.$store.getters["article/articles"];
    },
    getCart() {
      return this.$store.getters["article/cart"];
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.column {
  float: left;
  width: 50%;
  padding: 10px;
  height: 300px;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

#buttonPlus {
  height: 40px;
  background-color: #39c0ed;
}

#columnAddArticleToCart {
  margin-left: -10px;
}

#buttonPlusMDisplay {
  height: 30px;
  background-color: #39c0ed;
  font-size: 6px;
}

#buttonMinus {
  height: 40px;
  background-color: #f93154;
}

#buttonMinusMDisplay {
  height: 30px;
  background-color: #f93154;
  font-size: 6px;
}

#quantity {
  max-width: 58px;
  height: 40%;
}

#quantityMDisplay {
  max-width: 52px;
  height: 25%;
  /*font-size: 6px;*/
}
#addToCart {
  font-size: 18px;
  background-color: #00b74a;
}

#addToCartMDisplay {
  font-size: 8px;
  background-color: #00b74a;
}

#articleDescribeParagraph {
  width: 25ch;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

#priceTestDIV {
  position: absolute;
  bottom: 5%;
  right: 5%;
}

#divForArticleDescribe {
  position: absolute;
  bottom: 0.5%;
  /*left: 0;*/
}
</style>