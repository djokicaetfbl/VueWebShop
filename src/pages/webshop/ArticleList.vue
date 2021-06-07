<template>
  <the-header></the-header>
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

export default {
  components: {
    TheHeader,
    ArticleItem,
  },
};
</script>

<style scoped>

</style>