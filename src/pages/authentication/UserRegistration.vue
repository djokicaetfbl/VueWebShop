<template>
  <the-header></the-header>
  <base-card>
    <form @submit.prevent="submitForm">
      <!-- prevent sprijeci defaultni http (POST) request -->
      <!-- 2 column grid layout with text inputs for the first and last names -->
      <div class="row mb-4">
        <div class="col">
          <div class="form-outline mb-4">
            <span class="badge bg-primary" for="firstName">Ime</span>
            <input
              type="text"
              name="firstName"
              id="firstName"
              class="form-control"
              placeholder="Ime"
            />
          </div>
          <!-- <label class="form-label" for="email">Email address</label>  -->
        </div>

        <div class="col">
          <div class="form-outline mb-4">
            <span class="badge bg-primary" for="lastName">Prezime</span>
            <input
              type="text"
              name="lastName"
              id="lastName"
              class="form-control"
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
            <span class="badge bg-primary" for="email">Email adresa</span>
            <input
              type="email"
              name="email"
              id="email"
              class="form-control"
              placeholder="Email"
            />
            <!-- <label class="form-label" for="email">Email address</label>  -->
          </div>
        </div>

        <!-- Password input -->
        <div class="col">
          <div class="form-outline mb-4">
            <span class="badge bg-primary" for="password">Lozinka</span>
            <input
              type="password"
              id="password"
              class="form-control"
              placeholder="Lozinka"
            />
            <!-- <label class="form-label" for="password">Password</label>  -->
          </div>
        </div>
      </div>
      <!-- Submit button -->
      <button type="submit" class="btn btn-primary btn-block mb-4">
        Sign up
      </button>
    </form>
  </base-card>
</template>


<script>
import TheHeader from "../../components/layout/TheHeader.vue";

export default {
  components: {
    TheHeader,
  },

  methods: {
    submitForm(){
        console.log("BLA");
    }
  },
};
</script>


<style scoped>
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