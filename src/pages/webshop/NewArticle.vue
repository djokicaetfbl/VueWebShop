<template>
  <the-header-basic></the-header-basic>
  <base-card>
    <section>
      <article-form @save-data="saveData"></article-form>
      <!-- slusam save-data koji se emituje iz CoachForm.vue -->
    </section>
  </base-card>
</template>

<script>
import ArticleForm from "../../components/article/ArticleForm.vue";
import TheHeaderBasic from "../../components/layout/TheHeaderBasic.vue";

export default {
  components: {
    ArticleForm,
    TheHeaderBasic,
  },

  methods: { // ovo ukljuci kasnije :D
    saveData(data) {
      // to su podaci sa forme koje smo preko emit poslali
      console.log("EMIT article: ", data);
      
      /*this.$store.dispatch("article/addCategory", data); //article/addCategory --> article je namespace, addCategory je action u action.js
      
      this.$router.replace("/articles"); // posilje submita prebaci ma na tu rutu*/
    },
  },
};
</script>
