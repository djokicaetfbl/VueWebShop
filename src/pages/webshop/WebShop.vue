<template id="bla">
  <div>
    <the-header></the-header>
    <div v-if="currentScreenWidth > 700">
      <section class="sekcija"> <!-- do 4 artikla 60 % -->
        <!-- <base-card>  -->
        <h2>Kategorije {{ screenWidth }}</h2>

        <div v-if="hasCategories">
          <div v-if="getCategoriesListSize">
            <MDBListGroup horizontal>
              <category-item
                v-for="category in sliceItems(0, 4)"
                :key="category.id"
                :childrenKey="category.childrenKey"
                :categoryName="category.categoryName"
                :imageUrl="category.imageUrl"
                :active="category.active"
                :id="category.id"
              >
              </category-item>
            </MDBListGroup>
          </div>
          <br />
          <div v-if="getCategoriesListSize > 4 && getCategoriesListSize < 8">
            <MDBListGroup horizontal>
              <category-item
                v-for="category in sliceItems(4, 7)"
                :key="category.id"
                :childrenKey="category.childrenKey"
                :categoryName="category.categoryName"
                :imageUrl="category.imageUrl"
                :active="category.active"
                :id="category.id"
              >
              </category-item>
            </MDBListGroup>
          </div>
          <br />
          <div v-if="getCategoriesListSize > 7 && getCategoriesListSize < 11">
            <MDBListGroup horizontal>
              <category-item
                v-for="category in sliceItems(7, 11)"
                :key="category.id"
                :childrenKey="category.childrenKey"
                :categoryName="category.categoryName"
                :imageUrl="category.imageUrl"
                :active="category.active"
                :id="category.id"
              >
              </category-item>
            </MDBListGroup>
          </div>
        </div>
        <!-- </base-card> -->
        <button
          class="btn btn-primary"
          v-if="isLoggedIn"
          @click="dodajKategoriju"
        >
          <router-link to="/newCategory">Dodaj kategoriju</router-link>
        </button>
      </section>
    </div>
  </div>
</template>


<script>
import TheHeader from "../../components/layout/TheHeader.vue";
import CategoryItem from "../../components/article/CategoryItem.vue";
import { MDBListGroup } from "mdb-vue-ui-kit";

export default {
  components: { TheHeader, CategoryItem, MDBListGroup },
  data() {
    return {
      screenWidth: window.innerWidth,
    };
  },
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
    currentScreenWidth() {
      return this.screenWidth;
    },
    isLoggedIn() {
      return this.$store.getters.getAdmin;
    },
    getCategories() {
      //console.log("DOBIO SAM: "+JSON.stringify(this.$store.getters["article/categories"]));
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
  margin-left: 90%;
  margin-bottom: 20%;
  margin-top: 5%;
}

.sekcija {
  position: absolute;
  top: 80%; /* ako su 4 elementa onda 60% ako je vise od4 onda 80%*/
  left: 50%;
  transform: translate(-50%, -50%);
}

#bla {
  width: 100%;
}

a {
  color: white;
}
</style>