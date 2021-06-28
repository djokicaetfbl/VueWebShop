<template>
  <the-header-basic></the-header-basic>
  <base-card>
    <section>
      <category-form @save-data="saveData"></category-form>
      <!-- slusam save-data koji se emituje iz CoachForm.vue -->
    </section>
  </base-card>
</template>

<script>
import CategoryForm from "../../components/article/CategoryForm.vue";
import TheHeaderBasic from "../../components/layout/TheHeaderBasic.vue";

export default {
  components: {
    CategoryForm,
    TheHeaderBasic,
  },

  methods: {
    saveData(data) {
      // to su podaci sa forme koje smo preko emit poslali
      //console.log("EMIT: ", data);
      this.$store.dispatch("article/addCategory", data); //article/addCategory --> article je namespace, addCategory je action u action.js
      
      this.$router.replace("/articles"); // posilje submita prebaci ma na tu rutu
    },
  },
};
</script>
