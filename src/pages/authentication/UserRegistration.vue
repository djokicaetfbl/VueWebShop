<template>
  <base-dialog :show="!!error" title="An error occured" @close="handleError">
    <!-- !! true or false convert to Boolean -->
    <p>{{ error }}</p>
  </base-dialog>
  <base-dialog :show="isLoading" title="Authenticating..." fixed>
    <p>Autentikacija...</p>
    <base-spinner></base-spinner>
  </base-dialog>
  <the-header-basic></the-header-basic>
  <base-card>
  <h2>Registracija korisnika</h2>
  <hr>
    <form @submit.prevent="submitForm">
      <!-- prevent sprijeci defaultni http (POST) request -->
      <!-- 2 column grid layout with text inputs for the first and last names -->
      <div class="row mb-4">
        <div class="col">
          <div class="form-outline mb-4">
            <!--<span class="badge bg-primary" for="firstName">Ime</span> -->
            <label class="labelFirstName" for="firstName">Ime</label>
            <br />
            <input
              type="text"
              name="firstName"
              id="firstName"
              class="form-control"
              v-model.trim="firstname"
              placeholder="Ime"
            />
          </div>
          <!-- <label class="form-label" for="email">Email address</label>  -->
        </div>

        <div class="col">
          <div class="form-outline mb-4">
            <!-- <span class="badge bg-primary" for="lastName"></span> -->
            <label class="labelLastName" for="lastName">Prezime</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              class="form-control"
              v-model.trim="lastname"
              placeholder="Prezime"
            />
            <!-- <label class="form-label" for="email">Email address</label>  -->
          </div>
        </div>
      </div>
      <!-- Email input -->
      <div class="row mb-4">
        <div class="col">
          <div class="form-outline mb-4">
            <!-- <span class="badge bg-primary" for="email">Email adresa</span> -->
            <label class="labelEmail" for="lastName">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              class="form-control"
              v-model.trim="email"
              placeholder="Email"
            />
            <!-- <label class="form-label" for="email">Email address</label>  -->
          </div>
        </div>

        <!-- Password input -->
        <div class="col">
          <div class="form-outline mb-4">
            <!-- <span class="badge bg-primary" for="password">Lozinka</span> -->
            <label class="labelPassword" for="lastName">Password</label>
            <input
              type="password"
              id="password"
              class="form-control"
              v-model.trim="password"
              placeholder="Lozinka"
            />
            <!-- <label class="form-label" for="password">Password</label>  -->
          </div>
        </div>
      </div>
      <!-- Submit button -->
      <div class="container">
        <div class="center">
          <button id="regiterUser" type="submit" class="btn btn-primary btn-block mb-4">
            Registracija
          </button>
        </div>
      </div>
    </form>
  </base-card>
</template>


<script>
//import TheHeader from "../../components/layout/TheHeader.vue";
import TheHeaderBasic from "../../components/layout/TheHeaderBasic.vue";

export default {
  components: {
    //TheHeader,
    TheHeaderBasic,
  },

  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      formIsValid: true,
      mode: "signup",
      isLoading: false,
      error: null,
    };
  },

  methods: {
    async submitForm() {
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6 ||
        this.firstname === "" ||
        this.lastname === ""
      ) {
        console.log("EMAIL: " + this.email);
        console.log("PASSWORD: " + this.password);
        console.log("FIRSTNAME: " + this.firstname);
        console.log("LASTNAME: " + this.lastname);
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;

      const actionPayload = {
        email: this.email,
        password: this.password,
      };

      try {
        await this.$store.dispatch("signup", actionPayload); // posto modul gdje je login (actions.js) nije namespaceovan to nam namespace ne treba
        const redirectUrl = "/" + (this.$route.query.redirect || "articles");
        this.$router.replace(redirectUrl);
      } catch (error) {
        this.error =
          error.message || "Failed to authenticate, Check your login data.";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>


<style scoped>
.labelFirstName,
.labelLastName,
.labelEmail,
.labelPassword {
  font-size: 18px;
  font-weight: bold;
  color: #1266f1;
}

.container { 
  height: 50px;
  position: relative;
}

.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

#regiterUser {
  font-size: 20px;
  max-width: 700px;
}

#firstName {
  border: 2px solid #1266f1;
}

#lastName {
  border: 2px solid #1266f1;
}

#email {
  border: 2px solid #1266f1;
}

#password {
  border: 2px solid #1266f1;
}

.form-outline.mb-4 {
  width: 100%;
}
</style>