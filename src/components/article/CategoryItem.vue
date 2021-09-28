<template id="bla">
  <!-- <MDBListGroup horizontal>  -->
  <MDBListGroupItem
    style="max-width: 100%; outline: 2px solid #e8e8e8; margin: 1%"
  >
    <MDBCard style="max-width: 100%">
      <!-- <MDBCardImg top :src="picture" class="img-fluid" alt="..." /> -->
      <!-- <img :src="imageUrl" class="responsive" /> -->
      <img
        :src="imageUrl"
        style="width: 150px; height: 100px"
        v-if="!getIsSafeScreenZone && !getIsNormalScreenZone"
      />
      <img
        :src="imageUrl"
        v-if="getIsSafeScreenZone && !getIsNormalScreenZone"
        style="width: 150px; height: 100px"
      />
      <img :src="imageUrl" class="responsive" v-if="getIsNormalScreenZone" />

      <!-- <div v-if="!getIsSafeScreenZone && !getIsNormalScreenZone">JEDAN</div>
      <div v-if="getIsSafeScreenZone && !getIsNormalScreenZone">DVA</div>
      <div v-if="getIsNormalScreenZone">TRI</div>
      -->

      <MDBCardBody style="max-width: 100%; height: 140px">
        <!-- OVO SAM DODAO -->
        <MDBCardText
          style="max-width: 100%"
          v-if="
            (!getIsSafeScreenZone && !getIsNormalScreenZone) ||
            getIsNormalScreenZone
          "
        >
          <!-- <router-link to="/articles/{{ categoryName}}">{{
            categoryName
          }}</router-link>  -->
          <router-link :to="categoryDetailsLink">{{
            categoryName
          }}</router-link>
          <br />
          <br />
          <button
            id="updateCategory"
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

        <MDBCardText
          style="max-width: 100%"
          v-if="getIsSafeScreenZone && !getIsNormalScreenZone"
        >
        <div class="row" style="height: 80px">
          <router-link :to="categoryDetailsLink" id="cuzmala">{{
            categoryName
          }}</router-link>
          </div>
          <div class="row" >
            <div class="column">
          <button
            id="updateCategory"
            class="btn btn-primary"
            v-if="isLoggedIn"
            @click="updateCategory()"
            style="float: left; width: 45%;"
          >
            <i class="fa fa-wrench" aria-hidden="true" style="font-size: 10px"></i>           
          </button>
           <button
            id="deleteCategory"
            class="btn btn-primary"
            v-if="isLoggedIn"
            @click="deleteCategory"
            style="float: right; width: 45%;"
          >
            <i class="fa fa-trash" aria-hidden="true" style="font-size: 10px">&nbsp;&nbsp;</i>
          </button>
          </div>
 
          </div>
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
      isSafeScreenZone: false,
      MOBILE_WIDTH_HORIZONTAL_MAX: 920,
      TO_BE_NORMAL_SCREEN: 1256,
      isNormalScreenZone: false,
    };
  },

  created() {
    this.currentScreenWidth = window.screen.width; // da nema sto puta ispis pa jednom pozvoe screen width
    if (
      this.screenWidth > this.MOBILE_WIDTH_HORIZONTAL_MAX &&
      this.screenWidth <= this.TO_BE_NORMAL_SCREEN
    ) {
      this.isSafeScreenZone = true;
    } else {
      this.isSafeScreenZone = false;
    }
    if (this.screenWidth > this.TO_BE_NORMAL_SCREEN) {
      this.isNormalScreenZone = true;
    } else {
      this.isNormalScreenZone = false;
    }
  },

  /* mounted() {
    // IZVRSIT CE SE PRIJE NEGO SE KOMPONENTA UCITA
    window.onresize = () => {
      // da nema sto puta ispis pa jednom pozvoe screen width
      this.screenWidth = window.screen.width;
      if ( this.screenWidth > this.MOBILE_WIDTH_HORIZONTAL_MAX && this.screenWidth <= this.TO_BE_NORMAL_SCREEN) {
        this.isSafeScreenZone = true;
        console.log("SREDNJI JESTE");
      } else {
        this.isSafeScreenZone = false;
      }
      if ( this.screenWidth > this.TO_BE_NORMAL_SCREEN) {
        this.isNormalScreenZone = true;
      } else {
        this.isNormalScreenZone = false;
        console.log("NORMAL NIJE");
      }
    };
  },*/

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
        name: "new-category", // na pages NewCategory :D , pa CetegoryForm
        params: {
          childrenKey: this.childrenKey,
          id: this.id,
          categoryName: this.categoryName,
          imageUrl: this.imageUrl,
          active: this.active,
          update: true,
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
    categoryDetailsLink() {
      return this.$route.path + "/" + this.categoryName;
    },
    getIsSafeScreenZone() {
      return this.isSafeScreenZone;
    },
    getIsNormalScreenZone() {
      return this.isNormalScreenZone;
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

a {
  font-size: 20px;
}

.responsive {
  width: 300px;
  height: 200px;
}
#deleteCategory {
  background-color: #f93154;
}

#updateCategory {
  background-color: #39c0ed;
}

.responsiveForMobile {
  width: 60px;
  height: 50px;
}

#cuzmala {
  font-size: 16px;
}
</style>