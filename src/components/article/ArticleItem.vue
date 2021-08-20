<template>
  <!--  <the-header></the-header>    -->
  <div class="card">
    <img
      :src="imageUrl"
      class="card-img-top"
      alt="..."
      style="max-height: 300px; max-width: 500px"
    />
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <p class="card-text">
        {{ describe }}
      </p>
      <h5 class="card-title">Cijena: {{ price }} KM</h5>
      <!-- <a href="#!" class="btn btn-primary"><router-link to="/articles/kucanskiAparati/1">Detalji</router-link></a> -->
      <!-- <h3 id="h3"><router-link to="/articles/kucanskiAparati/1">Detalji</router-link></h3>  -->
      <button
        id="updateArticle"
        class="btn btn-primary"
        v-if="isLoggedIn"
        @click="updateArticle"
      >
        Izmjeni
      </button>
      <button
        id="deleteArticle"
        class="btn btn-primary"
        v-if="isLoggedIn"
        @click="deleteArticle"
      >
        Izbriši
      </button>
      <h3 id="h3">
        <!-- <router-link :to="articleDetailLink">Detalji</router-link> -->
        <button v-if="!isMobile"
          id="articleDetails"
          class="btn btn-primary"
          @click="articleDetails"
        >
          Detalji
        </button>
      </h3>
      <button v-if="isMobile"
          id="articleDetails"
          class="btn btn-primary"
          @click="articleDetails"
        >
          Detalji
        </button>
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

  data() {
    return {
      screenWidth: window.screen.width /*window.innerWidth,*/,
      currentWidth: 500,
      isLoading: false,

      isMobile: false,
      MOBILE_WIDTH: 500,
    };
  },

  created() {
    this.currentScreenWidth = window.screen.width;
    if (this.screenWidth < this.MOBILE_WIDTH) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  },

  mounted() {
    // IZVRSIT CE SE PRIJE NEGO SE KOMPONENTA UCITA
    this.currentScreenWidth = window.screen.width;
    window.onresize = () => {
      this.currentScreenWidth = window.screen.width;
      if (this.screenWidth < this.MOBILE_WIDTH) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    };
  },

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

#updateArticle {
  background-color: #39c0ed;
}

#deleteArticle {
  background-color: #f93154;
}

#articleDetails {
  background-color: #b23cfd;
}

</style>