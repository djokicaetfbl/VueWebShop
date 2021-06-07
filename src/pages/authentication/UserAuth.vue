<template>
  <div>
    <!-- hvali koda -->
    <the-header></the-header>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
      <!-- !! true or false convert to Boolean -->
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <p>Authenticating...</p>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
    <form @submit.prevent="submitForm">
  <!-- Email input -->
  <div class="form-outline mb-4" >
    <span class="badge bg-primary" for="email">Email adresa</span>
    <input type="email" name="email" id="email" class="form-control" placeholder="Email" />
    <!-- <label class="form-label" for="email">Email address</label>  -->
  </div>

  <!-- Password input -->
  <div class="form-outline mb-4">
    <span class="badge bg-primary" for="password">Lozinka</span>
    <input type="password" id="password" class="form-control" placeholder="Lozinka"/>
    <!-- <label class="form-label" for="password">Password</label>  -->
  </div>

  <!-- 2 column grid layout for inline styling -->
  <div class="row mb-4">
    <div class="col d-flex justify-content-center">
      <!-- Checkbox -->
     <!-- <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="form1Example3"
          checked
        />
         <label class="form-check-label" for="form1Example3"> Remember me </label>  
      </div> -->
    </div>

    <!-- <div class="col">
      <a href="#!">Forgot password?</a>
    </div>  -->
  </div>

  <!-- Submit button -->
  <button type="submit" class="btn btn-primary btn-block" id="signIn">Sign in</button>
</form>
    </base-card>
  </div>
</template>

<script>
/*import BaseButton from "../../components/ui/BaseButton.vue";*/
import TheHeader from "../../components/layout/TheHeader.vue";

export default {
  components: { /*BaseButton,*/ TheHeader },
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode == "login") {
        return "Login";
      } else {
        return "Signup";
      }
    },
    switchModeButtonCaption() {
      if (this.mode == "login") {
        return "Signup instead";
      } else {
        return "Login instead";
      }
    },
  },
  methods: {
    submitForm() {
      // hvali async

      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;

      /*const actionPayload = {
        email: this.email,
        password: this.password,
      };*/
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>

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
  /*border: 1px solid #ccc;*/
  border-radius: 12px;
  padding: 1rem;
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
</style>
