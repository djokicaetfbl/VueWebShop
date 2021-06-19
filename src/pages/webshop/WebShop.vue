<template id="bla">
  <div>
    <the-header></the-header>
    <section>
      <base-card>
        <h2>Kategorije</h2>
        <div v-if="hasCategories" >
        <category-item v-for="category in getCategories" :key="category.id" :name="category.categoryName" :picture="category.imageUrl"> </category-item>
        </div>
      </base-card>
      <button
        class="btn btn-primary"
        v-if="isLoggedIn"
        @click="dodajKategoriju"
      >
        <router-link to="/newCategory">Dodaj kategoriju</router-link>
      </button>
    </section>
  </div>
</template>

<script>
import TheHeader from "../../components/layout/TheHeader.vue";
import CategoryItem from "../../components/article/CategoryItem.vue";

export default {
  components: { TheHeader, CategoryItem },
  created() {
    //izvrsit ce se kada se ova komponenta kreira
    this.loadCategories();
  },
  methods: {
    dodajKategoriju() {
      console.log("Dodaj kategoriju!");
    },
    async loadCategories() {
      console.log("USAO!");
      this.isLoading = true;
      try {
        await this.$store.dispatch("article/fetchCategories");
      } catch (error) {
        this.error = error.message || "Something failed!";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.getAdmin;
    },
    getCategories() {
      return this.$store.getters["article/categories"];
    },
    hasCategories() {
      return this.$store.getters["article/hasCategories"];
    },
  },
};
</script>

<style scoped>
.btn.btn-primary {
  margin-left: 80%;
  margin-bottom: 20%;
}

#bla {
  width: 100%;
}

a {
  color: white;
}
</style>