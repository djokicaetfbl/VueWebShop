<template>
  <tr>
    <th scope="row">
      <div class="row">
        <div class="column">
          <div class="card">
            <img
              v-if="!isMobile"
              :src="imageUrl"
              class="card-img-top"
              alt="..."
              style="max-height: 300px; max-width: 500px"
            />
            <img
              v-else
              :src="imageUrl"
              class="card-img-top"
              alt="..."
              style="height: 50px; width: 50px"
            />
          </div>
        </div>
        <div class="card-body">
          <br />
          <!-- <p v-if="!isMobile" class="articleHistory">
            {{ name }} » {{ category }}
          </p>  -->
          <!-- <p v-else class="articleHistoryMDisplay">{{ name }}</p> -->
        </div>
      </div>
    </th>
    <th scope="row">
      <MDBBtn
        v-if="!isMobile"
        color="danger"
        @click="deleteArticleFromCart"
        id="deleteArticleFromCart"
        style="margin-top: 0.2%"
        ><i class="fa fa-trash" aria-hidden="true">&nbsp;&nbsp;</i
        >Ukloni</MDBBtn
      >
      <MDBBtn
        v-else
        color="danger"
        @click="deleteArticleFromCart"
        id="deleteArticleFromCartMDisplay"
        ><i class="fa fa-trash fa-sm" aria-hidden="true"
          >&nbsp;&nbsp;</i
        ></MDBBtn
      >
    </th>
    <th v-if="!isMobile" scope="row" id="articleQuantity">
      {{ quantity }}
    </th>
    <th v-else scope="row" id="articleQuantityMDisplay">{{ quantity }}</th>
    <th v-if="!isMobile" id="articlePrice">{{ price }}</th>
    <th v-else id="articlePriceMDisplay">{{ price }}</th>
  </tr>
</template>

<script>
import { MDBBtn } from "mdb-vue-ui-kit";

export default {
  components: { MDBBtn },
  props: [
    "childrenKey",
    "id",
    "category",
    "name",
    "price",
    "describe",
    "imageUrl",
    "active",
    "quantity",
  ],
  data() {
    return {
      currentScreenWidth: window.screen.width,
      currentWidth: 570,
      isLoading: false,
      isMobile: false,
    };
  },

  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();

    /*this.currentScreenWidth = window.screen.width;
    if (this.currentScreenWidth < this.currentWidth) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }*/
  },
  mounted() {
    // IZVRSIT CE SE PRIJE NEGO SE KOMPONENTA UCITA
    /*this.currentScreenWidth = window.screen.width;
    window.onresize = () => {
      this.currentScreenWidth = window.screen.width;
      if (this.currentScreenWidth < this.currentWidth) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
      this.created;
    };*/
  },

  unmounted() { /* umjesto destry */
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    handleResize() {
      /*this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;*/
      this.currentScreenWidth = window.innerWidth;
      if (this.currentScreenWidth < this.currentWidth) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
    deleteArticleFromCart() {
      var cart = this.getCart;
      for (var i = 0; i < cart.length; i++) {
        if (
          cart[i].id
            .toString()
            .trim()
            .localeCompare(this.id.toString().trim()) === 0
        ) {
          cart.splice(i, 1);
          this.$store.dispatch("article/setCart", cart);
        }
      }
    },
  },
  computed: {
    getCart() {
      return this.$store.getters["article/cart"];
    },
  },
};
</script>

<style scoped>
#deleteArticleFromCart {
  font-size: 14px;
  margin-top: -10%;
}

#deleteArticleFromCartMDisplay {
  margin-top: -10%;
  margin-left: -20px;
}

#articleQuantity {
  font-size: 20px;
  text-align: center;
}

#articleQuantityMDisplay {
  font-size: 12px;
  text-align: center;
}

#articlePrice {
  font-size: 20px;
}

#articlePriceMDisplay {
  font-size: 12px;
}

.articleHistory {
  font-size: 18px;
  color: #39c0ed;

  /*width: 25ch;
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;*/
}

.articleHistoryMDisplay {
  font-size: 8px;
  color: #39c0ed;
  white-space: normal;
  /*width: 5ch;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;*/
}
</style>