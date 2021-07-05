<template>
  <the-header></the-header>
  <base-card>
    <div class="row">
      <div class="column">
        <div class="card">
          <!-- <img
            :src="imageUrl"
            class="card-img-top"
            alt="..."
            style="max-height: 300px"
          />  -->
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
      /*category: {
        val: ["Racunari", "Roboti", "Automobili", "Avioni"],
        isValid: true,
      },*/
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
    };
  },
  created() {
    // ovo je za update
    /*console.log("USAO ODJE BRE !");
    console.log("OJJJJJ: " + JSON.stringify(this.$route.params));
    this.article = this.getArticleById(JSON.stringify(this.$route.params.id));
    console.log("ARTIKKLE: " + JSON.stringify(this.article));*/
    if (
      this.$route.params.childrenKey && // ovo primam msm preko onog new-category
      this.$route.params.id &&
      this.$route.params.name &&
      this.$route.params.imageUrl &&
      this.$route.params.active &&
      this.$route.params.describe &&
      this.$route.params.price &&
      this.$route.params.category &&
      this.$route.params.update
    ) {
      console.log("DADADA! BRE" + this.$route.params.category);
      this.category.val = this.$route.params.category;
      this.imageUrl.val = this.$route.params.imageUrl;
      this.id = this.$route.params.id;
      this.active = this.$route.params.active;
      this.childrenKey.val = this.$route.params.childrenKey;
      this.update = this.$route.params.update;
      this.name.val = this.$route.params.name;
      this.price.val = this.$route.params.price;
      this.describe.val = this.$route.params.describe;
      //this.image.val = "123";
      //this.loadArticleDetail();
      //this.article = this.getArticleById();
      //console.log("ARTICLE: "+this.article);
    }

    //this.article = this.getArticleById(this.$route.params.articleId);
  },
  /* mounted() {
      this.article = this.getArticleById(this.id);
      console.log("ARTIKKLE: "+JSON.stringify(this.article));
  },*/
  methods: {
    addQuantity() {
      this.counter = this.counter + 1;
    },
    removeQuantity() {
      if (this.counter > 1) {
        this.counter = this.counter - 1;
      }
    },
    addArticleToCart() {},
    
    /*getArticleById: function (id) {
      //return this.getCategories.slice(start, end);
      var articles = this.getArticles;
      console.log("ARTICLESSS: "+JSON.stringify(articles));
      console.log("IDD: " + id);
      //console.log("ARTICLES LENGTH: "+articles.length);
      for (var i = 0; i < articles.length; i++) {
        console.log("TMP: "+articles[i].id.toString().trim());
        if (articles[i].id.toString().trim().localeCompare(this.id.toString().trim())) {
          return articles[i];
        }
      }*
    },*/

    /*getArticleById() {
      console.log("PERO");
      //return this.$store.getters[("article/getArticleById", this.id)];
    },*/
    /* async loadArticleDetail() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("article/fetchArticleById", this.id);
      } catch (error) {
        this.error = error.message || "Something failed!";
      }
      this.isLoading = false;

    }*/
  },
  computed: {
    getCounter() {
      return this.counter;
    },
    getArticles() {
      //console.log("DOBIO SAM: "+JSON.stringify(this.$store.getters["article/categories"]));
      return this.$store.getters["article/articles"];
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

/* Create two equal columns that floats next to each other */
.column {
  float: left;
  width: 50%;
  padding: 10px;
  height: 300px; /* Should be removed. Only for demonstration */
}

/* Clear floats after the columns */
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