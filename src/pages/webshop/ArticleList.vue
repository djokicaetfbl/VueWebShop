<template>
  <the-header></the-header>
  <br />
  <!-- <div v-if="isLoading">
    <base-spinner></base-spinner>
  </div>  -->
  <button
    v-if="isLoggedIn"
    type="button"
    class="btn btn-success"
    id="addArticleForCategory"
    @click="$router.push('/newArticle')"
  >
    <i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;Dodaj
    artikal
  </button>
  <base-card>

  <h2>Artikli » {{ categoryName }}</h2>

    <ul class="list-group" v-if="hasArticles">
      <!-- <li class="list-group-item"><article-item></article-item></li> -->
      <li class="list-group-item">
        <article-item
          v-for="article in getArticles"
          :key="article.id"
          :childrenKey="article.childrenKey"
          :name="article.name"
          :imageUrl="article.imageUrl"
          :describe="article.describe"
          :price="article.price"
          :category="article.category"
          :active="article.active"
          :id="article.id"
        ></article-item>
      </li>
    </ul>
  </base-card>
</template>

<script>
import ArticleItem from "../../components/article/ArticleItem.vue";

import TheHeader from "../../components/layout/TheHeader.vue";
import { useRoute } from "vue-router";

export default {
  /*setup() {
    const route = useRoute();
    //this.categoryName = route.params.category;
    console.log("AJSA: "+route.params.category);
  },*/

  components: {
    TheHeader,
    ArticleItem,
  },
  data() {
    const route = useRoute(); // use route da uzmem vrijednost rute
    return {
      categoryName: route.params.category, // ovo category je u router.js :category
      isLoading: false,
    };
  },

  created() {
    //izvrsit ce se kada se ova komponenta kreira, tj pi svakom ozivu ove komponente
    this.loadArticles();
  },

  methods: {
    async loadArticles() {
      //console.log("DJOLENCE: "+this.categoryName);
      this.isLoading = true;
      try {
       /* setTimeout(() => {
          this.$store.dispatch(
            "article/fetchArticles",
            this.categoryName
          );
          this.isLoading = false;
        }, 2000);*/ // sa ovim sam rijesio problem kad mi se vrati sadrzaj nakon 1 sekunde :D
        await this.$store.dispatch("article/fetchArticles", this.categoryName);
        this.isLoading = false;
        //console.log("DJOLENCE!");
      } catch (error) {
        this.error = error.message || "Something failed!";
      }
      
    },
    handleError() {
      this.error = null;
    },
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters.getAdmin;
    },
    getArticles() {
      //console.log("DOBIO SAM: "+JSON.stringify(this.$store.getters["article/categories"]));
      return this.$store.getters["article/articles"];
    },
    hasArticles() {
      return this.$store.getters["article/hasArticles"];
    },
  },
};
</script>

<style scoped>
#addArticleForCategory {
  margin-left: 10%;
  /*height: 50px;*/
  width: 200px;
  font-size: 20px;
}
</style>