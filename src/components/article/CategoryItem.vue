<template id="bla">
  <!-- <MDBListGroup horizontal>  -->
  <MDBListGroupItem style="max-width: 100%">
    <MDBCard style="max-width: 100%">
      <!-- <MDBCardImg top :src="picture" class="img-fluid" alt="..." /> -->
      <img :src="imageUrl" class="responsive" />
      <MDBCardBody style="max-width: 100%">
        <MDBCardText style="max-width: 100%">
          <router-link to="/articles/kucanskiAparati">{{
            categoryName
          }}</router-link>
          <br />
          <br />
          <button
            id="deleteCategory"
            class="btn btn-primary"
            v-if="isLoggedIn"
            @click="updateCategory()"
          >
            <i class="fa fa-wrench" aria-hidden="true"></i>

            Izmjeni
          </button>
          <button
            id="deleteCategory"
            class="btn btn-primary"
            v-if="isLoggedIn"
            @click="deleteCategory"
          >
            <i class="fa fa-trash" aria-hidden="true">&nbsp;&nbsp;</i>
            Ukloni
          </button>
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  </MDBListGroupItem>
  <!-- </MDBListGroup>  -->
</template>

<script>
import {
  //MDBListGroup,
  MDBListGroupItem,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  //MDBCardImg,
  mdbRipple,
} from "mdb-vue-ui-kit";

//import storeArticle from '../../store/modules/articles/mutations.js';

export default {
  props: ["childrenKey", "id", "categoryName", "imageUrl", "active"],
  components: {
    // MDBListGroup,
    MDBListGroupItem,
    MDBCard,
    MDBCardBody,
    MDBCardText,
    //MDBCardImg,
  },
  directives: {
    mdbRipple,
  },

  data() {
    return {
      screenWidth: window.innerWidth,
    };
  },

  methods: {
    deleteCategory() {
      const categoryData = {
        childrenKey: this.childrenKey,
        id: this.id,
        categoryName: this.categoryName,
        imageUrl: this.imageUrl,
        active: false,
      };
      this.$store.dispatch("article/deleteCategory", categoryData); //article/addCategory --> article je namespace, addCategory je action u action.js
      var tmppp = this.getCategories;

      var tmp2 = JSON.stringify(categoryData.childrenKey.toString().trim());
      for (let i = 0; i < tmppp.length; i++) {
        var tmp1 = JSON.stringify(tmppp[i].childrenKey).toString().trim();

        if (tmp1.localeCompare(tmp2) == 0) {
          // 0 vraca ako su jednaki
          tmppp.splice(i, 1);
          this.isDeleting = true;
        }
      }
    },
    updateCategory() {
      this.$router.push({
        name: "new-category",
        params: {
          childrenKey: this.childrenKey,
          id: this.id,
          categoryName: this.categoryName,
          imageUrl: this.imageUrl,
          active: this.active,
        },
      });
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.getAdmin;
    },
    getCategories() {
      return this.$store.getters["article/categories"];
    },
    currentScreenWidth() {
      return this.screenWidth;
    },
  },
};
</script>

<style scoped>
.list-group-item {
  height: auto;
}

.btn.btn-primary {
  float: right;
  font-size: 16px;
}

#bla {
  width: 100%;
}

.responsive {
  width: 300px;
  height: 200px;
}

.responsiveForMobile {
  width: 60px;
  height: 50px;
}
</style>