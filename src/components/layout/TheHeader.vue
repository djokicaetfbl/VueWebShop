<template id="bla">
  <header style="height: 100%">
    <MDBNavbarItem>
      <router-link to="/cart"
        ><span class="badge badge-pill bg-danger">{{
          this.getCart.length ? this.getCart.length : 0
        }}</span>
        <span><MDBIcon icon="shopping-cart" size="2x"></MDBIcon></span
      ></router-link>
    </MDBNavbarItem>
    <nav>
      <h1><router-link to="/">Web Shop</router-link></h1>
      <!-- <MDBIcon icon="shopping-bag" iconStyle="fas" size="3x" />  -->

      <MDBNavbarItem class="me-3 me-lg-0 dropdown">
        <MDBDropdown v-model="dropdown3">
          <MDBDropdownToggle
            tag="a"
            class="nav-link"
            @click="dropdown3 = !dropdown3"
            style="margin-right: 50px"
          >
            <MDBIcon icon="user" size="3x" />
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem
              v-if="!isLoggedIn"
              id="dropdwonItemLogin"
              style="font-size: 18px"
              ><router-link to="/auth">Prijava</router-link></MDBDropdownItem
            >
            <MDBDropdownItem
              v-if="!isLoggedIn"
              id="dropdwonItemRegister"
              style="font-size: 18px"
              ><router-link to="/registration"
                >Registracija</router-link
              ></MDBDropdownItem
            >
            <MDBDropdownItem
              v-if="isLoggedIn"
              @click="logout"
              id="dropdwonItemLogout"
              ><router-link to="">Odjava</router-link></MDBDropdownItem
            >
          </MDBDropdownMenu>
        </MDBDropdown>
      </MDBNavbarItem>
    </nav>
  </header>

  <br />

  <div class="input-group" v-if="!isMobile">
    <!-- <div class="form-outline" style="border-style: dotted; border-color: blue">  -->
    <input
      id="search-focus"
      type="search"
      placeholder="Unesite naziv artikla"
      v-model.trim="articleName"
    />
    <input type="text" :value="this.category" readonly style="width: 20%" />
    <button type="button" class="btn btn-primary" @click="searchArticle">
      <i class="fas fa-search"></i>
    </button>
  </div>
  <div v-if="isMobile">
    <div class="row">
      <input
        type="text"
        :value="this.category"
        readonly
        style="width: 50%; margin-left: 20%"
      />
    </div>
    <div class="row">
      <input
        id="search-focus"
        type="search"
        placeholder="Unesite naziv artikla"
        v-model.trim="articleName"
        style="width: 50%; margin-left: 20%; margin-top: 2%;"
      />
    </div>
    <div class="row">
      <button
        type="button"
        class="btn btn-primary"
        @click="searchArticle"
        style="width: 50%; margin-left: 20%; margin-top: 2%;"
      >
        <i class="fas fa-search"></i>
      </button>
    </div>
  </div>
</template>


<script>
import {
  MDBIcon,
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-vue-ui-kit";

import { ref } from "vue";

export default {
  data() {
    return {
      category: "",
      articleName: "",
      path: "",
      currentScreenWidth: window.screen.width,
      currentWidth: 500,
      isLoading: false,
      isMobile: false,
    };
  },

  mounted() {
    // IZVRSIT CE SE PRIJE NEGO SE KOMPONENTA UCITA
    this.currentScreenWidth = window.screen.width;
    window.onresize = () => {
      this.currentScreenWidth = window.screen.width;
      if (this.currentScreenWidth < this.currentWidth) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    };
  },

  created() {
    this.currentScreenWidth = window.screen.width;
    if (this.currentScreenWidth < this.currentWidth) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }

    this.path = this.$route.path;
    this.category = this.$route.params.category;
  },
  components: {
    MDBIcon,
    //MDBNavbar,
    //MDBNavbarToggler,
    //MDBNavbarBrand,
    // MDBNavbarNav,
    MDBNavbarItem,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
  },
  setup() {
    /*setup function is the entry point in the Composition API. It will be called before the component is created and after the props are prepared. Meaning that, before compiling and processing it’s template into a render object. Setup function is called before the beforeCreate hook. Note that this reference won’t be available inside the setup function. Because the component is not created yet.*/
    const dropdown3 = ref(false);

    const selectedOptions = ref("Kucanski aparati");
    var options = ref([
      "Kucanski aparati",
      "Racunari i racunarska oprema",
      "TV,elektorinika i mobiteli",
      "Parfimerija i drogerija",
      "Knjige",
      "Vrt i alati",
    ]);
    /*for(var i = 0; i<this.getCategories.length; i++ ){
      console.log("categories[i]"+getCategories[i]);
    }*/
    /*const options = ref(this.getCategories.categoryName);*/

    return {
      dropdown3,
      selectedOptions,
      options,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    getCategories() {
      //console.log("DOBIO SAM: "+JSON.stringify(this.$store.getters["article/categories"]));
      return this.$store.getters["article/categories"];
    },
    getCart() {
      return this.$store.getters["article/cart"];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/articles");
    },
    async searchArticle() {
      /*
      if (this.path.toString().trim().localeCompare("/cart") === 0) {
        console.log("DA U PITANJU JE KORPA! "+this.articleName);
        var cart = this.getCart;
        var searchableCart = [];
        for(var i = 0; i < cart.length; i++){

          if(cart[i].name.toString().trim().toLowerCase().startsWith(this.articleName.toString().trim().toLowerCase())){
            searchableCart.push(cart[i]);
          }
        }
        this.$store.dispatch("article/setCart", searchableCart);
      } else {*/
      const payload = {
        category: this.category,
        articleName: this.articleName,
      };
      await this.$store.dispatch("article/fetchArticleByName", payload);
      //}
    },
  },
};

/* za search */
const searchFocus = document.getElementById("search-focus");
const keys = [
  { keyCode: "AltLeft", isTriggered: false },
  { keyCode: "ControlLeft", isTriggered: false },
];

window.addEventListener("keydown", (e) => {
  keys.forEach((obj) => {
    if (obj.keyCode === e.code) {
      obj.isTriggered = true;
    }
  });

  const shortcutTriggered =
    keys.filter((obj) => obj.isTriggered).length === keys.length;

  if (shortcutTriggered) {
    searchFocus.focus();
  }
});

window.addEventListener("keyup", (e) => {
  keys.forEach((obj) => {
    if (obj.keyCode === e.code) {
      obj.isTriggered = false;
    }
  });
});

/* za search */
</script>

<style>
#bla {
  height: 100%;
}

.form-outline {
  width: 35%;
}

#dropdwonItemLogout,
#dropdwonItemRegister,
#dropdwonItemLogin {
  font-size: 20px;
}

.vue-select.direction-bottom {
  width: 40%;
  height: 45px;
}

#search-focus {
  width: 30%;
}

.input-group {
  justify-content: center;
  height: 45px;
  font-size: 18px;
}

.nav-item {
  /* onaj buletic sivi da izbrisem */
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  padding: 0rem 1rem;
}

header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #3c3e4b;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #3c3e4b;
}

h1 {
  margin: 0;
}

h1 i {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

h1 a,
i {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}

.selectCategory {
  width: 100%;
  min-width: 15ch;
  max-width: 30ch;
  border: 1px solid var(--select-border);
  border-radius: 0.25em;
  padding: 0.25em 0.5em;
  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: #fff;
  background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
}
</style>