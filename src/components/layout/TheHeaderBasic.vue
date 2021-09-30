<template>
  <header style="height: 100%; ">
    <MDBNavbarItem>
      <router-link to="/cart"
        ><span class="badge badge-pill bg-danger">{{ this.getCart.length }}</span>
        <span><MDBIcon icon="shopping-cart" size="2x"></MDBIcon></span
      ></router-link>
    </MDBNavbarItem>
    <nav>
      <h1><router-link to="/">Web Shop</router-link></h1>
      <!-- <MDBIcon icon="shopping-bag" iconStyle="fas" size="3x" />  -->

      <MDBNavbarItem class="me-3 me-lg-0 dropdown" >
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
            <MDBDropdownItem v-if="!isLoggedIn" id="dropdwonItemLogin" style="font-size: 18px"
              ><router-link to="/auth">Prijava</router-link></MDBDropdownItem
            >
            <MDBDropdownItem v-if="!isLoggedIn" id="dropdwonItemRegister" style="font-size: 18px"
              ><router-link to="/registration"
                >Registracija</router-link
              ></MDBDropdownItem
            >
            <MDBDropdownItem v-if="isLoggedIn" @click="logout" id="dropdwonItemLogout"
              ><router-link to="">Odjava</router-link></MDBDropdownItem
            >
          </MDBDropdownMenu>
        </MDBDropdown>
      </MDBNavbarItem>
    </nav>
  </header>
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
  components: {
    MDBIcon,
    MDBNavbarItem,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
  },

  setup() {
    const dropdown3 = ref(false);
    return {
      dropdown3,
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
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
  },
};
</script>

<style>
#bla {
  height: 100%;
}

.form-outline {
  width: 35%;
}

.vue-select.direction-bottom {
  width: 40%;
  height: 45px;
}

.input-group {
  justify-content: center;
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

#dropdwonItemLogout, #dropdwonItemRegister, #dropdwonItemLogin {
  font-size: 20px;
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
</style>