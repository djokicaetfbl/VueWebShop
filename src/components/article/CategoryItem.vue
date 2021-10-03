<template id="bla">
  <!-- <MDBListGroup horizontal>  -->
  <MDBListGroupItem
    style="max-width: 100%; outline: 2px solid #e8e8e8; margin: 1%"
  >
    <MDBCard style="max-width: 100%; margin: 1%">
      <!-- <MDBCardImg top :src="picture" class="img-fluid" alt="..." /> -->
      <!-- <img :src="imageUrl" class="responsive" /> -->
      <!-- 
      <img
        :src="imageUrl"
        style="width: 150px; height: 100px"
        v-if="!getIsSafeScreenZone && !getIsNormalScreenZone"
      />
      <img
        :src="imageUrl"
        v-if="getIsSafeScreenZone && !getIsNormalScreenZone"
        style="width: 140px; height: 100px"
      />
      <img :src="imageUrl" class="responsive" v-if="getIsNormalScreenZone" />
      -->

      <img
        :src="imageUrl"
        style="width: 150px; height: 100px; margin-left: 2%;"
        v-if="!isSafeScreenZone && !isNormalScreenZone"
      />
      <img
        :src="imageUrl"
        v-if="isSafeScreenZone && !isNormalScreenZone"
        style="width: 140px; height: 100px; margin-left: 2%;"
      />
      <img :src="imageUrl" class="responsive" v-if="isNormalScreenZone" style="margin-left: 2%;"/>

      <MDBCardBody style="max-width: 100%; height: 140px">
        <!-- OVO SAM DODAO -->
        <!-- <MDBCardText
          style="max-width: 100%"
          v-if="
            (!getIsSafeScreenZone && !getIsNormalScreenZone) ||
            getIsNormalScreenZone
          "
        > -->

        <MDBCardText
          style="max-width: 100%"
          v-if="
            (!isSafeScreenZone && !isNormalScreenZone) || isNormalScreenZone
          "
        >
          <router-link :to="categoryDetailsLink" v-if="!isLitMob"  style="font-size: 18px;">{{categoryName}}</router-link>
           <router-link :to="categoryDetailsLink" v-if="isLitMob" style="font-size: 12px;">{{categoryName}}</router-link>
          <br />
          <br />
          <button
            id="updateCategory"
            class="btn btn-primary"
            v-if="isLoggedIn && !isLitMob"
            @click="updateCategory()"
            style="font-size: 14px;"
          >
            <i class="fa fa-wrench" aria-hidden="true"></i>
            Izmjeni
          </button>

          <button
            id="updateCategory"
            class="btn btn-primary"
            v-if="isLoggedIn && isLitMob"
            @click="updateCategory()"
          >
            <i class="fa fa-wrench" aria-hidden="true"></i>
            &nbsp;&nbsp;&nbsp;
          </button>

          <button
            id="deleteCategory"
            class="btn btn-primary"
            v-if="isLoggedIn && isLitMob"
            @click="deleteCategory"
          >
            <i class="fa fa-trash" aria-hidden="true">&nbsp;&nbsp;</i>
            &nbsp;&nbsp;&nbsp;
          </button>

          <button
            id="deleteCategory"
            class="btn btn-primary"
            v-if="isLoggedIn && !isLitMob"
            @click="deleteCategory"
            style="font-size: 14px"
          >
            <i class="fa fa-trash" aria-hidden="true">&nbsp;&nbsp;</i>
            Ukloni
          </button>
        </MDBCardText>


        <!-- <MDBCardText
          style="max-width: 100%"
          v-if="getIsSafeScreenZone && !getIsNormalScreenZone"
        > -->
        <MDBCardText
          style="max-width: 100%"
          v-if="isSafeScreenZone && !isNormalScreenZone"
        >
          <div class="row" style="height: 80px">
            <router-link :to="categoryDetailsLink" id="cuzmala">{{
              categoryName
            }}</router-link>
          </div>
          <div class="row">
            <div class="column">
              <button
                id="updateCategory"
                class="btn btn-primary"
                v-if="isLoggedIn"
                @click="updateCategory()"
                style="float: left; width: 45%"
              >
                <i
                  class="fa fa-wrench"
                  aria-hidden="true"
                  style="font-size: 12"
                ></i>
              </button>
              <button
                id="deleteCategory"
                class="btn btn-primary"
                v-if="isLoggedIn"
                @click="deleteCategory"
                style="float: right; width: 45%"
              >
                <i
                  class="fa fa-trash"
                  aria-hidden="true"
                  style="font-size: 12px"
                  >&nbsp;&nbsp;</i
                >
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
      TO_BE_NORMAL_SCREEN: 1311,
      isNormalScreenZone: false,
      LIT_MOB: 390,
      isLitMob: false,
    };
  },

  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    /* this.currentScreenWidth = window.screen.width; // da nema sto puta ispis pa jednom pozvoe screen width
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
    }*/
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

  unmounted() {
    /* umjesto destry */
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    handleResize() {
      /*this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;*/
      console.log("A: " + window.innerWidth);

      this.screenWidth = window.innerWidth;
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

      if (this.screenWidth < this.LIT_MOB) {
        this.isLitMob = true;
      } else {
        this.isLitMob = false;
      }
    },
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
  float: right;
}

#updateCategory {
  background-color: #39c0ed;
  float: left;
}

.responsiveForMobile {
  width: 60px;
  height: 50px;
}

#cuzmala {
  font-size: 16px;
}
</style>