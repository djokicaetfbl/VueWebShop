<template>
  <div>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="row mb-4" :class="{ invalid: !categoryName.isValid }">
          <div class="col">
            <div class="form-outline mb-4">
              <span class="badge bg-primary" for="categoryName">Naziv</span>
              <input
                type="text"
                name="categoryName"
                id="categoryName"
                class="form-control"
                v-model.trim="categoryName.val"
                placeholder="Naziv"
                @blur="clearValidity('categoryName')"
              />
              <p v-if="!categoryName.isValid" style="color: red">
                Naziv kategorije ne može da bude prazan.
              </p>
            </div>
            <!-- <label class="form-label" for="email">Email address</label>  -->
          </div>
        </div>
        <!--
        <div class="row mb-4" :class="{ invalid: !describe.isValid }">
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
                @blur="clearValidity('describe')"
              />
            </div>
          </div>
        </div> -->

        <!-- <div class="row mb-4" :class="{ invalid: !image.isValid }">  -->
        <div class="row mb-4" :class="{ invalid: !image.isValid }">
          <div class="col">
            <button class="btn btn-info" @click="onPickFile">
              Upload image
            </button>
            <!-- ako coemo samo .png image/png -->
            <input
              type="file"
              style="display: none"
              ref="fileInput"
              accept="image/*"
              @change="onFilePicked"
            />

            <!-- <MDBCard style="max-width: 100%">  -->
            <img
              v-if="imageUrl.val !== ''"
              top
              :src="imageUrl.val"
              class="img-fluid"
              alt="..."
            />
            <!--  </MDBCard>  -->

            <!-- 
            <button class="btn btn-info" @click="onPickFile">
              Dodaj sliku za kateoriju
            </button>
              <input
              type="file"
              style="display: none"
              name="image"
              id="image"
              ref="fileInput"
              accept="image/*"        
              @change="onFilePicked"
            /> -->
            <!-- <p v-if="image.val === null" style="color: red">
              Niste izabrali sliku za kategoriju. 
            </p>  -->
          </div>
        </div>

        <!-- <div class="row mb-4">
          <div class="col">
            <div class="form-outline mb-4">
              <span class="badge bg-primary" for="describe">Opis</span>
                <MDBFile v-model="files1" v-model.trim="picture" label="Default file input example" />
            </div>
          </div>
        </div>  -->
        <button
          type="submit"
          id="addCategory"
          class="btn btn-primary btn-block mb-4"
        >
          Dodaj
        </button>
      </form>
    </base-card>
  </div>
</template>

<script>
import BaseCard from "../../components/ui/BaseCard.vue";
import // MDBCard,
//MDBCardImg,
"mdb-vue-ui-kit";

export default {
  components: { BaseCard /*MDBCard*/ /*MDBCardImg*/ },
  emits: ["save-data"], // BITNO
  data() {
    return {
      categoryName: {
        val: "",
        isValid: true,
      },
      /* describe:  {
          val: '',
          isValid: true,
      },*/
      image: {
        val: null,
        isValid: true,
      },
      imageUrl: {
        val: "",
        isValid: true,
      },
      formIsValid: true,
      id: '',
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.categoryName.val === "") {
        this.categoryName.isValid = false;
        this.formIsValid = false;
        //console.log("DJOLE: " + this.categoryName.val);
      }
      /*if (!this.image.val) {
        this.image.isValid = false;
        this.formIsValid = false;
        console.log("DJOLE1: "+this.image.val);
      }*/
    },

    onPickFile() {
      this.$refs.fileInput.click(); // trigerujem na klik
    },
    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Molimo Vas iazberite validan fajl!");
      }
      // stavimo ga u base64 string -> binary file to string value
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl.val = fileReader.result;
        //console.log("IMAGE URL: " + this.imageUrl.val);
      });
      fileReader.readAsDataURL(files[0]);
      console.log("FILE OD 0: " + files[0]);
      this.image.val = files[0];
      //console.log("this.image.val: " + this.image.val);
      //console.log("FILENAME: " + filename);
    },

    /*
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      //let filename = files[0].name;
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
        //console.log("IMAGE URL: "+this.imageUrl);
      });
      //console.log("FILES OD 0: "+files[0] );
      fileReader.readAsDataURL(files[0]);
      this.image.val = files[0];
    },
    */

    randomString() {
      var length = 32;
      var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var result = "";
      for (var i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
      return result;
    },

    submitForm() {
      console.log("USAO");
      this.validateForm();
      //console.log("USAO1");
      if (!this.formIsValid) {
        return;
      }
      if (!this.image) {
        console.log("SLIKA JE NULL");
        return;
      }
      //console.log("USAO2");

      const formData = {
        id: this.randomString(),
        categoryName: this.categoryName.val,
        imageUrl: this.imageUrl.val,
      };
      //console.log("USAO3");
      console.log("FORM DATA: "+formData);
      this.$emit("save-data", formData);
    },
  },
};
</script>

<style scoped>
img {
  padding: 20px;
  max-height: 150px;
  max-width: 150px;
}
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

.invalid label {
  color: red;
}

.invalid input {
  border: 1px solid red;
}
</style>