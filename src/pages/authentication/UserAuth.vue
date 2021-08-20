<template>
  <div>
    <base-dialog
      :show="!!error"
      title="Došlo je do greške"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Autentikacija..." fixed>
      <p>Autentikacija...</p>
      <base-spinner></base-spinner>
    </base-dialog>
    <the-header-basic></the-header-basic>
    <base-dialog
      :show="!!error"
      title="Došlo je do greške"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Autentikacija..." fixed>
      <p>Authenticating...</p>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card style="max-width: 82%">
      <h2>Prijava korisnika</h2>
      <hr />
      <form @submit.prevent="submitForm">
        <div class="form-outline mb-4" :class="{ invalid: !email.isValid }">
          <label class="labelEmail" for="email">Email</label>
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
        </div>

        <div class="form-outline mb-4" :class="{ invalid: !password.isValid }">
          <label class="labelPassword" for="password">Password</label>
          <label>{{ password.error ? password.errorMessage : "" }}</label>
          <input
            type="password"
            id="password"
            class="form-control"
            v-model.trim="password.val"
            placeholder="Lozinka"
            @blur="clearValidity('password')"
          />
        </div>
        <div class="row mb-4">
          <div class="col d-flex justify-content-center"></div>
        </div>
        <button v-if="screenWidth > currentWidth " type="submit" class="btn btn-primary btn-block" id="signIn">
          Prijava
        </button>
        <button v-else type="submit" class="btn btn-primary btn-block" id="signInMDisplay">
          Prijava
        </button>
      </form>
    </base-card>
  </div>
</template>

<script>
import TheHeaderBasic from "../../components/layout/TheHeaderBasic.vue";

export default {
  components: { TheHeaderBasic },
  data() {
    return {
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
      mode: "login",
      isLoading: false,
      error: null,
      screenWidth: window.innerWidth,
      currentWidth: 500,
    };
  },
  computed: {},
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
    },
    async submitForm() {
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
        await this.$store.dispatch("login", actionPayload); // posto modul gdje je login (actions.js) nije namespaceovan to nam namespace ne treba
        const redirectUrl = "/" + (this.$route.query.redirect || "articles");
        this.$router.replace(redirectUrl);
      } catch (error) {
        this.error =
          error.message ||
          "Došlo je do greške prilikom autentikacije, provjerite korisničko ime i lozinku.";
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
.labelEmail,
.labelPassword {
  font-size: 18px;
  font-weight: bold;
  color: #1266f1;
}

#email {
  border: 2px solid #1266f1;
}

#password {
  border: 2px solid #1266f1;
}

.badge.bg-primary {
  font-size: medium;
}

.form-outline.mb-4 {
  width: 80%;
}

#signIn {
  width: 35%;
}

form {
  margin: 1rem;
  border-radius: 12px;
  padding: 1rem;
}

#signIn {
  font-size: 20px;
}

#signInMDisplay {
  font-size: 14px;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}

.invalid label {
  color: red;
}

.invalid input {
  border: 1px solid red;
}


</style>
