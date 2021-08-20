<template>
  <tr>
    <th scope="row">
      <div class="row">
        <div class="column">
          <div class="card">
            <img
              v-if="screenWidth > currentWidth"
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
          <p v-if="screenWidth > currentWidth" class="articleHistory">
            {{ name }} » {{ category }}
          </p>
          <p v-else class="articleHistoryMDisplay">{{ name }}</p>
        </div>
      </div>
    </th>
    <th scope="row">
      <MDBBtn
        v-if="screenWidth > currentWidth"
        color="danger"
        @click="deleteArticleFromCart"
        id="deleteArticleFromCart"
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
    <th v-if="screenWidth > currentWidth" scope="row" id="articleQuantity">
      {{ quantity }}
    </th>
    <th v-else scope="row" id="articleQuantityMDisplay">{{ quantity }}</th>
    <th v-if="screenWidth > currentWidth" id="articlePrice">{{ price }}</th>
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
      screenWidth: window.innerWidth,
      currentWidth: 411,
    };
  },

  methods: {
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
  /*font-size: 5px;*/
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
}

.articleHistoryMDisplay {
  font-size: 8px;
  color: #39c0ed;
}
</style>