<template id="bla">
  <div v-if="!isMobileHrizontal">
    <div>
      <the-header-basic v-if="!isLitMob" style="width: 100%"></the-header-basic>
      <the-header-basic v-if="isLitMob" style="width: 120%"></the-header-basic>
      <br />
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <div
        v-if="
          currentScreenWidth > currentWidth &&
          getCategoriesListSize < 5 &&
          !isLoggedIn
        "
        class="sekcijaDo4"
      >
        <section>
          <br />
          <h2>Kategorije</h2>
          <hr />

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
            <div v-if="getCategoriesListSize > 4">
              <!-- && getCategoriesListSize < 9 -->
              <MDBListGroup horizontal>
                <category-item
                  v-for="category in sliceItems(4, 8)"
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
            <div v-if="getCategoriesListSize > 8 && getCategoriesListSize < 11">
              <MDBListGroup horizontal>
                <category-item
                  v-for="category in sliceItems(8, 12)"
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
            @click="$router.push('/newCategory')"
          >
            <i class="fa fa-plus" aria-hidden="true">&nbsp;&nbsp;</i>
            <!-- <router-link to="/newCategory">Dodaj kategoriju</router-link>  -->
            Dodaj kategoriju
          </button>
        </section>
      </div>

      <div
        v-else-if="
          currentScreenWidth > currentWidth &&
          getCategoriesListSize > 4 &&
          getCategoriesListSize < 9 &&
          !isLoggedIn
        "
        class="sekcijaDo8"
      >
        <!-- && getCategoriesListSize > 4 && getCategoriesListSize < 8 -->
        <section>
          <!-- class="sekcijaDo8" do 4 artikla 60 % -->
          <!-- <base-card>  -->
          <br />
          <h2 style="margin-top: 10%">Kategorije</h2>
          <hr />

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
            <div v-if="getCategoriesListSize > 4">
              <!-- && getCategoriesListSize < 9 -->
              <MDBListGroup horizontal>
                <category-item
                  v-for="category in sliceItems(4, 8)"
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
            <div v-if="getCategoriesListSize > 8 && getCategoriesListSize < 11">
              <MDBListGroup horizontal>
                <category-item
                  v-for="category in sliceItems(8, 12)"
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
            @click="$router.push('/newCategory')"
          >
            <i class="fa fa-plus" aria-hidden="true">&nbsp;&nbsp;</i>
            <!-- <router-link to="/newCategory">Dodaj kategoriju</router-link>  -->
            Dodaj kategoriju
          </button>
        </section>
      </div>

      <div
        v-else-if="
          currentScreenWidth > currentWidth &&
          getCategoriesListSize > 8 &&
          getCategoriesListSize < 13 &&
          !isLoggedIn
        "
        class="sekcijaDo12"
      >
        <!-- && getCategoriesListSize > 4 && getCategoriesListSize < 8 -->
        <section>
          <!-- class="sekcijaDo8" do 4 artikla 60 % -->
          <!-- <base-card>  -->
          <br />
          <h2>Kategorije</h2>
          <hr />

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
            <div v-if="getCategoriesListSize > 4">
              <!-- && getCategoriesListSize < 9 -->
              <MDBListGroup horizontal>
                <category-item
                  v-for="category in sliceItems(4, 8)"
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
            <div v-if="getCategoriesListSize > 8 && getCategoriesListSize < 11">
              <MDBListGroup horizontal>
                <category-item
                  v-for="category in sliceItems(8, 12)"
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
            @click="$router.push('/newCategory')"
          >
            <i class="fa fa-plus" aria-hidden="true">&nbsp;&nbsp;</i>
            <!-- <router-link to="/newCategory">Dodaj kategoriju</router-link>  -->
            Dodaj kategoriju
          </button>
        </section>
      </div>

      <div
        v-else-if="
          currentScreenWidth > currentWidth &&
          getCategoriesListSize > 12 &&
          getCategoriesListSize < 17 &&
          !isLoggedIn
        "
        class="sekcijaDo16"
      >
        <!-- && getCategoriesListSize > 4 && getCategoriesListSize < 8 -->
        <section>
          <!-- class="sekcijaDo8" do 4 artikla 60 % -->
          <!-- <base-card>  -->
          <br />
          <h2>Kategorije</h2>
          <hr />

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
            <div v-if="getCategoriesListSize > 4">
              <!-- && getCategoriesListSize < 9 -->
              <MDBListGroup horizontal>
                <category-item
                  v-for="category in sliceItems(4, 8)"
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
            <div v-if="getCategoriesListSize > 8 && getCategoriesListSize < 11">
              <MDBListGroup horizontal>
                <category-item
                  v-for="category in sliceItems(8, 12)"
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
            @click="$router.push('/newCategory')"
          >
            <i class="fa fa-plus" aria-hidden="true">&nbsp;&nbsp;</i>
            <!-- <router-link to="/newCategory">Dodaj kategoriju</router-link>  -->
            Dodaj kategoriju
          </button>
        </section>
      </div>

      <div
        style="margin-top: 5%"
        v-if="
          currentScreenWidth > currentWidth &&
          getCategoriesListSize < 5 &&
          isLoggedIn
        "
        class="sekcijaDo8"
      >
        <!-- && getCategoriesListSize > 4 && getCategoriesListSize < 8 -->
        <section>
          <!-- class="sekcijaDo8" do 4 artikla 60 % -->
          <!-- <base-card>  -->
          <br />
          <h2>Kategorije</h2>

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
            <div v-if="getCategoriesListSize > 4">
              <!-- && getCategoriesListSize < 9 -->
              <MDBListGroup horizontal>
                <category-item
                  v-for="category in sliceItems(4, 8)"
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
            <div v-if="getCategoriesListSize > 8 && getCategoriesListSize < 11">
              <MDBListGroup horizontal>
                <category-item
                  v-for="category in sliceItems(8, 12)"
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
            @click="$router.push('/newCategory')"
          >
            <i class="fa fa-plus" aria-hidden="true">&nbsp;&nbsp;</i>
            <!-- <router-link to="/newCategory">Dodaj kategoriju</router-link>  -->
            Dodaj kategoriju
          </button>
        </section>
      </div>

      <div
        style="margin-top: 5%"
        v-else-if="
          currentScreenWidth > currentWidth &&
          getCategoriesListSize > 4 &&
          getCategoriesListSize < 9 &&
          isLoggedIn
        "
        class="sekcijaDo12"
      >
        <!-- && getCategoriesListSize > 4 && getCategoriesListSize < 8 -->
        <section>
          <!-- class="sekcijaDo8" do 4 artikla 60 % -->
          <!-- <base-card>  -->
          <br />
          <h2>Kategorije</h2>
          <hr />

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
            <div v-if="getCategoriesListSize > 4">
              <!-- && getCategoriesListSize < 9 -->
              <MDBListGroup horizontal>
                <category-item
                  v-for="category in sliceItems(4, 8)"
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
            <div v-if="getCategoriesListSize > 8 && getCategoriesListSize < 11">
              <MDBListGroup horizontal>
                <category-item
                  v-for="category in sliceItems(8, 12)"
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
            @click="$router.push('/newCategory')"
          >
            <i class="fa fa-plus" aria-hidden="true">&nbsp;&nbsp;</i>
            <!-- <router-link to="/newCategory">Dodaj kategoriju</router-link>  -->
            Dodaj kategoriju
          </button>
        </section>
      </div>

      <div
        v-else-if="
          currentScreenWidth > currentWidth &&
          getCategoriesListSize > 8 &&
          getCategoriesListSize < 13 &&
          isLoggedIn
        "
        class="sekcijaDo16"
        style="margin-top: 5%"
      >
        <!-- && getCategoriesListSize > 4 && getCategoriesListSize < 8 -->
        <section>
          <!-- class="sekcijaDo8" do 4 artikla 60 % -->
          <!-- <base-card>  -->
          <br />
          <h2>Kategorije</h2>
          <hr />

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
            <div v-if="getCategoriesListSize > 4">
              <!-- && getCategoriesListSize < 9 -->
              <MDBListGroup horizontal>
                <category-item
                  v-for="category in sliceItems(4, 8)"
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

            <div v-if="getCategoriesListSize > 8 && getCategoriesListSize < 11">
              <MDBListGroup horizontal>
                <category-item
                  v-for="category in sliceItems(8, 12)"
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
            @click="$router.push('/newCategory')"
          >
            <i class="fa fa-plus" aria-hidden="true">&nbsp;&nbsp;</i>
            <!-- <router-link to="/newCategory">Dodaj kategoriju</router-link>  -->
            Dodaj kategoriju
          </button>
        </section>
      </div>

      <div
        v-else-if="
          currentScreenWidth > currentWidth &&
          getCategoriesListSize > 12 &&
          getCategoriesListSize < 17 &&
          isLoggedIn
        "
        class="sekcijaDo20"
      >
        <!-- && getCategoriesListSize > 4 && getCategoriesListSize < 8 -->
        <section>
          <!-- class="sekcijaDo8" do 4 artikla 60 % -->
          <!-- <base-card>  -->
          <br />
          <h2>Kategorije</h2>
          <hr />

          <div v-if="hasCategories">
            <!-- DJOLE -->
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
            <div v-if="getCategoriesListSize > 4">
              <!-- && getCategoriesListSize < 9 -->
              <MDBListGroup horizontal>
                <category-item
                  v-for="category in sliceItems(4, 8)"
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
            <div v-if="getCategoriesListSize > 8 && getCategoriesListSize < 11">
              <MDBListGroup horizontal>
                <category-item
                  v-for="category in sliceItems(8, 12)"
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
            @click="$router.push('/newCategory')"
          >
            <i class="fa fa-plus" aria-hidden="true">&nbsp;&nbsp;</i>
            <!-- <router-link to="/newCategory">Dodaj kategoriju</router-link>  -->
            Dodaj kategoriju
          </button>
        </section>
      </div>

      <div v-else-if="currentScreenWidth < currentWidth + 1">
        <!-- && getCategoriesListSize > 4 && getCategoriesListSize < 8 -->
        <section>
          <!-- class="sekcijaDo8" do 4 artikla 60 % -->
          <!-- <base-card>  -->
          <br />
          <h2>Kategorije</h2>
          <hr />

          <div v-if="hasCategories">
            <div v-if="getCategoriesListSize">
              <MDBListGroup vertical>
                <category-item
                  v-for="category in getCategories"
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
          </div>
          <!-- </base-card> -->
          <button
            class="btn btn-primary"
            style="margin-right: 5%"
            v-if="isLoggedIn && currentScreenWidth < currentWidth + 1"
            @click="$router.push('/newCategory')"
          >
            + Dodaj kategoriju
          </button>

          <button
            class="btn btn-primary"
            v-if="isLoggedIn && currentScreenWidth > currentWidth"
            @click="$router.push('/newCategory')"
          >
            <i class="fa fa-plus" aria-hidden="true">&nbsp;&nbsp;</i>
            <!-- <router-link to="/newCategory">Dodaj kategoriju</router-link>  -->
            Dodaj kategoriju
          </button>
        </section>
      </div>
    </div>
  </div>

  <div v-if="isMobileHrizontal">
    <the-header-basic v-if="!isLitMob"></the-header-basic>
    <the-header-basic v-if="isLitMob" style="width: 120%;"></the-header-basic>
    <base-card>
      <div class="card>">
        <section>
          <br />
          <h2>Kategorije</h2>
          <hr />
          <div v-if="getCategoriesListSize">
            <MDBListGroup vertical>
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
          <div v-if="getCategoriesListSize > 4">
            <MDBListGroup vertical>
              <category-item
                v-for="category in sliceItems(4, 8)"
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
          <div v-if="getCategoriesListSize > 8 && getCategoriesListSize < 11">
            <MDBListGroup vertical>
              <category-item
                v-for="category in sliceItems(8, 12)"
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
          <button
            class="btn btn-primary"
            v-if="isLoggedIn"
            @click="$router.push('/newCategory')"
          >
            <i class="fa fa-plus" aria-hidden="true">&nbsp;&nbsp;</i>
            <!-- <router-link to="/newCategory">Dodaj kategoriju</router-link>  -->
            Dodaj kategoriju
          </button>
        </section>
      </div>
    </base-card>
  </div>
</template>


<script>
import TheHeaderBasic from "../../components/layout/TheHeaderBasic.vue";
import CategoryItem from "../../components/article/CategoryItem.vue";
import { MDBListGroup } from "mdb-vue-ui-kit";
import BaseCard from "../../components/ui/BaseCard.vue";

export default {
  components: { TheHeaderBasic, CategoryItem, MDBListGroup, BaseCard },
  data() {
    return {
      screenWidth: window.screen.width /*window.innerWidth,*/,
      currentWidth: 500,
      isLoading: false,
      isEdgeNormal: false,
      isMobileHrizontal: false,
      isLitMob: false,
      MOBILE_WIDTH: 500,
      //MOBILE_WIDTH: 700,
      //MOBILE_WIDTH_HORIZONTAL_MIN:  700,
      MOBILE_WIDTH_HORIZONTAL_MIN: 500,
      MOBILE_WIDTH_HORIZONTAL_MAX: 920,
      EDGE_NORMAL_WIDTH: 1255,
      LIT_MOB_WIDTH: 351,
    };
  },
  created() {
    //izvrsit ce se kada se ova komponenta kreira, tj pi svakom ozivu ove komponente
    this.loadCategories();
    //this.screenWidth = window.screen.width;
    this.currentScreenWidth = window.screen.width;
    console.log("AA");
    if (
      this.screenWidth > this.MOBILE_WIDTH_HORIZONTAL_MIN &&
      this.screenWidth < this.MOBILE_WIDTH_HORIZONTAL_MAX
    ) {
      this.isMobileHrizontal = true;
    } else {
      this.isMobileHrizontal = false;
    }
    if (this.screenWidth < this.LIT_MOB_WIDTH) {
      this.isLitMob = true;
    } else {
      this.isLitMob = false;
    }
  },

  mounted() {
    // IZVRSIT CE SE PRIJE NEGO SE KOMPONENTA UCITA
    window.onresize = () => {
      this.screenWidth = window.screen.width; //window.innerWidth; // ovo this.screenWidth se vraca preko computed : currentScreenWidth
      if (
        this.screenWidth > this.MOBILE_WIDTH_HORIZONTAL_MIN &&
        this.screenWidth < this.MOBILE_WIDTH_HORIZONTAL_MAX
      ) {
        this.isMobileHrizontal = true;
      } else {
        this.isMobileHrizontal = false;
      }

      if (this.screenWidth < this.LIT_MOB_WIDTH) {
        this.isLitMob = true;
      } else {
        this.isLitMob = false;
      }
    };
  },

  methods: {
    dodajKategoriju() {
      console.log("Dodaj kategoriju!");
    },
    sliceItems: function (start, end) {
      return this.getCategories.slice(start, end);
    },
    /*async*/ loadCategories() {
      this.isLoading = true;
      try {
        setTimeout(() => {
          /*await*/ this.$store.dispatch("article/fetchCategories");
          this.isLoading = false;
        }, 2000); // sa ovim sam rijesio problem kad mi se vrati sadrzaj nakon 1 sekunde :D
        //await this.$store.dispatch("article/fetchCategories");
        //console.log("DJOLENCE!");
      } catch (error) {
        this.error = error.message || "Something failed!";
      }
      //this.isLoading = false;
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
  /*margin-left: 70%;*/
  float: right;
  margin-bottom: 20%;
  margin-top: 5%;
  font-size: 16px;
  background-color: #00b74a;
  height: 80px;
}

.sekcijaDo4 {
  position: absolute;
  top: 40%; /* ako su 4 elementa onda 60% ako je vise od4 onda 80%*/
  left: 50%;
  transform: translate(-50%, -50%);
}

.sekcijaDo8 {
  position: absolute;
  top: 60%; /* ako su 4 elementa onda 60% ako je vise od4 onda 80%*/
  left: 50%;
  transform: translate(-50%, -50%);
}

.sekcijaDo12 {
  position: absolute;
  top: 80%; /* ako su 4 elementa onda 60% ako je vise od4 onda 80%*/
  left: 50%;
  transform: translate(-50%, -50%);
}

.sekcijaDo16 {
  position: absolute;
  top: 100%; /* ako su 4 elementa onda 60% ako je vise od4 onda 80%*/
  left: 50%;
  transform: translate(-50%, -50%);
}

.sekcijaDo20 {
  position: absolute;
  top: 120%; /* ako su 4 elementa onda 60% ako je vise od4 onda 80%*/
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