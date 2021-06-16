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

        <div class="row mb-4" :class="{ invalid: !image.isValid }">
          <div class="col">
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
            /> <!-- stavi sliku kao jpeg , https://www.google.com/search?q=image%2F*+MIME+type&rlz=1C1GCEU_enBA945BA945&oq=image%2F*+MIME+type&aqs=chrome..69i57j0i19i22i30l6j69i58.263j0j7&sourceid=chrome&ie=UTF-8-->
              <!-- MIME TIPOVI NE PODRZAVAJU .PNG -->
            <p v-if="image.val === null" style="color: red">
              Niste izabrali sliku za kategoriju.
            </p>
          </div>
        </div>

        <button
          type="submit"
          id="addCategory"
          class="btn btn-primary btn-block mb-4"
        >
          Dodaj
        </button>

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

export default {
  components: { BaseCard },
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
        val: '',
        isValid: true,
      },
      formIsValid: true,
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
        //console.log("DJOLE: "+this.categoryName.val);
      }
      if (!this.image.val) {
        this.image.isValid = false;
        this.formIsValid = false;
        //console.log("DJOLE1: "+this.image.val);
      }
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
        //console.log("IMAGE URL: "+this.imageUrl);
      });
      //console.log("FILES OD 0: "+files[0] );
      fileReader.readAsDataURL(files[0]);
      this.image.val = files[0];
    },
    submitForm() {
      //console.log("USAO");
      this.validateForm();
      //console.log("USAO1");
      if (!this.formIsValid) {
        return;
      }
      //console.log("USAO2");

      const formData = {
        categoryName: this.categoryName.val,
        image: this.image.val,
      };
      //console.log("USAO3");
      console.log(formData);
      this.$emit("save-data", formData);
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

.invalid label {
  color: red;
}

.invalid input {
  border: 1px solid red;
}
</style>