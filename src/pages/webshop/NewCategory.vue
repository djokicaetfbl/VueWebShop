<template>
  <div>
    <the-header></the-header>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="row mb-4">
          <div class="col">
            <div class="form-outline mb-4">
              <span class="badge bg-primary" for="name">Naziv</span>
              <input
                type="text"
                name="categoryName"
                id="categoryName"
                class="form-control"
                v-model.trim="name"
                placeholder="Naziv"
              />
            </div>
            <!-- <label class="form-label" for="email">Email address</label>  -->
          </div>
        </div>
        <div class="row mb-4">
          <div class="col">
            <div class="form-outline mb-4">
              <span class="badge bg-primary" for="describe">Opis</span>
              <input
                type="text"
                name="describe"
                id="describe"
                class="form-control"
                v-model.trim="name"
                placeholder="Opis"
              />
            </div>
            <!-- <label class="form-label" for="email">Email address</label>  -->
          </div>
        </div>

        <div class="row mb-4">
          <div class="col">
            <button class="btn btn-info" @click="onPickFile">
              Upload profile picture
            </button>
            <input
              type="file"
              style="display: none"
              ref="fileInput"
              accept="image/*"
              @change="onFilePicked"
            />
          </div>
        </div>

        <button type="submit" id="addCategory" class="btn btn-primary btn-block mb-4">Dodaj</button>

        <!-- <div class="row mb-4">
          <div class="col">
            <div class="form-outline mb-4">
              <span class="badge bg-primary" for="describe">Opis</span>
                <MDBFile v-model="files1" v-model.trim="picture" label="Default file input example" />
            </div>
          </div>
        </div>  -->
      </form>
    </base-card>
  </div>
</template>

<script>
import BaseCard from "../../components/ui/BaseCard.vue";
import TheHeader from "../../components/layout/TheHeader.vue";

export default {
  components: { BaseCard, TheHeader },
  data() {
    return {
      categoryName: "",
      describe: "",
      isLoading: false,
      error: null,
      image: null,
    };
  },
  methods: {
    async submitForm() {

        console.log("SUBMIT NEW CATEGORY: ");
        console.log("Category name: "+this.categoryName);
        console.log("Describe: "+this.describe);
        console.log("Image: "+this.image);
      /*
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6 || this.firstname === "" || this.lastname === ""
      ) {
        console.log("EMAIL: "+this.email);
        console.log("PASSWORD: "+this.password);
        console.log("FIRSTNAME: "+this.firstname);
        console.log("LASTNAME: "+this.lastname);
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
    },*/
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      //let filename = files[0].name;
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    },
  },
};
</script>

<style scoped>
#categoryName {
  border: 2px solid #1266f1;
}

#describe {
  border: 2px solid #1266f1;
  min-height: 150px;
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

#addCategory {
    width: 30%;
    float: right;
}
</style>