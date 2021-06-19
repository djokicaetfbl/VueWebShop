<template id="bla">
  <div>
    <the-header></the-header>
    <section>
      <base-card>
        <h2>Kategorije</h2>
        <div v-if="hasCategories">
          <div v-if="getCategoriesListSize > 0">
            <MDBListGroup horizontal>
              <category-item
                v-for="category in sliceItems(0, 3)"
                :key="category.id"
                :name="category.categoryName"
                :picture="category.imageUrl"
              >
              </category-item>
            </MDBListGroup>
          </div>
          <div v-if="getCategoriesListSize > 3 && getCategoriesListSize < 7">
            <MDBListGroup horizontal>
              <category-item
                v-for="category in sliceItems(3, 6)"
                :key="category.id"
                :name="category.categoryName"
                :picture="category.imageUrl"
              >
              </category-item>
            </MDBListGroup>
          </div>
          <div v-if="getCategoriesListSize > 6 && getCategoriesListSize < 9">
            <MDBListGroup horizontal>
              <category-item
                v-for="category in sliceItems(6, 9)"
                :key="category.id"
                :name="category.categoryName"
                :picture="category.imageUrl"
              >
              </category-item>
            </MDBListGroup>
          </div>
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
import { MDBListGroup } from "mdb-vue-ui-kit";

export default {
  components: { TheHeader, CategoryItem, MDBListGroup },
  created() {
    //izvrsit ce se kada se ova komponenta kreira
    this.loadCategories();
  },
  methods: {
    dodajKategoriju() {
      console.log("Dodaj kategoriju!");
    },
    sliceItems: function (start, end) {
      return this.getCategories.slice(start, end);
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
    getCategoriesListSize() {
      //categoriesListSize
      return this.$store.getters["article/categoriesListSize"]; // article je naziv modula :D
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