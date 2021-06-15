<template id="bla">
  <div>
    <the-header></the-header>
    <section>
      <base-card>
        <h2>Kategorije</h2>
        
        <category-item>
          
        </category-item>
      </base-card>
      <button class="btn btn-primary" v-if="isLoggedIn" @click="dodajKategoriju"> <router-link to="/newCategory">Dodaj kategoriju</router-link></button>
    </section>
  </div>
</template>

<script>
import TheHeader from "../../components/layout/TheHeader.vue";
import CategoryItem from '../../components/article/CategoryItem.vue';

export default {
  components: { TheHeader, CategoryItem },
    methods: {
    dodajKategoriju() {
      console.log("Dodaj kategoriju!");
    }
  },
    computed: {
    isLoggedIn() {
      return this.$store.getters.getAdmin;
    },
  },
};
</script>

<style scoped>
.btn.btn-primary{
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