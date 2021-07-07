<template>
  <!--  <the-header></the-header>    -->
  <div class="card">
    <img
      :src="imageUrl"
      class="card-img-top"
      alt="..."
      style="max-height: 300px"
    />
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <p class="card-text">
        {{ describe }}
      </p>
      <h5 class="card-title">Cijena: {{ price }} KM</h5>
      <!-- <a href="#!" class="btn btn-primary"><router-link to="/articles/kucanskiAparati/1">Detalji</router-link></a> -->
      <!-- <h3 id="h3"><router-link to="/articles/kucanskiAparati/1">Detalji</router-link></h3>  -->
      <button class="btn btn-primary" v-if="isLoggedIn" @click="updateArticle">
        Izmjeni
      </button>
      <button class="btn btn-primary" v-if="isLoggedIn" @click="deleteArticle">
        Izbriši
      </button>
      <h3 id="h3">
        <!-- <router-link :to="articleDetailLink">Detalji</router-link> -->
        <button class="btn btn-primary" @click="articleDetails">Detalji</button>
      </h3>
    </div>
  </div>
  <hr />
  <br />
  <br />
</template>

<script>
//import TheHeader from "../layout/TheHeader.vue";

export default {
  // components: { TheHeader },
  props: [
    "childrenKey",
    "id",
    "category",
    "name",
    "price",
    "describe",
    "imageUrl",
    "active",
  ],

  methods: {
    deleteArticle() {
      const articleData = {
        childrenKey: this.childrenKey,
        id: this.id,
        category: this.category,
        imageUrl: this.imageUrl,
        active: false,
        describe: this.describe,
        name: this.name,
        price: this.price,
      };
      this.$store.dispatch("article/deleteArticle", articleData); //article/addCategory --> article je namespace, addCategory je action u action.js
      var tmppp = this.getArticles;

      var tmp2 = JSON.stringify(articleData.childrenKey.toString().trim());
      for (let i = 0; i < tmppp.length; i++) {
        var tmp1 = JSON.stringify(tmppp[i].childrenKey).toString().trim();

        if (tmp1.localeCompare(tmp2) == 0) {
          // 0 vraca ako su jednaki
          tmppp.splice(i, 1);
          //this.isDeleting = true;
        }
      }
    },
    updateArticle() {
      this.$router.push({
        name: "new-article", // na pages NewArticle
        params: {
          childrenKey: this.childrenKey,
          id: this.id,
          category: this.category,
          imageUrl: this.imageUrl,
          active: false,
          describe: this.describe,
          name: this.name,
          price: this.price,
          update: true,
        },
      });
    },
    articleDetails() {
      this.$router.push({
        name: "article-detail", // na pages NewArticle
        params: {
          childrenKey: this.childrenKey,
          id: this.id,
          category: this.category,
          imageUrl: this.imageUrl,
          active: false,
          describe: this.describe,
          name: this.name,
          price: this.price,
          update: true,
          articleId: this.id,
        },
      });
    },
  },
  computed: {
    articleDetailLink() {
      return this.$route.path + "/articleDetail" + "/" + this.id;
    },
    isLoggedIn() {
      return this.$store.getters.getAdmin;
    },
    getArticles() {
      return this.$store.getters["article/articles"];
    },
  },
};
</script>

<style scoped>
#h3 {
  float: right;
}

.btn.btn-primary {
  font-size: 20px;
  margin: 20px;
}
</style>