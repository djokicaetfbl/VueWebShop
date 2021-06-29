<template>
  <the-header></the-header>
  <br />
  <button type="button" class="btn btn-success" id="addArticleForCategory" @click="$router.push('/newArticle')">
    <i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;Dodaj
    artikal
  </button>
  <base-card>
    <ul class="list-group">
      <li class="list-group-item"><article-item></article-item></li>
      <li class="list-group-item"><article-item></article-item></li>
      <li class="list-group-item"><article-item></article-item></li>
      <li class="list-group-item"><article-item></article-item></li>
      <li class="list-group-item"><article-item></article-item></li>
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
  data() {
    const route = useRoute(); // use route da uzmem vrijednost rute
    return {
      categoryName: route.params.category // ovo category je u router.js :category
    };
  },
  components: {
    TheHeader,
    ArticleItem,
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