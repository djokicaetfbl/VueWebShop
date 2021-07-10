<template>
  <the-header></the-header>
  <base-card>
    <div class="row">
      <div class="column">
        <div class="card">
          <img
            :src="article.imageUrl"
            class="card-img-top"
            alt="..."
            style="max-height: 300px"
          />
        </div>
      </div>
      <div class="column">
        <div class="card-body">
          <h5 class="card-title">{{ article.name }}</h5>
          <p class="card-text">
            {{ article.describe }}
          </p>
          <h5 class="card-title">{{ article.price }}KM</h5>

          <div class="row">
            <div class="column">
              <div class="col-sm-6 col-md-5 col-lg-6">
                <div class="qty-selector input-group js-qty-selector">
                  <span class="input-group-btn">
                    <button
                      class="btn btn-primary"
                      id="buttonPlus"
                      type="button"
                      @click="addQuantity"
                    >
                      <i class="fas fa-plus"></i>
                    </button>

                    <input
                      type="number"
                      id="quantity"
                      readonly
                      maxlength="3"
                      class="form-control"
                      :value="getCounter"
                      name="pdpAddtoCartInput"
                    />

                    <button
                      class="btn btn-primary"
                      id="buttonMinus"
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
            <div class="column">
              <button
                class="btn btn-primary"
                type="button"
                id="addToCart"
                @click="addArticleToCart"
              >
                Dodaj u korpu <i class="fas fa-shopping-cart fa-2x"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </base-card>
</template>

<script>
import TheHeader from "../../components/layout/TheHeader.vue";
import BaseCard from "../../components/ui/BaseCard.vue";

export default {
  components: {
    TheHeader,
    BaseCard,
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
    };
  },
  created() {
    this.loadArticles();
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
      var articleToBuy = { "id": this.article.id ,"name" : this.article.name, "describe" : this.article.describe, "category" : this.article.category ,"price" : this.article.price, "imageUrl" : this.article.imageUrl, "quantity": this.counter };
      //console.log("FAK: "+this.cart.length );
      if(this.cart.length > 0){
      for(var i = 0; i <  this.cart.length; i++){
        if(this.cart[i].id.toString().trim().localeCompare(articleToBuy.id.toString().trim()) === 0 
        && parseInt(this.cart[i].quantity.toString().trim()) !== parseInt(articleToBuy.quantity) ) {
        tmpArticleWasChosen = true;
        //console.log("A: "+this.cart[i].quantity);
        //console.log("A2B: "+articleToBuy.quantity);
          var tmpQuantinityInteger = parseInt(this.cart[i].quantity.toString().trim());
          var tmpQuantinityIntegerA2B = parseInt(articleToBuy.quantity.toString().trim());
          tmpQuantinityInteger = tmpQuantinityInteger + tmpQuantinityIntegerA2B;
          var tmpQuantinityString = tmpQuantinityInteger.toString().trim();
          this.cart[i].quantity = tmpQuantinityString;
          //console.log("QA: "+this.cart[i].quantity);
        }
      }
      if(!tmpArticleWasChosen) {
        this.cart.push(articleToBuy); 
      }
      } else {
        //console.log("DODAO2!");
        this.cart.push(articleToBuy);
      }
      //this.cart.push(articleToBuy);
      this.counter = 1;
      this.$store.dispatch("article/setCart",this.cart);
    },
    
    getArticleById: function (id) {
      var articles = this.getArticles;
      for (var i = 0; i < articles.length; i++) {
        if (articles[i].id.toString().trim().localeCompare(id.toString().trim()) === 0) {
          return articles[i];
        }
      }
    },

    async loadArticles() {
      try {
        await this.$store.dispatch("article/fetchArticles",this.$route.params.category);
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
}

#buttonMinus {
  height: 40px;
}

#quantity {
  max-width: 58px;
  height: 40%;
}
#addToCart {
  font-size: 18px;
}
</style>