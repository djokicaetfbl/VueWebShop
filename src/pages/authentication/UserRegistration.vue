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
    <hr />
    <form @submit.prevent="submitForm">
      <!-- prevent sprijeci defaultni http (POST) request -->
      <!-- 2 column grid layout with text inputs for the first and last names -->
      <div class="row mb-4">
        <div class="col">
          <div class="form-outline mb-4" :class="{ invalid: !firstName.isValid }">
            <!--<span class="badge bg-primary" for="firstName">Ime</span> -->
            <label class="labelFirstName" for="firstName">Ime</label><br>
            <label>{{ firstName.error ? firstName.errorMessage : "" }}</label>
            <br />
            <input
              type="text"
              name="firstName"
              id="firstName"
              class="form-control"
              v-model.trim="firstName.val"
              placeholder="Ime"
              @blur="clearValidity('firstName')"
            />
          </div>
          <!-- <label class="form-label" for="email">Email address</label>  -->
        </div>

        <div class="col">
          <div class="form-outline mb-4" :class="{ invalid: !lastName.isValid }">
            <!-- <span class="badge bg-primary" for="lastName"></span> -->
            <label class="labelLastName" for="lastName">Prezime</label><br>
            <label>{{ lastName.error ? lastName.errorMessage : "" }}</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              class="form-control"
              v-model.trim="lastName.val"
              placeholder="Prezime"
              @blur="clearValidity('lastName')"
            />
            <!-- <label class="form-label" for="email">Email address</label>  -->
          </div>
        </div>
      </div>
      <!-- Email input -->
      <div class="row mb-4">
        <div class="col">
          <div class="form-outline mb-4" :class="{ invalid: !email.isValid }">
            <!-- <span class="badge bg-primary" for="email">Email adresa</span> -->
            <label class="labelEmail" for="email">Email</label><br>
            <label>{{ email.error ? email.errorMessage : "" }}</label>
            <input
              type="email"
              name="email"
              id="email"
              class="form-control"
              v-model.trim="email.val"
              placeholder="Email"
              @blur="clearValidity('email')"
            />
            <!-- <label class="form-label" for="email">Email address</label>  -->
          </div>
        </div>

        <!-- Password input -->
        <div class="col">
          <div class="form-outline mb-4" :class="{ invalid: !email.isValid }">
            <!-- <span class="badge bg-primary" for="password">Lozinka</span> -->
            <label class="labelPassword" for="password">Password</label><br>
            <label>{{ password.error ? password.errorMessage : "" }}</label>
            <input
              type="password"
              id="password"
              class="form-control"
              v-model.trim="password.val"
              placeholder="Lozinka"
              @blur="clearValidity('password')"
            />
            <!-- <label class="form-label" for="password">Password</label>  -->
          </div>
        </div>
      </div>
      <!-- Submit button -->
      <div class="container">
        <div class="center">
          <button
            id="regiterUser"
            type="submit"
            class="btn btn-primary btn-block mb-4"
          >
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
    TheHeaderBasic,
  },
  data() {
    return {
      firstName: {
        val: "",
        isValid: true,
        errorMessage: "Unesite ispravano ime.",
        error: false,
      },
      lastName: {
        val: "",
        isValid: true,
        errorMessage: "Unesite ispravano prezime.",
        error: false,
      },
      email: {
        val: "",
        isValid: true,
        errorMessage: "Unesite ispravan e-mail.",
        error: false,
      },
      password: {
        val: "",
        isValid: true,
        errorMessage: "Unesite password dužine minimalno 6 karaktera.",
        error: false,
      },
      formIsValid: true,
      mode: "signup",
      isLoading: false,
      error: null,
    };
  },

  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.email.val === "" || !this.email.val.includes("@")) {
        this.email.isValid = false;
        this.email.error = true;
        this.formIsValid = false;
      } else {
        this.email.error = false;
      }
      if (this.password.val === "" || this.password.val.length < 6) {
        this.password.isValid = false;
        this.password.error = true;
        this.formIsValid = false;
      } else {
        this.password.error = false;
      }
      if (this.firstName.val === "") {
        this.firstName.isValid = false;
        this.firstName.error = true;
        this.formIsValid = false;
      } else {
        this.firstName.error = false;
      }
      if (this.lastName.val === "") {
        this.lastName.isValid = false;
        this.lastName.error = true;
        this.formIsValid = false;
      } else {
        this.lastName.error = false;
      }
    },
    async submitForm() {
      /*if (
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
      }*/
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      this.isLoading = true;

      const actionPayload = {
        email: this.email.val,
        password: this.password.val,
      };

      try {
        await this.$store.dispatch("signup", actionPayload); // posto modul gdje je login (actions.js) nije namespaceovan to nam namespace ne treba
        const redirectUrl = "/" + (this.$route.query.redirect || "articles");
        this.$router.replace(redirectUrl);
      } catch (error) {
        this.error =
          error.message ||
          "Došlo je do greške prilikom autentikacije! Molimo provjerite vaše podatke.";
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

.invalid label {
  color: red;
}

.invalid input {
  border: 1px solid red;
}
</style>