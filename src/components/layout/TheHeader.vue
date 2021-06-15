<template id="bla">
  <header>
    <MDBNavbarItem>
      <router-link to="/cart"><span class="badge badge-pill bg-danger">1</span>
      <span><MDBIcon icon="shopping-cart" size="2x"></MDBIcon></span></router-link>

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
          >
            <MDBIcon icon="user" size="3x" />
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem v-if="!isLoggedIn" ><router-link to="/auth">Login</router-link></MDBDropdownItem>
            <MDBDropdownItem v-if="!isLoggedIn" ><router-link to="/registration">Register</router-link></MDBDropdownItem>
            <MDBDropdownItem v-if="isLoggedIn" @click="logout"><router-link to="">Logout</router-link></MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </MDBNavbarItem>
    </nav>
  </header>

  <br />

  <div class="input-group">
  <div class="form-outline">
    <input id="search-focus" type="search" class="form-control" />
    <label class="form-label" for="form1">Search</label>
  </div>
  <button type="button" class="btn btn-primary">
    <i class="fas fa-search"></i>
  </button>
  <vue-select v-model="selectedOptions" :options="options" close-on-select></vue-select>
</div>
  
</template>


<script>

import {
  MDBIcon,
  //MDBNavbar,
  //MDBNavbarToggler,
  //MDBNavbarBrand,
  //MDBNavbarNav,
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
  setup() {  /*setup function is the entry point in the Composition API. It will be called before the component is created and after the props are prepared. Meaning that, before compiling and processing it’s template into a render object. Setup function is called before the beforeCreate hook. Note that this reference won’t be available inside the setup function. Because the component is not created yet.*/
    const dropdown3 = ref(false);

    const selectedOptions = ref('Kucanski aparati')
    const options = ref(['Kucanski aparati', 'Racunari i racunarska oprema', 'TV,elektorinika i mobiteli', 'Parfimerija i drogerija', 'Knjige', 'Vrt i alati'])

    return {
      dropdown3,
      selectedOptions,
      options,
    };
  },
   computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/articles');
    }
  }
};


/* za search */
const searchFocus = document.getElementById('search-focus');
const keys = [
  { keyCode: 'AltLeft', isTriggered: false },
  { keyCode: 'ControlLeft', isTriggered: false },
];

window.addEventListener('keydown', (e) => {
  keys.forEach((obj) => {
    if (obj.keyCode === e.code) {
      obj.isTriggered = true;
    }
  });

  const shortcutTriggered = keys.filter((obj) => obj.isTriggered).length === keys.length;

  if (shortcutTriggered) {
    searchFocus.focus();
  }
});

window.addEventListener('keyup', (e) => {
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
  width: 100%;
}

.form-outline{
  width: 35%;
}

.vue-select.direction-bottom {
  width: 35%;
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
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
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
</style>